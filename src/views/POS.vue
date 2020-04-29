<template>
    <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skews alpha-4">
<!--                <span></span>-->
<!--                <span></span>-->
<!--                <span></span>-->
<!--                <span></span>-->
<!--                <span></span>-->
<!--                <span></span>-->
<!--                <span></span>-->
            </div>
        </section>
        <section class="section section-skew" style="background: #efefef">
            <div class="container-full ">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-6">

                                    <div class="card">
                                        <div class="card-header">
                                            <h5 class="font-weight-bold">
                                                {{getTranslation().client_info}}
                                            </h5>
                                        </div>

                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label> {{getTranslation().first_name}}</label>
                                                    <input class="form-control" type="text"
                                                           v-model="dataModel.client.first_name"
                                                           @change="updateDataModel()"
                                                           :disabled="disable.client">
                                                    <span class="text-danger text_error" id="first_name_errors"></span>
                                                </div>
                                                <div class="col-md-6">
                                                    <label> {{getTranslation().last_name}}</label>
                                                    <input class="form-control" type="text"
                                                           v-model="dataModel.client.last_name"
                                                           @change="updateDataModel()"
                                                           :disabled="disable.client">
                                                    <span class="text-danger text_error" id="last_name_errors"></span>
                                                </div>
                                                <div class="col-md-6">
                                                    <label> {{getTranslation().phone}}</label>
                                                    <input class="form-control" type="text"
                                                           v-model="dataModel.client.phone"
                                                           @change="updateDataModel()"
                                                           :disabled="disable.client">
                                                    <span class="text-danger text_error" id="phone_errors"></span>
                                                </div>
                                                <div class="col-md-6">
                                                    <label> {{getTranslation().email}}</label>
                                                    <input class="form-control" type="text"
                                                           v-model="dataModel.client.email"
                                                           @change="updateDataModel()"
                                                           :disabled="disable.client">
                                                    <span class="text-danger text_error" id="email_errors"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">

                                    <div class="card">
                                        <div class="card-header">
                                            <h5 class="font-weight-bold">
                                                <!--                                    <button class="btn btn-primary btn-icon btn-sm"-->
                                                <!--                                            @click="disable.client = !disable.client">-->
                                                <!--                                        <i class="i-Lock"></i>-->
                                                <!--                                    </button>-->
                                                {{getTranslation().payment_info}}
                                            </h5>
                                        </div>

                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-12" dir="rtl">
                                                    <label for="payment_cash">{{getTranslation().payment_cash}}</label>
                                                    <input type="radio" name="payment_type" value="cash"
                                                           v-model="dataModel.payment.type"
                                                           id="payment_cash" @change="knetData()"/>
                                                </div>
                                                <div class="col-md-12" dir="rtl">
                                                    <label
                                                            for="payment_knet_online">{{getTranslation().payment_knet_online}}</label>
                                                    <input type="radio" name="payment_type" value="knet"
                                                           v-model="dataModel.payment.type"
                                                           id="payment_knet_online" @change="knetData()"/>
                                                </div>
                                                <div class="col-md-12" dir="rtl">
                                                    <label
                                                            for="payment_knet_manual">{{getTranslation().payment_knet_manual}}</label>
                                                    <input type="radio" name="payment_type" value="knet_manually"
                                                           v-model="dataModel.payment.type"
                                                           id="payment_knet_manual" @change="knetData()"/>
                                                </div>
                                                <div class="col-md-12" v-if="disable.knet_data">
                                                    <label>{{getTranslation().payment_transaction}}</label>
                                                    <input class="form-control" type="text"
                                                           v-model="dataModel.payment.token"/>
                                                    <span class="text-danger text_error" id="token_errors"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-12 mt-4">

                                    <div class="card">
                                        <div class="card-header">
                                            <h5 class="font-weight-bold"><label>
                                                {{getTranslation().product_info}}</label></h5>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="i-Search-People"></i>
                                        </span>
                                                </div>
                                                <input type="text" class="form-control" v-model="query_search"
                                                       :placeholder="getTranslation().search">
                                                <div class="input-group-prepend" @click="getProducts()"
                                                     style="cursor:pointer">
                                                    <span class="input-group-text">{{getTranslation().search}}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-12 text-center">
                                                    <h3 v-if="loaders.products" class="text-center m-4">
                                                        {{getTranslation().loading}}
                                                    </h3>
                                                </div>
                                                <div class="col-md-3 mt-2" v-for="(item,key) in products" :key="key">

                                                    <div class="card">
                                                        <div class="card-header text-center">
                                                            <h5 class="font-weight-bold">{{item.translated.title}}</h5>

                                                        </div>

                                                        <div class="card-body">
                                                            <img :src="item.main_image" class="img-fluid" alt="">
                                                            <h5 class="font-weight-bold mt-2 text-center mb-0">
                                                                {{parseFloat(item.minimum_price).toFixed(3)}}</h5>
                                                        </div>

                                                        <div class="card-footer text-center">
                                                            <button class="btn btn-icon btn-primary"
                                                                    @click="addToCart(item)">
                                                                <i class="fas fa-cart-plus"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-12 text-center mt-2 justify-content-center">
                                                    <paginate
                                                            v-model="pagination.page"
                                                            :page-count="pagination.page_count"
                                                            :page-range="pagination.page_range"
                                                            :click-handler="clickCallback"
                                                            :prev-text="'Prev'"
                                                            :next-text="'Next'"
                                                            :container-class="'pagination justify-content-center'"
                                                            :page-class="'page-item'"
                                                            :next-class="'page-item'"
                                                            :prev-class="'page-item'"
                                                            :page-link-class="'page-link'"
                                                            :page-next-class="'page-link'"
                                                            :page-prev-class="'page-link'"
                                                            :next-link-class="'page-link'"
                                                            :prev-link-class="'page-link'"
                                                    >
                                                    </paginate>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-header">
                                    <b>{{getTranslation().discount_name}}</b>
                                </div>

                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>{{getTranslation().discount_name}}</label>
                                            <select class="form-control" v-model="dataModel.discount.discount_name"
                                                    @change="updateDataModel()">
                                                <option value="discount_value">{{getTranslation().discount_value}}
                                                </option>
                                                <option value="discount_percent">{{getTranslation().discount_percent}}
                                                </option>
                                            </select>
                                            <span class="text-danger text_error" id="discount_name_errors"></span>
                                        </div>
                                        <div class="col-md-6">
                                            <label>{{getTranslation().sale_discount}}</label>
                                            <div class="input-group">
                                                <input type="number" class="form-control"
                                                       v-model="dataModel.discount.sale_discount"
                                                       @change="updateDataModel()">
                                                <div class="input-group-prepend"
                                                     v-if="dataModel.discount.discount_name == 'discount_percent'">
                                                    <span class="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <span class="text-danger text_error" id="sale_discount_errors"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card mt-4">
                                <div class="card-header">
                                    <b>{{getTranslation().cart}}</b>
                                    <div class="float-right">
                                        <del class="text-danger" style="font-size:20px">{{getTotal.sum}}</del>
                                        <br>
                                        <b class="text-info" style="font-size:20px">{{getTotal.sum_final}}</b>
                                    </div>
                                </div>

                                <div class="card-body">
                                    <div class="1text-center">
                                        <span class="text-danger text_error" id="product_option_values_errors"></span>
                                        <h3 v-if="!cart.length" class="text-center">
                                            <b>{{getTranslation().empty_cart}}</b>
                                        </h3>
                                    </div>
                                    <ul class="p-0 m-0">
                                        <li v-for="(item,key) in cart" :key="key" class="list-unstyled mt-3">
                                            <div class="row">
                                                <div class="col-3">
                                                    <img :src="item.main_image" width="120" alt="">
                                                </div>
                                                <div class="col-9">
                                                    <div class="float-right">
                                                        <del class="text-info"
                                                             style="font-size:18px">{{getTotal.totals_before[key]}}
                                                        </del>
                                                        <br>
                                                        <b class="text-info"
                                                           style="font-size:18px">{{getTotal.totals[key]}}</b>
                                                    </div>
                                                    <h5 class="font-weight-bold pt-2">{{item.translated.title}}</h5>
                                                    <h5 class="font-weight-bold pt-2">
                                                        {{getTranslation().av_quantity}}:
                                                        <small>{{item.product_option_values[0].store_detail.quantity}}
                                                        </small>
                                                    </h5>
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                    <button class="btn btn-icon btn-sm"
                                                                            @click="item.product_option_values[0].min_amount_needed++&& updateCart()">
                                                                        <b>+</b>
                                                                    </button>
                                                                </div>
                                                                <input class="form-control text-center"
                                                                       @change="updateCart()"
                                                                       v-model="item.product_option_values[0].min_amount_needed"/>
                                                                <div class="input-group-append">
                                                                    <button class="btn btn-icon btn-sm"
                                                                            @click="(item.product_option_values[0].min_amount_needed > 1? item.product_option_values[0].min_amount_needed-- : 1) && updateCart()">
                                                                        <b>-</b>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="input-group">
                                                                <label
                                                                        class="font-weight-bold pl-0 p-2">{{getTranslation().price}}</label>
                                                                <input class="form-control text-center"
                                                                       @change="updateCart()"
                                                                       v-model="item.minimum_price"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <p class="pt-2">{{item.translated.description}}</p>
                                                </div>
                                            </div>
                                            <hr>
                                        </li>
                                    </ul>
                                    <div class="text-center">
                                        <button class="btn btn-primary" :disabled="!cart.length" @click="createSale()">
                                            <b><label class="m-0"> {{getTranslation().checkout}}</label></b>
                                        </button>
                                        <button class="btn btn-danger" :disabled="!cart.length" @click="clearCart()">
                                            <b><label class="m-0"> {{getTranslation().clear_cart}}</label></b>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Paginate from 'vuejs-paginate'
    import VueToastify from 'vue-toastify'

    Vue.use(VueToastify);

    export default {
        props: ['auth_token'],
        components: {Paginate},
        data() {
            return {
                services: {
                    base: 'https://zashzash.com/back_end/api/',
                    urls: {
                        search_products: 'products/filter-all-products',
                        create_sale: 'sale/create-admin',
                        get_sale_info: 'https://zashzash.com/back_end/admin/elements/sales/getSaleDetail',
                    }
                },
                lang: 'en',
                disable: {
                    client: false,
                    knet_data: false,
                },
                loaders: {
                    products: true
                },
                pagination: {
                    page: 1,
                    page_count: 1,
                    page_range: 0,
                },
                dataModel: {
                    client: {
                        first_name: '',
                        last_name: '',
                        phone: '',
                        email: '',
                    },
                    discount: {
                        discount_name: 'discount_value',
                        sale_discount: 0
                    },
                    payment: {
                        type: 'cash',
                        token: ''
                    },
                },
                query_search: '',
                cart: [],
                products: [],
            }
        },
        mounted() {
            this.getProducts()
            this.getDataModel()
            this.getCart()
            this.knetData()
            this.lang = this.$ml.current;
        },
        computed: {
            getTotal() {
                let totals = _.map(this.cart, (item) => {

                    return item.minimum_price * item.product_option_values[0].min_amount_needed;
                });
                let totals_before = _.map(this.cart, (item) => {

                    return item.price_before_discount * item.product_option_values[0].min_amount_needed;
                });
                let sum = parseFloat(_.sum(totals)).toFixed(3);

                let discount = 0;
                if (this.dataModel.discount.discount_name == 'discount_value') {
                    discount = this.dataModel.discount.sale_discount;
                } else {
                    discount = sum * (this.dataModel.discount.sale_discount / 100);
                }
                return {
                    totals: totals,
                    totals_before: totals_before,
                    sum_final: parseFloat(sum - discount).toFixed(3),
                    sum: parseFloat(sum).toFixed(3),
                }
            },
        },
        methods: {
            clickCallback(n) {
                this.getProducts(n)
            },
            getCart() {
                let cart = [];
                try {
                    cart = JSON.parse(localStorage.getItem('cart_admin'))
                } catch (e) {
                    console.log(e)

                }
                this.cart = cart ? cart : [];
            },
            getDefaultModel() {
                return {
                    client: {
                        first_name: '',
                        last_name: '',
                        phone: '',
                        email: '',
                    },
                    discount: {
                        discount_name: 'discount_value',
                        sale_discount: 0
                    },
                    payment: {
                        type: 'cash',
                        token: ''
                    },
                }
            },
            getDataModel() {
                let dataModel = this.getDefaultModel();

                try {
                    dataModel = JSON.parse(localStorage.getItem('dataModel_admin'))
                    dataModel.payment = {
                        type: 'cash',
                        token: ''
                    };
                } catch (e) {
                    console.log(e)
                }
                this.dataModel = dataModel ? dataModel : this.getDefaultModel();
            },
            updateCart() {
                let cart = this.cart;
                localStorage.setItem('cart_admin', JSON.stringify(cart))
            },
            updateDataModel() {
                let dataModel = this.dataModel;
                localStorage.setItem('dataModel_admin', JSON.stringify(dataModel))
            },
            clearCart() {
                let cart = []
                this.cart = cart;
                localStorage.setItem('cart_admin', JSON.stringify(cart))
            },
            addToCart(item) {
                let vm = this;

                let flag = false
                _.map(vm.cart, (o) => {
                    if (o.id == item.id) {
                        flag = true
                        return
                    }
                });

                if (!flag) vm.cart.push(item);
                vm.updateCart();

            },
            getProducts(page = 1) {
                let vm = this;
                vm.loaders.products = true;
                vm.products = [];
                this.$apiServiesRoutes.API().get(vm.services.base + vm.services.urls.search_products, {
                    params: {
                        lang: vm.lang,
                        query: vm.query_search,
                        page: page,
                        limit: 12
                    }
                }).then((response) => {
                    response = response.data;
                    if (response.status) {
                        vm.pagination.page_count = response.data.products.last_page;
                        vm.pagination.page_range = response.data.products.data.length;
                        vm.products = response.data.products.data;
                        vm.loaders.products = false;
                        return
                    }
                    vm.loaders.products = false;
                    vm.products = []
                }).catch((errors) => {
                    vm.loaders.products = false;
                    vm.products = []
                })
            },
            prepareData() {
                let vm = this;

                let cart = vm.cart;

                let product_option_values_arr = _.map(cart, 'product_option_values[0].id');
                let product_option_values = _.map(product_option_values_arr, function (pov) {
                    return {product_option_value_ids: pov};
                });

                let quantities = _.map(cart, 'product_option_values[0].min_amount_needed');
                let store_ids = _.map(cart, 'product_option_values[0].store_detail.store_id');
                let branch_ids = _.map(cart, 'branch_id');
                let prices = _.map(cart, 'minimum_price');

                return {
                    lang: vm.lang,
                    phone: vm.dataModel.client.phone,
                    first_name: vm.dataModel.client.first_name,
                    last_name: vm.dataModel.client.last_name,
                    email: vm.dataModel.client.email,
                    quantities: quantities,
                    product_option_values: product_option_values,
                    product_option_value_ids: product_option_values_arr,
                    store_ids: store_ids,
                    branch_ids: branch_ids,
                    prices: prices,
                    payment_type: vm.dataModel.payment.type,
                    token: vm.dataModel.payment.token,
                    discount_name: vm.dataModel.discount.discount_name,
                    sale_discount: vm.dataModel.discount.sale_discount,
                }
            },
            createSale() {
                let vm = this;
                let token = JSON.parse(localStorage.getItem('auth_pos')).token;
                let request_data = vm.prepareData()
                this.$apiServiesRoutes.API().post(vm.services.base + vm.services.urls.create_sale, request_data, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }).then((response) => {
                    response = response.data;
                    if (response.status) {
                        vm.$vToastify.success(vm.getTranslation().success);
                        vm.invoiceRedirection(response.data.sale.sale_details[0].branch_id, response.data.sale.serial)
                        vm.clearAll();
                        return;
                    }
                    vm.validateErrors(response.data.validation_errors)
                }).catch((errors) => {
                })
            },
            clearAll() {
                localStorage.removeItem('cart_admin')
                localStorage.removeItem('dataModel_admin')

                this.cart = [];
                this.dataModel = this.getDefaultModel();
            },
            invoiceRedirection(branch_id, serial) {
                window.location.href = this.services.urls.get_sale_info + `?branch_id=${branch_id}&serial=${serial}`
            },
            validateErrors(errors) {
                $('.text_error').text('')
                $.each(errors, (key, item) => {
                    $(`#${key}_errors`).text(item[0])
                })
            },
            knetData() {
                let vm = this;
                console.log(vm.dataModel.payment.type)
                if (vm.dataModel.payment.type == 'knet_manually') {
                    vm.disable.knet_data = true;
                    return
                }
                vm.disable.knet_data = false
                vm.updateDataModel()
            },
            getTranslation() {
                if (this.lang == 'ar') {
                    return {
                        client_info: 'بيانات العميل',
                        first_name: 'الاسم الاول',
                        last_name: 'الاسم الاخير',
                        phone: 'رقم الهاتف',
                        email: 'البريد الالكتروني',
                        product_info: 'بيانات المنتجات',
                        cart: 'السلة',
                        search: 'ابحث',
                        empty_cart: 'السلة فارغة',
                        clear_cart: 'مسح السلة',
                        loading: 'جاري التحميل ...',
                        checkout: 'انهاء الشراء',
                        av_quantity: 'الكمية المتوفرة حاليا',
                        success: 'تمت العملية بنجاح',
                        price: 'سعر البيع ',
                        discount_name: 'الخصم',
                        discount_value: 'خصم قيمة',
                        discount_percent: 'خضم نسبة',
                        sale_discount: 'القيمة',
                        payment_info: 'بيانات الدفع',
                        payment_cash: 'الدفع كاش',
                        payment_knet_online: 'الدفع كي نت اونلاين',
                        payment_knet_manual: 'الدفع كي نت يدويا',
                        payment_transaction: '    الرقم المرجعي للدفع  ',
                    }
                }
                return {
                    client_info: 'Client Information',
                    first_name: 'FirstName',
                    last_name: 'LastName',
                    phone: 'Phone',
                    email: 'Email',
                    product_info: 'Products',
                    cart: 'Cart',
                    search: 'Search',
                    empty_cart: 'Cart Is Empty',
                    clear_cart: 'Clear Cart',
                    loading: 'Loading ',
                    checkout: 'Checkout',
                    av_quantity: 'Available Quantity',
                    success: 'Success',
                    price: 'Price',
                    discount_name: 'Discount',
                    discount_value: 'Discount Value',
                    discount_percent: 'Discount Percent',
                    sale_discount: 'Discount Amount',
                    payment_info: 'Payment Information',
                    payment_cash: 'Cash',
                    payment_knet_manual: 'Knet Manual',
                    payment_knet_online: 'Knet Online',
                }
            }
        }
    }
</script>
