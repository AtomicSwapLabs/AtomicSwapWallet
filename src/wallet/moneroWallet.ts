import Dexie from "dexie";

const monero = require("monero-javascript");

const MoneroWalletListener = monero.MoneroWalletListener;

const path = window.require("path");
const fs = window.require("fs");
const os = window.require("os");

const MoneroUtils = monero.MoneroUtils;



// const MAINNET_DAEMON_URI: string = "xmr-node.cakewallet.com:18081";
const MAINNET_DAEMON_URI: string = "172.104.202.210:18081";

const MAINNET = 'mainnet'



interface IMoneroWallet {
  address: string;
  balance: number;
  unlockedBalance: number;
  mnemonic: string;
  password: string;
  path: string;
}

export class MoneroWallet implements IMoneroWallet {
  address!: string;
  balance!: number;
  unlockedBalance!: number;
  mnemonic!: string;
  password!: string;
  path!: string;

  openedWallet: any = null;
  wallet: any = null;

  constructor() { }


  async validateAddress(address: string): Promise<boolean> {
    try {
      let validationResult = await MoneroUtils.validateAddress(
        address,
        MAINNET
      );

      if (validationResult.getIsValid()) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return false;
    }
  }


  async openWallet(): Promise<void> {
    const walletDB = await moneroWalletDB.getWallet();


    this.address = walletDB.address;
    this.balance = walletDB.balance;
    this.mnemonic = walletDB.mnemonic;
    this.password = walletDB.password;
    this.path = walletDB.path;


    if (!fs.existsSync(this.path)) {
      throw new Error("Wallet file not found");
    }    

    this.openedWallet = await monero.openWalletFull({
      path: this.path,
      password: "",
      networkType: MAINNET,
      serverUri: MAINNET_DAEMON_URI,
      fs: fs
    });
  }

  async syncListeners(): Promise<void> {
    const self = this;

    // const daemon = await monero.connectToDaemonRpc(MAINNET_DAEMON_URI);
    // const height = await daemon.getHeight();
    // //set start height diff from now to start of year

    // const startHeight = height - 10000;
    
    

    await this.openedWallet.sync(new class extends MoneroWalletListener {
      async onSyncProgress(height: any, startHeight: any, endHeight: any, percentDone: any, message: any) {
        console.log("onSyncProgress(" + height + ", " + startHeight + ", " + endHeight + ", " + percentDone + ", " + message + ")");
        if (percentDone == 1) {
          await self.openedWallet.save();
        }
      }

    });

    await this.openedWallet.startSyncing(5000);

    await this.openedWallet.addListener(new class extends MoneroWalletListener {
      async onOutputReceived(output: any) {
        let amount = output.getAmount();
        let txHash = output.getTx().getHash();
        let isConfirmed = output.getTx().isConfirmed();
        let isLocked = output.getTx().isLocked();
        await self.openedWallet.save()
        console.log("output received: " + amount + ", " + txHash + ", " + isConfirmed + ", " + isLocked);
      }
      async onBalancesChanged(newBalance: any, newUnlockedBalance: any) {
        self.balance = newBalance;
        self.unlockedBalance = newUnlockedBalance;
        await self.openedWallet.save()
        moneroWalletDB.updateBalance(self.balance, self.unlockedBalance);
      }
    })

    this.balance = await this.openedWallet.getBalance();
    this.unlockedBalance = await this.openedWallet.getUnlockedBalance();

    await moneroWalletDB.updateBalance(this.balance, this.unlockedBalance);
  }


  async forceUpdateBalance(): Promise<void> {
    this.balance = await this.openedWallet.getBalance();
    this.unlockedBalance = await this.openedWallet.getUnlockedBalance();
    console.log("balance", this.balance.toString())
    console.log("unlockedBalance", this.unlockedBalance.toString())
    await moneroWalletDB.updateBalance(this.balance, this.unlockedBalance);
  }


  async shuffleAddress(index: number = 0): Promise<string> {
    return await this.openedWallet.getAddress(index, 0);
  }

  async createNewWallet(mnemonic: String, isRestoring: boolean = false): Promise<any> {


    console.log(mnemonic)

    const wallet_dir = path.join(os.homedir(), '/monero_wallet');

    if (fs.existsSync(wallet_dir)) {
      fs.rmdirSync(path.resolve(wallet_dir), { recursive: true, force: true });
    }

    fs.mkdirSync(wallet_dir);

    let config = {
      path: path.resolve(wallet_dir + '/wallet'),
      networkType: MAINNET,
      server: {
        uri: MAINNET_DAEMON_URI
      },
      fs: fs
    }
    if(isRestoring) {
      Object.assign(config, {
        seed: mnemonic,
        restoreHeight:2908269
      })
    }
    try {

      console.log('createing full wallet');
      const moneroWallet = await monero.createWalletFull(config);

      this.mnemonic = await moneroWallet.getSeed();
      this.password = "";
      this.path = wallet_dir + '/wallet';
      this.address = await moneroWallet.getPrimaryAddress();
      this.balance = 0;
      this.unlockedBalance = 0;
      await moneroWalletDB.addWallet(this);
      this.openedWallet = moneroWallet;

      return {
        mnemonic: this.mnemonic,
        password: "",
      };
    } catch (e) {
      console.log(e);
    }
  }
  async createTransaction(sweepFlag: boolean = false, to: string, amount: string, priority: number): Promise<any> {
    let tx: any;
    if (sweepFlag) {
      tx = await this.openedWallet.sweepAll({
        accountIndex: 0,
        address: to,
        relay: false
      });
    } else {
      tx = await this.openedWallet.createTx({
        accountIndex: 0,
        address: to,
        priority: priority, // default, or 1-12
        amount: amount,
        relay: false
      });
    }
    //extract fee
    const fee = tx.getFee();
    const total = amount + fee;
    return {
      fee: fee,
      total: total,
      tx: tx
    }
  }

  async fetchTransactions(): Promise<MoneroTransaction[]> {
    let transactions = await this.openedWallet.getTransfers();
    let moneroTransactions: MoneroTransaction[] = [];


    for (var i = 0; i < transactions.length; i++) {

      let amount = transactions[i].getAmount();
      let isIncoming = transactions[i].isIncoming();
      let isOutgoing = transactions[i].isOutgoing();
      let txid = transactions[i].getTx().getHash();
      let time = new Date(transactions[i].getTx().getBlock().getTimestamp() * 1000);

      let moneroTransaction = new MoneroTransaction(
        amount,
        isIncoming,
        isOutgoing,
        txid,
        time
      );

      moneroTransactions.push(moneroTransaction);
    }

    //instead of adding, we should replace the transactions

    await moneroWalletDB.transactions.clear();
    for (var i = 0; i < moneroTransactions.length; i++) {
      await moneroWalletDB.addTransaction(moneroTransactions[i]);
    }

    return moneroTransactions;
  }






  async broadcastTransaction(tx: any): Promise<any> {
    let txid = await this.openedWallet.relayTx(tx);
    return txid;
  }


  async closeWallet() {
    if(this.openedWallet){
      await this.openedWallet.close();
    }
  }

  async removeWallet(): Promise<void> {
    fs.rmdirSync(this.path, { recursive: true, force: true });
    await this.openedWallet.close();
    await moneroWalletDB.clearAllWallets();
  }

}

export class MoneroWalletDB extends Dexie {
  wallet!: Dexie.Table<IMoneroWallet, number>;
  transactions!: Dexie.Table<MoneroTransaction, number>;
  settings!: Dexie.Table<MoneroWalletSettings, number>;

  constructor() {
    super("MoneroWallet");
    this.version(1).stores({
      transactions:
        "++id, amount, to, from, txid, timestamp, block, confirmations, fee, paymentId",
      wallet: "++id, address, balance, unlockedBalance,  mnemonic, password, path",
      settings: "++id, language, currency, multiDeviceSupport",
    });

    this.wallet.mapToClass(MoneroWallet);
    this.transactions.mapToClass(MoneroTransaction);
    this.settings.mapToClass(MoneroWalletSettings);
  }

  async addTransaction(transaction: MoneroTransaction) {
    await this.transactions.add(transaction);
  }

  async addWallet(wallet: MoneroWallet) {
    await this.wallet.add(wallet);
  }

  async updateBalance(newBalance: number, unlockedBalance: number = 0) {
    let storedWallets = await this.wallet.toArray();
    let storedWallet: any = storedWallets[0];
    await this.wallet.update(storedWallet.id, { balance: newBalance, unlockedBalance });
  }

  

  async clearAllWallets() {
    console.log('starting to clear from dexie db')
    await this.wallet.clear();
    console.log('wallet db clear')
    await this.transactions.clear();
    console.log('transaction db clear')
    // delete monero wallet file
    const pathResolved  = path.resolve(os.homedir(), '/monero_wallet');
    if (fs.existsSync(pathResolved)) {
      fs.rmdirSync(pathResolved, { recursive: true, force: true });
    }
    console.log('monero wallet file cleared')
  }

  async createSettingsIfNotExist() {
    let s = await this.settings.toArray();

    if (s.length == 0) {
      // Let's set the language initially as their locale language
      let language = navigator.language.split("-")[0];

      if (
        language == "en" ||
        language == "es" ||
        language == "fr" ||
        language == "ja" ||
        language == "ca" ||
        language == "it"
      ) {
        await this.settings.put(
          new MoneroWalletSettings(1, language, "USD", false)
        );
      } else if (navigator.language == "pt-br") {
        await this.settings.put(
          new MoneroWalletSettings(1, "pt-br", "USD", false)
        );
      } else {
        await this.settings.put(
          new MoneroWalletSettings(1, "en", "USD", false)
        );
      }
    }
  }

  async getSettings(): Promise<MoneroWalletSettings> {
    await this.createSettingsIfNotExist();
    let s = await this.settings.toArray();
    return s[0];
  }

  async getTransactions(): Promise<MoneroTransaction[]> {
    return await this.transactions.toArray();
  }

  async getWallet(): Promise<any> {
    let storedWallets = await this.wallet.toArray();

    let storedWallet = storedWallets[0];

    if (storedWallet !== undefined || storedWallets.length > 0) {
      return storedWallet;
    }
    throw new Error("No wallet found in database");
  }

  async changeLanguage(language: string) {
    let existingSettings = await this.settings.toArray();
    await this.settings.update(existingSettings[0].id, { language: language });
  }

  async changeCurrency(currency: string) {
    let existingSettings = await this.settings.toArray();
    await this.settings.update(existingSettings[0].id, { currency: currency });
  }

  async changeMultiDeviceSupport(enabled: boolean) {
    let existingSettings = await this.settings.toArray();
    await this.settings.update(existingSettings[0].id, {
      multiDeviceSupport: enabled,
    });
  }
}

export class MoneroTransaction {
  amount: number;
  isIncoming: boolean;
  isOutgoing: boolean;
  txid: string;
  time: Date;
  constructor(
    amount: number,
    isIncoming: boolean,
    isOutgoing: boolean,
    txid: string,
    time: any
  ) {
    this.amount = amount;
    this.isIncoming = isIncoming;
    this.isOutgoing = isOutgoing;
    this.txid = txid;
    this.time = time
  }
}

export class MoneroWalletSettings {
  id: number;
  language: string;
  currency: string;
  multiDeviceSupport: boolean;

  constructor(i: number, l: string, c: string, m: boolean) {
    this.id = i;
    this.language = l;
    this.currency = c;
    this.multiDeviceSupport = m;
  }

  getSettings() {
    return {
      id: this.id,
      language: this.language,
      currency: this.currency,
      multiDeviceSupport: this.multiDeviceSupport,
    };
  }
}

export let moneroWalletDB = new MoneroWalletDB();

