<template>
    <div id="app">
        <Loader :ref="'loader'"/>
        <!--<Slideout menu="#menu" panel="#panel" :toggleSelectors="['.get-toggle-button']" :side="'right'"-->
        <!--@on-open="open">-->

        <!--<main id="panel">-->
        <!--<header>-->
        <!--<div>-->
        <!--<router-view name="header"></router-view>-->

        <!--<fade-transition origin="center" mode="out-in" :duration="250">-->
        <!--<router-view/>-->
        <!--</fade-transition>-->

        <!--<router-view name="footer"></router-view>-->
        <!--</div>-->
        <!--</header>-->
        <!--</main>-->
        <!--<nav id="menu">-->
        <!--<div class="mt-5">-->
        <!--<div class="row">-->
        <!--<div class="col-md-12">-->
        <!--<ul class="list-unstyled">-->
        <!--<li class="nav-item p-2">-->
        <!--<a href="/zashtest" class="nav-link">-->
        <!--<span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('home')}}</span>-->
        <!--</a>-->
        <!--</li>-->
        <!--<li class="nav-item p-2">-->
        <!--<router-link :to="{name:'search_result'}" class="nav-link get-toggle-button">-->
        <!--<span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('search')}}</span>-->
        <!--</router-link>-->
        <!--</li>-->
        <!--<li class="nav-item p-2">-->
        <!--<router-link :to="{name:'about_us'}" class="nav-link get-toggle-button">-->
        <!--<span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('about_us')}}</span>-->
        <!--</router-link>-->
        <!--</li>-->
        <!--<li class="nav-item p-2">-->
        <!--<router-link :to="{name:'register_vendor'}" class="nav-link get-toggle-button">-->
        <!--<span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('contact_us')}}</span>-->
        <!--</router-link>-->
        <!--</li>-->
        <!--<li class="nav-item p-2">-->
        <!--<router-link :to="{name:'location'}" class="nav-link get-toggle-button">-->
        <!--<span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('location')}}</span>-->
        <!--</router-link>-->
        <!--</li>-->
        <!--<li class="nav-item p-2" v-if="auth">-->
        <!--<router-link :to="{name:'account'}" class="nav-link get-toggle-button">-->
        <!--<span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('my_account')}}</span>-->
        <!--</router-link>-->
        <!--</li>-->
        <!--<li class="nav-item p-2 get-toggle-button" v-if="auth">-->
        <!--<a href="" @click.prevent="Logout" class="nav-link">-->
        <!--<span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('logout')}}</span>-->
        <!--</a>-->
        <!--</li>-->
        <!--<li class="nav-item p-2" v-if="!auth">-->
        <!--<router-link :to="{name:'login'}" class="nav-link nav-link-icon get-toggle-button">-->
        <!--<span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('login')}}</span>-->
        <!--</router-link>-->
        <!--</li>-->
        <!--<li class="nav-item p-2" v-if="!auth">-->
        <!--<router-link :to="{name:'register'}"-->
        <!--class="nav-link nav-link-icon get-toggle-button">-->
        <!--<span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('register')}}</span>-->
        <!--</router-link>-->
        <!--</li>-->
        <!--</ul>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</nav>-->
        <!--</Slideout>-->

        <router-view name="header"></router-view>

        <fade-transition origin="center" mode="out-in" :duration="250">
            <router-view/>
        </fade-transition>

        <router-view name="footer"></router-view>
    </div>
</template>
<script>
    import Vue from 'vue';

    import {mapState, mapActions} from 'vuex'
    // import Slideout from 'vue-slideout'

    import Loader from './views/pages_components/Loader'
    import {FadeTransition} from "vue2-transitions";

    import GAuth from 'vue-google-oauth2'

    const gauthOption = {
        clientId: '584340505354-e0c4qiq843b6jc8sfnhij63tnqof80pb.apps.googleusercontent.com',
    };
    Vue.use(GAuth, gauthOption);

    export default {
        data() {
            return {
                show: true,
            }
        },
        created() {
            if (this.$ml.current == 'ar') {
                // require("@/assets/bootstrap.css")
                import("@/assets/bootstrap.css")
            }
            if (this.isMobile()) {
                import("@/assets/homemobile.css")
            } else {
                import("@/assets/home.css")
            }
        },
        mounted() {
            let vm = this;
            setTimeout(() => {
                vm.$refs.loader.show_loader = false;
            }, 1000)
        },
        computed: {
            ...mapState([
                'auth',
                'cart'
            ]),
        },
        methods: {
            isMobile() {
                if (screen.width <= 760) {
                    return true;
                } else {
                    return false;
                }
            },
            open: function () {
                console.log('slideoutOpen')
            }
        },
        components: {
            Loader,
            // Slideout,
            FadeTransition
        }
    };
</script>
<style>
    .slideout-menu {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 256px;
        height: 100vh;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        z-index: 0;
        display: none;
        background-color: #1D1F20;
        color: white;
    }

    .slideout-menu-left {
        left: 0;
    }

    .slideout-menu-right {
        right: 0;
    }

    .slideout-panel {
        background-color: #fff;
        position: relative;
        z-index: 1;
        will-change: transform;
        min-height: 100vh;
    }

    .slideout-open,
    .slideout-open body,
    .slideout-open .slideout-panel {
        overflow: hidden;
    }

    .slideout-open .slideout-menu {
        display: block;
    }

    #panel {

    }

    #menu {

    }
</style>
