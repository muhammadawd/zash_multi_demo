<template>
    <div class="card text-left">
        <div class="card-header text-black"  style="background: #fafafa">
            <b>{{this.$ml.get('payment_methods')}}</b>
            <a href="" @click.prevent="close('paymentGatewayContainer')" class="float-right text-black">{{$ml.get('cancel')}}</a>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-12 direction">
                    <base-radio name="cash" class="mb-3" v-model="payment" value="cash">
                        <div class="pt-1 pr-4">{{this.$ml.get('cash')}}</div>
                    </base-radio>
                    <base-radio name="knet" class="mb-3" v-model="payment" value="knet">
                        <div class="pt-1 pr-4">{{this.$ml.get('knet')}}</div>
                    </base-radio>
                    <base-radio name="visa_master" class="mb-3" v-model="payment" value="visa_master">
                        <div class="pt-1 pr-4">{{this.$ml.get('visa_master')}}</div>
                    </base-radio>
                    <!--<base-radio name="cards" class="mb-3" v-model="payment" value="cards">-->
                        <!--<div class="pt-1 pr-4">{{this.$ml.get('cards')}}</div>-->
                    <!--</base-radio>-->

                    <!--                    <base-radio name="knet" class="mb-3" v-model="payment" value="knet">-->
                    <!--                        <div class="pt-1 pr-4">{{this.$ml.get('knet')}}</div>-->
                    <!--                    </base-radio>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "paymentSummary",
        data() {
            return {
                payment: 'cash',
            }
        },
        props: {
            updatePaymentType: Function,
        },
        created() {
            let vm = this;
            let current_payment = localStorage.getItem('current_payment');
            if (!current_payment) {
                vm.payment = 'cash';
                localStorage.setItem('current_payment', vm.payment)
            } else {
                vm.payment = current_payment;
            }

        },

        methods: {
            close(card) {
                $(`.${card}`).removeClass('opened')
            },
        },
        watch: {
            payment(val, old) {
                // if (old) {
                //     // location.reload()
                // }
                this.updatePaymentType(val)
                localStorage.setItem('current_payment', val)
            }
        }
    }
</script>

<style scoped>

</style>