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
                                                    <orderSummary></orderSummary>
                                                    <!--                                                    <offersSummary></offersSummary>-->
                                                    <deliverySummary></deliverySummary>
                                                    <paymentSummary></paymentSummary>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <paymentGateway v-bind:updatePaymentType="updatePaymentType"></paymentGateway>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <totalSummary v-bind:payment_type="payment_type"></totalSummary>
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

    export default {
        data() {
            return {
                payment_type: 'cash',
            }
        },
        methods: {
            updatePaymentType(payment) {
                this.payment_type = payment
            }
        },
        created() {
            let vm = this;
            let current_payment = localStorage.getItem('current_payment');
            if (!current_payment) {
                vm.payment = 'cash'
                localStorage.setItem('current_payment', vm.payment)
            } else {
                vm.payment = current_payment;
                //
            }
        },
        components: {
            orderSummary,
            paymentSummary,
            paymentGateway,
            offersSummary,
            totalSummary,
            deliverySummary
        }
    }
</script>
<style scoped>

    .text-error {
        color: #f00;
    }
</style>
