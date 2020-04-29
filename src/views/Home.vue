<template>
    <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0" style="height: 150px">
            <div class="shape shape-style-1 shape-primary shape-skews alpha-4 d-none">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
        <section class=" section-skew" style="padding-bottom: 0">
            <div class="container-full ">
                <card class="card-profile border-0 landing_cover  position-relative"
                      no-body>
                    <!--:style="{background: 'url('+header_image+') center center no-repeat',backgroundSize:'contain'}">-->
                    <div class="overlay"></div>
                    <div class="px-4">

                    </div>
                </card>


                <div class="landing_cover2" v-if="isMobile()">

                    <home_header_swiper/>

                    <div class="container mb-5" style="z-index: 9;">
                        <home_categories/>
                        <home_products_swiper/>
                    </div>
                </div>

                <div class="landing_cover2" v-if="!isMobile()">

                    <!--<home_slider></home_slider>-->
                    <home_header></home_header>


                    <div class="container mb-5" style="z-index: 9;">
                        <div class="mt-0">
                            <div class="row">
                                <div class="col-md-12">
                                    <home_categories/>
                                    <br/>
                                </div>
                            </div>
                        </div>
                        <!--<div class="mt-4">-->
                        <!--<h1 class="text-center  font-weight-bold position-relative"-->
                        <!--style="line-height: 2;">-->
                        <!--<img src="@/assets/images/decore.png" width="180" alt=""-->
                        <!--style="top: 20px;position: relative;" class="m-auto">-->
                        <!--<div>-->
                        <!--{{$ml.get('top_products')}}-->
                        <!--</div>-->
                        <!--<img src="@/assets/images/decore.png"-->
                        <!--style="transform: rotateZ(180deg);bottom: 25px;position: relative;" width="180"-->
                        <!--alt="" class="m-auto">-->
                        <!--</h1>-->
                        <!--</div>-->
                        <!--<home_ads></home_ads>-->

                        <home_products></home_products>
                        <div class="row">

                            <div class="col-md-12 mb-4">
                                <div class="card">
                                    <div class="card-body p-1">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <ul class="list-unstyled list-inline direction text-center">
                                                    <li class="list-inline-item p-3">
                                                        <i class="fa fa-shopping-cart fa-3x main_color"></i>
                                                    </li>
                                                    <li class="list-inline-item">
                                                        <div class="data">
                                                            <b>{{$ml.get('header_1')}}</b>
                                                            <p>{{$ml.get('header_p_1')}}</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="col-md-4">
                                                <ul class="list-unstyled list-inline direction  text-center">
                                                    <li class="list-inline-item p-3">
                                                        <i class="fa fa-car fa-3x main_color"></i>
                                                    </li>
                                                    <li class="list-inline-item">
                                                        <div class="data">
                                                            <b>{{$ml.get('header_2')}}</b>
                                                            <p>{{$ml.get('header_p_2')}}</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="col-md-4">
                                                <ul class="list-unstyled list-inline direction text-center">
                                                    <li class="list-inline-item p-3">
                                                        <i class="fa fa-gift fa-3x main_color"></i>
                                                    </li>
                                                    <li class="list-inline-item">
                                                        <div class="data">
                                                            <b>{{$ml.get('header_3')}}</b>
                                                            <p>{{$ml.get('header_p_3')}}</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--<div class="mt-4  d-none" style="width: 100%;height:115px;background: #1e1e1e;">-->
                    <!--<h3 class="text-center text-white font-weight-bold"-->
                    <!--style="line-height: 2;font-family: 'Dancing Script', cursive;font-size: 60px;">-->
                    <!--{{$ml.get('ads')}}</h3>-->
                    <!--</div>-->

                    <!--<div class="container d-none">-->
                    <!--<div v-if="advertisements.length == 0">-->
                    <!--<h2 class="display-4 text-uppercase text-center mt-5">{{$ml.get('no_result')}}</h2>-->
                    <!--</div>-->
                    <!--<div class="card shadow ads_item" v-for="(advertisement,key) in advertisements" :key="key">-->
                    <!--<div class="card-body">-->
                    <!--<div class="row">-->
                    <!--<div class="col-md-12" dir="ltr" v-if="advertisement.files.length > 0">-->
                    <!--<carousel-3d :controls-visible="true" :autoplay="true">-->
                    <!--<slide v-for="(slide , index) in advertisement.files" :index="index"-->
                    <!--:key="index">-->
                    <!--&lt;!&ndash;                                                <img :src="file.path" width="360px" height="270px" class="img-fluid" alt="">&ndash;&gt;-->
                    <!--<template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">-->
                    <!--<img :data-index="index" style="height:270px!important;"-->
                    <!--:class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }"-->
                    <!--:src="slide.path">-->
                    <!--</template>-->
                    <!--</slide>-->
                    <!--</carousel-3d>-->
                    <!--</div>-->
                    <!--<div class="col-md-12 text-left">-->
                    <!--<h4 class="display-4 text-uppercase">{{advertisement.translated.title}}</h4>-->
                    <!--<p class="leads">{{advertisement.translated.description}}</p>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--                        <img class="sales_image" style="padding-top:100px " src="/img/theme/sales.jpg" alt="">-->
                </div>
            </div>
        </section>
    </div>


</template>
<script>
    import {ModelSelect} from 'vue-search-select'
    import Vue from 'vue';
    import {Carousel3d, Slide} from 'vue-carousel-3d';

    Vue.use(Carousel3d);
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'
    import home_ads from '../views/pages_components/home_ads'
    import home_products from '../views/pages_components/home_products'
    import home_products_swiper from '../views/pages_components/home_products_swiper'
    import home_header_swiper from '../views/pages_components/home_header_swiper'
    import home_categories from '../views/pages_components/home_categories'
    import home_header from '../views/pages_components/home_header'
    // import home_slider from '../views/pages_components/home_slider'

    export default {
        components: {
            ModelSelect,
            Carousel3d,
            Slide,
            home_header,
            home_ads,
            // home_slider,
            home_products_swiper,
            home_categories,
            home_header_swiper,
            home_products
        },
        data() {
            return {
                lang: this.$ml.current,
                area_options: [],
                header_image: '/img/theme/landing.jpg',
                advertisements: [],
                area: {
                    value: '',
                    text: ''
                },
                categories_options: [],
                category: {
                    value: '',
                    text: ''
                }
            }
        },
        mounted() {
            let vm = this;
            // vm.getAllAddresses();
            // vm.getAllCategories();
            // vm.getAllAds();
        },
        methods: {
            isMobile() {
                if (screen.width <= 760) {
                    return true;
                } else {
                    return false;
                }
            },
            getAllAds() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.HOME_ADS, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.advertisements = data.advertisements;
                        try {
                            vm.header_image = data.setting.image[0].file.path;
                        } catch (e) {
                            vm.header_image = '/img/theme/landing.jpg';
                        }
                    }
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;

                })
            },
            getAllAddresses() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.HOME_ADDRESSES, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.prepareAddresses(data.store_address)
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                })
            },
            getAllCategories() {
                let vm = this;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.HOME_CATEGORIES, {
                    params: {
                        lang: vm.lang,
                        main: 1
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.prepareCategories(data.categories)
                }).catch((error) => {

                })
            },
            prepareAddresses(addresses) {
                let vm = this;
                let arr = [];
                $.each(addresses, function (index, address) {
                    arr.push({
                        value: address.id,
                        text: address.translated.name
                    })
                });
                vm.area_options = arr;
                return arr;
            },
            prepareCategories(categories) {
                let vm = this;
                let arr = [];
                $.each(categories, function (index, category) {
                    arr.push({
                        value: category.id,
                        text: category.translated.title
                    })
                });
                vm.categories_options = arr;
                return arr;
            },
            reset() {
                this.area = {}
                this.gender = {}
            }
        }
    }
</script>

<style>
    .float_square {
        width: 25px;
        height: 25px;
        background: #d63d70;
        position: absolute;
        top: 10px;
        left: -10px;
    }

    .ui.fluid.dropdown {
        background-color: #000 !important;
        color: #fff !important;
        height: 40px !important;
    }

    .ui.fluid.dropdown input {
        color: #FFF !important;
    }

    .icon-float {
        position: absolute;
        top: 8px;
        left: 10px;
        z-index: 99;
    }

    .icon-float i {
        font-size: 25px;
    }

    .gender {
        padding: 0.87861429em 2.1em 0.67861429em 1.1em !important;
    }

    .ui.fluid.dropdown > .dropdown.icon {
        display: none !important;
    }

    .ui.search.dropdown > .text {
        color: #fff !important;
        font-weight: bold !important;
        top: 4px !important;
    }

    .search {
        color: #fff !important;
        font-weight: bold !important;
        padding: 0.87861429em 2.1em 0.67861429em 3.1em !important;
    }

    @media only screen and (min-width: 1920px) {

        .ui.search.dropdown .menu[data-v-3a0c7bea] {
            max-height: 16.371429rem !important;
        }
    }

    .landing_cover {
        background: center center no-repeat;
        /*background-image: url(/img/theme/landing.jpg);*/
        height: calc(100%);
        width: 100%;
        position: absolute;
        z-index: 9;
        background-size: cover;
    }

    .landing_cover2 {
        /*background: url(/img/theme/clothes_pattern.jpg) center center repeat;*/
        background: #eee;
        /*min-height: 600px;*/
        min-height: 500px;
        width: 100%;
        z-index: 9;
        background-size: contain;
        position: relative;
    }

    .sales_image {
        position: absolute;
        border-radius: 100px 0 0 0;
        margin: 200px auto;
        max-width: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .overlay {
        background: rgba(0, 0, 0, 0.4);
        z-index: 1;
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .mt-10 {
        margin-top: 100px;
    }

    .px-4 {
        z-index: 9;
    }

    .rad_card {
        background: #00000061 !important;
        border-radius: 15px !important;
    }

    .ui.search.selection.dropdown > input.search {

        color: #fff !important;
    }

</style>
