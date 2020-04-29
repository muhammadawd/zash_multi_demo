<template>
    <div id="container" v-if="sale">
        <div data-reactroot="" class="invoice">
            <div class="invoice-content">
                <div class="invoice-header">
                    <h1 class="invoice-header-text">Invoice</h1></div>
                <div class="invoice-info">
                    <div>Order #{{sale.serial}}</div>
                    <div>{{sale.created_at}}</div>
                    <div>{{sale.payment_type.translated.title}}</div>
                </div>
                <div class="invoice-company">
                    <div class="invoice-company-info">
                        <span>{{sale.user.first_name}} {{sale.user.last_name}} , {{sale.user.phone}}</span>
                        <span>{{sale.address.governorate.translated.name}}  {{sale.address.city.translated.name}},</span>
                        <span v-if="sale.payment">KNET : {{sale.payment.token}}</span>
                        <span>{{sale.address.full_address}}</span>
                        <span class="font-weight-light">
                            {{$ml.get('building')}} :
                            {{sale.address.building}}
                             {{$ml.get('house')}} :
                            {{sale.address.house}}  |
                            {{$ml.get('floor')}} :
                            {{sale.address.floor}} |
                            {{$ml.get('street')}} :
                            {{sale.address.street}}
                        </span>
                    </div>
                    <div class="invoice-company-logo"><img
                            :src="$helper.getLogo()"
                            width="100px"></div>
                </div>
                <div v-for="(branch,key) in sale.sale_details" :key="key">
                    <div class="invoice-month-header" style="display: flex">
                        <!--<div class="icon" style="width: 5rem;" v-if="branch.logo">-->
                        <!--<img :src="branch.logo" style="width: 70px!important;"-->
                        <!--class="img-fluid" alt="">-->
                        <!--</div>-->
                        <!--<div class="icon" style="width: 5rem;" v-if="!branch.logo">-->
                        <!--<img src="img/icons/common/no_image.png"-->
                        <!--class="img-fluid" style="width: 70px!important;" alt="">-->
                        <!--</div>-->
                        <div>
                            <h4 style="font-weight: bold;text-transform: capitalize;margin-bottom: 0">
                                {{branch.translated.title}} … {{branch.address.translated.name}}</h4>
                            <h6>{{branch.phone}}</h6>
                        </div>
                    </div>
                    <div class="ant-table-wrapper invoice-table">
                        <div class="ant-spin-nested-loading">
                            <div class="ant-spin-container">
                                <div class="ant-table ant-table-middle ant-table-bordered ant-table-scroll-position-left">
                                    <div class="ant-table-content">
                                        <div class="ant-table-body">
                                            <table class="">
                                                <colgroup>
                                                    <col>
                                                    <col>
                                                    <col>
                                                    <col>
                                                </colgroup>
                                                <thead class="ant-table-thead">
                                                <tr>
                                                    <th class=""><span><!-- react-text: 33 -->{{$ml.get('item')}}
                                                        <!-- /react-text --></span>
                                                    </th>
                                                    <th class=""><span>{{$ml.get('quantity')}}</span>
                                                    </th>
                                                    <th class=""><span><!-- react-text: 36 -->{{$ml.get('price')}}
                                                        <!-- /react-text --></span>
                                                    </th>
                                                    <th class=""><span><!-- react-text: 42 -->{{$ml.get('total')}}
                                                        <!-- /react-text --></span>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody class="ant-table-tbody">
                                                <tr class="ant-table-row  ant-table-row-level-0"
                                                    v-for="(detail,key) in branch.details" :key="key">
                                                    <td class="">
                                                        <span
                                                                class="ant-table-row-indent indent-level-0"
                                                                style="padding-left: 0px;"></span>
                                                        <b>{{detail.product.translated.title}} …
                                                            <span v-for="(value,key) in detail.product.product_option_value.product_option_value_details"
                                                                  :key="key">
                                                                {{value.option_value.translated.title}} {{value.unit ? value.unit.translated.title : ''}} ,</span>
                                                        </b>
                                                        <!--                                                        <span v-for="detail.product."></span>-->
                                                    </td>
                                                    <td class="">
                                                        {{detail.quantity}}
                                                    </td>
                                                    <td class="">
                                                        {{parseFloat(detail.price).toFixed(3)}}
                                                        {{$store.getters.getCurrency}}
                                                    </td>
                                                    <td class="">
                                                        {{parseFloat(detail.quantity * detail.price).toFixed(3)}}
                                                        {{$store.getters.getCurrency}}
                                                    </td>
                                                </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="direction: rtl">
                    <div class="invoice-total">
                        <h2>{{$ml.get('sub_total')}}</h2>
                        <h2> {{parseFloat(sale.total).toFixed(3)}}
                            <small>{{$store.getters.getCurrency}}</small>
                        </h2>
                    </div>
                    <div class="invoice-total">
                        <h2>{{$ml.get('discount_total')}}</h2>
                        <h2> {{parseFloat(sale.sale_discount).toFixed(3)}}
                            <small>{{$store.getters.getCurrency}}</small>
                        </h2>
                    </div>
                    <div class="invoice-total">
                        <h2>{{$ml.get('total')}}</h2>
                        <h2> {{parseFloat(sale.total_paid).toFixed(3)}}
                            <small>{{$store.getters.getCurrency}}</small>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        data() {
            return {
                lang: this.$ml.current,
                token: null,
                sale: null
            }
        },
        mounted() {
            let vm = this;
            let auth = localStorage.getItem('auth');
            auth = JSON.parse(auth);
            if (auth) {
                vm.token = auth.token;
            }
            let id = vm.$route.query.id;
            vm.showInvoice(id)
        },
        methods: {
            showInvoice(id) {
                let vm = this;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.GET_USER_SALES + `/${id}`,
                    {
                        headers: {
                            Authorization: "Bearer " + vm.token
                        },
                        params: {
                            lang: vm.lang,
                        }
                    }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.sale = data.sale;
                    }
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((err) => {
                    // vm.$router.push({'name': 'login'})
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                })
            },
        },
        components: {}
    }
</script>


<style scoped>
    .invoice {
        width: 880px;
        min-height: 90vh;
        margin: 20px auto;
        padding: 20px 0 30px 0;
        box-shadow: 0 0 300px 0 lightgrey;
        border-radius: 5px;
    }

    .invoice-content {
        max-width: 820px;
        margin: 0 auto;
    }

    .invoice-header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 520px;
        height: 30px;
        margin: 0 auto 10px;
        background: #2e2e2e;
        border-radius: 6px;
    }

    .invoice-header-text {
        margin: 0;
        font-size: 20px;
        color: white;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 7.64px;
        line-height: 23px;
    }

    .invoice-info {
        display: flex;
        justify-content: space-between;
        margin: 7px 0 10px;
        font-weight: 100;
        color: lightgrey;
    }

    .invoice-company {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 50px;
    }

    .invoice-company-info {
        display: flex;
        flex-direction: column;
    }

    .invoice-month-header {
        margin-bottom: 25px;
        border-bottom: #e4e4e4 1px solid;
    }

    .invoice-table {
        margin-bottom: 25px;
    }

    .invoice-total {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        margin-bottom: 10px;
        background: #2e2e2e;
        width: 320px;
    }

    .invoice-total h2 {
        margin-bottom: 0;
        color: white;
        font-size: 20px;

    }

    table {
        /*text-align: center;*/
        width: 100%;
    }

    table td {
        border: 1px solid #ccc;
        padding: 4px;
        /*text-align: center;*/
    }

    table th {
        text-align: inherit;
        background: #2e2e2e;
        color: #fff;
        padding: 6px;
    }

</style>
