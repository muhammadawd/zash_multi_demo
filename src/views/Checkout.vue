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
                <card class="card-profile border-0 mb-5" no-body style="position: relative;">
                    <div class="row">
                        <div class="col-md-12">
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
                                                            <!--                                                            <li class="breadcrumb-item"><a-->
                                                            <!--                                                                    href="#"> {{this.$ml.get('all_stores')}}</a></li>-->
                                                            <li class="breadcrumb-item"><a
                                                                    href="#"> {{this.$ml.get('your_cart')}}</a></li>
                                                            <li aria-current="page"
                                                                class="breadcrumb-item active">
                                                                {{this.$ml.get('checkout')}}
                                                            </li>
                                                        </ol>
                                                    </div>
                                                </nav>
                                                <template>
                                                    <!--<orderSummary></orderSummary>-->
                                                    <!--                                                    <offersSummary></offersSummary>-->
                                                    <!--<deliverySummary></deliverySummary>-->
                                                    <!--<paymentSummary></paymentSummary>-->
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="container_base">
                                                                <totalAllSummary v-bind:payment_type="payment_type"/>
                                                                <div class="orderSummaryContainer">
                                                                    <orderSummary v-bind:updateProductsSummary="updateProductsSummary"/>
                                                                </div>
                                                                <div class="paymentGatewayContainer">
                                                                    <paymentGateway
                                                                            v-bind:updatePaymentType="updatePaymentType"/>
                                                                </div>
                                                                <div class="deliverySummaryContainer">
                                                                    <deliverySummary
                                                                            v-bind:updateCurrentAddress="updateCurrentAddress"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <totalSummary
                                                                    v-bind:payment_type="payment_type"
                                                                    v-bind:products_summary="products_summary"
                                                                    v-bind:current_address_data="current_address_data"/>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
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

    import orderSummary from '../views/pages_components/orderSummary'
    import deliverySummary from '../views/pages_components/deliverySummary'
    import paymentSummary from '../views/pages_components/paymentSummary'
    import offersSummary from '../views/pages_components/offersSummary'
    import paymentGateway from '../views/pages_components/paymentGateway'
    import totalSummary from '../views/pages_components/totalSummary'
    import totalAllSummary from '../views/pages_components/totalAllSummary'

    export default {
        data() {
            return {
                payment_type: 'cash',
                current_address_data: null,
                products_summary: [],
            }
        },
        methods: {
            updatePaymentType(payment) {
                this.payment_type = payment
            },
            updateProductsSummary(products_summary) {
                this.products_summary = products_summary
            },
            updateCurrentAddress(address) {
                this.current_address_data = address
            }
        },
        created() {
            let vm = this;
            let current_payment = localStorage.getItem('current_payment');
            if (!current_payment) {
                vm.payment = 'cash';
                localStorage.setItem('current_payment', vm.payment)
            } else {
                vm.payment = current_payment;
                //
            }
            // console.log(JSON.parse(localStorage.getItem('current_address_data')))
            vm.current_address_data = JSON.parse(localStorage.getItem('current_address_data'));
        },
        components: {
            orderSummary,
            paymentSummary,
            paymentGateway,
            offersSummary,
            totalSummary,
            totalAllSummary,
            deliverySummary
        }
    }
</script>
<style scoped>
    .container_base {
        /*border: 1px solid #000;*/
        width: 100%;
        min-height: 100vh;
        overflow: hidden !important;
        position: relative;
        transition: all 0.5s ease-in-out;
        margin-bottom: 5px;
    }

    @media only screen and (max-width: 600px) {
        .container_base {
            min-height: auto !important;
        }
    }

    .paymentGatewayContainer, .orderSummaryContainer, .deliverySummaryContainer {
        width: 100%;
        overflow: hidden !important;
        height: 100%;
        position: absolute;
        top: 0;
        right: -600px;
        transition: all 0.5s ease-in-out;
        background: #fff;
        z-index: 9;
    }

    @media only screen and (max-width: 600px) {
        .paymentGatewayContainer, .orderSummaryContainer, .deliverySummaryContainer {
            position: fixed;
            z-index: 9999999;
            top: 100px;

        }
    }

    .paymentGatewayContainer.opened,
    .orderSummaryContainer.opened,
    .deliverySummaryContainer.opened {
        right: 0;
    }

    .text-error {
        color: #f00;
    }
</style>
