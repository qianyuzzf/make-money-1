import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import Notfound from '@/views/Notfound.vue';
import LabelsEdit from '@/views/LabelsEdit.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/money'
  },
  {
    path: '/money',
    name: 'money',
    component: Money
  },
  {
    path: '/labels',
    name: 'labels',
    component: Labels
  },
  {
    path: '/labels/edit/:id',
    name: 'labelsEdit',
    component: LabelsEdit
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Statistics
  },
  {
    path: '/:pathMatch(.*)*',
    component: Notfound
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
