<template>
    <div class="row">
        <div class="col-md-12 text-center" v-if="cart.length == 0">
            <i class="ni ni-bag-17 ni-5x text-black-50"></i>
            <p class="lead text-black-50">{{this.$ml.get('no_data_cart')}}</p>
        </div>
        <div class="col-md-12 bg-white pt-2 pb-5 text-black text-center" v-if="cart.length > 0">
            <div class="row" v-for="(element,key) in cart" :key="key">
                <div class="col-4">
                    <div class="form-group input-group input-group-alternative">
                        <div class="input-group-prepend p-1">
                            <button style="cursor: pointer;outline: 0" class="input-group-text p-1"
                                    @click="plusAmount(element,key)">
                                <i class="fa fa-minus text-black"></i>
                            </button>
                        </div>
                        <!--                               @keypress.prevent-->
                        <input aria-describedby="addon-right addon-left"
                               @change="updateAmount(element , key)"
                               v-model="element.min_amount_needed" style="height: 30px;"
                               class="form-control text-center p-1">
                        <div class="input-group-append p-1">
                            <button style="cursor: pointer;outline: 0" class="input-group-text p-1"
                                    @click="minusAmount(element,key)">
                                <i class="fa fa-plus text-black"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-3 text-left">
                    <span style="font-size: 12px" class="font-weight-bold text-black">
                        {{element.product_translation.title}} <br>
                        <!--                        <span v-for="(pov , k) in element.pov.product_option_value_details" :key="k">-->
                        <!--                            {{pov.option_value.translated.title}}-->
                        <!--                            {{pov.option_value.unit ? pov.option_value.unit.translated.title : ''}}-->
                        <!--                            <span v-if="k+1 != element.pov.product_option_value_details.length">,</span>-->
                        <!--                        </span>-->
                    </span>
                </div>
                <div class="col-3">
                    <small class="font-weight-bold text-black-50">
                        <slot v-if="parseFloat(element.pov.price).toFixed(3) == 0">
                            <span class="badge badge-info" style="font-size: 13px">{{$ml.get('undefined_price')}}</span>
                        </slot>
                        <slot v-if="parseFloat(element.pov.price).toFixed(3) != 0">
                            {{parseFloat(element.pov.price).toFixed(3)}}
                            <small>{{getCurrency()}}</small>
                        </slot>
                    </small>
                </div>
                <div class="col-2">
                    <button class="btn btn-danger btn-sm" @click="removeCart(element,key)">
                        <i class="fa fa-remove"></i>
                    </button>
                </div>
                <div class="col-12">
                    <hr class="m-2">
                </div>
            </div>
            <!--            <div class="row">-->
            <!--                <div class="col-12 text-left">-->
            <!--                    <ul class="list-unstyled">-->
            <!--                        <li v-for="(offer ,key) in offers" :key="key">-->
            <!--                            <b>{{offer.branch.title_ar}}</b>-->
            <!--                            <ul class="list-unstyled">-->
            <!--                                <li v-for="(_offer,_key1) in offer.offers.single_selection" :key="_key1">-->
            <!--                                    <label>{{_offer.offer_text}}</label>-->
            <!--                                    &lt;!&ndash;                                    <input type="radio" :name="'single_offer_id_'+key" v-model="offerSingleModel[offer.branch.id]"&ndash;&gt;-->
            <!--                                    &lt;!&ndash;                                           :value="_offer">&ndash;&gt;-->
            <!--                                </li>-->
            <!--                            </ul>-->
            <!--                            <ul class="list-unstyled">-->
            <!--                                <li v-for="(_offer,_key2) in offer.offers.multi_selection" :key="_key2">-->
            <!--                                    <label>{{_offer.offer_text}}</label>-->
            <!--                                    &lt;!&ndash;                                    <input type="checkbox" :name="'multi_offer_id_'+key" v-model="offerMultiModel"&ndash;&gt;-->
            <!--                                    &lt;!&ndash;                                           :value="_offer">&ndash;&gt;-->
            <!--                                </li>-->
            <!--                            </ul>-->
            <!--                        </li>-->
            <!--                        <li>-->
            <!--                            <hr>-->
            <!--                        </li>-->
            <!--                    </ul>-->
            <!--                </div>-->
            <!--            </div>-->
            <div class="row">
                <div class="col-6">
                    <ul class="list-unstyled text-left p-3">
                        <li>
                            <b>{{this.$ml.get('sub_total')}}</b>
                        </li>
                        <li v-if="current_coupon">
                            <b>{{this.$ml.get('coupon_total')}}</b>
                        </li>
                        <li>
                            <b>{{this.$ml.get('total')}}</b>
                        </li>
                    </ul>
                </div>
                <div class="col-6">
                    <ul class="list-unstyled text-right p-3">
                        <li>
                            <b>{{getTotalCost}}</b>
                            {{$store.getters.getCurrency}}
                        </li>
                        <li v-if="current_coupon">
                            <b style="color: #f00;">
                                - ( {{current_coupon.value.toFixed(3)}})
                            </b>
                            {{current_coupon.type == 'value' ? $store.getters.getCurrency : '%'}}
                        </li>
                        <li>
                            <b>{{getFinalTotalCost}}</b>
                            {{$store.getters.getCurrency}}
                        </li>
                    </ul>
                </div>

                <div class="col-md-12">
                    <!--                    <router-link class="btn btn-outline-danger btn-block" @click="CloseModal()" :to="{name:'checkout'}">-->
                    <!--                        {{this.$ml.get('submit_checkout')}}-->
                    <!--                    </router-link>-->
                    <button class="btn btn-outline-danger btn-block" @click="closeModal()">
                        {{this.$ml.get('submit_checkout')}}
                    </button>
                    <!--                    data-dismiss="modal"-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import Vue from 'vue'
    import Message from 'vue-m-message'

    Vue.use(Message);

    export default {
        name: "cart",
        data() {
            return {
                cart_elements: [],
                current_payment: null,
                current_address: null,
                current_coupon: null,
                offerSingleModel: [],
                offerMultiModel: []
            }
        },
        mounted() {
            this.cart_elements = this.cart;
            let current_payment = localStorage.getItem('current_payment');
            let current_coupon = localStorage.getItem('current_coupon');
            let current_address = localStorage.getItem('current_address');
            if (current_coupon) {
                current_coupon = JSON.parse(current_coupon)
            }
            this.current_payment = current_payment;
            this.current_address = current_address;
            this.current_coupon = current_coupon;
        },
        computed: {
            ...mapState([
                'cart', 'offers'
            ]),
            getTotalCost() {
                let vm = this;
                let total = 0;

                $.each(vm.cart, function (index, item) {
                    total = total + (item.min_amount_needed * item.pov.price);
                });
                return total.toFixed(3);
            },
            getTotalOffers() {
                let vm = this;
                let total = 0;

                $.each(vm.offers, function (index, item) {
                    total = total + item.discount;
                });
                return total.toFixed(3);
            },
            getFinalTotalCost() {
                let vm = this;
                let total_order = vm.getTotalCost;
                let total_offers = 0;// vm.getTotalOffers;
                let coupon_value = 0;
                if (vm.current_coupon) {
                    if (vm.current_coupon.type == 'value') {
                        coupon_value = vm.current_coupon.value;
                    } else {
                        coupon_value = total_order * (vm.current_coupon.value / 100);
                    }
                }
                return Math.max(0, (total_order - total_offers - coupon_value)).toFixed(3);
            }
        },
        methods: {
            closeModal() {
                let vm = this;
                $('button[data-dismiss="modal"]').trigger('click')
                vm.$router.push({'name': 'checkout'})
            },
            minusAmount(element, key) {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                element.min_amount_needed++;

                let av_quantity = vm.checkValidQuantity(element);
                if (av_quantity.status) {
                    vm.$store.dispatch('updateToCart', element, key);
                } else {
                    vm.errorMessage(av_quantity.available)
                    element.min_amount_needed = av_quantity.available;
                }

                setTimeout(() => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }, 1000)
            },
            plusAmount(element, key) {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;

                if (element.min_amount_needed == 1) {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    return
                }
                element.min_amount_needed--;

                let av_quantity = vm.checkValidQuantity(element);
                if (av_quantity.status) {
                    vm.$store.dispatch('updateToCart', element, key);
                } else {
                    vm.errorMessage(av_quantity.available)
                    element.min_amount_needed = av_quantity.available;
                }

                setTimeout(() => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }, 1000)
            },
            updateAmount(element, key) {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;

                let av_quantity = vm.checkValidQuantity(element);
                if (av_quantity.status) {
                    vm.$store.dispatch('updateToCart', element, key);
                } else {
                    vm.errorMessage(av_quantity.available)
                    element.min_amount_needed = av_quantity.available;
                }

                setTimeout(() => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }, 1000)
            },
            checkValidQuantity(element) {
                console.log(element)
                if (element.pov.store_detail) {
                    let reserved = element.pov.store_detail.reserved;
                    let quantity = element.pov.store_detail.quantity;
                    let available = quantity - reserved;

                    if (available >= element.min_amount_needed) {
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
            getCurrency() {
                return this.$store.getters.getCurrency
            },
            removeCart(element, key) {
                let vm = this;
                let product_id = element.pov.id;
                let filtered_cart = vm.cart.filter((value, index, arr) => {
                    if (product_id == value.pov.id) {
                        return false
                    }
                    return true;
                });
                // console.log(key)
                vm.$store.dispatch('deleteToCart', {key: key, element: element});
            },
            ...mapActions([
                'addToCart',
                'deleteToCart',
                'checkStorage',
                'updateToCart',
                'saveToCart'
            ]),
        }
    }
</script>

<style scoped>

</style>