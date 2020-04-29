<template>
    <div class="row">
        <div class="col-md-12">
            <span class="font-weight-bold">{{this.$ml.get('sort_by')}}:</span>
            <ul class="text-left">
                <li class="list-inline-item">
                    <a :class="sort_by === 'recommended' ? 'font-weight-bold' : ''"
                       @click.prevent="changeSort('recommended')"
                       href="">{{this.$ml.get('recommended')}}</a>
                    |
                </li>
                <li class="list-inline-item">
                    <a href="" :class="sort_by === 'rate' ? 'font-weight-bold' : ''"
                       @click.prevent="changeSort('rate')">{{this.$ml.get('ratings')}}</a>
                    |
                </li>
                <li class="list-inline-item">
                    <a href="" :class="sort_by === 'alpha' ? 'font-weight-bold' : ''"
                       @click.prevent="changeSort('alpha')">{{this.$ml.get('a_z')}}</a>
                    |
                </li>
                <li class="list-inline-item">
                    <a href="" :class="sort_by === 'newest' ? 'font-weight-bold' : ''"
                       @click.prevent="changeSort('newest')">{{this.$ml.get('newest')}}</a>
                    |
                </li>
                <li class="list-inline-item">
                    <a href="" :class="sort_by === 'min_amount_sale' ? 'font-weight-bold' : ''"
                       @click.prevent="changeSort('min_amount_sale')">{{this.$ml.get('min_order_amount')}}</a>
                </li>
            </ul>
        </div>
        <div class="col-md-12">
            <hr class="mt-0">
        </div>
        <div class="col-md-12">
            <router-link v-for="(branch , $index) in branches"
                         :to="{name:'store',params:{'id':branch.id}}" :key="$index">
                <div class="card mt-2">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-4 p-0">
                                <div class="icons" v-if="branch.logo">
                                    <img :src="branch.logo"
                                         class="w-100 img-fluid" alt="">
                                </div>
                                <div class="icons" v-if="!branch.logo">
                                    <img src="img/icons/common/no_image.png"
                                         class="w-100 img-fluid" alt="">
                                </div>
                            </div>
                            <div class="col-8">
                                <h5 class="title text-black font-weight-bold text-capitalize">
                                    {{branch.translated.title}}

                                </h5>
                                <div v-html="getRate(branch.rate)"></div>
                                <div class="text-black">
                                    <hr class="m-0 mb-2">
                                    <b>{{getPaymentMethods}}</b>
                                    <ul class="p-0 list-unstyled">
                                        <li v-if="branch.payment_types.length === 0">{{getNoData}}</li>
                                        <li v-for="(types , key) in branch.payment_types" :key="key">
                                            {{types.payment.translated.title}}
                                        </li>
                                    </ul>

                                </div>
                                <a href="#"
                                   class="text-error font-weight-bold">{{getShowMore}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
            <infinite-loading @infinite="getStoresInfiniteHandler">
                <div slot="no-more"></div>
                <div slot="no-results"></div>
            </infinite-loading>

        </div>

    </div>
</template>

<script>
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import InfiniteLoading from 'vue-infinite-loading';


    export default {
        name: "storeProducts",
        components: {
            InfiniteLoading,
        },
        props: ['_category_ids', '_init_category_ids', '_query', '_sort_by', '_address_id'],
        data() {
            return {
                lang: this.$ml.current,
                category_ids: [],
                address_id: null,
                sort_by: null,
                query: null,

                branches: [],
                page: 1,
            }
        },
        mounted() {
            let vm = this;

            vm.address_id = this._address_id ? this._address_id : this.$route.query.address_id;
            vm.sort_by = this._sort_by;
            vm.query = this._query;

            let categories = this._category_ids;
            if (categories.length === 0) {
                categories = this._init_category_ids;
            }
            this.category_ids = categories;

        },
        methods: {
            async getStoresInfiniteHandler($state, reset = false) {

                let vm = this;
                if (reset) {
                    vm.page = 1;
                    vm.branches = [];
                }
                await axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_STORES, {
                    params: {
                        lang: vm.lang,
                        category_ids: vm.category_ids,
                        sort_by: vm.sort_by,
                        address_id: vm.address_id,
                        query: vm.query,
                        page: vm.page
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (data.branches.data.length) {
                        vm.page += 1;
                        $.each(data.branches.data , function (i , v) {
                            vm.branches.push(v);
                        });
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                }).catch((error) => {

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
            changeSort(type) {
                console.log(this)
                this.sort_by = type;
                // this.getStoresInfiniteHandler('', true)
            }
        },
        computed: {
            getNoData() {
                return this.$ml.get('no_data');
            },
            getShowMore() {
                return this.$ml.get('show_more');
            },
            getPaymentMethods() {
                return this.$ml.get('payment_methods');
            },
        }, watch: {
            _category_ids: function (newVal, oldVal) { // watch it
                // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
                this.category_ids = newVal;
                // this.getStoresInfiniteHandler('', true)
            },
            _query: function (newVal, oldVal) { // watch it
                // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
                this.query = newVal;
                // this.getStoresInfiniteHandler('', true)
            },
            _sort_by: function (newVal, oldVal) { // watch it
                // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
                this.sort_by = newVal;
                // this.getStoresInfiniteHandler('', true)
            },
            _address_id: function (newVal, oldVal) { // watch it
                // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
                this.address_id = newVal;
                // this.getStoresInfiniteHandler('', true)
            }

        }
    }
</script>

<style scoped>
    .icon {
        width: 7rem;
        height: 7rem;
    }
    .text-error{
        color: #f00;
    }
</style>