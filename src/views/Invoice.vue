<template>
    <div class="containers" style="margin: auto" v-if="sale">

        <header class="header" style="margin:0">
            <br><br><br><br><br>
            <h1 class="h1">Invoice - {{sale.serial}}</h1>
            <!--<address>-->
            <!--    <b style="text-transform: uppercase">{{$sale['user']['first_name'] ?? ''}} {{$sale['user']['last_name'] ?? '' }}</b>-->
            <!--    <b style="text-transform: uppercase">{{$sale['user']['email'] ?? '' }}</b>-->
            <!--    <p>{{$sale['address']['governorate']['translated']['name'] ?? ''}}</p>-->
            <!--    <p>{{$sale['address']['city']['translated']['name'] ?? ''}}</p>-->
            <!--    <p>{{$sale->address->detailed_address ?? ''}}</p>-->
            <!--</address>-->
            <!--<div class="invoice-company-logo"><img-->
            <!--        src="{{asset('assets/images/logo.png')}}"-->
            <!--        width="100px"></div>-->
        </header>
        <table class="meta tables" style="width:48%">
            <tr>
                <th><span>Store: </span>
                    <small>(المتجر)</small>
                </th>
                <td><span>Kuwait </span></td>
            </tr>
            <tr>
                <th><span>Receipt: </span>
                    <small>(الدفع)</small>
                </th>
                <td><span>{{sale.payment ? sale.payment.token : ''}} </span></td>
            </tr>
        </table>
        <table class="meta tables" style="float:right;width:48%">
            <tr>
                <th><span>Date: </span>
                    <small>(التاريخ)</small>
                </th>
                <td><span>{{new Date().toDateString()}}</span>
                </td>
            </tr>
            <tr>
                <th><span>Customer Details: </span>
                    <small>(العميل)</small>
                </th>
                <td><span> {{sale.user.first_name}} {{sale.user.last_name}} , {{sale.user.phone}} </span>
                </td>
            </tr>
        </table>
        <div><br></div>
        <article>
            <h1></h1>
            <table class="tables inventory mt-3">
                <thead>
                <tr>
                    <th style="text-align:center" width="50"><span>Qty</span>
                        <small>(الكمية)</small>
                    </th>
                    <th style="text-align:center"><span>Code</span>
                        <small>(الكود)</small>
                    </th>
                    <th style="text-align:center"><span>Description</span>
                        <small>(الوصف)</small>
                    </th>
                    <th style="text-align:center" width="150"><span>Unit Price</span>
                        <small>(السعر)</small>
                    </th>
                    <!--<th style="text-align:center" width="150"><span>DISCOUNT</span></th>-->
                    <th style="text-align:center" width="200"><span>Total Price</span>
                        <small>(الاجمالى)</small>
                    </th>
                </tr>
                </thead>
                <tbody>
                <template v-for="(details , key) in sale.sale_details">

                    <tr v-for="(item , keys) in details.details" :key="keys">
                        <td style="text-align:center"><span> {{item.quantity}}</span></td>
                        <td style="text-align:center;padding:0">
                            <span>
                                {{item.product.slug}}
                            </span>
                        </td>

                        <td style="text-align:center">
                        <span>
                            <b>{{item.product.translated.title}} …
                                <span v-for="(value,key) in item.product.product_option_value.product_option_value_details"
                                      :key="key">
                                    {{value.option_value.translated.title}} {{value.unit ? value.unit.translated.title : ''}} ,</span>
                            </b>
                        </span>
                        </td>

                        <td style="text-align:center"><span>{{parseFloat(item.price).toFixed(3)}}</span><span
                                data-prefix> KWD </span></td>

                        <td style="text-align:center">
                            <span> {{((item.quantity) * (item.price)).toFixed(3)}}</span>
                            <span data-prefix> KWD</span>
                        </td>

                    </tr>
                </template>

                </tbody>
            </table>


            <template v-if="has_return">
                <h3 style="margin-top:20px;font-weight:bold">RETURNS</h3>
                <table class="tables inventory">
                    <thead>
                    <tr>
                        <th style="text-align:center" width="50"><span>Qty</span>
                            <small>(الكمية)</small>
                        </th>
                        <th style="text-align:center"><span>Status</span>
                            <small>(الحالة)</small>
                        </th>
                        <th style="text-align:center"><span>Description</span>
                            <small>(الوصف)</small>
                        </th>
                        <th style="text-align:center" width="150"><span>Date </span>
                            <small>(التاريخ)</small>
                        </th>
                        <!--<th style="text-align:center" width="150"><span>DISCOUNT</span></th>-->
                        <th style="text-align:center" width="200"><span>Total Price</span>
                            <small>(الاجمالى)</small>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(item , key) in sale.sale_details[0].details">
                        <tr v-for="(returns , _key) in item.returns" :key="_key">
                            <td style="text-align:center"> {{returns.quantity}}</td>
                            <td style="text-align:center;background:#f44336;font-weight:bold;opacity:0.7">
                                <span>RETURN</span>
                            </td>

                            <td style="text-align:center">
                            <span>
                                {{item.product.translated.title}} <br>
                                <slot v-for="(options,key) in item.product.product_option_value.product_option_value_details">
                                {{options.option_value.translated.title}}
                                {{options.option_value.option.translated.title}}
                                {{options.option_value.unit ? options.option_value.unit.translated.title : ''}}
                            ,
                                </slot>
                            </span>
                            </td>

                            <td style="text-align:center">{{returns.created_at}}</td>
                            <td style="text-align:center">{{parseFloat(returns.cost).toFixed(3)}} KWD</td>
                        </tr>
                    </template>

                    </tbody>
                </table>
            </template>

        </article>
        <!--{{$sale['paid_at']}}-->
        <table class="tables mt-3 balance" style="float:right">
            <tr>
                <th><span>  Subtotal </span></th>
                <td><span>{{parseFloat(sale.total).toFixed(3)}}</span><span data-prefix> KWD </span></td>
            </tr>
            <tr v-if="sale.total_return">
                <th><span>  Total Return </span></th>
                <td><span>{{parseFloat(sale.total_return).toFixed(3)}}</span><span data-prefix> KWD </span></td>
            </tr>
            <tr>
                <th><span>Total Discount </span></th>
                <td>
                    <span>{{((parseFloat(sale.total).toFixed(3))-( parseFloat(sale.total_after_discount).toFixed(3))).toFixed(3)}} </span><span
                        data-prefix> KWD </span>
                </td>

            </tr>
            <tr>
                <th><span>  Total  </span></th>
                <td><span>{{parseFloat(sale.total_after_discount).toFixed(3)}}</span><span data-prefix> KWD </span></td>
            </tr>
        </table>
        <div style="clear:both"></div>
        <article>
            <div>
                <h3 style="font-weight:bold;margin-top:20px">PAYMENT
                    <small>(الدفع)</small>
                </h3>
                <h3 style="font-weight:bold;margin-top:20px;text-transform:uppercase">({{(sale.payment_type.type) ==
                    'cash' ? 'cash' : 'visa'}})
                    <!--<small>{{$sale['paid_at'] ?? 'NOT PAID'}}</small>-->
                </h3>
                <hr style="height: 2px;margin-top:5px;background: #555;">

                <h5 style="font-weight:bold;margin-top:15px;text-align:right;font-size:13px">
                    يتم استبدال مشترياتك واسترداد قيمتها خلال 14 يوم من تاريخ الشراء يجب ان تكون مشترياتك فى حالتها
                    وتغليفها الاساسي (غير مستعملة وغير معدلة ومرفقة بفات
                    ورة الشراء الاصلية ) المشتريات التى تتم بواسطة البطاقات المصرفية (اعتماد/ائتمان) ترد نقدا بعد 3 ايام
                    على تاريخ
                    الشراء المبين فى ايصال الشراء الاصلى نعتذر عن عدم استبدال او استرداد قيمة مشترياتك من الاكسسوارات
                    نتطلع لخدمتكم فى زيارتكم القادمة
                </h5>
                <h5 style="font-weight:bold;margin-top:15px;text-align:left;font-size:13px">
                    Exchange and refunds are accepted within 14 days from purchasing date.
                    Items must be in their original condition and packaging
                    (Unused ,unaltered having the original tags attached at time of exchange or refund ).
                    Bank cards purchases (credit/debit) will be refunded against cash after 3 days from
                    the date of purchase as it appears on the original purchasing receipt.
                    Accessoires are neither exchangeable nor refundable.
                    We look forward to serving you in your next visit.
                </h5>

                <!--<h3 style="font-weight:bold;margin-top:40px;text-transform:uppercase">({{sale.admin.username}})</h3>-->
                <!--<h3 style="font-weight:bold;margin-top:20px">THANK YOU FOR YOUR VISIT</h4>-->


            </div>
        </article>
    </div>
</template>
<script>
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        data() {
            return {
                lang: this.$ml.current,
                token: null,
                has_return: true,
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
                        vm.has_return = false
                        _.forEach(data.sale.sale_details[0].details, (item) => {
                            console.log(item)
                            _.forEach(item.returns, (returns) => {
                                vm.has_return = true
                            })
                        })

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

<style>

    @import url('https://fonts.googleapis.com/css?family=Tajawal|El+Messiri|Reem+Kufi|Baloo+Bhaijaan|Lateef|Mada');


    .h1 {
        font: bold 100% sans-serif;
        letter-spacing: 0.5em;
        text-align: center;
        text-transform: uppercase;
    }

    /* table */

    table {
        font-size: 75%;
        table-layout: fixed;
        width: 100%;
    }

    table {
        border-collapse: separate;
        border-spacing: 2px;
    }

    th, td {
        border-width: 1px;
        padding: 0.5em;
        position: relative;
        text-align: left;
    }

    th, td {
        border-radius: 0.25em;
        border-style: solid;
    }

    th {
        background: #EEE;
        border-color: #BBB;
    }

    td {
        border-color: #DDD;
    }


    /* header */

    .header {
        margin: 0 0 3em;
    }

    .header:after {
        clear: both;
        content: "";
        display: table;
    }

    .header h1 {
        background: #000;
        border-radius: 0.25em;
        color: #FFF;
        margin: 0 0 1em;
        padding: 0.5em 0;
        font-size: 15px;
    }

    .header address {
        float: left;
        font-size: 75%;
        font-style: normal;
        line-height: 1.25;
        margin: 0 1em 1em 0;
    }

    .header address p {
        margin: 0 0 0.25em;
    }

    .header span, .header img {
        display: block;
        float: right;
    }

    .header span {
        margin: 0 0 1em 1em;
        max-height: 25%;
        max-width: 60%;
        position: relative;
    }

    .header img {
        max-height: 100%;
        max-width: 100%;
    }

    .header input {
        cursor: pointer;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }

    /* article */

    .article, .article address, .tables.meta, .tables.inventory {
        /*margin: 0 0 3em;*/
        margin-top: 5px;
    }

    .article:after {
        clear: both;
        content: "";
        display: table;
    }

    .article h1 {
        clip: rect(0 0 0 0);
        position: absolute;
    }

    .article address {
        float: left;
        font-size: 125%;
        font-weight: bold;
    }

    /* table meta & balance */

    .tables.meta, .tables.balance {
        float: left;
        width: 54%;
    }

    .tables.meta:after, .tables.balance:after {
        clear: both;
        content: "";
        display: table;
    }

    /* table meta */

    .tables.meta th {
        width: 50%;
    }

    .tables.meta td {
        width: 60%;
    }

    /* .tables items */

    .tables.inventory {
        clear: both;
        width: 100%;
    }

    .tables.inventory th {
        font-weight: bold;
        text-align: right;
    }

    .tables.inventory td:nth-child(1) {
        width: 26%;
    }

    .tables.inventory td:nth-child(2) {
        width: 38%;
    }

    .tables.inventory td:nth-child(3) {
        text-align: right;
        width: 12%;
    }

    .tables.inventory td:nth-child(4) {
        text-align: right;
        width: 12%;
    }

    .tables.inventory td:nth-child(5) {
        text-align: right;
        width: 12%;
    }

    /* .tables balance */

    .tables.balance th, .tables.balance td {
        width: 50%;
    }

    .tables.balance td {
        text-align: right;
    }

    /* aside */

    aside h1 {
        border: none;
        border-width: 0 0 1px;
        margin: 0 0 1em;
    }

    aside h1 {
        border-color: #999;
        border-bottom-style: solid;
    }

    /* javascript */

    .add, .cut {
        border-width: 1px;
        display: block;
        font-size: .8rem;
        padding: 0.25em 0.5em;
        float: left;
        text-align: center;
        width: 0.6em;
    }

    .add, .cut {
        background: #9AF;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        background-image: -moz-linear-gradient(#00ADEE 5%, #0078A5 100%);
        background-image: -webkit-linear-gradient(#00ADEE 5%, #0078A5 100%);
        border-radius: 0.5em;
        border-color: #0076A3;
        color: #FFF;
        cursor: pointer;
        font-weight: bold;
        text-shadow: 0 -1px 2px rgba(0, 0, 0, 0.333);
    }

    .add {
        margin: -2.5em 0 0;
    }

    .add:hover {
        background: #00ADEE;
    }

    .cut {
        opacity: 0;
        position: absolute;
        top: 0;
        left: -1.5em;
    }

    .cut {
        -webkit-transition: opacity 100ms ease-in;
    }

    tr:hover .cut {
        opacity: 1;
    }

    @media print {
        * {
            -webkit-print-color-adjust: exact;
        }

        html {
            background: none;
            padding: 0;
        }

        body {
            box-shadow: none;
            margin: 0;
        }

        span:empty {
            display: none;
        }

        .add, .cut {
            display: none;
        }
    }

    @media (min-width: 1200px) {
        .containers {
            max-width: 1040px;
        }
    }

    small {
        font-size: 10px !important;
    }

    @page {
        margin: 0;
    }
</style>
