<template>
    <div>
        <div class="row mt-1">
            <div class="col-md-12 text-center" v-if="categories.length == 0">
                <h1>{{$ml.get('loading')}}</h1>
            </div>
            <div class="col-md-12" v-if="categories.length">
                <div class="mt-2" v-for="(cat , key) in categories" v-if="cat.products.length > 0">
                    <div class="card">
                        <div class="card-body p-2">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="text-header">
                                        <div class="float-right">
                                            <router-link
                                                    :to="{name:'search_result',query:{q:(cat.translated.title ? cat.translated.title.toLowerCase() : '')}}"
                                                    class="font-weight-bold text-success text-underline">
                                                {{$ml.get('all')}}
                                            </router-link>
                                        </div>
                                        <div class="float-left">
                                            <h4 class="font-weight-bold">
                                                {{cat.translated.title}}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">

                                    <swiper :class="cat.products.length > 2 ? 'swiper-600' : 'swiper-300'"
                                            :options="cat.products.length > 2 ? swiperOption : swiperOption600">
                                        <swiper-slide v-for="(product,key) in cat.products" :key="key">
                                            <oneProduct v-bind:addToCart="addToCart"
                                                        v-bind:product="product"></oneProduct>
                                        </swiper-slide>
                                        <div class="swiper-pagination" slot="pagination"></div>
                                    </swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                    <template v-if="cat.category_ad.length == 2">
                        <div class="row m-auto w-100">
                            <div class="w-50 p-1 text-ellipsis" v-for="(ads , index) in cat.category_ad" :key="index">
                                <a :href="ads.url">
                                    <img :src="ads.square_image_path" width="100%" alt=""/>
                                </a>
                            </div>
                        </div>
                    </template>
                    <template v-if="cat.category_ad.length == 1">
                        <div class="row m-auto w-100">
                            <div class="w-100" v-for="(ads , index) in cat.category_ad" :key="index">
                                <a :href="ads.url">
                                    <img :src="ads.wide_image_path" width="100%" alt=""/>
                                </a>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import oneProduct from '../pages_components/oneProduct'
    import Vue from 'vue';
    import Message from 'vue-m-message'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import {mapState, mapActions} from 'vuex'

    Vue.use(Message);

    export default {
        name: "home_products_swiper",
        components: {
            oneProduct, swiper, swiperSlide
        },
        data() {
            return {
                products: [],
                categories: [],
                lang: this.$ml.current,
                swiperOption: {
                    slidesPerView: 2,
                    slidesPerColumn: 2,
                    spaceBetween: 5,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                },
                swiperOption600: {
                    slidesPerView: 2,
                    slidesPerColumn: 1,
                    spaceBetween: 5,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                },
            }
        },
        methods: {
            getAllProductsWithCategory() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.FIND_STORE_PRODUCTS + '/1', {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.categories = data.categories
                        return;
                    }
                    vm.categories = [];
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    vm.categories = [];
                })
            },
            getAllProducts() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.SITE_PRODUCTS, {
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

    .swiper-600 {
        height: 530px;
        margin-left: auto;
        margin-right: auto;
    }

    .swiper-300 {
        height: 300px;
        margin-left: auto;
        margin-right: auto;
    }

    .swiper-300 .swiper-slide {
        height: 300px;
        margin-top: 0 !important;
    }

    .swiper-600 .swiper-slide {
        height: 200px;
        margin-top: 0 !important;
    }

    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: -8px;
    }

    .swiper-pagination-bullet-active {
        background-color: #2dce89;
    }
</style>
