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
                                    <div class="col-md-6 mt-5">
                                        <card type="secondary" shadow
                                              header-classes="bg-white pb-5"
                                              body-classes="px-lg-5 py-lg-5"
                                              class="border-0">
                                            <template>
                                                <div class="text-center text-muted mb-4">
                                                    <h4 class="font-weight-bold p-0 m-1">
                                                        {{this.$ml.get('phone_verification')}}</h4>
                                                    <br>
                                                    <h6>{{this.$ml.get('verify_msg')}}</h6>
                                                </div>
                                                <form role="form" @submit.prevent="handleVerification">
                                                    <div class="row">

                                                        <div class="col-12 text-left">
                                                            <base-input alternative
                                                                        class="mb-3"
                                                                        type="text"
                                                                        v-model="phone"
                                                                        :placeholder="this.$ml.get('phone')"
                                                                        addon-left-icon="ni ni-mobile-button">
                                                            </base-input>
                                                            <small id="phone"
                                                                   class="position-relative font-weight-bold text-error"
                                                                   style="top: -10px;"></small>
                                                            <!--<div v-if="resend_mail && email"-->
                                                            <!--class="text-left font-weight-bold p-1">-->
                                                            <!--<a href="" @click.prevent="resendMail"-->
                                                            <!--class="text-info">{{this.$ml.get('resend_mail')}}</a>-->
                                                            <!--</div>-->

                                                        </div>
                                                        <div class="col-12 text-left">
                                                            <base-input alternative
                                                                        type="text"
                                                                        v-model="token"
                                                                        :placeholder="this.$ml.get('code')"
                                                                        addon-left-icon="ni ni-lock-circle-open">
                                                            </base-input>
                                                            <small id="token"
                                                                   class="position-relative font-weight-bold text-error"
                                                                   style="top: -10px;"></small>
                                                            <div>
                                                                <div v-if="resend && phone"
                                                                     class="text-left font-weight-bold p-1">
                                                                    <a href="" @click.prevent="resendCode"
                                                                       class="text-info">{{this.$ml.get('resend')}}</a>
                                                                </div>
                                                                <h5 class="font-weight-bold" v-if="counter">
                                                                    <small>{{$ml.get('wait_resend')}}</small>
                                                                    {{counter}}
                                                                    <small>{{$ml.get('seconds')}}</small>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div class="col-12 text-center">
                                                            <base-button type="default" class="my-4 bg-black"
                                                                         @click="handleVerification">
                                                                {{this.$ml.get('verify')}}
                                                            </base-button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </template>
                                        </card>
                                        <div class="row mt-3">
                                            <div class="col-6 text-left">
                                                <router-link :to="{name:'forget_password'}" class="text-black">
                                                    <small>{{this.$ml.get('forget_password')}}</small>
                                                </router-link>
                                            </div>
                                            <div class="col-6 text-right">
                                                <router-link :to="{name:'register'}" class="text-black">
                                                    <small>{{this.$ml.get('create_account')}}</small>
                                                </router-link>
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
    import {mapState, mapActions} from 'vuex'
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        data() {
            return {
                lang: this.$ml.current,
                phone: null,
                token: null,
                resend: false,
                counter: 60,
            }
        },
        mounted() {
            let vm = this;
            vm.phone = vm.$route.params.phone;
            vm.checkStorage();
            vm.countDown();
        },
        methods: {
            ...mapActions([
                'checkStorage',
                'addAuthUser'
            ]),
            countDown() {
                let vm = this;

                let interval = setInterval(() => {
                    if (vm.counter == 1) {
                        clearInterval(interval);
                        vm.resend = true;
                    }
                    vm.counter -= 1;
                }, 1000)
            },
            handleVerification() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let request_data = vm.prepareRequestData();
                this.$apiServiesRoutes.API().post(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.VERFICATION_PHONE, request_data)
                    .then((resp) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        let status = resp.data.status;
                        let data = resp.data.data;
                        let errors = resp.data.errors;
                        if (!status) {
                            vm.showVaildationMassges(data.validation_errors);
                            return;
                        }
                        vm.$router.push({name: 'login'})
                        location.reload()
                    })
                    .catch((err) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;

                    })
            },
            prepareRequestData() {
                let vm = this;
                return {
                    phone: vm.phone,
                    token: vm.token,
                    lang: vm.lang,
                }
            },
            showVaildationMassges(errors) {
                console.log(errors)
                $('#first_name, #last_name, #phone, #email, #password, #password_confirmation, #gender, #recaptchaToken, #token').text('');
                $.each(errors, function (key, error) {
                    $('#' + key).text(error[0])
                })
            },
            showErrorsMassges(errors) {
                let vm = this;
                $.each(errors, function (key, error) {
                    if (error === 'EMAIL_NOT_VERIFIED') vm.resend_mail = true;
                });
            },
            resendCode() {
                let vm = this;
                let request_data = {
                    phone: this.phone
                };
                this.$apiServiesRoutes.API().post(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.RESEND_VERFICATION_PHONE, request_data)
                    .then((resp) => {
                        let status = resp.data.status;
                        let data = resp.data.data;
                        if (!status) {
                            vm.resend = false;
                            vm.counter = 60;
                            return;
                        }
                        vm.resend = false;
                        vm.counter = 60;
                        vm.countDown();
                    })
                    .catch((err) => {

                    })
            }
        },
        components: {},
        computed: {
            ...mapState([
                'auth'
            ]),
        }
    }
</script>
<style scoped>
    .text-error {
        color: #F00;
    }

</style>
