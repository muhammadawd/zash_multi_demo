<template>
    <div class="row">
        <div class="col-md-3 categories_aside_store">
            <div class="category_overlay" @click="slideCategories()"></div>
            <div class="position-relative">
                <button class="categories_btn_store btn btn-black" @click="slideCategories()">
                    <i class="fa fa-times fa-2x"></i>
                </button>
                <div class="list_categories">
                    <h3 class="font-weight-bold  bg-dark border m-0 p-1 pt-2 text-white text-center">
                        {{this.$ml.get('all_categories')}}
                    </h3>
                    <div class="py-5 bg-secondary border-top border">

                        <div class="">
                            <scrollactive ref="scrollactive" :offset="offset"
                                          :always-track="alwaysTrack"
                                          :duration="duration"
                                          :click-to-scroll="clickToScroll"
                                          :bezier-easing-value="easing">
                                <ul class="list-unstyled nav-center p-0">
                                    <li v-for="(category,key) in categories_products" :key="key">
                                        <a :href="'#category-'+category.id"
                                           class="scrollactive-item nav-item text-black">
                                            <p class="mb-0 p-2 pb-0 text-left  font-weight-bold text-capitalize"
                                               style="font-size:18px ;">
                                                {{category.translated.title}}
                                            </p>
                                        </a>
                                    </li>
                                </ul>
                            </scrollactive>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="font-weight-bold d-none d-md-block bg-dark border m-0 p-1 pt-2 text-white text-center">
                        {{this.$ml.get('search_key')}}
                    </h3>
                </div>
                <div class="col-12 text-center mt-2 d-md-none">
                    <div class="btn-group w-100" dir="ltr">
                        <button class="btn btn-black w-50" @click="slideCart()">
                            <i class="fa fa-shopping-cart"></i>
                            {{$ml.get('cart')}}
                        </button>
                        <button class="btn btn-black w-100" @click="slideCategories()">
                            <i class="fa fa-star"></i>
                            {{$ml.get('categories')}}
                        </button>
                    </div>
                </div>
                <div class="col-md-12">

                    <tabs fill class="flex-column flex-md-row">
                        <card shadow>
                            <tab-pane :title="this.$ml.get('products')" style="min-height: 400px">
                                <main>
                                    <div class="form-group input-group input-group-alternative">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="ni ni-zoom-split-in"></i>
                                            </span>
                                        </div>
                                        <input aria-describedby="addon-right addon-left"
                                               v-model="query"
                                               @change="searchQuery"
                                               :placeholder="this.$ml.get('search_key')"
                                               class="form-control">
                                    </div>
                                    <section v-for="(category,key) in categories_products" :key="key"
                                             :id="'category-'+category.id"
                                             class="hero is-danger is-fullheight">
                                        <div class="container-fluid p-0">
                                            <badger-accordion ref="myAccordion" class="m-0 mt-3">
                                                <badger-accordion-item :data="{open:true}">
                                                    <template slot="header">
                                                        <h4 class="display-4 text-left">
                                                            {{category.translated.title}}
                                                        </h4>
                                                    </template>
                                                    <template slot="content">
                                                        <div class="row pb-2">
                                                            <div class="col-lg-4 col-12"
                                                                 v-for="(product,key) in  category.products" :key="key">
                                                                <oneProduct v-bind:addToCart="addToCart"
                                                                            v-bind:product="product"></oneProduct>
                                                            </div>
                                                        </div>
                                                    </template>
                                                </badger-accordion-item>
                                            </badger-accordion>
                                        </div>
                                    </section>

                                </main>
                            </tab-pane>

                            <tab-pane :title="this.$ml.get('ratings')" style="min-height: 400px">
                                <div class="row">
                                    <div class="col-md-12 text-left">
                                        <h4 class="font-weight-bold">
                                            {{this.$ml.get('customer_reviews')}}
                                            <slot v-if="branch_info">
                                                ({{branch_info.rate_count}})
                                            </slot>
                                            <hr class="m-2">
                                        </h4>
                                    </div>
                                    <div class="col-md-12 mb-2 " v-if="this.auth">
                                        <star-rating v-model="rating"
                                                     :increment="1"
                                                     :max-rating="5"
                                                     border-color="#000"
                                                     :border-width="1"
                                                     inactive-color="#777"
                                                     active-color="#ffd700"
                                                     :star-size="30"></star-rating>
                                        <textarea class="form-control form-control-alternative mb-2"
                                                  v-model="rate_comment"
                                                  rows="4" :placeholder="this.$ml.get('rate_store')"></textarea>
                                        <div class="text-center">
                                            <button class="btn btn-black" @click="RateSave()">
                                                {{this.$ml.get('save')}}
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-md-12 table_over text-center"
                                         v-if="branch_info && branch_info.rate_count == 0">
                                        <i class="fa fa-star-o fa-3x"></i>
                                        <br>
                                        <h3 class="display-4 font-weight-normal">{{this.$ml.get('no_ratings')}}</h3>
                                        <div class="col-md-12 mt-5 mb-5"></div>
                                    </div>
                                    <div class="col-md-12 mb-2 text-left" v-for="(rate,key) in branch_rates" :key="key">
                                        <div class="d-flex px-3">
                                            <div>
                                                <div class="icon">
                                                    <img src="img/icons/common/user_male2-512.png" alt=""
                                                         class="img-fluid"></div>
                                            </div>
                                            <div class="pl-4">
                                                <h5 class="title text-black font-weight-bold text-capitalize">
                                                    {{rate.user.first_name}}
                                                    {{rate.user.last_name}}
                                                </h5>
                                                <div v-html="getRate(rate.rate)"></div>
                                                <p class="text-default">
                                                    {{rate.comment}}
                                                </p>

                                            </div>
                                        </div>
                                        <hr class="m-1">
                                    </div>
                                </div>
                                <infinite-loading @distance="1" @infinite="getStoreRating">
                                    <div slot="no-more"></div>
                                    <div slot="no-results"></div>
                                </infinite-loading>
                            </tab-pane>

                            <tab-pane :title="this.$ml.get('info')" style="min-height: 400px">
                                <div class="row">
                                    <div class="col-md-12 table_over">
                                        <table class="table table-hover" v-if="branch_info">
                                            <tr>
                                                <td class="text-left">
                                                    <b>{{this.$ml.get('store_name')}}</b>
                                                </td>
                                                <td class="text-right">
                                                    <b>{{branch_info.translated.title}}</b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-left">
                                                    <b>{{this.$ml.get('phone')}}</b>
                                                </td>
                                                <td class="text-right">
                                                    <div class="direction-inverse font-weight-bold">
                                                        {{branch_info.phone}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-left">
                                                    <b>{{this.$ml.get('full_address')}}</b>
                                                </td>
                                                <td class="text-right">
                                                    <b>{{branch_info.address.translated.name}}</b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-left">
                                                    <b>{{this.$ml.get('ratings')}} ({{branch_info.rate}})</b>
                                                </td>
                                                <td class="text-right" v-html="getRate(branch_info.rate)">
                                                    <ul class="list-unstyled p-0">
                                                        <li class="list-inline-item"><i
                                                                class="fa text-warning fa-star-o"></i></li>
                                                        <li class="list-inline-item"><i
                                                                class="fa text-warning fa-star-o"></i></li>
                                                        <li class="list-inline-item"><i
                                                                class="fa text-warning fa-star-o"></i></li>
                                                        <li class="list-inline-item"><i
                                                                class="fa text-warning fa-star-o"></i></li>
                                                        <li class="list-inline-item"><i
                                                                class="fa text-warning fa-star-o"></i>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-left">
                                                    <b>{{this.$ml.get('payment_methods')}}</b>
                                                </td>
                                                <td class="text-right">
                                                    <b v-for="(payment,key) in branch_info.payment_types" :key="key">{{payment.payment.translated.title}}</b>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </tab-pane>
                        </card>
                    </tabs>
                </div>
            </div>
        </div>

        <div class="col-md-3  d-none d-md-block position-relative">
            <div class="list_cart">
                <h3 class="font-weight-bold  bg-dark border m-0 p-1 pt-2 text-white text-center">
                    {{this.$ml.get('your_cart')}}
                </h3>
                <div class="py-5 bg-secondarys border-top border">
                    <!--                      cart here-->
                    <cart/>
                </div>
            </div>
        </div>


        <modal :show.sync="modals.modal2"
               gradient="danger"
               modal-classes="modal-danger modal-dialog-centered modal-lg">
            <h6 slot="header" class="modal-title font-weight-bold text-left display-4" id="modal-title-notification">
                {{this.$ml.get('add_to_cart')}}</h6>

            <div class="py-3 text-center" v-if="current_modal_product">
                <div class="row radio-button_wrapper">

                    <div class="col-12"
                         v-for="(option_value,key) in current_modal_product.product_option_values" :key="key">
                        <div class="radio-button">
                            <div class="radio-button_inner  p-0">
                                <input :disabled="option_value.store_detail.quantity <= 0" class="radio-button_input"
                                       type="radio" :id="'option_'+option_value.id"
                                       v-model="selected_product_option_value"
                                       :value="option_value">
                                <label class="radio-button_label" :for="'option_'+option_value.id">

                                    <div class="card bg-transparent mb-2">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-6 text-left">
                                                    <h4 class="font-weight-bold">
                                                        {{current_modal_product.translated.title}}
                                                    </h4>
                                                    <b class="display-4">
                                                        {{parseFloat(option_value.price).toFixed(3)}}
                                                    </b>
                                                    {{getCurrency}}
                                                    <div v-html="getRate(option_value.store_detail.rate)"></div>
                                                    <span class="badge badge-success badge-pill mb-2" style="font-size: 14px"
                                                          v-if="option_value.store_detail.quantity > 0">{{inStock}}</span>
                                                    <span class="badge badge-danger badge-pill mb-2" style="font-size: 14px"
                                                          v-if="option_value.store_detail.quantity <= 0">{{outStock}}</span>
                                                </div>
                                                <div class="col-md-6 text-left">
                                                    <ul class="list-unstyled p-0">
                                                        <li class="mb-3">
                                                            <b>{{getQuantity}}</b>
                                                            <select class="form-control form-control-alternative direction font-weight-bold"
                                                                    v-model="option_value.min_amount_needed">
                                                                <option v-for="(index,key) in option_value.store_detail.quantity" :key="key"
                                                                        :value="index">{{index}}
                                                                </option>
                                                            </select>
                                                        </li>
                                                        <li v-for="(option_value_detail,key) in  option_value.product_option_value_details" :key="key"
                                                            class="direction-inverse">
                                                            <b>{{option_value_detail.option_value.option.translated.title}} </b>
                                                            :
                                                            <b class="font-weight-light">{{option_value_detail.option_value.translated.title}}</b>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="col-md-12 text-left">
                                                    <p class="lead" style="font-size: 15px">
                                                        {{current_modal_product.translated.description}}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <!--                        <label :for="'test'+option_value.id">-->
                        <!--                            <div class="card mb-2">-->
                        <!--                                <div class="card-body text-black">-->
                        <!--                                    <input type="radio" class="option_value_radio" :id="'test'+option_value.id"-->
                        <!--                                           v-model="selected_product_option_value" :value="option_value">-->
                        <!--                                    {{option_value}}-->
                        <!--                                </div>-->
                        <!--                            </div>-->
                        <!--                        </label>-->
                    </div>
                </div>

            </div>
            <template slot="footer">
                <base-button type="white" @click="getPOModel">{{this.$ml.get('add')}}</base-button>
                <base-button type="link"
                             text-color="white"
                             @click="modals.modal2 = false">
                    {{this.$ml.get('close')}}
                </base-button>
            </template>
        </modal>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapState, mapActions} from 'vuex'
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion'
    import InfiniteLoading from 'vue-infinite-loading';
    import VueScrollactive from 'vue-scrollactive'
    import Message from 'vue-m-message'

    import oneProduct from '../pages_components/oneProduct'
    import cart from '../pages_components/cart';
    import StarRating from 'vue-star-rating';

    import Tabs from "@/components/Tabs/Tabs.vue";
    import TabPane from "@/components/Tabs/TabPane.vue";
    import Modal from "@/components/Modal.vue";

    Vue.use(VueScrollactive);
    Vue.use(Message);
    Vue.component('BadgerAccordion', BadgerAccordion);
    Vue.component('BadgerAccordionItem', BadgerAccordionItem);


    export default {
        name: "products",
        data() {
            return {
                elements: [],
                alwaysTrack: false,
                duration: 600,
                clickToScroll: true,
                offset: 52,
                easing: '.5,0,.35,1',
                modals: {
                    modal1: false,
                    modal2: false,
                    modal3: false
                },
                rating: 0,
                rate_comment: null,
                categories_products: [],
                cart_elements: [],
                query: null,
                branch_info: null,
                current_modal_product: null,
                selected_product_option_value: null,
                branch_rates: [],
                branch_rate_page: 1,
                lang: this.$ml.current,
            }
        },
        mounted() {
            let _this = this;

            $(window).scroll(
                function (event) {
                    let list_categories = $('.list_categories');
                    let list_cart = $('.list_cart');
                    let categories_width = list_categories.parent().width();
                    let cart_width = list_cart.parent().width();
                    let height = $(document).height();
                    let footer = $('.footer').height();

                    // if ($(window).scrollTop() > 260 && ((height - $(window).scrollTop()) > footer+ 400)) {
                    //     list_categories.css({
                    //         'position': 'fixed',
                    //         'z-index': '99',
                    //         'top': '15px',
                    //         'width': categories_width,
                    //     })
                    //     list_cart.css({
                    //         'position': 'fixed',
                    //         'z-index': '99',
                    //         'top': '15px',
                    //         'width': cart_width,
                    //     })
                    // } else if ((height - $(window).scrollTop()) > footer) {
                    //     list_categories.css({
                    //         'position': 'relative',
                    //         'top': '0'
                    //     });
                    //     list_cart.css({
                    //         'position': 'relative',
                    //         'top': '0'
                    //     })
                    // } else {
                    //
                    //     list_categories.css({
                    //         'position': 'relative',
                    //         'top': '0'
                    //     })
                    //     list_cart.css({
                    //         'position': 'relative',
                    //         'top': '0'
                    //     })
                    // }
                }
            );

            this.elements = this.$el.querySelectorAll('.scrollactive-item');

            let id = this.$route.params.id;

            _this.getStoreProducts(id);

            _this.checkStorage();

            _this.getStoreInfo(id);

            _this.getStoreRating();
            _
        },
        methods: {
            ...mapActions([
                'addToCart',
                'deleteToCart',
                'checkStorage',
                'saveToCart'
            ]),
            slideCategories() {
                $('.categories_aside_store').toggleClass('opened')
            },
            slideCart() {
                $('#_header_cart').trigger('click')
            },
            RateSave() {
                // CREATE_STORE_RATINGS
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.CREATE_STORE_RATINGS, {
                    rate: vm.rating,
                    user_id: vm.auth.user.id,
                    comment: vm.rate_comment,
                    branch_id: vm.$route.params.id,
                    lang: vm.lang
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.branch_rates.unshift(data.rate);
                        vm.rate_comment = null;
                        vm.rating = 0;
                    }
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {
                    vm.categories_products = [];
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                })
            },
            getPOModel() {
                let vm = this;
                let selected_master_product = vm.current_modal_product;
                let selected_product_option = vm.selected_product_option_value;
                if (!selected_product_option) {
                    Message({
                        title: vm.$ml.get('error'),
                        message: vm.$ml.get('select_product_first'),
                        className: 'bg-gray text-white',
                        zIndex: 9999999,
                        iconImg: require('@/assets/error.png'),
                        position: 'bottom-center',
                        // type: 'error',
                        showClose: true
                    })
                    return;
                }
                let product_to_save = vm.prepareProductToCart(selected_master_product, selected_product_option)
                // console.log(product_to_save)
                vm.bindToCart(product_to_save);
                vm.modals.modal2 = false;
            },
            prepareProductToCart(master, pov) {
                console.log(pov)
                return {
                    product_id: master.id,
                    branch_id: master.branch_id,
                    store_id: pov.store_detail ? pov.store_detail.store_id : null,
                    product_translation: master.translated,
                    min_amount_needed: pov.min_amount_needed ? pov.min_amount_needed : 1,
                    pov: pov
                };
            },
            getStoreProducts(id) {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_STORE_PRODUCTS + `/${id}`, {
                    params: {
                        query: vm.query,
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        vm.categories_products = data.categories;
                        setTimeout(() => {
                            $('.js-badger-accordion-header').trigger('click')
                        }, 500);
                    }
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    vm.categories_products = []
                })
            },
            searchQuery() {

                this.getStoreProducts(this.$route.params.id);
            },
            getStoreInfo(id) {
                let vm = this;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_STORE_INFO + `/${id}`, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.branch_info = data.branch;
                    }
                }).catch((error) => {

                })
            },
            getStoreRating($state) {
                let vm = this;
                let id = this.$route.params.id;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_STORE_RATINGS + `/${id}`, {
                    params: {
                        lang: vm.lang,
                        page: vm.branch_rate_page
                    }
                }).then((resp) => {
                    let data = resp.data.data;

                    if (data.rates.data.length) {
                        vm.branch_rate_page = vm.branch_rate_page + 1;
                        $.each(data.rates.data, function (key, value) {
                            vm.branch_rates.push(value);
                        });
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                }).catch((error) => {

                })
            },
            addToCart(product) {
                let vm = this;
                if (product.product_option_values.length > 1) {
                    vm.modals.modal2 = true;
                    vm.current_modal_product = product;
                    return;
                }
                let pov = product.product_option_values[0];
                let normal_product = vm.prepareProductToCart(product, pov);
                vm.bindToCart(normal_product);
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
        },
        components: {
            oneProduct,
            Tabs,
            Modal,
            InfiniteLoading,
            StarRating,
            TabPane,
            BadgerAccordion,
            BadgerAccordionItem,
            cart,
            VueScrollactive: require('vue-scrollactive')
        },
        computed: {
            inStock() {
                return this.$ml.get('in_stock')

            },
            outStock() {
                return this.$ml.get('out_off_stock')

            },
            getCurrency() {
                return this.$store.getters.getCurrency
            },
            getQuantity() {
                return this.$ml.get('select_quantity')
            },
            ...mapState([
                'cart',
                'auth',
            ]),
        }
    }
</script>

<style scoped>

    .radio-button_wrapper {
        /*display: inline-block;*/
        /*flex-wrap: wrap;*/
        /*margin: 0 auto;*/
        max-width: 100%;
    }

    .radio-button {
        box-sizing: border-box;
        display: inline-block;
        width: 100%;
        padding: 0;
    }

    .radio-button_inner {
        position: relative;

    }

    input[type="radio"][class="radio-button_input"] {
        cursor: pointer;
        display: block;
        height: 100%;
        margin: 0;
        overflow: hidden;
        opacity: 0;
        padding: 0;
        width: 100%;
    }

    input[type="radio"][class="radio-button_input"]:hover + .radio-button_label {
        background: #efefef;
        cursor: pointer;
        box-shadow: 1px 2px 15px #999;
    }

    input[type="radio"][class="radio-button_input"]:checked + .radio-button_label {
        background: #e1e1e1;
        border-color: #2e2e2e;
        border: 1px dashed #000;
    }

    input[type="radio"][class="radio-button_input"]:disabled + .radio-button_label {
        background: #e1e1e1;
        opacity: 0.7;
        cursor: default;
    }

    .radio-button_label {
        border-radius: 10px;
        color: #000;
        background: #fff;
        display: block;
        font-weight: 600;
        max-width: 100%;
        /*padding: 2px 20px 2px 20px;*/
        text-align: center;
        text-transform: uppercase;
        transition: all 0.3s ease;
        width: 100%;
    }

    .category_span {
        position: relative;
        top: -15px;
        left: 10px;
    }

    td {
        padding: 8px !important;
    }

    a.scrollactive-item.nav-item.is-active p {
        border-left: 4px solid #000;
        border-right: 4px solid #000;
        font-weight: bold;
    }

    .max-h-350 {
        max-height: 250px;
    }
</style>
<style>
    .badger-accordion__panel {
        margin: 0 !important;
    }

</style>
