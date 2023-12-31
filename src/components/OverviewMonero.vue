<template>
    <DashboardContent>
      <div id="overview">
        <DashboardTitle>{{ language.overview }}</DashboardTitle>
        <div class="overview__header-row">
          <p class="transactions-amount">{{ this.transactions.length }} {{ this.transactions.length == 1 ? language.transaction : language.transactions }}</p>
          <div class="pagination">
            <button
              class="pagination__button pagination__prev"
              v-on:click="previousPage()"
              :disabled="this.currentPage == 1"
            ></button>
            <p class="pagination__text">{{ language.page + ' ' + this.currentPage + ' ' + language.of + ' ' + (this.totalPages > 0 ? this.totalPages : '1') }}</p>
            <button
              class="pagination__button pagination__next"
              v-on:click="nextPage()"
              :disabled="this.currentPage == this.totalPages || this.totalPages == 0"
            ></button>
          </div>
        </div>
        <OverviewTableMonero :language="language" v-if="transactionsMonero.length > 0" :transactionsMonero="displayedTransactions"></OverviewTableMonero>
        <OverviewEmpty :language="language" v-if="transactionsMonero.length == 0" @show-receive-xmr="showReceive()"></OverviewEmpty>
      </div>
    </DashboardContent>
  </template>
  
  <script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";
  import BigNumber from "bignumber.js";
  import DashboardTitle from "@/components/Text/DashboardTitle.vue";
  import OverviewEmpty from "@/components/OverviewEmpty.vue";
  import OverviewTableMonero from "@/components/OverviewTableMonero.vue";
  import DashboardContent from "@/components/Layout/DashboardContent.vue";
  
  /* eslint-disable no-unused-vars */
  
  import Language from "@/lang/langInterface";
  
  /* eslint-enable no-unused-vars */
  
  @Component({ components: { OverviewEmpty, DashboardTitle, OverviewTableMonero, DashboardContent }})
  export default class Overview extends Vue {
    @Prop() transactionsMonero!: [{}];
    @Prop() language!: Language;
    private zero = new BigNumber(0);
    private currentPage = 1;
    private itemsPerPage = 7;


    
  
    previousPage() {
      this.currentPage = this.currentPage - 1;
    }
  
    nextPage() {
      this.currentPage = this.currentPage + 1;
    }
  
    get totalPages() {
      console.log('transactionsMonero', this.transactionsMonero)
      return Math.ceil(this.transactionsMonero.length / this.itemsPerPage)
    }
  
    get displayedTransactions() {
  
      let newDisplayed: any[] = new Array();
      for (
        var i = (this.currentPage - 1) * this.itemsPerPage;
        i < (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage;
        i++
      ) {
        if (i < this.transactionsMonero.length) {
          newDisplayed.push(this.transactionsMonero[i]);
        }
      }
  
      return newDisplayed
    }
  
    getStatusLight(tx: any) {
      if(tx.isIncoming) {
        return "celery"
      } else {
        return "fuchsia"
      }
    }
  
    getText(tx: any) {
      if (tx.unconfirmed) {
        if (tx.blockHeight > 0) {
          return this.language.processing;
        } else {
          return this.language.unconfirmed;
        }
      } else {
        return this.language.complete;
      }
    }
  
    showReceive() {
      this.$emit('show-receive-monero')
    }
  
  }
  </script>
  
  <style scoped>
    .overview__header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .transactions-amount {
      font-size: 14px;
      line-height: 20px;
      color: #ACB2BB;
    }
    .pagination {
      display: flex;
      align-items: center;
    }
    .pagination__text {
      margin: 10px;
      font-size: 14px;
      line-height: 20px;
      color: #ACB2BB;
    }
    .pagination__button {
      border: none;
      width: 32px;
      height: 32px;
      -webkit-app-region: no-drag;
    }
    .pagination__button:focus,
    .pagination__button:hover {
      background-color: #434854;
      border-radius: 2px;
      outline: none;
    }
    .pagination__prev {
      background: url('../assets/images/angle-right.svg') center no-repeat;
      transform: rotate(180deg);
    }
    .pagination__next {
      background: url('../assets/images/angle-right.svg') center no-repeat;
    }
    .pagination__prev:disabled {
      opacity: 0.2;
    }
      .pagination__next:disabled {
      opacity: 0.2;
    }
  </style>
  