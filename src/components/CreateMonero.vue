<template>
  <Screen>
    <ScreenContent>
      <CreateStep1Monero v-if="!generated"/>
      <div v-if="generated">
        <CreateStep2Monero/>

  <div class="ol_parent" style="margin-top=-20px">
      <div class="ol_container">
        <OL class="list">
        <LI><span class="phrase">{{ mnemonic[0] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[1] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[2] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[3] }}</span></LI>
        </OL>
      </div>

      <div class="ol_container">
        <OL class="list" start="5">
        <LI><span class="phrase">{{ mnemonic[4] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[5] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[6] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[7] }}</span></LI>
        </OL>
      </div>

      <div class="ol_container">
        <OL class="list" start="9">
        <LI><span class="phrase">{{ mnemonic[8] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[9] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[10] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[11] }}</span></LI>
        </OL>
      </div>
      </div>

      <div class="ol_parent" style="padding-top=-10px">

      <div class="ol_container">
        <OL class="list" start="13">
        <LI><span class="phrase">{{ mnemonic[12] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[13] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[14] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[15] }}</span></LI>
        </OL>
      </div>

      <div class="ol_container">
        <OL class="list" start="17">
        <LI><span class="phrase">{{ mnemonic[16] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[17] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[18] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[19] }}</span></LI>
        </OL>
      </div>

      <div class="ol_container">
        <OL class="list" start="21">
        <LI><span class="phrase">{{ mnemonic[20] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[21] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[22] }}</span></LI>
        <LI><span class="phrase">{{ mnemonic[23] }}</span></LI>
        </OL>
      </div>
      </div>
      <div class="ol_parent">
        <div class="ol_container">
        <OL class="list" start="25">
        <LI><span class="phrase">{{ mnemonic[24] }}</span></LI>
        </OL>
      </div>
      </div>


      <!-- need random path and password field generated like mnemonic -->

      
      <div class="ol_parent" style="margin-top: -10px; margin-left: -70px;">
          <div class="ol_container" style="display: inline-block;">
            <OL class="list" style="display: inline;">
              <LI v-if="isProduction">
              <label>Password:</label><Input v-model="password" class="phrase" style="width: 250px;" />
              </LI>
              
            </OL>
          </div>
        </div>
      </div>
    </ScreenContent>
    <Footer>
      <BackLink/>
      <div v-if="!loading">
        <Checkbox
          v-if="generated"
          class="seed-phrase-checkbox"
          v-model="seedPhraseSaved"
          :label="lang.have_saved"
        />
        <ButtonPrimary
          :disabled="generated && !seedPhraseSaved"
          :click="generatePressed"
        >
          {{ generated ? lang.wrote_it_down : lang.generate }}
      </ButtonPrimary>
      </div>
      <Loader v-if="loading" class="spiner"/>
    </Footer>
  </Screen>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import WalletMoneroHandlerModule from "@/store/modules/WalletMoneroHandlerModule";
import Screen from "@/components/Layout/Screen.vue";
import ScreenContent from "@/components/Layout/ScreenContent.vue";

import CreateStep1Monero from "@/components/CreateStep1Monero.vue";
import CreateStep2Monero from "@/components/CreateStep2Monero.vue";


import Footer from "@/components/Layout/Footer.vue";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import BackLink from "@/components/Buttons/BackLink.vue";
import Checkbox from "@/components/Form/Checkbox.vue";
import OL from "@/components/List/OL.vue";
import LI from "@/components/List/LI.vue";
import Loader from "@/components/Loader.vue";



@Component({
  components: {
    Screen,
    ScreenContent,
    CreateStep1Monero,
    CreateStep2Monero,
    Footer,
    ButtonPrimary,
    BackLink,
    Checkbox,
    OL,
    LI,
    Loader,
  }
})
export default class CreateMonero extends Vue {
  private generated = false
  private loading = false
  private mnemonic: string[] = []
  private password: string = ''
  private path: string = ''
  private lang = WalletMoneroHandlerModule.currentLanguage
  private refreshButtonClass = ''
  private isProduction = process.env.NODE_ENV !== 'development'

  data() {
    return {
      seedPhraseSaved: false,
    }
  }

  rotateIcon() {
    this.refreshButtonClass = 'rotate';
    setTimeout(() => {
      this.refreshButtonClass = '';
    }, 500);
  }
  
  backPressed(): void {
    this.$router.back();
  }
  
  async generatePressed() {
    this.loading = true;

    if (this.mnemonic.length > 0) {
      //generate in database wallet
      this.loading = false;
      this.$router.push('/')
    } else {

      (async () => {
        
        await WalletMoneroHandlerModule.createWallet('');

        const tempMnemonic:string = WalletMoneroHandlerModule.mnemonic;
        this.password = WalletMoneroHandlerModule.password;
        this.path = WalletMoneroHandlerModule.path;

        this.mnemonic = tempMnemonic.split(' ');

        this.generated = true;
        this.loading = false;
        
      })();
    }
  }
}
</script>
<style scoped>
  .list {
    margin-top: 32px;
  }
  .refresh-button {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 8px auto 0;
    font-size: 14px;
    line-height: 20px;
    color: #7E858F;
    border: none;
    background: none;
    outline: none;
  }
  .refresh-button.rotate img {
    animation: rotate .5s linear;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .refresh-button__icon {
    margin-right: 10px;
    transition: all 0.3s linear;
  }
  .seed-phrase-checkbox {
    margin-right: 24px;
  }
  .spiner {
    width: 40px;
    height: 40px;
  }
</style>
