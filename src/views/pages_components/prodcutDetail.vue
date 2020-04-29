<template>
    <div class="p-2 row justify-content-betweens align-items-centers" v-if="product">
        <div class="col-md-2 col-12 d-none d-md-block">
            <!-- swiper2 Thumbs -->
            <!--style="height: 470px!important;"-->
            <!--d-none d-md-block-->
            <swiper :options="isMobile() ? swiperOptionThumbsMobile : swiperOptionThumbs"
                    :style="isMobile() ? {height: '80px!important'} : {height: '470px!important'}"
                    class="gallery-thumbs justify-content-between align-items-end" dir="ltr"
                    ref="swiperThumbs">
                <swiper-slide v-for="(image , key) in selected_images" :key="key" @slideChange="image_360 = false"
                              :style="{'backgroundImage':'url(' + image.path + ')' }"></swiper-slide>
            </swiper>
            <!--<div class="text-center d-md-block d-none mt-2 mb-2" v-show="!image_360">-->
            <!--<button class="btn bg-transparent" @click="image_360 = true">-->
            <!--<img src="/img/icons/common/pdp360-icon.png" v-if="!image_360" width="50px"-->
            <!--style="opacity: 0.7;margin: auto" alt="">-->
            <!--<img src="/img/icons/common/image-icon-15.jpg" v-if="image_360" width="50px"-->
            <!--style="opacity: 0.7;margin: auto" alt="">-->
            <!--</button>-->
            <!--</div>-->
        </div>
        <div class="col-md-6 col-12" :style="isMobile() ? {height: '420px'} : {height: '700px'}">
            <div class="text-center" v-show="image_360">
                <div class="image_360_preview justify-content-between align-items-center" v-if="images_360.length">
                    <!--                    <div class='photo_3d'></div>-->
                    <VueProductSpinner
                            :speed="1"
                            :mouseWheel="false"
                            :images="images_360">
                        Loading ...
                    </VueProductSpinner>
                </div>
                <div class="drag-cta" style="display: block;">Drag to 360°</div>
            </div>
            <!-- swiper1 -->
            <swiper v-show="!image_360" :options="swiperOptionTop"
                    class="gallery-top  justify-content-between align-items-center" @slideChange="image_360 = false"
                    ref="swiperTop">
                <swiper-slide v-for="(image , key) in selected_images" :key="key"
                              :style="isMobile() ? {'backgroundImage':'url(' + image.path + ')',backgroundSize:'contain' } : {'backgroundImage':'url(' + image.path + ')' ,backgroundSize:'contain'}"></swiper-slide>
            </swiper>
            <div class="swiper-pagination horizontal d-md-none" slot="pagination"
                 style="transform: rotateZ(-90deg);"></div>

        </div>

        <div class="col-md-4 text-left">
            <h4 class="font-weight-bold"> {{product.translated ? product.translated.title : ''}}</h4>
            <p class="small mb-0">
                <slot v-if="pov">
                    <div v-html="getRate(pov.rate)"></div>
                </slot>
                <slot v-if="!pov">
                    <div v-html="getRate(product.rate)"></div>
                </slot>
            </p>
            <p class="small "><b>{{$ml.get('price')}} </b>
                <slot v-if="pov">
                    <h4>
                        <span class="font-weight-bold ">
                        {{pov.price && parseFloat(pov.price).toFixed(3) != 0 ? (parseFloat(pov.price).toFixed(3) + ' ' +
                        getCurrency()) :
                        $ml.get('undefined_price')}}
                        </span>
                        <br>
                        <del class="text-danger float-left">
                            <!--<slot v-if="product.price_before_discount">-->
                            {{parseFloat(product.price_before_discount).toFixed(3)}}
                            <small>{{getCurrency()}}</small>
                            <!--</slot>-->
                        </del>
                    </h4>
                </slot>
                <slot v-if="!pov">
                    {{ $ml.get('undefined_price_p')}}
                    <!--                    {{pov.price && parseFloat(pov.price).toFixed(3) == 0 ? parseFloat(pov.price).toFixed(3) :-->
                    <!--                    $ml.get('undefined_price')}}-->
                    <!--                    <br>-->
                    <!--                    {{pov.price && parseFloat(pov.price).toFixed(3) == 0 ? parseFloat(pov.price).toFixed(3) :-->
                    <!--                    $ml.get('undefined_price_p')}}-->
                </slot>
            </p>
            <div class="form-group input-group input-group-alternative d-none">
                <div class="input-group-prepend p-2">
                    <button style="cursor: pointer;outline: 0"
                            :disabled="!pov"
                            @click="minusAmount()"
                            class="input-group-text p-2">
                        <i class="fa fa-minus text-primary"></i>
                    </button>
                </div>
                <input aria-describedby="addon-right addon-left"
                       @input="updateAmount($event)"
                       :disabled="!pov"
                       :value="pov ? pov.min_amount_needed : 1"
                       style="height: 48px;font-size: 35px;"
                       class="form-control text-center font-weight-bold p-2 pb-0 pt-3">
                <div class="input-group-append p-2">
                    <button style="cursor: pointer;outline: 0"
                            :disabled="!pov"
                            @click="plusAmount()"
                            class="input-group-text p-2">
                        <i class="fa fa-plus text-primary"></i>
                    </button>
                </div>
            </div>

            <!--                    :disabled="!pov || isOutOfStock">-->
            <button class="btn btn-block btn-warning btn-cart mt-5 mr-0 direction-inverse text-uppercase"
                    @click="AddToCart()">
                {{this.$ml.get('add_to_cart')}} <i
                    class="fa fa-cart-plus fa-lg"></i>
            </button>
            <button class="btn btn-success text-white  btn-block btn-list direction-inverse text-uppercase"
                    @click="shareWhatsapp()">
                {{$ml.get('share_whatsapp')}}
                <i class="fa fa-whatsapp fa-lg"></i></button>
            <!--            <button class="btn btn-block btn-list text-uppercase">Add to White list</button>-->
        </div>

        <div class="col-md-12">
            <tabs
                    :tabs="tabs"
                    :currentTab="currentTab"
                    :wrapper-class="'default-tabs'"
                    :tab-class="'default-tabs__item'"
                    :tab-active-class="'default-tabs__item_active'"
                    :line-class="'default-tabs__active-line'"
                    @onClick="handleClick"
            />
            <div class="content">
                <div v-if="currentTab === 'tab1'">
                    <p class="small text-center" v-if="product.translated">
                        {{product.translated.description}}
                    </p>
                </div>
                <div v-if="currentTab === 'tab2'">
                    <div class="row">
                        <div class="col-md-3"></div>
                        <div class="col-md-6">
                            <div class="row">
                                <div v-for="(option,key) in options" :key="key" class="col-md-6 text-center">
                                    <b>{{option.translated.title}} : </b>
                                    <span v-for="(option_value,key) in option.option_values" :key="key">
                                <span class="radio-button_inner">
                                    <small>
                                        {{option_value.option_value_translation.title}}
                                        {{option_value.option_value__unit_translation.title}}
                                    </small>
                                    <span>
                                    </span>
                                </span>
                            </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <hr>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapState, mapActions} from 'vuex'
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import BCarousel from "bootstrap-vue/es/components/carousel/carousel";
    import BCarouselSlide from "bootstrap-vue/es/components/carousel/carousel-slide";
    import StarRating from 'vue-star-rating'
    import Message from 'vue-m-message'
    import Tabs from 'vue-tabs-with-active-line';
    import {Pano} from 'vuejs-vr'// require styles
    import 'swiper/css/swiper.css'
    import VueProductSpinner from 'vue-product-spinner'

    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    Vue.use(Message);


    export default {
        name: "prodcutDetail",
        data() {
            return {
                tabs: [
                    {title: this.$ml.get('description'), value: 'tab1'},
                    // {title: this.$ml.get('more_details'), value: 'tab2'}
                ],
                currentTab: 'tab1',
                product: true,
                swiperOptionTop: {
                    direction: 'vertical',
                    spaceBetween: 10,
                    slidesPerView: 1,
                    centeredSlides: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        progressbarOpposite: true
                    },
                    // breakpoints: {
                    //     1024: {
                    //         slidesPerView: 1,
                    //         spaceBetween: 40
                    //     },
                    //     768: {
                    //         slidesPerView: 1,
                    //         spaceBetween: 30
                    //     },
                    //     640: {
                    //         slidesPerView: 1,
                    //         spaceBetween: 20
                    //     },
                    //     320: {
                    //         slidesPerView: 1,
                    //         spaceBetween: 10
                    //     }
                    // }
                },
                swiperOptionThumbs: {
                    direction: 'vertical',
                    spaceBetween: 10,
                    centeredSlides: true,
                    slidesPerColumn: 0,
                    slidesPerView: 'auto',
                    touchRatio: 0.2,
                    slideToClickedSlide: true
                },
                swiperOptionThumbsMobile: {
                    direction: 'horizontal',
                    spaceBetween: 10,
                    centeredSlides: true,
                    slidesPerColumn: 0,
                    slidesPerView: 'auto',
                    touchRatio: 0.2,
                    slideToClickedSlide: true
                },
                images: [
                    'https://images.www.fendi.com/images/h7c/h35/8909556121630/8BN2903ZNF0KUR_01_large',
                    'https://images.www.fendi.com/images/hd0/h92/8909503725598/8BN2903ZNF0KUR_02_large',
                    'https://images.www.fendi.com/images/h7c/h35/8909556121630/8BN2903ZNF0KUR_01_large',
                    'https://images.www.fendi.com/images/hd0/h92/8909503725598/8BN2903ZNF0KUR_02_large',
                    'https://images.www.fendi.com/images/h7c/h35/8909556121630/8BN2903ZNF0KUR_01_large',
                ],
                image_360: false,
                images_360: [],
                isProduct: null,
                rating: 0,
                isOutOfStock: false,
                pov: null,
                options: [],
                real_products: [],
                selected_images: [],
                selected_options: [],
                lang: this.$ml.current,
            }
        },
        mounted() {
            let vm = this;
            let id = this.$route.params.id;
            let branch_id = this.$route.params.branch_id;
            setTimeout(() => {
                this.$nextTick(() => {
                    const swiperTop = vm.$refs.swiperTop.swiper
                    const swiperThumbs = vm.$refs.swiperThumbs.swiper
                    swiperTop.controller.control = swiperThumbs
                    swiperThumbs.controller.control = swiperTop

                    swiperTop.slideTo(2, 1000, false)

                })
            }, 1500);

            vm.getProductDetails(id, branch_id);
            // vm.getRotateImage('https://www.jqueryscript.net/demo/Minimal-3D-Image-Rotator-Viewer-Plugin-With-jQuery-rotate3D/img/', 22, '.jpg')
        },
        computed: {
            ...mapState([
                'cart',
                'auth',
            ])
        },
        methods: {
            getCurrency() {
                return this.$store.getters.getCurrency
            },
            // getRotateImage(path, count, ext) {
            //
            //     $('.photo_3d').rotate3d({
            //         'source': path,
            //         'ext': ext,
            //         'count': count,
            //         'speed': 10,
            //     });
            // },
            shareWhatsapp() {
                let current = window.location.href;
                window.location.href = `https://api.whatsapp.com/send?text=${current}`;
            },
            handleClick(newTab) {
                this.currentTab = newTab;
            },
            ...mapActions([
                'addToCart',
                'deleteToCart',
                'checkStorage',
                'saveToCart'
            ]),
            AddToCart() {
                let vm = this;
                vm.pov = vm.product.product_option_values[0];
                let prepared_data = {
                    product_id: vm.product.id,
                    branch_id: vm.product.branch_id,
                    store_id: vm.pov.store_detail ? vm.pov.store_detail.store_id : null,
                    product_translation: vm.product.translated,
                    min_amount_needed: vm.pov.min_amount_needed ? vm.pov.min_amount_needed : 1,
                    pov: vm.pov
                };
                vm.bindToCart(prepared_data)
            },
            isMobile() {
                if (screen.width <= 760) {
                    return true;
                } else {
                    return false;
                }
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
                    // iconImg: './img/icons/common/success.png',
                    iconImg: require('@/assets/success.png'),
                    position: 'bottom-center',
                    // type: 'error',
                    showClose: true
                });
                vm.$store.dispatch('addToCart', product);
            },
            minusAmount() {
                let vm = this;
                let element = vm.pov;
                if (vm.pov.min_amount_needed == 1) return
                vm.pov.min_amount_needed--;
                let av_quantity = vm.checkValidQuantity(element);
                if (!av_quantity.status) {
                    vm.errorMessage(av_quantity.available);
                    element.min_amount_needed = av_quantity.available;
                }
            },
            plusAmount() {
                let vm = this;
                vm.pov.min_amount_needed++;
                let element = vm.pov;
                let av_quantity = vm.checkValidQuantity(element);
                if (!av_quantity.status) {
                    vm.errorMessage(av_quantity.available);
                    element.min_amount_needed = av_quantity.available;
                }
            },
            updateAmount($event) {
                let vm = this;
                let element = vm.pov;
                vm.pov.min_amount_needed = $event.target.value;
                vm.$root.$children[0].$refs.loader.show_loader = true;

                let av_quantity = vm.checkValidQuantity(element);
                if (!av_quantity.status) {
                    vm.errorMessage(av_quantity.available);
                    element.min_amount_needed = av_quantity.available;
                }

                setTimeout(() => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }, 1000)
            },
            checkValidQuantity(pov) {
                if (pov.store_detail) {
                    let reserved = pov.store_detail.reserved;
                    let quantity = pov.store_detail.quantity;
                    let available = quantity - reserved;

                    if (available >= pov.min_amount_needed) {
                        return {
                            status: true,
                            available: available
                        }
                    }
                    return {
                        status: false,
                        available: available
                    }
                }
                return {
                    status: false,
                    available: 0
                }

            },
            errorMessage(amount = 0) {
                let vm = this;
                Message({
                    title: vm.$ml.get('error'),
                    message: vm.$ml.get('no_sufficient_amount') + ' ' + amount,
                    className: 'bg-warning text-white',
                    zIndex: 9999999,
                    iconImg: require('@/assets/error.png'),
                    position: 'bottom-center',
                    // type: 'error',
                    showClose: true
                });
            },
            getRate(val) {
                val = parseFloat(val);
                if (val == 5) {
                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                            </ul>`;
                } else if (val == 1) {
                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                } else if (val == 2) {
                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                } else if (val == 3) {
                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                } else if (val == 4) {
                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                } else if (val == 5) {
                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                } else if (val > 0 && val <= 2.5) {
                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-half-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                } else if (val > 2.5 && val <= 4.5) {

                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-half-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                } else {

                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                }
            },
            resetOptions() {
                let vm = this;
                $('.radio-button_input').prop("checked", false);
                vm.checked = [];
                vm.isProduct = null
                vm.pov = null
                $('.radio-button').css({opacity: 1});
            },
            changeSelectedOptions() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let checked = [];
                $.each($('.radio-button_input:checked'), function (index, input) {
                    checked.push(parseInt(input.value))
                });

                // $('.radio-button').hide();
                $('.radio-button').css({opacity: 0.5});
                // let arr1 = [1, 4];
                // let arr2 = [1, 2 , 3];
                //
                // let isFounded = arr1.some(ai => arr2.includes(ai));
                // console.log(vm.arrayContainsAnotherArray(checked, arr2))
                // console.log(JSON.stringify(checked))
                $.each(vm.real_products, function (index, product) {
                    if (product != undefined) {
                        if (vm.arrayContainsAnotherArray(checked, product)) {
                            $.each(product, function (index, last_to_show) {
                                // $(`.my_option_${last_to_show}`).show();
                                $(`.my_option_${last_to_show}`).css({opacity: 1});
                            })
                        }
                    }
                });
                // $.each(checked, function (index, item) {
                //     $.each(vm.real_products, function (index, product) {
                //         if (product != undefined) {
                //             if (product.includes(item)) {
                //                 $.each(product, function (index, last_to_show) {
                //                     $(`.my_option_${last_to_show}`).css({opacity: 1});
                //                 })
                //             }
                //         }
                //     })
                // });

                vm.selected_options = checked;
                vm.getProduct();
                setTimeout(() => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }, 100)
            },
            arrayContainsAnotherArray(needle, haystack) {
                for (var i = 0; i < needle.length; i++) {
                    if (haystack.indexOf(needle[i]) === -1)
                        return false;
                }
                return true;
            },
            arr_diff(a1, a2) {

                var a = [], diff = [];

                for (var i = 0; i < a1.length; i++) {
                    a[a1[i]] = true;
                }

                for (var i = 0; i < a2.length; i++) {
                    if (a[a2[i]]) {
                        delete a[a2[i]];
                    } else {
                        a[a2[i]] = true;
                    }
                }

                for (var k in a) {
                    diff.push(k);
                }

                return diff;
            },
            getProduct() {
                let vm = this;
                try {
                    vm.isProduct = null;
                    vm.pov = null;
                    vm.isOutOfStock = false;
                    $.each(vm.real_products, function (index, arr1) {
                        let arr2 = JSON.parse(JSON.stringify(vm.selected_options));
                        if (arr1 != undefined) {
                            arr1 = arr1.sort();
                            arr2 = arr2.sort();
                        }
                        if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
                            // console.log('They are equal!');
                            // console.log('POVID is : ' + index);
                            vm.isProduct = index;
                            return;
                        }
                    });
                    if (vm.isProduct) {
                        vm.getPOV(vm.isProduct)
                    } else {
                        vm.isProduct = null;
                        vm.pov = null;
                    }
                } catch (e) {
                    // console.log(e)
                }
            },
            getPOV(id) {
                let vm = this;
                $.each(vm.product.product_option_values, function (index, pov) {
                    if (pov.id == id) {
                        vm.pov = pov;
                        let preimages = [];
                        $.each(pov.files, function (index, file) {
                            preimages.push({path: file.path + '/' + file.name})
                        });
                        vm.selected_images = preimages;
                        // vm.selected_images = pov.files;
                        if (pov.store_detail.quantity == 0) {
                            vm.isOutOfStock = true
                        } else {
                            vm.isOutOfStock = false
                        }
                    }
                });
            },
            getProductDetails(id, branch_id) {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                // FIND_PRODUCT
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_PRODUCT + `/${id}/${branch_id}`, {
                    params: {
                        lang: vm.lang,
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.product = data.product;
                        vm.pov = data.product.product_option_values[0];

                        // vm.selected_images = vm.pov.files;

                        let preimages = [];
                        $.each(vm.pov.files, function (index, file) {
                            preimages.push({path: file.path})
                        });
                        vm.selected_images = preimages;

                        vm.selected_images.push({
                            path: data.product.main_image,
                            type: 'image'
                        });

                        vm.images_360 = JSON.parse(JSON.stringify(vm.pov.image_collection));
                        if (vm.images_360.length > 0) vm.image_360 = true
                        console.log('360 images', vm.images_360.length, JSON.parse(JSON.stringify(vm.pov.image_collection)))
                        // vm.selected_images = [{
                        //     path: data.product.main_image
                        // }];
                        vm.options = data.product.options;
                        console.log(data.product)
                        vm.prepareOptions();
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        console.log(vm.pov)
                    }
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                })
            },
            prepareOptions() {
                let vm = this;
                let pov = vm.product.product_option_values;
                let options = JSON.parse(JSON.stringify(vm.options));
                let option_values = [];

                // prepare model
                $.each(pov, function (index, _pov) {
                    vm.real_products[_pov.id] = [];
                    $.each(_pov.product_option_value_details, function (index, _povd) {
                        vm.real_products[_pov.id].push(_povd.option_value.id)
                        option_values.push(vm.appendOptionValues(_povd.option_value))
                    })
                });


                // append option values to it's option
                $.each(options, function (index, option) {
                    option['option_values'] = [];
                    $.each(option_values, function (index, option_value) {
                        if (option_value.option_id == option.id) option.option_values.push(option_value)
                        // console.log(option_value)
                    });
                });

                // filter duplicates
                let _option_values = [];
                $.each(options, function (index, option) {
                    var filtered_options = option.option_values.filter(function (entry) {
                        if (_option_values[entry.option_value_id]) {
                            return false;
                        }
                        _option_values[entry.option_value_id] = true;
                        return true;
                    });
                    option.option_values = filtered_options;
                });

                vm.options = options;
            },
            appendOptionValues(option_value) {
                return {
                    option_id: option_value.option_id,
                    option_value_id: option_value.id,
                    option_value_translation: option_value.translated,
                    option_value__unit_translation: option_value.unit ? option_value.unit.translated : {title: null}
                    // option_value__unit_translation: ''
                };
            }
        },
        components: {
            swiper,
            swiperSlide,
            VueProductSpinner,
            BCarousel,
            BCarouselSlide,
            Tabs,
            Pano,
            StarRating
        }
    }
</script>
<style scoped>
    .btn-cart {
        border-radius: 0;
        /*background: #f44336 !important;*/
        /*border-color: #f44336 !important;*/
        /*color: #eee;*/
        font-size: 15px;
        font-weight: bold !important;
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .btn-list {
        border-radius: 0;
        color: #333;
        font-size: 15px;
        font-weight: bold !important;
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .drag-cta {
        margin-top: -10px;
        text-transform: uppercase;
        font-size: 12px;
        text-align: center;
        display: none;
    }

    .drag-cta:before {
        content: "";
        display: block;
        width: 240px;
        height: 35px;
        border-radius: 100%;
        border-bottom: 1px dotted #212121;
        margin: 0 auto 10px;
    }

    .image_360_preview {
        min-height: 300px;
        width: 100%;
        overflow: scroll;
        zoom: 80%;
    }

    .image_360_preview img {
        width: 100%;
    }
</style>
<style lang="scss">
    .swiper-container {
        background-color: #fff;
    }

    .swiper-slide {
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;

    }

    .gallery-top {
        height: 80% !important;
        width: 100%;

    }

    .gallery-thumbs {
        height: 100% !important;
        width: 100% !important;
        box-sizing: border-box;
        padding: 10px 0;
    }

    .gallery-thumbs .swiper-slide {
        width: 150px;
        height: 150px;
        opacity: 0.4;
    }

    @media only screen and (max-width: 600px) {
        .gallery-thumbs .swiper-slide {
            width: 50px;
            height: 50px;
        }
    }

    .gallery-thumbs .swiper-slide-active {
        opacity: 1;
    }
</style>
<style lang="scss">
    .default-tabs {
        position: relative;
        margin: 0 auto;
        text-align: center;

        &__item {
            display: inline-block;
            margin: 0 5px;
            padding: 10px;
            padding-bottom: 8px;
            font-size: 16px;
            letter-spacing: 0.8px;
            color: gray;
            text-decoration: none;
            border: none;
            background-color: transparent;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: all 0.25s;
            font-weight: bold;
            text-transform: uppercase;

            &_active {
                color: black;
            }

            &:hover {
                border-bottom: 2px solid gray;
                color: black;
            }

            &:focus {
                outline: none;
                border-bottom: 2px solid gray;
                color: black;
            }

            &:first-child {
                margin-left: 0;
            }

            &:last-child {
                margin-right: 0;
            }
        }

        &__active-line {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background-color: #2dce89bf;
            transition: transform 0.4s ease, width 0.4s ease;
        }
    }

    .vue-product-spinner-wrapper img {
        max-height: 700px;
    }

    .content {
        margin-top: 30px;
        font-size: 20px;
    }
</style>
