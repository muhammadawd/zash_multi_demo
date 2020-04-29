<template>
    <div class="row">

        <div class="col-md-12 text-center mt-5" v-if="sales.length == 0">
            <i class="fa fa-cart-plus text-black-50 fa-5x"></i>
            <h2 class="mt-5 font-weight-bold text-black-50">No Orders</h2>
        </div>


        <div class="col-md-6 d-none text-left">
            <card class="border-2" body-classes="py-5">
                <div>
                    <icon name="fa fa-times" type="danger" rounded class="mb-4"></icon> &nbsp;
                    <badge type="danger" rounded> Rejected</badge>
                </div>

                <p class="description display-4 text-capitalize mt-1">
                    هذا نص تجريبي لاختبار شكل و حجم النصوص و طريقة عرضها
                    في هذا النص وامكانية تغييرة في اي وقت عن طريق ادارة الموقع .
                </p>

                <ul class="list-unstyled direction p-0">
                    <li class="py-2">
                        <div class="d-flex align-items-center">
                            <span class="badge mr-3 badge-danger badge-circle">
                                <i class="ni ni-money-coins"></i>
                            </span>
                            <h6 class="mb-0">
                                <b>{{$ml.get('total')}} : </b>
                                00.00
                            </h6>
                        </div>
                    </li>
                    <li class="py-2">
                        <div class="d-flex align-items-center">
                            <span class="badge mr-3 badge-danger badge-circle">
                                <i class="ni ni-pin-3"></i>
                            </span>
                            <h6 class="mb-0">
                                <b>{{$ml.get('addresses')}} : </b>
                                test - test -test - test
                            </h6>
                        </div>
                    </li>
                </ul>
                <base-button tag="a" href="#" type="danger" class="mt-4">
                    {{$ml.get('show_details')}}
                </base-button>
            </card>
        </div>

        <div class="col-md-12 mb-5 text-left" v-for="(sale,ke) in sales" :key="ke">
            <card class="border-2" body-classes="py-5">
                <div>
                    <icon name="fa fa-shopping-cart" type="primary" rounded class="mb-4"></icon> &nbsp;
                    <badge type="primary" rounded> {{sale.status.translated.title}}</badge>
                </div>

                <badge class="float-right" rounded>{{sale.created_at}}</badge>

                <ul class="list-unstyled direction p-0">
                    <li class="py-2">
                        <!--                        <hr class="m-0 mb-2">-->
                        <!--                        <div class="d-flex align-items-center">-->
                        <!--                            <span class="badge mr-3 badge-info badge-circle">-->
                        <!--                                <i class="ni ni-pin-3"></i>-->
                        <!--                            </span>-->
                        <h6 class="mb-0">
                            <b>{{$ml.get('addresses')}} : </b>
                            {{sale.address.governorate.translated.name}} | {{sale.address.city.translated.name}}
                            <br>
                            <span class="font-weight-bold">{{$ml.get('full_address')}} : </span>
                            <span>{{sale.address.full_address}}</span>
                            <br>
                            <span class="font-weight-bold">{{$ml.get('building')}} : </span>
                            <span>{{sale.address.building}}</span> |
                            <span class="font-weight-bold">{{$ml.get('house')}} : </span>
                            <span>{{sale.address.house}}</span> |
                            <span class="font-weight-bold">{{$ml.get('floor')}} : </span>
                            <span>{{sale.address.floor}}</span> |
                            <span class="font-weight-bold">{{$ml.get('street')}} : </span>
                            <span>{{sale.address.street}}</span>
                        </h6>
                        <!--                        </div>-->
                        <hr class="mt-2 mb-2">
                    </li>
                    <li class="py-2">
                        <div class="d-flex align-items-center">
                            <span class="badge mr-3 badge-primary badge-circle">
                                <i class="ni ni-money-coins"></i>
                            </span>
                            <h6 class="mb-0">
                                <b>{{$ml.get('sub_total')}} : </b>
                                <span class="font-weight-bold">{{parseFloat(sale.total).toFixed(3)}}</span>
                                {{$store.getters.getCurrency}}
                            </h6>
                        </div>
                    </li>
                    <li class="py-2">
                        <div class="d-flex align-items-center">
                            <span class="badge mr-3 badge-primary badge-circle">
                                <i class="ni ni-money-coins"></i>
                            </span>
                            <h6 class="mb-0">
                                <b>{{$ml.get('discount_total')}} : </b>
                                <span style="color: #f00;" class="font-weight-bold">- ({{parseFloat(sale.sale_discount).toFixed(3)}}) </span>
                                {{$store.getters.getCurrency}}
                            </h6>
                        </div>
                    </li>
                    <li class="py-2">
                        <div class="d-flex align-items-center">
                            <span class="badge mr-3 badge-primary badge-circle">
                                <i class="ni ni-money-coins"></i>
                            </span>
                            <h6 class="mb-0">
                                <b>{{$ml.get('total')}} : </b>
                                <span class="font-weight-bold">{{parseFloat(sale.total_after_discount).toFixed(3)}} </span>
                                {{$store.getters.getCurrency}}
                            </h6>
                        </div>
                    </li>
                </ul>
                <div class="text-center">
                    <!--                    <base-button tag="a" href="#" type="primary" class="mt-4" @click.prevent="showInvoice(sale.id)">-->
                    <!--                        {{$ml.get('show_details')}}-->
                    <!--                    </base-button>-->
                    <router-link :to="{name:'invoice',query:{'id':sale.id}}" class="btn btn-primary">
                        {{$ml.get('show_details')}}
                    </router-link>
                </div>
            </card>
        </div>

        <div class="col-md-12 mt-4 align-content-center align-items-center justify-content-center"
             v-if="total_page > 1">
            <base-pagination :page-count="total_page" v-model="page"></base-pagination>
        </div>

    </div>
</template>

<script>
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'

    export default {
        name: "myOrders",
        data() {
            return {
                lang: this.$ml.current,
                token: null,
                sales: [],
                page: 1,
                limit: 1,
                total_page: 1,
            }
        },
        mounted() {
            let vm = this;
            let auth = localStorage.getItem('auth');
            auth = JSON.parse(auth);
            if (auth) {
                vm.token = auth.token;
            }
            vm.getMyOrders();
        },
        watch: {
            page: function (newVal, oldVal) { // watch it

                this.getMyOrders()
            },
        },
        methods: {
            showInvoice(id) {
                let vm = this;
                console.log(id)

            },
            getMyOrders() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.GET_USER_SALES,
                    {
                        headers: {
                            Authorization: "Bearer " + vm.token
                        },
                        params: {
                            lang: vm.lang,
                            limit: vm.limit,
                            page: vm.page
                        }
                    }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (!status) {
                        return;
                    }
                    vm.total_page = data.sales.last_page;
                    vm.sales = data.sales.data;
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((err) => {
                    vm.$router.push({'name': 'login'})
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                })
            },
        }
    }
</script>

<style scoped>

</style>