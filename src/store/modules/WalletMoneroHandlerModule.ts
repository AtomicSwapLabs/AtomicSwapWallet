import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'

import { MoneroWallet, moneroWalletDB, MoneroWalletSettings } from '@/wallet/moneroWallet'
import en from '@/lang/en'
import es from '@/lang/es'
import fr from '@/lang/fr'
import ja from '@/lang/ja'
import ca from '@/lang/ca'
import pt_br from '@/lang/pt_br'
import it from '@/lang/it'
import store from '@/store'
import BigNumber from 'bignumber.js'

/* eslint-disable no-unused-vars */


/* eslint-enable no-unused-vars */

@Module({ name: 'walletMonero', store: store, namespaced: true, dynamic: true })
class WalletMoneroHandlerModule extends VuexModule {

  wallet = new MoneroWallet();
  transactions = new Array()
  unconfirmedTransactions = new Array()
  synced = false
  balance = new BigNumber(0)
  lockedBalance = new BigNumber(0)
  unlockedBalance = new BigNumber(0)
  utxos = new Array()
  feeRates: number[] = new Array()
  fiatRate = 0
  rates: any = {}
  fiatSymbol = ''
  settings = new MoneroWalletSettings(1, 'en', 'USD', false)
  currentLanguage = en
  restoring = false
  isMac = false
  lastTX: string = ''


  mnemonic: string = ''
  path: string = '';
  password: string = '';

  currencyDisplay:String = 'USD'

  @Mutation
  setCurrencyDisplay(c: string) {
    this.currencyDisplay = c
  }





  @Mutation
  setWallet(w: MoneroWallet) {
    this.wallet = w
  }

  @Mutation
  setLastTX(tx: string) {
    this.lastTX = tx
  }


  @Mutation
  setMnemonic(m: string) {
    this.mnemonic = m
  }

  @Mutation
  setPath(p: string) {
    this.path = p
  }

  @Mutation
  setPassword(p: string) {
    this.password = p
  }

  @Mutation
  setBalance(b: BigNumber) {
    this.balance = b;
  }

  @Mutation
  setUnlockedBalance(b: BigNumber) {
    this.unlockedBalance = b;
  }


  @Mutation
  setIsMac(mac: boolean) {
    this.isMac = mac
  }

  @Mutation
  setRestoringWallet(r: boolean) {
    this.restoring = r
  }


  @Mutation
  setTransactions(txs: []) {
    this.transactions = txs;
  }




  @Mutation
  setUnconfirmedTransactions(txs: []) {

    let ubal = new BigNumber(0)

    for (var i = 0; i < txs.length; i++) {
      let amount = new BigNumber(txs[i])
      ubal = ubal.plus(amount)

      // We want unconfirmed spends to take away from our main balance, because when a user has just sent a transaction
      // we don't want to keep showing the old but technically correct >=6 confirmations balance
      if (amount.lt(0)) {
        this.unlockedBalance = this.unlockedBalance.plus(amount)
      }

    }


    this.unconfirmedTransactions = txs
    this.unlockedBalance = ubal

  }

  @Mutation
  setSettings(s: MoneroWalletSettings) {
    this.settings = s
  }

  @Mutation
  clearMoneroWallet() {
    this.wallet.closeWallet();
    this.wallet = new MoneroWallet();
  }

  //   @Mutation
  //   setUtxos(u: any[]) {
  //     this.utxos = u
  //   }

  @Mutation
  setFeeRates(fees: number[]) {
    this.feeRates = fees
  }




  @Mutation
  setFiatSymbol(symbol: string) {
    this.fiatSymbol = symbol
  }

  @Mutation
  setFiatRates(fiatRates: any) {
    this.fiatRate = fiatRates
  }

  @Mutation
  setRestoring(r: boolean) {
    this.restoring = r
  }

  @Mutation
  setCurrentLanguage(lang: string) {

    if (lang == "English" || lang == "en") {
      this.currentLanguage = en
    }

    if (lang == "Español" || lang == "es") {
      this.currentLanguage = es
    }

    if (lang == "Français" || lang == "fr") {
      this.currentLanguage = fr
    }

    if (lang == "日本語" || lang == "ja") {
      this.currentLanguage = ja

    }

    if (lang == "Italiano" || lang == "it") {
      this.currentLanguage = it
    }

    if (lang == "Catalan" || lang == "ca") {
      this.currentLanguage = ca
    }

    if (lang == "Português Brasil" || lang == "pt-br") {
      this.currentLanguage = pt_br
    }

  }

  @Action
  async shuffleAddresses() {
    //random number between 0 and 100
    let random = Math.floor(Math.random() * 100)
    return await this.wallet.shuffleAddress(random)
  }

  @Action
  async fetchWallet() {
    await this.wallet.openWallet();
    const currentBalance = this.wallet.balance;
    const currentUnlockedBalance = this.wallet.unlockedBalance

    this.context.commit('setWallet', this.wallet);
    this.context.commit('setBalance', currentBalance)
    this.context.commit('setUnlockedBalance', currentUnlockedBalance);
  }

  @Action
  async forceSyncWallet() {
    await this.wallet.syncListeners();
    await this.wallet.forceUpdateBalance()
    await this.fetchTransactions()
    this.context.commit('setBalance', this.wallet.balance);
    this.context.commit('setUnlockedBalance', this.wallet.unlockedBalance);
  }

  @Action
  async fetchSettings() {
    let s = await moneroWalletDB.getSettings()
    this.context.commit('setCurrentLanguage', s.language)
    this.context.commit('setSettings', s)
  }




  @Action
  async createWallet(mnemonic: String, restoring?: boolean) {
    try {

      const createdWallet = await this.wallet.createNewWallet(mnemonic, restoring);

      this.context.commit('setBalance', 0)
      this.context.commit('setUnlockedBalance', 0);
      this.context.commit('setMnemonic', createdWallet.mnemonic);
      this.context.commit('setPath', createdWallet.path);
      this.context.commit('setPassword', createdWallet.password);
    } catch (error) {
      console.error("Error creating wallet:", error);
    }



  }

  @Action
  async fetchDefaultFiatRate() {
    const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=XMR,USD')
    const data = await response.json();
    const xmrPrice = data.XMR
    const usdPrice = data.USD
    return xmrPrice * usdPrice
  }


  @Action
  async deleteAllWallets() {
    await moneroWalletDB.clearAllWallets()
    this.context.commit('clearMoneroWallet')
  }

  @Action
  async fetchTransactions() {
    const newTransactions = await this.wallet.fetchTransactions()
    this.context.commit('setTransactions', newTransactions)
  }


  @Action
  async sendTransaction(tx: any) {
    try {
      await this.wallet.broadcastTransaction(tx);
    } catch (error) {
      console.error("Error sending transaction:", error)
    }
  }

  @Action
  async fetchRates() {
    //get rates from cryptocompare

    const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=XMR,USD')
    const json = await response.json()
    // const xmrPrice = json.XMR
    const usdPrice = json.USD



    this.context.commit('setFiatRate', usdPrice)
    this.context.commit('setFiatSymbol', 'USD')
    this.context.commit('setFiatRates', usdPrice)

  }

  @Action
  async syncWallet() {
    // await this.wallet.synchronize(smallSync)
    await this.fetchTransactions()
    await this.fetchSettings()
    await this.fetchRates()
  }



  @Action
  async createTX(sweepFlag: boolean = false, address: string, amount: string, priority: number) {
    try {
      const createdTX = await this.wallet.createTransaction(sweepFlag, address, amount, priority);
      console.log('created tx:', createdTX);
      this.context.commit('setLastTX', createdTX.tx)

    } catch (error) {
      console.error("Error creating transaction:", error)
    }
  }


  @Action
  async changeCurrency(c: string) {
    await moneroWalletDB.changeCurrency(c)
    await this.fetchSettings()
    this.context.commit('setFiatRate', this.rates[c]['last'])
    this.context.commit('setFiatSymbol', this.rates[c]['symbol'])
  }

  @Action
  async removeWallet() {
    await this.wallet.removeWallet()
    this.context.commit('clearMoneroWallet')
  }

  @Action
  async changeLanguage(l: string) {
    await moneroWalletDB.changeLanguage(l)
    await this.fetchSettings()
    this.context.commit('setCurrentLanguage', l)
  }

  @Action
  async changeMultiDeviceSupport(enabled: boolean) {
    await moneroWalletDB.changeMultiDeviceSupport(enabled)
    await this.fetchSettings()
  }

  @Action
  async createSettingsIfNotExist() {
    await moneroWalletDB.createSettingsIfNotExist()
    await this.fetchSettings()
  }

  @Action
  async restoreWalletAction(mnemonic: string) {
    try {
      this.context.commit('setRestoringWallet', true)
      await this.wallet.createNewWallet(mnemonic)
      this.context.commit('setRestoringWallet', false)
    } catch (error) {
      this.context.commit('setRestoringWallet', false)
      console.error("Error restoring the wallet:", error)
    }
  }




}

export default getModule(WalletMoneroHandlerModule)
