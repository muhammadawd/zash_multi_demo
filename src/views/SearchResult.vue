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
        <section class="section section-skew" style="padding-bottom: 0">
            <div class="container-full">
                <card class="card-profile border-0 mb-0" no-body style="position: relative;">
                    <div class="row">
                        <div class="col-md-12 bg-gray-50 mb-2">
                            <div class="container mt-0">
                                <div class="row">
                                    <div class="col-12 mb-2" v-if="$route.query.q">
                                        <div class="card">
                                            <div class="card-body p-1">
                                                <h4 class="text-left m-3">
                                                    <b>{{$ml.get('search')}}<br></b>
                                                    <small>{{$route.query.q}}</small>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row  text-left mt-3" v-if="!isMobile()">
                                    <div class="col-md-2 mb-4">
                                        <!--<img src="img/brand/blue.png" width="120" class="img-thumbnail" alt="">-->
                                    </div>
                                    <div class="col-md-10">
                                        <h4 class="font-weight-bold text-dark">{{this.$ml.get('search_result_p')}}</h4>
                                        <div class="row">
                                            <!--<div class="col-md-4"></div>-->
                                            <div class="col-md-8  text-right">
                                                <div class="input-group mb-3">
                                                    <!--<autocomplete-->
                                                    <!--ref="autocomplete"-->
                                                    <!--:url="auto_complete"-->
                                                    <!--:source="auto_complete"-->
                                                    <!--anchor="address"-->
                                                    <!--input-class="form-control text-left form-control-alternative text-capitalize p-2 auto_input"-->
                                                    <!--:classes="{ wrapper: 'form-wrapper', input: 'form-control auto-save', list: 'data-list', item: 'data-list-item' }"-->
                                                    <!--label="writer"-->
                                                    <!--:initValue="query"-->
                                                    <!--name="query"-->
                                                    <!--:results-display="formattedDisplay"-->
                                                    <!--@selected="addDistributionGroup"-->
                                                    <!--@nothingSelected="nothingSelectedFun"-->
                                                    <!--results-property="data"-->
                                                    <!--:placeholder="$ml.get('search_key')">-->
                                                    <!--</autocomplete>-->
                                                    <input class="form-control pr-2 pl-2" v-model="query"
                                                           @input="getApiSuggest()"
                                                           @blur="hideSearch()"
                                                           @keyup.enter="searchQueryClicked()"/>
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
                                                    <div class="input-group-append">
                                                        <button class="btn btn-github btn-icon"
                                                                @click="searchQueryClicked()">
                                                            <span class="btn-inner--icon"><i
                                                                    class="fa fa-search"></i></span>
                                                            <span class="btn-inner--text d-none"><span class="">  {{this.$ml.get('search_key')}}</span> {{this.$ml.get('filter')}}  </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-1">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 d-none d-md-block" v-if="!isMobile()">
                            <div class="row">
                                <div class="col-md-12" dir="ltr">
                                    <h5 class="font-weight-bold text-left text-dark p-3 mb-4">
                                        {{this.$ml.get('price_range')}}</h5>
                                    <div class="app-content">
                                        <vue-slider v-model="rangeValue"
                                                    :min="min"
                                                    :max="max"
                                                    :tooltip="'always'"
                                                    @drag-end="endSlide()"
                                                    :tooltip-formatter="formatter2"
                                        >
                                        </vue-slider>
                                    </div>
                                </div>
                                <div class="col-md-12 pl-3 pr-3">
                                    <div class="card" style="border: 0;">
                                        <div class="card-body">
                                            <ul class="list-unstyled text-left direction">
                                                <li v-for="(category , index) in categories_options">
                                                    <base-checkbox type="checkbox" class="mb-3" name="categories[]"
                                                                   v-model="checked_categories"
                                                                   :value="category.value">
                                                        {{category.text}}
                                                    </base-checkbox>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 text-center">
                                    <button class="btn btn-danger mt-2" @click="filterData()">
                                        {{$ml.get('filter')}}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-left"  v-if="isMobile()">
                            <button class="btn btn-default  m-3 btn-sm d-md-none"

                                    @click="modals.modal1 = true">
                                <i class="fa fa-filter"></i>
                                {{$ml.get('filter')}}
                            </button>
                        </div>
                        <div class="col-md-9 col-12">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-3 col-6" :style="isMobile() ? {marginBottom:'100px'}:{}"
                                         v-for="(product ,$index) in products" :key="$index">
                                        <oneProduct v-bind:addToCart="addToCart"
                                                    v-bind:product="product"></oneProduct>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <infinite-loading @distance="1" @infinite="searchQuery">
                                <div slot="no-more"></div>
                                <div slot="no-results"></div>
                            </infinite-loading>
                        </div>
                        <div class="col-md-12 mt-2 text-center" v-if="products.length == 0">
                            <h4 class="text-uppercase display-4" v-if="loading">{{$ml.get('loading')}}</h4>
                            <h4 class="text-uppercase display-4" v-if="no_data">{{$ml.get('no_data')}}</h4>
                        </div>
                    </div>
                    <div class="px-4">
                        <div class="row">
                            <div class="col-md-12  mb-5">
                                <div class="row row-grid">
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </section>
        <modal :show.sync="modals.modal1"
               gradient="white"
               modal-classes="modal-danger modal-dialog-centered modal-lg">
            <h6 slot="header" class="modal-title font-weight-bold text-left display-4 text-black direction"
                id="modal-title-filter">
                {{this.$ml.get('price_range')}}</h6>

            <div class="  text-center  text-black">
                <div class="row">
                    <div class="col-md-12 text-left" dir="ltr">
                        <!--<h5 class="font-weight-bold text-left text-dark p-0 mb-5">-->
                        <!--{{this.$ml.get('price_range')}}</h5>-->
                        <div class="app-content">
                            <vue-slider v-model="rangeValue"
                                        :min="min"
                                        :max="max"
                                        :tooltip="'always'"
                                        @drag-end="endSlide()"
                                        :tooltip-formatter="formatter2">
                            </vue-slider>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <ul class="list-unstyled text-left p-0 direction">
                                    <li v-for="(category , index) in categories_options">
                                        <base-checkbox type="checkbox" class="mb-3" name="categories[]"
                                                       v-model="checked_categories"
                                                       :value="category.value">
                                            {{category.text}}
                                        </base-checkbox>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-danger mt-2" @click="filterData()">
                            {{$ml.get('filter')}}
                        </button>
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
    import Vue from 'vue';
    import {ModelSelect} from 'vue-search-select'
    import InfiniteLoading from 'vue-infinite-loading';
    import Autocomplete from 'vuejs-auto-complete'
    import {VueAutosuggest} from 'vue-autosuggest';

    import Modal from "@/components/Modal.vue";
    import Message from 'vue-m-message'
    import {mapState, mapActions} from 'vuex'
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    import oneProduct from '../views/pages_components/oneProduct'

    import 'vue-range-component/dist/vue-range-slider.css'
    import VueRangeSlider from 'vue-range-component'

    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'

    import VueSlideBar from 'vue-slide-bar'

    Vue.use(Message);

    export default {
        data() {
            return {
                checked_categories: [],
                suggestList: [],
                min: 0,
                max: 10000,
                rangeValue: [0, 10000],
                modals: {modal1: false},
                formatter2: this.$ml.get('fils') + ' {value} ',
                sliderCustomzie: {
                    lineHeight: 10,
                    processStyle: {
                        backgroundColor: '#42b883'
                    },
                    tooltipStyles: {
                        backgroundColor: '#42b883',
                        borderColor: '#42b883'
                    }
                },
                lang: this.$ml.current,
                page: 1,
                query: this.$route.query.q,
                auto_complete: apiServiesRoutes.BASE_URL + apiServiesRoutes.PRODUCT_AUTO_COMPLETE + '?query=',
                products: [],
                address_options: [],
                address: {
                    value: '',
                    text: ''
                },
                branch_options: [],
                branch: {
                    value: '',
                    text: ''
                },
                categories_options: [],
                categories: {
                    value: '',
                    text: ''
                },
                loading: false,
                no_data: false,
            }
        },
        mounted() {
            let vm = this;
            vm.query = vm.$route.query.q;

            // vm.getAllAddresses();
            vm.getAllCategories();
            // vm.getAllBranches();
        },
        watch: {
            $route(to, from) {
                this.query = this.$route.query.q;
            },
            query(newVal) {
                // this.searchQueryClicked();
            },
            rangeValue(newVal) {
                // console.log('sda')
            }
        },
        methods: {
            filterData() {
                let vm = this;
                vm.modals.modal1 = false;
                vm.searchQueryClicked()
            },
            setQuerySearch(setQuerySearch) {
                let vm = this;
                console.log(setQuerySearch);
                vm.query = setQuerySearch;
                vm.searchQueryClicked()
                // vm.suggestList = [];
            },
            hideSearch() {
                let vm = this;
                setTimeout(() => {
                    vm.suggestList = [];
                }, 100)
            },
            endSlide() {
                let vm = this;
                vm.page = 1;
                vm.products = [];
                vm.searchQuery()
            },
            isMobile() {
                if (screen.width <= 760) {
                    return true;
                } else {
                    return false;
                }
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
                        iconImg: require('../assets/error.png'),
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
            nothingSelectedFun(query) {
                // console.log(query)
                this.query = query;
                this.searchQueryClicked();
            },
            addDistributionGroup(item) {
                this.query = item.display;
                this.$refs.autocomplete.display = item.display;
                this.$refs.autocomplete.value = item.display;
                this.searchQueryClicked();
            },
            formattedDisplay(result) {
                return result;
            },
            searchQueryClicked() {
                let vm = this;
                vm.products = [];
                vm.page = 1;
                vm.searchQuery()
            },
            searchQuery($state) {
                let vm = this;
                vm.loading = true
                vm.no_data = false;
                let cats = JSON.parse(JSON.stringify(vm.checked_categories));
                // vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.SITE_SEARCH, {
                    params: {
                        lang: vm.lang,
                        category_ids: cats,
                        branch_id: vm.branch.value,
                        address_id: vm.address.value,
                        query: vm.query,
                        page: vm.page,
                        limit: 15,
                        min_price: vm.rangeValue[0],
                        max_price: vm.rangeValue[1]
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (data.products.data.length == 0 && vm.page == 1) {
                        vm.no_data = true
                    }
                    if (data.products.data.length) {
                        vm.page += 1;
                        // $.each(data.products.data, function (key, value) {
                        vm.products.push(...data.products.data);
                        // });
                        // $.each(data.products.data, function (key, value) {
                        //     vm.products.push(value);
                        // });
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                    vm.loading = false;
                    setTimeout(() => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                    }, 1000)
                }).catch((error) => {
                    vm.no_data = true
                    vm.loading = false
                    setTimeout(() => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                    }, 1000)
                })

            },
            getApiSuggest() {
                let vm = this;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.PRODUCT_AUTO_COMPLETE, {
                    params: {
                        category: true,
                        lang: vm.lang,
                        query: vm.query,
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.suggestList = data;
                }).catch((error) => {
                    vm.suggestList = []
                })
            },
            getAllAddresses() {
                let vm = this;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.HOME_ADDRESSES, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.prepareAddresses(data.store_address)
                }).catch((error) => {

                })
            },
            getAllCategories() {
                let vm = this;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.HOME_CATEGORIES, {
                    params: {
                        lang: vm.lang,
                        // main: 1
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.prepareCategories(data.categories)
                }).catch((error) => {

                })
            },
            getAllBranches() {
                let vm = this;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.HOME_BRANCHES, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.prepareBranches(data.branches)
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
                vm.address_options = arr;
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
            prepareBranches(branches) {
                let vm = this;
                let arr = [];
                $.each(branches, function (index, branch) {
                    arr.push({
                        value: branch.id,
                        text: branch.translated.title
                    })
                });
                vm.branch_options = arr;
                return arr;
            },
        }
        ,
        computed: {
            ...
                mapState([
                    'auth',
                    'cart'
                ]),
            getCurrency() {
                return this.$store.getters.getCurrency
            }
            ,
        }
        ,
        components: {
            oneProduct,
            VueRangeSlider,
            VueSlideBar,
            VueSlider,
            Modal,
            Autocomplete,
            VueAutosuggest,
            InfiniteLoading,
            ModelSelect
        }
    }
</script>
<style scoped>

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
        background-color: #2e2e2e;
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

    .autocomplete {
        width: 60%;
    }

    .ui.fluid.dropdown {
        min-height: 47px;
    }

    .ui.fluid.dropdown {
        background-color: #000 !important;
        color: #fff !important;
    }

    .icon-float {
        position: absolute;
        top: 8px;
        z-index: 99;
    }

    .icon-float i {
        font-size: 25px;
    }

    .search {
        color: #fff !important;
        font-weight: bold !important;
    }


    .ui.fluid.dropdown > .dropdown.icon {
        display: none !important;
    }

    .ui.search.dropdown > .text {
        color: #fff !important;
        font-weight: bold !important;
        top: 4px !important;
    }

    .mt-10 {
        margin-top: 100px;
    }

    .px-4 {
        z-index: 9;
    }

    .bg-gray-50 {
        background-color: #eee;
    }

    .max-h-350 {
        min-height: 180px;
        max-height: 250px;
    }

    body {
        max-width: 800px;
        padding: 20px;
        margin-left: auto !important;
        margin-right: auto !important;
        font-family: monospace;
    }

    #autosuggest__input {
        outline: none;
        position: relative;
        display: block;
        font-family: monospace;
        font-size: 20px;
        border: 1px solid #616161;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
    }

    #autosuggest__input.autosuggest__input-open {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .autosuggest__results-container {
        position: relative;
        width: 100%;
    }

    .app-content {
        padding: 0 25px 5px 25px;
    }

    .autosuggest__results {
        font-weight: 300;
        margin: 0;
        position: absolute;
        z-index: 10000001;
        width: 100%;
        border: 1px solid #e0e0e0;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        background: white;
        padding: 0px;
        overflow: scroll;
        max-height: 200px;
    }

    .autosuggest__results ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
    }

    .autosuggest__results .autosuggest__results_item {
        cursor: pointer;
        padding: 15px;
    }

    #autosuggest ul:nth-child(1) > .autosuggest__results_title {
        border-top: none;
    }

    .autosuggest__results .autosuggest__results_title {
        color: gray;
        font-size: 11px;
        margin-left: 0;
        padding: 15px 13px 5px;
        border-top: 1px solid lightgray;
    }

    .autosuggest__results .autosuggest__results_item:active,
    .autosuggest__results .autosuggest__results_item:hover,
    .autosuggest__results .autosuggest__results_item:focus,
    .autosuggest__results .autosuggest__results_item.autosuggest__results_item-highlighted {
        background-color: #ddd;
    }

    .custom-control-label::before {
        right: -30px !important;
    }
</style>
