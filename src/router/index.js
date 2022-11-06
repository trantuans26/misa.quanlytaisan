// 1. Define route components.
// These can be imported from other files
import { createRouter, createWebHistory } from 'vue-router'

import AssetList from '@/views/asset/AssetList.vue';

import ReportList from '@/views/report/ReportList.vue';

import SearchList from '@/views/search/SearchList.vue';

import TotalList from '@/views/total/TotalList.vue';

import InfrastructureList from '@/views/infrastructure/InfrastructureList.vue';

import ToolList from '@/views/tool/ToolList.vue';

import CategoryList from '@/views/category/CategoryList.vue';



// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/asset', name: 'AssetList', component: AssetList },
  { path: '/report', name: 'ReportList', component: ReportList},
  { path: '/search', name: 'SearchList', component: SearchList},
  { path: '/total', name: 'TotalList', component: TotalList},
  { path: '/infrastructure', name: 'InfrastructureList', component: InfrastructureList},
  { path: '/tool', name: 'ToolList', component: ToolList},
  { path: '/category', name: 'CategoryList', component: CategoryList},
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes // short for `routes: routes`
})

export default router