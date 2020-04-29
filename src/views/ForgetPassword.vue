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
                                <div class="row mb-5">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-6 mt-5 mb-5">
                                        <card type="secondary" shadow
                                              header-classes="bg-white pb-5"
                                              body-classes="px-lg-5 mt-5 py-lg-5"
                                              class="border-0">
                                            <template>
                                                <div class="text-muted text-center mb-3">
                                                    <h4 class="display-4" style="font-size: 18px">
                                                        {{this.$ml.get('type_mail_reset')}}</h4>
                                                </div>
                                            </template>
                                            <template>
                                                <div class="text-center text-muted mb-4"></div>
                                                <form role="form" v-if="!reset_sent">
                                                    <div class="row">

                                                        <div class="col-12 text-left">
                                                            <base-input alternative
                                                            class="mb-3"
                                                            type="email"
                                                            v-model="email"
                                                            :placeholder="this.$ml.get('email')"
                                                            addon-left-icon="ni ni-email-83">
                                                            </base-input>
                                                            <!--<div class="form-group mb-3 input-group input-group-alternative">-->
                                                                <!--<div class="input-group-prepend">-->
                                                                    <!--<span class="input-group-text">-->
                                                                        <!--<i class="ni ni-mobile-button"></i>-->
                                                                    <!--</span>-->
                                                                <!--</div>-->
                                                                <!--<input aria-describedby="addon-right addon-left"-->
                                                                       <!--v-model="email"-->
                                                                       <!--type="text" :placeholder="this.$ml.get('phone')"-->
                                                                       <!--class="form-control">-->
                                                                <!--<div class="input-group-prepend">-->
                                                                    <!--<span class="input-group-text">-->
                                                                        <!--965-->
                                                                    <!--</span>-->
                                                                <!--</div>-->
                                                            <!--</div>-->
                                                            <small id="email"
                                                                   class="position-relative font-weight-bold text-danger"
                                                                   style="top: -10px;"></small>
                                                        </div>
                                                        <div class="col-12 text-center">
                                                            <base-button type="default" class="my-4 bg-black"
                                                                         @click="resetPassword">
                                                                {{this.$ml.get('forget_password')}}
                                                            </base-button>
                                                        </div>

                                                    </div>
                                                </form>

                                                <base-alert type="info" v-if="reset_sent" class="text-left">
                                                    <span slot="text"><strong>{{this.$ml.get('info')}}</strong> <br> {{this.$ml.get('reset_sent')}}</span>
                                                </base-alert>

                                            </template>
                                        </card>
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

    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        data() {
            return {
                reset_sent: false,
                lang: this.$ml.current,
                email: null,
                callback_url: window.location.origin + '/reset_password',
            }
        },
        methods: {
            resetPassword() {
                let vm = this;
                let request_data = {
                    email: vm.email,
                    lang: vm.lang,
                    callback_url: vm.callback_url
                };
                // vm.$refs.loader.show_loader = true;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                this.$apiServiesRoutes.API().post(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.RESET_PASSWORD, request_data)
                    .then((resp) => {
                        let status = resp.data.status;
                        let data = resp.data.data;
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        if (!status) {
                            vm.showVaildationMassges(data.validation_errors);
                            return;
                        }
                        vm.reset_sent = true;
                    })
                    .catch((err) => {

                        vm.$root.$children[0].$refs.loader.show_loader = false;
                    })
            },
            showVaildationMassges(errors) {
                $('#first_name, #last_name, #phone, #email, #password, #password_confirmation, #gender, #recaptchaToken, #date_birth').text('');
                $.each(errors, function (key, error) {
                    $('#' + key).text(error[0])
                })
            },
        },
        components: {}
    }
</script>
<style scoped>


</style>
