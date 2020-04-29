<template>
    <div>
        <div class="cards mt-5 text-left">
            <div class="card-bodys">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group input-group input-group-alternative">
                            <input aria-describedby="addon-right addon-left" :placeholder="this.$ml.get('voucherCode')"
                                   v-model="couponModel"
                                   class="form-control pr-1 pl-1">
                            <div class="input-group-append">
                                <button class="btn btn-success btn-sm" @click="checkCoupon()" :disabled="coupon">
                                    {{this.$ml.get('redeem')}}
                                </button>
                                <button class="btn btn-sm btn-warning" @click="removeCoupon()" :disabled="!coupon">
                                    <i class="fa fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <span class="coupon_code_error" style="color: #f00;"></span>
                    </div>
                    <div class="col-md-7" v-if="coupon">
                        <h5 class="font-weight-bold direction">
                            <i class="fa fa-check-circle fa-lg text-success"></i>
                            {{this.$ml.get('current_coupon')}}
                            <small class="text-black-50">{{coupon.code}}</small>
                            `
                            <!--                        <br>-->
                            {{this.$ml.get('coupon_value')}}
                            <small class="text-black-50">{{coupon.value}}</small>
                            <span>{{coupon.type == 'value' ?  ' ' + $store.getters.getCurrency : '%'}}</span>
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "paymentSummary",
        data() {
            return {
                couponModel: null,
                user_id: null,
                coupon: null,
                offerSingleModel: [],
                offerMultiModel: []
            }
        },
        mounted() {
            let vm = this;
            let coupon = localStorage.getItem('current_coupon');
            let auth = localStorage.getItem('auth');
            if (coupon) {
                vm.coupon = JSON.parse(coupon);
            }
            vm.user_id = JSON.parse(auth).user.id;
        },
        methods: {
            checkCoupon() {
                let vm = this;
                if (!vm.auth) {
                    vm.$router.push({name: 'login'});
                    return;
                }
                vm.$swal({
                    title: vm.$ml.get('are_you_sure'),
                    text: vm.$ml.get('code_offer_sure'),
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: vm.$ml.get('yes'),
                    cancelButtonText: vm.$ml.get('no'),
                }).then((result) => {
                    if (result.value) {
                        let couponModel = vm.couponModel;
                        this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.CHECK_COUPON + `?coupon_code=${couponModel}&user_id=${vm.user_id}`, {
                            headers: {Authorization: "Bearer " + vm.auth.token}
                        }).then((response) => {
                            let status = response.data.status;
                            let data = response.data.data;
                            if (status) {
                                vm.coupon = data.coupon;
                                localStorage.setItem('current_coupon', JSON.stringify(data.coupon));
                                $('.coupon_code_error').text('')
                                location.reload()
                            }
                            $('.coupon_code_error').text(data.validation_errors.coupon_code)
                        });
                    }
                });
            },
            removeCoupon() {
                localStorage.removeItem('current_coupon');
                this.couponModel = null
                this.coupon = null
                location.reload()
            }
        },
        computed: {

            ...mapState([
                'cart',
                'offers',
                'auth',
            ]),
        }
    }
</script>

<style scoped>

</style>