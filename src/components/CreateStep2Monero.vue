<template>
  <div>
    <Step :currentStep="2" :maxSteps="2" />
    <PageTitle>{{ lang.seed_phrase_monero }}</PageTitle>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import WalletMoneroHandlerModule from "@/store/modules/WalletMoneroHandlerModule";
import PageTitle from "@/components/Text/PageTitle.vue";
import PageSubtitle from "@/components/Text/PageSubtitle.vue";
import Step from "@/components/Text/Step.vue";

@Component({
  components: {
    PageTitle,
    Step,
    PageSubtitle
  }
})
export default class CreateStep2Monero extends Vue {
  private lang = WalletMoneroHandlerModule.currentLanguage
}
</script>

<style scoped>
  .warning {
    max-width: 544px;
    margin: 16px auto 0;
    padding: 8px 24px 8px 56px;
    font-size: 14px;
    line-height: 20px;
    color: #FFFFFF;
    border: 1px solid #8F3F07;
    border-radius: 2px;
    background: rgba(212, 116, 18, 0.2) url('./../assets/images/warning.svg') no-repeat;
    background-position: 24px 8px;
  }
  .warning span {
    font-weight: bold;
    color: #F7931A;
  }
</style>
