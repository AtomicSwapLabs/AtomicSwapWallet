<template>
    <DashboardContent>
      <div class="receive-view">
        <DashboardTitle>{{ language.receive_only_monero }}</DashboardTitle>
        <DashboardSubtitle>
          {{ language.receive_only_monero }} (XMR) {{ language.address_below }}
        </DashboardSubtitle>
        <Label>
          {{ language.wallet_address }}
          <button
            v-on:click="refreshWallet()"
            :class="['refresh-button', false ? 'spin' : '']"
          >
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.67007 6.70601C3.86284 5.98616 4.21408 5.31851 4.69809 4.75188C5.18211 4.18526 5.78666 3.73398 6.46753 3.43108C7.1484 3.12817 7.88837 2.98129 8.63331 3.00117C9.37826 3.02106 10.1093 3.20721 10.7731 3.54601C10.8316 3.57582 10.8955 3.5938 10.961 3.59893C11.0265 3.60405 11.0924 3.59623 11.1549 3.57589C11.2174 3.55555 11.2753 3.52311 11.3253 3.4804C11.3752 3.4377 11.4163 3.38558 11.4461 3.32701C11.4759 3.26844 11.4939 3.20457 11.499 3.13905C11.5041 3.07353 11.4963 3.00764 11.476 2.94515C11.4556 2.88266 11.4232 2.82478 11.3805 2.77483C11.3378 2.72487 11.2856 2.68382 11.2271 2.65401C9.964 2.00951 8.51348 1.83318 7.13279 2.1563C5.75209 2.47942 4.53045 3.2811 3.68455 4.41916C2.83864 5.55721 2.42313 6.95809 2.51173 8.37332C2.60032 9.78855 3.18729 11.1267 4.16852 12.1503C5.14975 13.174 6.46183 13.8171 7.87205 13.9655C9.28226 14.1139 10.6995 13.7581 11.8723 12.9611C13.0451 12.1641 13.8978 10.9775 14.2791 9.61169C14.6603 8.2459 14.5455 6.78922 13.9551 5.50001C13.8998 5.37933 13.7988 5.28557 13.6744 5.23934C13.5499 5.19311 13.4122 5.19821 13.2916 5.25351C13.1709 5.3088 13.0771 5.40977 13.0309 5.5342C12.9847 5.65863 12.9898 5.79633 13.0451 5.91701C13.3794 6.64646 13.5332 7.44566 13.4936 8.24709C13.454 9.04852 13.222 9.82865 12.8174 10.5216C12.4127 11.2145 11.8473 11.7998 11.1688 12.2282C10.4902 12.6565 9.71859 12.9152 8.91901 12.9825C8.11942 13.0498 7.31539 12.9237 6.57482 12.6148C5.83425 12.3059 5.17891 11.8233 4.66415 11.2077C4.14939 10.5922 3.79033 9.86181 3.61731 9.07828C3.44429 8.29474 3.46239 7.48107 3.67007 6.70601Z" fill="#7E858F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.64689 0.145996C8.74066 0.052261 8.86781 -0.000396729 9.00039 -0.000396729C9.13298 -0.000396729 9.26013 0.052261 9.35389 0.145996L11.8539 2.646C11.9005 2.69244 11.9374 2.74762 11.9626 2.80836C11.9878 2.86911 12.0008 2.93423 12.0008 3C12.0008 3.06576 11.9878 3.13088 11.9626 3.19163C11.9374 3.25238 11.9005 3.30755 11.8539 3.354L9.35389 5.854C9.30741 5.90042 9.25223 5.93723 9.19152 5.96233C9.1308 5.98743 9.06574 6.00032 9.00004 6.00027C8.93434 6.00023 8.8693 5.98724 8.80862 5.96206C8.74794 5.93687 8.69282 5.89998 8.64639 5.8535C8.55264 5.75961 8.50002 5.63233 8.50012 5.49964C8.50016 5.43395 8.51315 5.3689 8.53833 5.30822C8.56352 5.24754 8.60041 5.19242 8.64689 5.146L10.7929 3L8.64689 0.853996C8.60033 0.807551 8.56339 0.752375 8.53818 0.69163C8.51297 0.630885 8.5 0.565764 8.5 0.499996C8.5 0.434229 8.51297 0.369108 8.53818 0.308363C8.56339 0.247618 8.60033 0.192442 8.64689 0.145996Z" fill="#7E858F"/>
              </g>
              <defs>
              <clipPath id="clip0">
              <rect width="16" height="16" fill="white" transform="translate(0.5)"/>
              </clipPath>
              </defs>
            </svg>

          </button>
          <div class="input-wrapper">
            <Input id="contatenatedAddr" type="text" name="field" :value="this.concatenadedAddress" disabled />
            <button class="copy-button" v-on:click="copyAddress()">
              <img src="../assets/images/copy.svg" alt="Copy">
            </button>
          </div>
        </Label>
        <div class="qr-code-wrapper">
          <qrcode-vue :value="address" size="138" level="H"  foreground="#1F232E"></qrcode-vue>
        </div>
      </div>
    </DashboardContent>
  </template>
  
  <script lang="ts">
  
  import { Vue, Component, Prop } from 'vue-property-decorator'

  import DashboardContent from "@/components/Layout/DashboardContent.vue";
  import DashboardTitle from "@/components/Text/DashboardTitle.vue";
  import DashboardSubtitle from "@/components/Text/DashboardSubtitle.vue";
  import Input from "@/components/Form/Input.vue";
  import Label from "@/components/Form/Label.vue";
  import QrcodeVue from 'qrcode.vue'

  import { moneroWalletDB } from '@/wallet/moneroWallet';
  
  /* eslint-disable no-unused-vars */
  
    import Language from '@/lang/langInterface'
    import WalletMoneroHandlerModule from '@/store/modules/WalletMoneroHandlerModule';
  
  /* eslint-enable no-unused-vars */
  
  @Component({components: { QrcodeVue, DashboardTitle, DashboardSubtitle, Input, Label, DashboardContent }})
  export default class OverView extends Vue {
  
    @Prop() language! : Language

    address: string = '';
    concatenadedAddress: string = '';


    created() {  // Using the created lifecycle hook to fetch the address
      this.fetchAddress();
     }

     concateAddress() {
      if(this.address.length > 0) {
        this.concatenadedAddress = this.address.split('monero:')[1].substring(0, 19) + '...' + this.address.split('monero:')[1].substring(85, 95);
      }else
      {
        this.concatenadedAddress = 'Loading...';
      }
      
     }

    async refreshWallet(){
      const newAddress = await WalletMoneroHandlerModule.shuffleAddresses();
      this.address = 'monero:' + newAddress;
      this.concateAddress();
      
    }



  async fetchAddress() {
    try {
      const wallet = await moneroWalletDB.getWallet();
      this.address = 'monero:' + wallet.address;
      this.concateAddress();
    } catch (error) {
      console.error(`Failed to fetch address: ${error}`);
    }
  }
  
    copyAddress() {
      navigator.clipboard.writeText(this.address.split('monero:')[1])
    }
  }
  
  </script>
  
  <style scoped>
    .receive-view {
      max-width: 620px;
    }
    .input-wrapper {
      position: relative;
    }
    .copy-button {
      position: absolute;
      top: 50%;
      right: 16px;
      padding: 0;
      transform: translateY(-50%);
      width: 24px;
      display: flex;
      height: 24px;
      align-items: center;
      justify-content: center;
      border: none;
      background: none;
    }
    .copy-button:hover,
    .copy-button:focus {
      background: #434854;
      border-radius: 2px;
      outline: none;
    }
    .qr-code-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 40px;
    }
    .qr-code-wrapper > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 176px;
      height: 176px;
      background: linear-gradient(180deg, #1F232E 0%, #13161F 100%);
      border: 1px solid #2B2F3A;
      box-sizing: border-box;
      box-shadow: 0px 12px 28px rgba(0, 0, 0, 0.3);
      border-radius: 2px;
    }
    .refresh-button {
      /* display: flex; */
      align-items: right;
      justify-content: right;
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      background: none;
      -webkit-app-region: no-drag;
    }
    .refresh-button:focus {
      outline: none;
    }
    .refresh-button.spin {
      animation:spin 1s linear infinite;
      background: none;
    }
    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  </style>
  