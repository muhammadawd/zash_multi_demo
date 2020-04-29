<template>
    <div>

        <header class="header-global">
            <base-nav class="navbar-main navbar-fixed-top  p-1 bg-white"
                      :class="[isMobile() ? 'direction-inverse':'direction',getExpiration() ? 'pt-4' : '']"
                      type="" effect="light" expand>
                <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                    <!--<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ43hxtf1M24Ye1TDjcA6oQ_R8fzPb4jOCwb-HnvezqGx70pbTG&usqp=CAU"-->
                    <!--width="170" height="40" alt="logo">-->
                    <img :src="$helper.getLogo()" width="170" height="40"/>
                </router-link>

                <div slot="content-alert">
                    <div v-if="getExpiration()"
                         style="height: 25px;background: #F44336;position: absolute;top: 0;width: 100%;left: 0;color: #fff;text-align: center;">
                        {{getExpiration()}}
                    </div>
                </div>
                <div style="position: absolute;right: 60px;top: 0;" slot="content-cart">
                    <div class="d-md-none" style="margin-top: 20px;">
                        <a href="#" @click.prevent="modals.modal2 = true"
                           class="nav-link nav-link-icon position-relative">
                            <div class="cart_bullet" v-if="cart.length">{{cart.length}}</div>
                            <i class="ni ni-basket ni-lg" style="color: #7f7f7f"
                               :style="$ml.current == 'ar' ? {top: '0'}: {top: '5px'}"></i>
                        </a>
                    </div>
                </div>
                <div style="position: absolute;right: 100px;" :style="$ml.current == 'ar' ? {top: '5px'}: {top: '10px'}"
                     slot="content-lang">
                    <div class="d-md-none" style="margin-top: 12px;" dir="rtl">
                        <a class="nav-link nav-link-icon" style="cursor: pointer" @click="changeLang">
                            |
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">
                                {{this.$ml.current === 'ar' ? 'انجليزي' : 'AR'}}
                            </span>
                        </a>
                    </div>
                </div>

                <div class="w-100  d-md-none" slot="content-search">
                    <div class="input-group input-group-sm search-input direction-inverse">
                        <span class="input-group-addon">
                            <i class="fa fa-search"></i>
                        </span>
                        <input type="text" class="form-control text-left direction pr-2 pl-2"
                               @input="getApiSuggest()"
                               @blur="hideSearch()"
                               @keyup.enter="goToResult()"
                               v-model="search"
                               :placeholder="$ml.get('site_search')">
                        <div class="autocompletes">
                            <div id="myInputautocomplete-list" class="autocomplete-items">
                                <div v-for="(items , key) in suggestList" :key="key"
                                     class="text-left">
                                    <div class="category text-left font-weight-bold">
                                        <i class="fa fa-gift fa-lg"></i>
                                        {{$ml.get(key)}}
                                    </div>
                                    <div class="item text-left"
                                         v-for="(item , key) in items"
                                         :key="key" @click="setQuerySearch(item)">
                                        <strong>{{item}}</strong>
                                    </div>
                                    <div class="item text-center"
                                         v-if="items.length == 0">
                                        <strong>{{$ml.get('no_data')}}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" slot="content-header" slot-scope="{closeMenu}">
                    <div class="col-6 collapse-brand text-left" style="text-align:right;">
                        <a href="">
                            <img :src="$helper.getLogo()">
                        </a>
                    </div>
                    <div class="col-6 collapse-close text-right">
                        <close-button @click="closeMenu"></close-button>
                    </div>
                </div>
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
                    <li class="nav-item" v-if="auth_user">
                        <router-link :to="{name:'account'}" class="nav-link">
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('my_account')}}</span>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="auth && checkPointModule()">
                        <router-link :to="{name:'my_points'}" class="nav-link get-toggle-button">
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('my_points')}}</span>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="auth_user">
                        <a href="" @click.prevent="Logout" class="nav-link">
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('logout')}}</span>
                        </a>
                    </li>
                    <li class="nav-item" v-if="!auth_user">
                        <router-link :to="{name:'login'}" class="nav-link nav-link-icon btn_new">
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('login')}}</span>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="!auth_user">
                        <router-link :to="{name:'register'}" class="nav-link nav-link-icon ">
                            <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('register')}}</span>
                        </router-link>
                    </li>
                    <button id="_header_cart" class="d-none" @click="modals.modal2 = true"></button>
                    <li class="nav-item position-relative d-none d-md-block" v-if="$route.name != 'checkout'">
                        <!--                        <router-link :to="{name:'cart'}"-->
                        <!--                                     class="nav-link nav-link-icon position-relative">-->
                        <!--                            <div class="cart_bullet">{{cart.length}}</div>-->
                        <!--                            <i class="ni ni-cart ni-2x"></i>-->
                        <!--                        </router-link>-->
                        <a href="#" @click.prevent="modals.modal2 = true"
                           class="nav-link nav-link-icon position-relative">
                            <div class="cart_bullet" v-if="cart.length">{{cart.length}}</div>
                            <i class="ni ni-basket ni-lg"></i>
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
               gradient="white"
               modal-classes="modal-danger modal-dialog-centered modal-lg">
            <h6 slot="header" class="modal-title font-weight-bold text-left display-4 text-black direction"
                id="modal-title-notification">
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
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'
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
                suggestList: [],
                search: '',
                modals: {
                    modal1: false,
                    modal2: false,
                    modal3: false
                },
            }
        },
        mounted() {
            this.auth_user = localStorage.getItem('auth');
            this.checkStorage();
            this.startHeaderBG();
        },
        methods: {
            checkPointModule() {
                return JSON.parse(localStorage.getItem('pointModule'))
            },
            setQuerySearch(setQuerySearch) {
                let vm = this;
                vm.search = setQuerySearch;
                vm.goToResult()
                // vm.suggestList = [];
            },
            hideSearch() {
                let vm = this;
                setTimeout(() => {
                    vm.suggestList = [];
                }, 100)
            },
            getLogo() {
                return this.$helper.getLogo()
            },
            getExpiration() {
                return this.$helper.getExpiration();
            },
            isMobile() {
                if (screen.width <= 760) {
                    return true;
                } else {
                    return false;
                }
            },
            ...mapActions([
                'addToCart',
                'deleteToCart',
                'checkStorage',
                'saveToCart',
                'addAuthUser',
                'deleteAuthUser',
            ]),
            goToResult() {
                let search = this.search
                if (search) {
                    search = search.toLowerCase();
                    let route = this.$router.resolve({name: 'search_result', query: {q: search}});
                    let url = 'http://' + location.host + process.env.VUE_APP_PUBLIC_PATH + '' + route.href;
                    console.log(url)
                    location.href = url
                }
            },
            getApiSuggest() {
                let vm = this;
                this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.PRODUCT_AUTO_COMPLETE, {
                    params: {
                        category: true,
                        lang: vm.lang,
                        query: vm.search,
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.suggestList = data;
                }).catch((error) => {
                    vm.suggestList = []
                })
            },
            startHeaderBG() {
                $(document).ready(function () {
                    let scroll_start = 0;
                    let offset = 600;

                    $(document).scroll(function () {
                        scroll_start = $(this).scrollTop();
                        // console.log(scroll_start)
                        if (scroll_start > offset) {
                            $(".navbar-main").css('background-color', '#2e2e2e');
                        } else {
                            $('.navbar-main').css('background-color', 'transparent');
                        }
                    });

                });
            },
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

    .autocomplete-items {
        position: absolute;
        border: 1px solid #d4d4d4;
        border-bottom: none;
        border-top: none;
        z-index: 99999;
        /*position the autocomplete items to be the same width as the container:*/
        top: 100%;
        left: 0;
        right: 0;
        max-height: 500px;
        overflow: hidden;
        overflow-y: scroll;
    }

    .autocomplete-items .category {
        color: #2dce89;
        padding: 10px;
        background-color: #fff;
    }

    .autocomplete-items .item {
        padding: 10px;
        cursor: pointer;
        background-color: #fff;
        border-bottom: 1px solid #d4d4d4;
    }

    .autocomplete-items div:hover {
        /*when hovering an item:*/
        background-color: #e9e9e9;
    }

    .autocomplete-active {
        /*when navigating through the items using the arrow keys:*/
        background-color: DodgerBlue !important;
        color: #ffffff;
    }
</style>
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
        right: 0;
        top: 3px;
    }

    @media only screen and (max-width: 600px) {
        .cart_bullet {
            right: 3px;
            top: -5px;
        }
    }

    .search-input input {
        border: 1px solid #333 !important;
        border-left: 0 !important;
        border-top-right-radius: 20px !important;
        border-bottom-right-radius: 20px !important;
        padding-top: 6px !important;
    }

    .search-input .input-group-addon i {
        position: relative;
        top: 3px;
    }

    .search-input .input-group-addon {
        border: 1px solid #333 !important;
        border-right: 0 !important;
        border-top-left-radius: 20px !important;
        border-bottom-left-radius: 20px !important;
        padding: 2px 10px;
        position: relative;
    }
</style>
