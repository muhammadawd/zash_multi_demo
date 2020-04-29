<template>
    <div class="row justify-content-between align-items-center" v-if="product">

        <div class="col-lg-5 mb-5 mb-lg-0">
            <div class="row">
                <div class="col-12 text-left">

                    <h1 class="text-black font-weight-bold mb-0">
                        {{product.translated.title}}
                    </h1>
                    <p>{{$ml.get('by')}} : <a href="">{{product.branch.translated.title}}</a></p>

                    <slot v-if="pov">
                        <div v-html="getRate(pov.rate)"></div>
                    </slot>
                    <slot v-if="!pov">
                        <div v-html="getRate(product.rate)"></div>
                    </slot>
                    <b class="mt-2 display-3 font-weight-bold">
                        <slot v-if="pov">
                            {{parseFloat(pov.price).toFixed(3) == 0 ? $ml.get('undefined_price'):
                            parseFloat(pov.price).toFixed(3)}}
                        </slot>
                        <slot v-if="!pov">
                            {{parseFloat(product.minimum_price).toFixed(3) == 0 ? $ml.get('undefined_price'):
                            parseFloat(product.minimum_price).toFixed(3)}}
                        </slot>
                        <span
                                class="text-black font-weight-bold d-inline-block"
                                style="font-size: 14px">{{this.$store.getters.getCurrency}}</span></b>
                    <div class="mt-4">
                        <b class="text-black display-4 font-weight-bold">{{this.$ml.get('description')}}
                            <br>
                        </b>
                        <p class="text-black ">
                            {{product.translated.description}}
                        </p>
                    </div>
                    <!--                    <div>-->
                    <!--                        <div v-if="!pov">-->
                    <!--                            <base-alert type="danger" icon="ni ni-support-16" dismissible>-->
                    <!--                                <span slot="text" class="text-capitalize"><strong></strong> {{$ml.get('no_pov')}}</span>-->
                    <!--                            </base-alert>-->
                    <!--                        </div>-->
                    <!--                        <div v-if="isOutOfStock">-->
                    <!--                            <base-alert type="warning" icon="ni ni-bell-55" dismissible>-->
                    <!--                                <span slot="text" class="text-capitalize"><strong></strong> {{$ml.get('out_of_stock')}}</span>-->
                    <!--                            </base-alert>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                </div>

            </div>
        </div>

        <div class="col-lg-6 mb-lg-auto">
            <div class="rounded shadow-lg overflow-hidden">
                <!--                 :class="this.$ml.current ==='ar' ? 'transform-perspective-left' : 'transform-perspective-right'"-->
                <b-carousel id="carousel1"
                            controls
                            indicators>
                    <b-carousel-slide v-for="(file , key) in selected_images" :key="key"
                                      style="max-height: 650px"
                                      :img-src="file.path"></b-carousel-slide>
                </b-carousel>
            </div>

        </div>

        <div class="col-lg-5 mb-5 mb-lg-0 text-left mt-5">
            <!--            <img src="/img/360.jpg" alt="">-->

            <!--            <a href="" class="btn btn-black btn-sm mb-3" @click.prevent="resetOptions()">-->
            <!--                {{this.$ml.get('reset_options')}}-->
            <!--            </a>-->
            <!--            <div v-for="(option,key) in options" :key="key">-->
            <!--                <b>{{option.translated.title}}</b>-->
            <!--                <div class="radio-button_wrapper">-->
            <!--                    <div v-for="(option_value,key) in option.option_values" :key="key" class="radio-button"-->
            <!--                         :class="'my_option_'+option_value.option_value_id">-->
            <!--                        <div class="radio-button_inner">-->
            <!--                            <input class="radio-button_input" type="radio"-->
            <!--                                   :id="'option'+option_value.option_value_id"-->
            <!--                                   :name="'option'+option.id"-->
            <!--                                   @change="changeSelectedOptions()"-->
            <!--                                   :value="option_value.option_value_id">-->
            <!--                            <label class="radio-button_label"-->
            <!--                                   :for="'option'+option_value.option_value_id">{{option_value.option_value_translation.title}}-->
            <!--                                {{option_value.option_value__unit_translation.title}}-->
            <!--                                &lt;!&ndash;                                {{option_value.option_value_id}}&ndash;&gt;-->
            <!--                            </label>-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->
        </div>

        <div class="col-lg-5 mb-5 mb-lg-0 mt-5">
            <div class="form-group input-group input-group-alternative">
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

            <button class="btn btn-default bg-black mt-5 btn-block btn-lg" @click="AddToCart()">
                <!--                    :disabled="!pov || isOutOfStock">-->
                {{this.$ml.get('add_to_cart')}}
            </button>
        </div>

        <div class="col-md-12 mt-5">
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
                <div v-if="currentTab === 'tab0'">
                    <div class="demo-block">
                        <Pano type="cube"
                              source="https://images.unsplash.com/photo-1557971370-e7298ee473fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"></Pano>
                    </div>
                </div>
                <div v-if="currentTab === 'tab1'">
                    {{product.translated.description}}
                </div>
                <div v-if="currentTab === 'tab2'">
                    <ul class="p-3 direction">
                        <li><b>Brand Name</b>: Diadora</li>
                        <li><b>Material</b>: Cotton</li>
                        <li><b>For</b>: Girls</li>
                        <li><b>Color</b>: Burgundy</li>
                        <li><b>Size</b>: 24 - 36 Months</li>
                    </ul>
                </div>
            </div>
            <hr>
        </div>

        <div class="col-md-12 mt-5 d-none">
            <div class="card">
                <div class="card-body shadow pb-5">
                    <div class="text-left">
                        <b class="display-3 text-black font-weight-bold">{{this.$ml.get('customer_reviews')}}
                            <br><br>
                        </b>
                        <b class="display-4">{{this.$ml.get('first_rate')}}</b><br><br>
                        <b>{{this.$ml.get('rate_it')}}</b>
                        <star-rating v-model="rating"
                                     :increment="1"
                                     :max-rating="5"
                                     border-color="#000"
                                     :border-width="1"
                                     inactive-color="#777"
                                     active-color="#ffd700"
                                     :star-size="30"></star-rating>
                    </div>
                </div>
            </div>
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
    import {Pano} from 'vuejs-vr'


    Vue.use(Message);

    export default {
        name: "prodcutDetail",
        data() {
            return {
                tabs: [
                    {title: this.$ml.get('360'), value: 'tab0'},
                    {title: this.$ml.get('description'), value: 'tab1'},
                    {title: this.$ml.get('specifications'), value: 'tab2'}
                ],
                currentTab: 'tab1',
                rating: 0,
                product: null,
                isProduct: null,
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
            let id = this.$route.params.id;
            let branch_id = this.$route.params.branch_id;
            this.getProductDetails(id, branch_id);
        },
        computed: {
            ...mapState([
                'cart',
                'auth',
            ]),
        },
        methods: {
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
                    iconImg:require('@/assets/success.png'),
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

                        vm.selected_images = pov.files;
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
                this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.FIND_PRODUCT + `/${id}/${branch_id}`, {
                    params: {
                        lang: vm.lang,
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.product = data.product;
                        vm.pov = data.product.product_option_values[0];

                        console.log(data.product)
                        vm.selected_images = vm.pov.files;
                        vm.selected_images.push({
                            path: data.product.main_image,
                            type: 'image'
                        })
                        // vm.selected_images = [{
                        //     path: data.product.main_image
                        // }];
                        vm.options = data.product.options;
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
            BCarousel,
            BCarouselSlide,
            Tabs,
            Pano,
            StarRating
        }
    }
</script>

<style scoped>
    .v-pano {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        border: 0
    }

    .demo-block {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 3px
    }

    .demo-block .demo-block-preview {
        width: 70%;
        height: 100%;
        float: left;
        position: relative
    }

    .demo-block .demo-block-code {
        width: 30%;
        height: 100%;
        background: #f9fafc;
        border-left: 1px solid #dfe2e7;
        font-size: 13px;
        float: left
    }

    .demo-block .demo-block-code pre code {
        font: normal 10pt Consolas, Monaco, monospace
    }

    .demo-block .demo-block-code .demo-block-code-box {
        width: 100%;
        height: 50%;
        position: relative;
        overflow: hidden
    }

    .demo-block .demo-block-code-box:after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 90%;
        height: 1px;
        background: -webkit-linear-gradient(left, #dfe2e7 80%, rgba(223, 226, 231, 0))
    }

    .demo-block .demo-block-code-box h3 {
        width: 100%;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: 700;
        position: absolute
    }

    .demo-block .demo-block-code-box-content {
        position: absolute;
        top: 40px;
        bottom: 10px;
        left: 20px;
        right: 20px;
        overflow: auto
    }

    .demo-block .hljs {
        background: transparent
    }

    .demo-block .demo-block-code code {
        position: absolute;
        top: 0;
        left: 0
    }

    /**/
    .radio-button_wrapper {
        /*display: inline-block;*/
        /*flex-wrap: wrap;*/
        /*margin: 0 auto;*/
        max-width: 100%;
    }

    .radio-button {
        box-sizing: border-box;
        display: inline-block;

        /*flex: 1 0 50%;*/
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
        background: #999;
        color: #FFFFFF;
        cursor: pointer;
    }

    input[type="radio"][class="radio-button_input"]:checked + .radio-button_label {
        background: #000;
        border-color: #2e2e2e;
        color: #FFFFFF;
    }

    .radio-button_label {
        border: 0.1px solid #444;
        color: #000;
        background: #ffffff;
        display: block;
        font-weight: bold;
        /*letter-spacing: 2px;*/
        max-width: 100%;
        padding: 0.5em 1.0em;
        /*padding: 2px 20px 2px 20px;*/
        text-align: center;
        text-transform: uppercase;
        transition: all 0.3s ease;
        width: 100%;
    }


</style>

<style lang="scss">
    .default-tabs {
        position: relative;
        margin: 0 auto;

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
            height: 2px;
            background-color: black;
            transition: transform 0.4s ease, width 0.4s ease;
        }
    }

    .content {
        margin-top: 30px;
        font-size: 20px;
    }
</style>
