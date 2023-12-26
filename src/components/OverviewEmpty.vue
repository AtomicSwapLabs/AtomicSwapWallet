<template>
  <div class="overview-empty">
    <p class="overview-empty__text">
      {{ language.no_transactions }}. <br>
      {{ language.what_to_do }}
    </p>
    <div class="overview-empty__buttons">
      <ButtonPrimary :click="buyClickedBTC">{{ language.buy_bitcoin }}</ButtonPrimary>
      <ButtonPrimary :click="buyClickedXMR">{{ language.buy_monero }}</ButtonPrimary>
    </div>
    <div class="overview-empty__buttons">
      <ButtonPrimary :click="receiveClickedBTC">{{ language.receive }}</ButtonPrimary>
      <ButtonPrimary :click="receiveClickedXMR">{{ language.receive_xmr }}</ButtonPrimary>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";

  /* eslint-disable no-unused-vars */
  import Language from "@/lang/langInterface";
  /* eslint-enable no-unused-vars */
  
  @Component({ components: { ButtonPrimary }})
  export default class OverviewEmpty extends Vue {
    @Prop() language!: Language;

    receiveClickedBTC() {
      this.$emit('show-receive')
    }
    receiveClickedXMR() {
      this.$emit('show-receive-xmr')
    }

    buyClickedBTC() {
      window.ipcRenderer.send('openLink', 'https://bitcoin.org/en/buy')
    }

    buyClickedXMR() {
      window.ipcRenderer.send('openLink', 'https://getmonero.org/get-started/what-is-monero/')
    }
  }
</script>
<style scoped>
  .overview-empty {
    margin-top: 112px;
  }
  .overview-empty__text {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #7E858F;
  }
  .overview-empty__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
  }
  .overview-empty__buttons > * + * {
    margin-left: 16px;
  }
</style>
