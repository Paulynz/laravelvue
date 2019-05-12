/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


 
window.Vue = require('vue');

import moment from 'moment'; // convert time//
import { Form, HasError, AlertError } from 'vform'
import Gate from "./Gate";
Vue.prototype.$gate = new Gate(window.user);
window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component('pagination', require('laravel-vue-pagination'));

import swal from 'sweetalert2'

window.swal = swal;

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
window.toast = toast;


import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
  })

let routes = [
    { path: '/dashboard', component:  require('./components/Dashboard.vue').default },
    { path: '/developer', component:  require('./components/Developer.vue').default },
    { path: '/profile', component:  require('./components/Profile.vue').default },
    { path: '/users', component:  require('./components/Users.vue').default },
    { path: '/superadmin', component:  require('./components/SuperAdmin.vue').default },
    { path: '*', component:  require('./components/NotFound.vue').default },

  ]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})


// // UPPERCASE FIRST LETTER OF TYPE 
// Vue.filter('upText',function(text){
//     return text.charAt(0).toUpperCase() + text.slice(1);


// });

Vue.filter('myDate',function(created_at){
    return moment(created_at).format('MMMM Do YYYY');
});

// CUSTOM EVENTS / SEND HTTP Request if event FIREEE
window.Fire = new Vue();

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));
//passport start
Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);
//passport end

Vue.component(
    'not-found',
    require('./components/NotFound.vue').default
);

Vue.component('example-component', require('./components/ExampleComponent.vue'));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    data:{
        search: ''
    },

    methods:{
        searchglobal: _.debounce(() =>{
            Fire.$emit('searching');
        },1000),
        

        printme() {
            window.print();
        }
    }
});