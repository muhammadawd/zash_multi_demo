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
                                    <div class="col-md-3"></div>
                                    <div class="col-md-12 mt-5">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <card type="secondary" shadow
                                                      header-classes="bg-white pb-5"
                                                      class="border-0">
                                                    <template>
                                                        <div class="text-muted text-center mb-3">
                                                            <span class="display-4 text-black" style="font-size: 18px">{{this.$ml.get('map')}}</span>
                                                        </div>
                                                    </template>
                                                    <template  v-if="branch_info">
                                                        <div v-html="branch_info.map_frame"></div>
                                                    </template>
                                                </card>
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
    import VueRecaptcha from 'vue-recaptcha';
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        data() {
            return {

                lang: this.$ml.current,
                branch_info: null,
            }
        },
        mounted() {
            this.getStoreInfo(1);
        },
        methods: {
            getStoreInfo(id) {
                let vm = this;
                this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.FIND_STORE_INFO + `/${id}`, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        console.log(data.branch)
                        vm.branch_info = data.branch;
                    }
                }).catch((error) => {

                })
            },
        },
        components: {VueRecaptcha}
    }
</script>
<style >
    .text-xs-center {
        text-align: center;
    }
    iframe{
        width: 100%!important;
    }

    .g-recaptcha {
        display: inline-block;
    }
</style>
