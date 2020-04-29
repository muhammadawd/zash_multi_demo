<template>
    <div>

        <header class="header-global">
            <base-nav class="navbar-main direction" transparent type="" effect="light" expand>
                <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                    <!--<img src="/img/brand/white.png" alt="logo">-->
                    <img :src="$helper.getLogo()">
                </router-link>

                <div class="row" slot="content-header" slot-scope="{closeMenu}">
                    <div class="col-6 collapse-brand text-left" style="text-align:right;">
                        <a href="">
                            <!--<img src="/img/brand/logo.png">-->
                            <img :src="$helper.getLogo()">
                        </a>
                    </div>
                    <div class="col-6 collapse-close text-right">
                        <close-button @click="closeMenu"></close-button>
                    </div>
                </div>


                <ul class="list-unstyled navbar-nav navbar-nav-hover text-left align-items-lg-left">
                    <!--                <li>-->
                    <!--                    <a slot="title" href="#" class="nav-link">-->
                    <!--                        <span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('most_sales')}}</span>-->
                    <!--                    </a>-->
                    <!--                </li>-->
                    <!--                    <li>-->
                    <!--                        <router-link :to="{name:'home'}" class="nav-link">-->
                    <!--                            <span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('home')}}</span>-->
                    <!--                        </router-link>-->
                    <!--                    </li>-->
                    <!--                    <li>-->
                    <!--                        <router-link :to="{name:'offers'}" class="nav-link">-->
                    <!--                            <span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('offers')}}</span>-->
                    <!--                        </router-link>-->
                    <!--                    </li>-->
                    <!--                    <li>-->
                    <!--                        <router-link :to="{name:'all_stores'}" class="nav-link">-->
                    <!--                            <span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('all_store')}}</span>-->
                    <!--                        </router-link>-->
                    <!--                    </li>-->
                </ul>
                <ul class="list-unstyled navbar-nav text-left align-items-lg-center ml-lg-auto direction">

                    <li class="nav-item">
                        <router-link :to="{name:'search_result'}" class="nav-link">
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('search')}}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'about_us'}" class="nav-link">
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('about_us')}}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'register_vendor'}" class="nav-link">
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('contact_us')}}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name:'location'}" class="nav-link">
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('location')}}</span>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="auth">
                        <router-link :to="{name:'account'}" class="nav-link">
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('my_account')}}</span>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="auth">
                        <a href="" @click.prevent="Logout" class="nav-link">
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('logout')}}</span>
                        </a>
                    </li>
                    <li class="nav-item" v-if="!auth">
                        <router-link :to="{name:'login'}" class="nav-link nav-link-icon">
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('login')}}</span>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="!auth">
                        <router-link :to="{name:'register'}" class="nav-link nav-link-icon">
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('register')}}</span>
                        </router-link>
                    </li>
                    <!--                    <li class="nav-item">-->
                    <!--                        <router-link :to="{name:'register_vendor'}" class="nav-link nav-link-icon">-->
                    <!--                            <span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('register_vendor')}}</span>-->
                    <!--                        </router-link>-->
                    <!--                    </li>-->

                    <button id="_header_cart" class="d-none" @click="modals.modal2 = true"></button>
                    <li class="nav-item d-md-block">
<!--                        <router-link :to="{name:'cart'}"-->
<!--                                     class="nav-link nav-link-icon position-relative">-->
<!--                            <div class="cart_bullet">{{cart.length}}</div>-->
<!--                            <i class="ni ni-cart ni-2x"></i>-->
<!--                        </router-link>-->
                        <a href="#" @click.prevent="modals.modal2 = true"
                           class="nav-link nav-link-icon position-relative">
                            <div class="cart_bullet">{{cart.length}}</div>
                            <i class="ni ni-cart ni-2x"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-link-icon" style="cursor: pointer" @click="changeLang">
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.current === 'ar' ? 'انجليزي' : 'AR'}}</span>
                            <!--                        <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('change_lang')}}</span>-->
                        </a>
                    </li>
                </ul>
            </base-nav>
        </header>


        <modal :show.sync="modals.modal2"
               gradient="danger"
               modal-classes="modal-danger modal-dialog-centered modal-lg">
            <h6 slot="header" class="modal-title font-weight-bold text-left display-4" id="modal-title-notification">
                {{this.$ml.get('your_cart')}}</h6>

            <div class="py-3 text-center">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <cart/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--            <template slot="footer">-->
            <!--                <base-button type="white">{{this.$ml.get('add')}}</base-button>-->
            <!--                <base-button type="link"-->
            <!--                             text-color="white"-->
            <!--                             @click="modals.modal2 = false">-->
            <!--                    {{this.$ml.get('close')}}-->
            <!--                </base-button>-->
            <!--            </template>-->
        </modal>
    </div>
</template>
<script>
    import BaseNav from "@/components/BaseNav";
    import Modal from "@/components/Modal.vue";
    import BaseDropdown from "@/components/BaseDropdown";
    import CloseButton from "@/components/CloseButton";
    import cart from '../views/pages_components/cart'
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                auth_user: null,
                modals: {
                    modal1: false,
                    modal2: false,
                    modal3: false
                },
            }
        },
        mounted() {
            this.auth_user = localStorage.getItem('auth')
            this.checkStorage()
        },
        methods: {
            ...mapActions([
                'addToCart',
                'deleteToCart',
                'checkStorage',
                'saveToCart',
                'addAuthUser',
                'deleteAuthUser',
            ]),
            async Logout() {

                localStorage.removeItem('current_address_data');
                // localStorage.removeItem('current_payment');
                // localStorage.removeItem('current_coupon');
                // localStorage.removeItem('current_address');
                await this.$store.dispatch('deleteAuthUser')
                await this.$store.dispatch('clearCart')
                await this.$store.dispatch('clearOffers')
                await localStorage.removeItem('auth');
                setTimeout(() => {

                    location.reload()
                }, 300)
            },
            changeLang() {
                if (this.$ml.current == 'ar') {
                    this.$ml.change('en')
                    localStorage.setItem('current_currency', 'KWD')
                } else {
                    this.$ml.change('ar');
                    localStorage.setItem('current_currency', 'د.ك')
                }
                location.reload()
            }
        },
        computed: {
            ...mapState([
                'auth',
                'cart'
            ]),
        },
        components: {
            BaseNav,
            Modal,
            cart,
            CloseButton,
            BaseDropdown
        }
    };
</script>
<style>
    .cart_bullet {
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: #2dce89bf;
        z-index: 9;
        color: #000;
        border-radius: 50%;
        font-weight: bold;
        line-height: 1.7;
        font-size: 12px;
        text-align: center;
        right: 0px;
        top: 10px;
    }
</style>
