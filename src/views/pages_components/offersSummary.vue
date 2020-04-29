<template>
    <div>
        <div class="card text-left">
            <div class="card-header bg-black text-white">
                <b>{{this.$ml.get('offers')}}</b>

                <b class="float-right text-white">
                    {{this.$ml.get('total')}} : {{getTotalOffersCost}}
                </b>
            </div>
            <div class="card-body">
                <ul class="list-unstyled">
                    <li v-for="(offer ,key) in offers" :key="key">
                        <b>{{offer.branch.title_ar}}</b>
                        <ul class="list-unstyled direction">
                            <li v-for="(_offer,_key1) in offer.offers.single_selection" :key="_key1">

                                <input type="radio" :name="'single_offer_id_'+key"
                                       :id="'single_offer_id_'+key+_key1"
                                       v-model="offerSingleModel[offer.branch.id]"
                                       :value="_offer">
                                <label :for="'single_offer_id_'+key+_key1">{{_offer.offer_text}}</label>
                            </li>
                        </ul>
                        <ul class="list-unstyled">
                            <li v-for="(_offer,_key2) in offer.offers.multi_selection" :key="_key2">
                                <input type="checkbox" :id="'multi_offer_id_'+key+_key2"
                                       :name="'multi_offer_id_'+key" v-model="offerMultiModel"
                                       :value="_offer">
                                <label :for="'multi_offer_id_'+key+_key2">{{_offer.offer_text}}</label>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <hr>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "offersSummary",
        data() {
            return {
                couponModel: null,
                coupon: null,
                o_total_offers: 0,
                all_offers: [],
                offerSingleModel: [],
                offerMultiModel: []
            }
        },
        mounted() {
            let vm = this;
            let coupon = localStorage.getItem('current_coupon');
            if (coupon) {
                vm.coupon = JSON.parse(coupon);
            }
            let offers = [];
            setTimeout(() => {
                $.each(vm.offers, function (index, offer) {
                    $.each(offer.offers.multi_selection, function (index, _offer) {
                        offers.push(_offer)
                    })
                });

                vm.offerMultiModel = offers
            }, 1000)
        },
        methods: {
            checkCoupon() {
                let vm = this;
                if (!vm.auth) {
                    vm.$router.push({name: 'login'});
                    return;
                }
                let couponModel = vm.couponModel;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.CHECK_COUPON + `/${couponModel}`, {
                    headers: {Authorization: "Bearer " + vm.auth.token}
                }).then((response) => {
                    let status = response.data.status;
                    let data = response.data.data;
                    if (status) {
                        vm.coupon = data.coupon;
                        localStorage.setItem('current_coupon', JSON.stringify(data.coupon));
                        // location.reload()
                    }
                });
            }
        },
        computed: {
            getTotalOffersCost() {
                let vm = this;
                vm.o_total_offers = 0;
                let offers = [];
                $.each(vm.offerSingleModel, function (index, item) {
                    if (item != undefined) {
                        vm.o_total_offers += item.offer_value;
                        offers.push(item)
                    }
                });
                $.each(vm.offerMultiModel, function (index, item) {
                    if (item != undefined) {
                        vm.o_total_offers += item.offer_value;
                        offers.push(item)
                    }
                });
                vm.$store.commit('setTotalOffers', {
                    total: vm.o_total_offers.toFixed(3),
                    offers: offers
                });
                return vm.o_total_offers.toFixed(3)
            },
            ...mapState([
                'total_offers',
                'cart',
                'offers',
                'auth',
            ]),
        }
    }
</script>

<style scoped>

</style>