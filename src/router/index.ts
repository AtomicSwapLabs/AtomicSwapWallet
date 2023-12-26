import Vue from 'vue'
/* eslint-disable no-unused-vars */

import VueRouter, { RouteConfig } from 'vue-router'

/* eslint-enable no-unused-vars */
import RootView from '../views/RootView.vue'
import OnboardView from '../views/OnboardView.vue'
import CreateBitcoin from '../components/CreateBitcoin.vue'
import CreateMonero from '../components/CreateMonero.vue'
import Restore from '../components/Restore.vue'
import RestoreMonero from '../components/RestoreMonero.vue'
import WalletHomeView from '../views/WalletHomeView.vue'
import ChooseLanguageView from '../views/ChooseLanguageView.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: RootView
  },
  {
    path: '/onboard',
    name: 'Onboard',
    component: OnboardView
  },
  {
    path: '/createBitcoin',
    name: 'Create Bitcoin',
    component: CreateBitcoin,
  },
  {
    path: '/createMonero',
    name: 'Create Monero',
    component: CreateMonero,
  },
  {
    path: '/restore',
    name: 'Restore',
    component: Restore
  },
  {
    path: '/restoreMonero',
    name: 'Restore Monero',
    component: RestoreMonero
  },
  {
    path: '/wallet_home',
    name: 'home',
    component: WalletHomeView
  },
  {
    path: '/language',
    component: ChooseLanguageView
  }
]

const router = new VueRouter({
  routes
})

export default router
