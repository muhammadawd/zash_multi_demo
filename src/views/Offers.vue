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
                                <tabs fill class="flex-column flex-md-row">
                                    <card shadow>
                                        <tab-pane :title="this.$ml.get('promotions')" style="min-height: 400px">
                                            <div class="row">
                                                <div class="col-md-3 col-6" v-for="(branch,key) in branches" :key="key">
                                                <div class="card shadow shadow-lg--hover mt-5"
                                                         @click.prevent="showOffers(branch)"
                                                         style="cursor: pointer">
                                                        <div class="card-body text-center">
                                                            <img :src="branch.logo ? branch.logo : 'img/icons/common/no_image.png'"
                                                                 class="img-fluid max-h-350"
                                                                 alt="">
                                                            <hr class="m-2">
                                                            <h4 class="font-weight-bold text-capitalize">
                                                                {{branch.translated.title}}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </tab-pane>
                                        <tab-pane :title="this.$ml.get('coupons')" style="min-height: 400px">
                                            <div class="row">

                                                <div class="col-md-3 col-6" v-for="(branch,key) in branches" :key="key">
                                                <div class="card shadow shadow-lg--hover mt-5"
                                                         @click.prevent="showCoupons(branch)"
                                                         style="cursor: pointer">
                                                        <div class="card-body text-center">
                                                            <img :src="branch.logo ? branch.logo : 'img/icons/common/no_image.png'"
                                                                 class="img-fluid max-h-350"
                                                                 alt="">
                                                            <hr class="m-2">
                                                            <h4 class="font-weight-bold text-capitalize">
                                                                {{branch.translated.title}}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </tab-pane>
                                    </card>
                                </tabs>

                            </div>
                        </div>
                    </div>
                    <div class="px-4">
                        <div class="row">
                            <div class="col-md-12  mb-5">
                                <div class="row row-grid">
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>

            <modal :show.sync="modals.modal1"
                   gradient="danger"
                   modal-classes="modal-danger modal-dialog-centered modal-lg">
                <h6 slot="header" class="modal-title font-weight-bold text-left display-4"
                    id="modal-title-notification">
                    {{this.$ml.get('offers')}}</h6>

                <div class="py-3 text-center">
                    <div class="row">
                        <div class="col-md-12 mb-2 text-left" v-for="(offer,key) in offers" :key="key">
                            <router-link :to="{name:'store',params:{'id':offer.branch_id}}">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex px-3">
                                            <div class="pl-4">
                                                <h5 class="title text-black font-weight-bold text-capitalize">
                                                    {{current_branch}}
                                                </h5>
                                                <p class="text-default" v-if="offer.offer_type === 'p_promotion'">
                                                    {{$ml.get('offer_p_promotion_1')}}
                                                    <b class="font-weight-bold">{{offer.offerable.purchased_products_count}}</b>
                                                    {{$ml.get('offer_p_promotion_2')}}
                                                    <b class="font-weight-bold">{{offer.offerable.get_products_count}}</b>
                                                    {{$ml.get('offer_p_promotion_4')}}
                                                    {{$ml.get('offer_p_promotion_3')}}
                                                    <b class="font-weight-bold">{{offer.offerable.purchased_value}}</b>
                                                    {{$store.getters.getCurrency}}
                                                </p>
                                                <p class="text-default" v-if="offer.offer_type === 'm_promotion'">
                                                    {{$ml.get('offer_m_promotion_1')}}
                                                    <b class="font-weight-bold">{{offer.offerable.purchased_products_count}}</b>
                                                    {{$ml.get('offer_m_promotion_2')}}
                                                    <b class="font-weight-bold">{{offer.offerable.got_value}}</b>
                                                    {{$store.getters.getCurrency}}
                                                    {{$ml.get('offer_m_promotion_4')}}
                                                    {{$ml.get('offer_m_promotion_3')}}
                                                    <b class="font-weight-bold">{{offer.offerable.purchased_value}}</b>
                                                    {{$store.getters.getCurrency}}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>

                <template slot="footer">
                    <base-button type="link"
                                 text-color="white"
                                 @click="modals.modal1 = false">
                        {{this.$ml.get('close')}}
                    </base-button>
                </template>
            </modal>

            <modal :show.sync="modals.modal2"
                   gradient="danger"
                   modal-classes="modal-danger modal-dialog-centered modal-lg">
                <h6 slot="header" class="modal-title font-weight-bold  display-4"
                    id="modal-title-notification2">
                    {{this.$ml.get('coupons')}}</h6>

                <div class="py-3 text-center">
                    <div class="row">
                        <div class="col-md-12 mb-2 text-left" v-for="(coupon,key) in coupons" :key="key">
                            <router-link :to="{name:'store',params:{'id':coupon.branch_id}}">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex px-3">
                                            <div>
                                                <div class="icon">
                                                    <img src="img/icons/common/Offer-image-not-available.svg" alt=""
                                                         class="img-fluid"></div>
                                            </div>
                                            <div class="pl-4">
                                                <h5 class="title text-black font-weight-bold text-capitalize">`
                                                    {{coupon.offerable.code}} `</h5>
                                                <p class="text-default">
                                                    {{$ml.get('coupon_earn')}}
                                                </p>

                                            </div>
                                            <div class="position-absolute display-4 text-danger font-weight-bold"
                                                 :style="$ml.current == 'ar' ? 'left:10px': 'right: 10px'">
                                                <span>{{coupon.offerable.value}} {{coupon.offerable.type == 'value' ?  ' ' + $store.getters.getCurrency : '%'}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>

                <template slot="footer">
                    <base-button type="link"
                                 text-color="white"
                                 @click="modals.modal2 = false">
                        {{this.$ml.get('close')}}
                    </base-button>
                </template>
            </modal>
        </section>
    </div>


</template>
<script>
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    import {ModelSelect} from 'vue-search-select'
    import Tabs from "@/components/Tabs/Tabs.vue";
    import TabPane from "@/components/Tabs/TabPane.vue";
    import Modal from "@/components/Modal.vue";

    export default {
        data() {
            return {
                lang: this.$ml.current,
                current_branch: null,
                branches: [],
                offers: [],
                coupons: [],
                modals: {
                    modal1: false,
                    modal2: false
                }
            }
        },
        mounted() {
            this.getOffersCoupons();
        },
        methods: {
            showOffers(branch) {
                this.current_branch = branch.translated.title
                this.offers = branch.offers;
                this.modals.modal1 = true
            },
            showCoupons(branch) {
                this.current_branch = branch.translated.title
                this.coupons = branch.coupons;
                this.modals.modal2 = true
            },
            getOffersCoupons() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;

                this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.GET_OFFERS_COUPONS, {
                    params: {
                        lang: vm.lang,
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.branches = data.branches
                    }
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {

                    vm.$root.$children[0].$refs.loader.show_loader = false;
                })
            },
        },
        components: {
            Tabs,
            TabPane,
            ModelSelect,
            Modal
        }
    }
</script>
<style scoped>
    .ui.fluid.dropdown {
        background-color: #000 !important;
        color: #fff !important;
    }

    .icon-float {
        position: absolute;
        top: 8px;
        z-index: 99;
    }

    .icon-float i {
        font-size: 25px;
    }

    .search {
        color: #fff !important;
        font-weight: bold !important;
    }


    .ui.fluid.dropdown > .dropdown.icon {
        display: none !important;
    }

    .ui.search.dropdown > .text {
        color: #fff !important;
        font-weight: bold !important;
        top: 4px !important;
    }

    .mt-10 {
        margin-top: 100px;
    }

    .px-4 {
        z-index: 9;
    }

    .bg-gray-50 {
        background-color: #eee;
    }

    .max-h-350 {
        min-height: 150px;
        max-height: 170px;
    }
</style>
