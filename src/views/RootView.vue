<template>
  <div id="root">
    <div id="loadingScreen" v-if="!this.loaded">
      <div class="loading">
        <Loader/>
      </div>
    </div>
    <WalletHomeView
      :language="lang"
      v-if="this.walletSetUp && this.loaded"
      v-on:close-wallet="closeWallet()"
      v-on:language-changed="changeLanguage()"
    ></WalletHomeView>
    <OnboardView :language="lang" v-if="!this.walletSetUp && this.loaded"></OnboardView>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OnboardView from "@/views/OnboardView.vue";
import WalletHomeView from "@/views/WalletHomeView.vue";
import WalletHandlerModule from "@/store/modules/WalletHandlerModule";
import Loader from "@/components/Loader.vue";
import WalletMoneroHandlerModule from "@/store/modules/WalletMoneroHandlerModule";

@Component({
  components: {
    OnboardView,
    WalletHomeView,
    Loader
  },
})
export default class Main extends Vue {
  private loaded = false;
  private walletSetUp = false;
  private lang = WalletHandlerModule.currentLanguage;
  private noConnection = false;

  async closeWallet() {
    await WalletHandlerModule.deleteAllWallets();
    this.walletSetUp = false;
  }

  changeLanguage() {
    this.lang = WalletHandlerModule.currentLanguage
  }

  async mounted() {

    // Get the OS
    window.ipcRenderer.on('user-os', (e: any, m: string) => {
      if(m == 'darwin') {
        WalletHandlerModule.setIsMac(true)
      }
    })

    // We want to check if there's already settings, if not, create some with reasonable defaults
    await WalletHandlerModule.createSettingsIfNotExist();

    // Get the language
    this.lang = WalletHandlerModule.currentLanguage;

    try {
      await WalletHandlerModule.fetchSettings()
      await WalletHandlerModule.fetchWallet();
      await WalletMoneroHandlerModule.fetchWallet();
      const rate:any = await WalletMoneroHandlerModule.fetchDefaultFiatRate();
      WalletMoneroHandlerModule.setFiatRates(rate);
      this.walletSetUp = true;
      this.loaded = true;

    }catch(e){ 
      console.log(e);
      console.log('opening wallet failed, will undergo cleanup and seed creation')
      //delete all wallets and and send user to input screen

      await this.closeWallet();
      this.loaded = false;
      this.$router.push('/onboard');

    }
    
    try {
      await WalletHandlerModule.fetchRates()
      await WalletHandlerModule.fetchTransactions()
      await WalletMoneroHandlerModule.forceSyncWallet();
      
      await WalletMoneroHandlerModule.fetchTransactions();

      this.loaded = true;
    } catch {
      // Something went wrong with the sync, likely no internet?
      this.noConnection = true;
    }

  }
}
</script>

<style scoped>
#root {
  height: 100%;
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

#loadingScreen {
  height: 100%;
  animation: fade-in 2s linear;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
