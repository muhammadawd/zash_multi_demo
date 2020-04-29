<template>
    <div>
        <div class="row ">
            <div class="col-md-12 text-center" v-if="categories.length == 0">
                <h1>{{loadingText}}</h1>
            </div>
            <!--<div class="col-md-12">-->
            <!--<tabs v-if="categories.length">-->
            <!--<tab v-for="(cat , key) in categories" v-if="cat.products.length > 0" :title="cat.translated.title"-->
            <!--:key="key">-->
            <!--<div class="row">-->
            <!--<div class="col-lg-3 col-md-4 col-12" v-for="(product,key) in cat.products" :key="key">-->
            <!--<oneProduct v-bind:addToCart="addToCart"-->
            <!--v-bind:product="product"></oneProduct>-->
            <!--</div>-->
            <!--</div>-->
            <!--</tab>-->
            <!--</tabs>-->
            <!--</div>-->
        </div>
        <div class="row">
            <div class="col-md-12 mb-4" v-if="categories.length">
                <div v-for="(cat , key) in categories" v-if="cat.products.length > 0"
                     :key="key">
                    <div class="card text-left" :class="key != 0 ? 'mt-3' : ''">
                        <h4 class="card-body mt-3 p-2 font-weight-bold">
                            <i class="fa fa-gift text-success"></i>
                            {{cat.translated.title}}
                        </h4>
                    </div>

                    <swiper ref="mySwiper" :options="swiperOptions">
                        <swiper-slide v-for="(product,key) in cat.products" :key="key">
                            <oneProduct v-bind:addToCart="addToCart"
                                        v-bind:product="product"></oneProduct>
                        </swiper-slide>

                    </swiper>


                    <template v-if="cat.category_ad.length == 2">
                        <div class="card mt-2 mb-2">
                            <div class="card-body p-1">
                                <div class="w-100">
                                    <div class="w-50 d-inline-block p-1 text-ellipsis"
                                         v-for="(ads , index) in cat.category_ad"
                                         :key="index">
                                        <a :href="ads.url">
                                            <img :src="ads.wide_image_path" width="100%" alt=""/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="cat.category_ad.length == 1">
                        <div class="card mt-2 mb-2">
                            <div class="card-body p-1">
                                <div class="row w-100">
                                    <div class="col-3"></div>
                                    <div class="col-6" v-for="(ads , index) in cat.category_ad" :key="index">
                                        <a :href="ads.url" class="mt-3">
                                            <img :src="ads.wide_image_path" width="100%" alt=""/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>

                </div>
            </div>
        </div>
        <!--<div class="col-lg-3 col-md-4 col-12" v-for="(product,key) in products" :key="key">-->
        <!--<oneProduct v-bind:addToCart="addToCart"-->
        <!--v-bind:product="product"></oneProduct>-->
        <!--</div>-->
    </div>
</template>

<script>
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import oneProduct from '../pages_components/oneProduct'
    import Vue from 'vue';
    import Message from 'vue-m-message'
    import {mapState, mapActions} from 'vuex'
    import {Tabs, Tab} from 'vue-slim-tabs'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'vue-slim-tabs/themes/default.css'

    Vue.use(Message);

    export default {
        name: "home_products",
        components: {
            oneProduct, Tabs, Tab,
            swiper,
            swiperSlide,
        },
        data() {
            return {
                loadingText: this.$ml.get('loading'),
                products: [],
                categories: [],
                lang: this.$ml.current,
                swiperOptions: {// If we need pagination
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    spaceBetween: 10,
                    slidesPerView: 5,
                    autoplay: true,
                    touchRatio: 0.2,
                    breakpoints: {
                        1181: {
                            slidesPerView: 4
                        },
                        1180: {
                            slidesPerView: 3
                        },
                        1020: {
                            slidesPerView: 2
                        },
                        700: {
                            slidesPerView: 1
                        }
                    }
                },
            }
        },
        methods: {
            getAllProductsWithCategory() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_STORE_PRODUCTS + '/1', {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.loadingText = vm.$ml.get('no_data');
                    if (status) {
                        vm.categories = data.categories
                        return;
                    }
                    vm.categories = [];
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {
                    vm.loadingText = vm.$ml.get('no_data');
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    vm.categories = [];
                })
            },
            getAllProducts() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.SITE_PRODUCTS, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.products = data.products
                    }
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;

                })
            },
            addToCart(product) {
                let vm = this;
                let pov = product.product_option_values[0];
                let normal_product = vm.prepareProductToCart(product, pov);
                vm.bindToCart(normal_product);
            },
            prepareProductToCart(master, pov) {
                return {
                    product_id: master.id,
                    branch_id: master.branch_id,
                    store_id: pov.store_detail ? pov.store_detail.store_id : null,
                    product_translation: master.translated,
                    min_amount_needed: pov.min_amount_needed ? pov.min_amount_needed : 1,
                    pov: pov
                };
            },
            bindToCart(product) {
                let vm = this;
                let found = false;
                let product_id = product.pov.id;
                vm.cart.filter((value, index, arr) => {
                    if (product_id == value.pov.id) {
                        found = true;
                    }
                });
                if (found) {

                    Message({
                        title: vm.$ml.get('error'),
                        message: vm.$ml.get('already_added'),
                        className: 'bg-gray text-white',
                        zIndex: 9999999,
                        iconImg: require('@/assets/error.png'),
                        position: 'bottom-center',
                        // type: 'error',
                        showClose: true
                    })
                    return;
                }
                Message({
                    title: vm.$ml.get('success'),
                    message: vm.$ml.get('added_to_cart'),
                    className: 'bg-success text-white',
                    zIndex: 9999999,
                    iconImg: require('@/assets/success.png'),
                    position: 'bottom-center',
                    // type: 'error',
                    showClose: true
                });
                vm.$store.dispatch('addToCart', product);
            },
        },
        mounted() {
            this.getAllProductsWithCategory()
            // this.getAllProducts()
        },
        computed: {
            ...mapState([
                'auth',
                'cart'
            ]),
        },
    }
</script>

<style>
    .vue-tab {
        white-space: nowrap;
        padding: 10px 20px;
    }

    .vue-tablist {
        overflow-x: scroll;
        overflow-y: hidden;
    }

    .vue-tab[aria-selected="true"] {
        background: #2dce89bf;
        color: #fff;
        /*padding: 10px 5px 5px 5px;*/
    }

    /*.tabs {*/
    /*display: -webkit-box;*/
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    /*}*/

    /*.tabs label {*/
    /*-webkit-box-ordinal-group: 2;*/
    /*order: 1;*/
    /*display: block;*/
    /*padding: 1rem 2rem;*/
    /*margin-right: 0.2rem;*/
    /*cursor: pointer;*/
    /*background: #ببب;*/
    /*font-weight: bold;*/
    /*-webkit-transition: background ease 0.2s;*/
    /*transition: background ease 0.2s;*/
    /*}*/

    /*.tabs .tab {*/
    /*-webkit-box-ordinal-group: 100;*/
    /*order: 99;*/
    /*-webkit-box-flex: 1;*/
    /*flex-grow: 1;*/
    /*width: 100%;*/
    /*display: none;*/
    /*padding: 1rem;*/
    /*background: #fff;*/
    /*}*/

    /*.tabs input[type="radio"] {*/
    /*display: none;*/
    /*}*/

    /*.tabs input[type="radio"]:checked + label {*/
    /*background: #2dce89bf;*/
    /*color: #fff;*/
    /*}*/

    /*.tabs input[type="radio"]:checked + label + .tab {*/
    /*display: block;*/
    /*}*/

    /*@media (max-width: 45em) {*/
    /*.tabs .tab,*/
    /*.tabs label {*/
    /*-webkit-box-ordinal-group: initial;*/
    /*order: initial;*/
    /*}*/

    /*.tabs label {*/
    /*width: 100%;*/
    /*margin-right: 0;*/
    /*margin-top: 0.2rem;*/
    /*}*/
    /*}*/

    /*.tabinator {*/
    /*background: #fff;*/
    /*!*padding: 40px;*!*/
    /*overflow: hidden;*/
    /*}*/

    /*.tabinator h2 {*/
    /*text-align: center;*/
    /*margin-bottom: 20px;*/
    /*}*/

    /*.tabinator input {*/
    /*display: none;*/
    /*}*/

    /*.tabinator label {*/
    /*box-sizing: border-box;*/
    /*display: inline-block;*/
    /*padding: 15px 25px;*/
    /*color: #000;*/
    /*font-weight: bold;*/
    /*margin-bottom: -1px;*/
    /*margin-left: -1px;*/
    /*font-size: 17px;*/
    /*}*/

    /*.tabinator label:before {*/
    /*content: '';*/
    /*display: block;*/
    /*width: 100%;*/
    /*height: 15px;*/
    /*background-color: #fff;*/
    /*position: absolute;*/
    /*bottom: -11px;*/
    /*left: 0;*/
    /*z-index: 10;*/
    /*}*/

    /*.tabinator label:hover {*/
    /*color: #888;*/
    /*cursor: pointer;*/
    /*}*/

    /*.tabinator input:checked + label {*/
    /*position: relative;*/
    /*color: #fff;*/
    /*font-weight: bold;*/
    /*background: #2dce89bf;*/
    /*!*border: 1px solid #bbb;*!*/
    /*!*border-bottom: 1px solid #fff;*!*/
    /*border-radius: 0;*/
    /*}*/

    /*.tabinator input:checked + label:after {*/
    /*display: block;*/
    /*content: '';*/
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*!*box-shadow: 0 0 15px #939393;*!*/
    /*}*/

    /*#content1, #content2, #content3, #content4,*/
    /*#content5, #content6, #content7, #content8,*/
    /*#content9, #content10, #content11, #content12,*/
    /*#content13, #content14, #content15, #content16,*/
    /*#content17, #content18, #content19, #content20,*/
    /*#content21, #content22, #content23, #content24,*/
    /*#content25, #content26, #content27, #content28, #content29, #content30 {*/
    /*display: none;*/
    /*border-top: 2px solid #2dce89bf;*/
    /*padding: 15px;*/
    /*}*/

    /*#tab0:checked ~ #content0,*/
    /*#tab1:checked ~ #content1,*/
    /*#tab2:checked ~ #content2,*/
    /*#tab3:checked ~ #content3,*/
    /*#tab4:checked ~ #content4,*/
    /*#tab5:checked ~ #content5,*/
    /*#tab6:checked ~ #content6,*/
    /*#tab7:checked ~ #content7,*/
    /*#tab8:checked ~ #content8,*/
    /*#tab9:checked ~ #content9,*/
    /*#tab10:checked ~ #content10,*/
    /*#tab11:checked ~ #content11,*/
    /*#tab12:checked ~ #content12,*/
    /*#tab13:checked ~ #content13,*/
    /*#tab14:checked ~ #content14,*/
    /*#tab15:checked ~ #content15,*/
    /*#tab16:checked ~ #content16,*/
    /*#tab17:checked ~ #content17,*/
    /*#tab18:checked ~ #content18,*/
    /*#tab19:checked ~ #content19,*/
    /*#tab20:checked ~ #content20,*/
    /*#tab21:checked ~ #content21,*/
    /*#tab22:checked ~ #content22,*/
    /*#tab23:checked ~ #content23,*/
    /*#tab24:checked ~ #content24,*/
    /*#tab25:checked ~ #content25,*/
    /*#tab26:checked ~ #content26,*/
    /*#tab27:checked ~ #content27,*/
    /*#tab28:checked ~ #content28,*/
    /*#tab29:checked ~ #content29,*/
    /*#tab30:checked ~ #content30 {*/
    /*display: block;*/
    /*!*box-shadow: 0 0 15px #939393;*!*/
    /*}*/
</style>
