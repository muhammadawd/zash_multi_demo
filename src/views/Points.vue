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
                <card class="card-profile border-0 mb-5" no-body>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card shadow shadow-lg--hover mt-5">
                                    <div class="card-body">
                                        <nav aria-label="breadcrumb p-0">
                                            <div class="container-fluid p-0">
                                                <ol class="breadcrumb mt-2 p-0  bg-white">
                                                    <li class="breadcrumb-item"><a
                                                            href="#">{{this.$ml.get('home')}}</a></li>
                                                    <li aria-current="page"
                                                        class="breadcrumb-item active">
                                                        {{this.$ml.get('my_points')}}
                                                    </li>
                                                </ol>
                                            </div>
                                        </nav>
                                        <div class="col-lg-12   p-0">
                                            <card shadow class="text-left" style="background: #eee">
                                                <h3 class="text-left font-weight-bold">
                                                    {{$ml.get('my_points')}} :
                                                    <small>{{points}}</small>
                                                </h3>
                                                <p>{{$ml.get('to_money_percent')}}: {{to_money_percent}}</p>
                                                <button class="btn btn-info" @click="transform()"
                                                        :disabled="!parseInt(points)">
                                                    {{$ml.get('transform_points')}}
                                                </button>
                                            </card>
                                            <card shadow style="background: #eee">
                                                <table class="table table-bordered">
                                                    <thead>
                                                    <tr>
                                                        <th class="text-left">{{$ml.get('code')}}</th>
                                                        <th class="text-left">{{$ml.get('value')}}</th>
                                                        <th class="text-left">{{$ml.get('is_used')}}</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="(item ,key) in vouchers">
                                                        <td>{{item.code}}</td>
                                                        <td>{{item.value}}</td>
                                                        <td>
                                                            {{item.used_at ? $ml.get('used') : $ml.get('not_used')}}
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </section>
    </div>


</template>
<script>

    import myAccount from '../views/pages_components/myAccount';
    import myOrders from '../views/pages_components/myOrders';
    import myAddresses from '../views/pages_components/myAddresses';
    import Tabs from "@/components/Tabs/Tabs.vue";
    import TabPane from "@/components/Tabs/TabPane.vue";
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        data() {
            return {
                token: '',
                points: 0,
                to_money_percent: '0',
                vouchers: [],
            }
        },
        mounted() {
            let vm = this;
            vm.to_money_percent = JSON.parse(localStorage.getItem('to_money_percent'))
            let auth = localStorage.getItem('auth');
            auth = JSON.parse(auth);
            if (auth) {
                vm.token = auth.token;
            }
            this.getVouchers();
            console.log(this.$ml.get('my_orders'))
        },
        methods: {
            transform() {
                let vm = this;
                this.$apiServiesRoutes.API().post(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.CREATE_VOUCHERS, {
                    points: vm.points
                }, {
                    headers: {Authorization: "Bearer " + vm.token}
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                }).catch((error) => {

                })
            },
            getVouchers() {
                let vm = this;
                this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.MY_VOUCHERS, {
                    params: {},
                    headers: {Authorization: "Bearer " + vm.token}
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.vouchers = data.vouchers;
                    vm.points = data.total_points ? data.total_points : 0;
                }).catch((error) => {

                })
            },
        },
        components: {
            Tabs,
            myAccount,
            myOrders,
            myAddresses,
            TabPane
        }
    }
</script>
<style scoped>

</style>
