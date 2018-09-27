import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import PageHome from './components/PageHome';
import PagePromptTerm from './components/PagePromptTerm';
import PagePromptMeaning from './components/PagePromptMeaning';

export default new VueRouter({
  mode: 'history',
  fallback: true,
  routes: [
    { path: '/', component: PageHome },
    { path: '/terms', component: PagePromptTerm },
    { path: '/meanings', component: PagePromptMeaning },
  ],
});
