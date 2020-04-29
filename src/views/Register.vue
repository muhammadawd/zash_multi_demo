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
                                                <div class="text-muted text-center mb-3">
                                                    <small>{{this.$ml.get('or_sign_with')}}</small>
                                                </div>
                                                <div class="btn-wrapper text-center">
                                                    <base-button type="neutral" class="text-black btn-block mb-2"
                                                                 @click="googleSign">
                                                        <img slot="icon" src="img/icons/common/google.svg">
                                                        {{this.$ml.get('google')}}
                                                    </base-button>
                                                </div>
                                                <div class="btn-wrapper text-center">
                                                    <base-button type="neutral" class="text-black btn-block mb-2"
                                                                 @click="twitterSign">
                                                        <img slot="icon" src="img/icons/common/twitter.png">
                                                        {{this.$ml.get('twitter')}}
                                                    </base-button>
                                                </div>
                                            </template>
                                            <template>
                                                <div class="text-center text-muted mb-4">
                                                    <small>{{this.$ml.get('sign_with')}}</small>
                                                </div>
                                                <form role="form" @submit.prevent="handleRegister">
                                                    <div class="row">
                                                        <div class="col-12 text-left">
                                                            <base-input alternative
                                                                        class="mb-3"
                                                                        type="text"
                                                                        v-model="first_name"
                                                                        :placeholder="this.$ml.get('first_name')"
                                                                        addon-left-icon="ni ni-satisfied">
                                                            </base-input>
                                                            <small id="first_name"
                                                                   class="position-relative font-weight-bold text-error"
                                                                   style="top: -10px;"></small>
                                                        </div>
                                                        <div class="col-12 text-left">
                                                            <base-input alternative
                                                                        class="mb-3"
                                                                        type="text"
                                                                        v-model="last_name"
                                                                        :placeholder="this.$ml.get('last_name')"
                                                                        addon-left-icon="ni ni-satisfied">
                                                            </base-input>
                                                            <small id="last_name"
                                                                   class="position-relative font-weight-bold text-error"
                                                                   style="top: -10px;"></small>
                                                        </div>
                                                        <div class="col-12 text-left">
                                                            <base-input alternative
                                                                        class="mb-3"
                                                                        type="email"
                                                                        v-model="email"
                                                                        :placeholder="this.$ml.get('email_optional')"
                                                                        addon-left-icon="ni ni-email-83">
                                                            </base-input>
                                                            <small id="email"
                                                                   class="position-relative font-weight-bold text-error"
                                                                   style="top: -10px;"></small>
                                                        </div>
                                                        <div class="col-12 text-left">
                                                            <!--<base-input alternative-->
                                                            <!--class="mb-3"-->
                                                            <!--type="email"-->
                                                            <!--v-model="phone"-->
                                                            <!--:placeholder="this.$ml.get('phone')"-->
                                                            <!--addon-left-icon="ni ni-mobile-button">-->
                                                            <!--</base-input>-->
                                                            <div class="form-group mb-3 input-group input-group-alternative">
                                                                <!---->
                                                                <div class="input-group-prepend">
                                                                    <span class="input-group-text">
                                                                        <i class="ni ni-mobile-button"></i>
                                                                    </span>
                                                                </div>
                                                                <input aria-describedby="addon-right addon-left"
                                                                       v-model="phone"
                                                                       type="text" :placeholder="this.$ml.get('phone')"
                                                                       class="form-control"/>
                                                                <div class="input-group-prepend">
                                                                    <span class="input-group-text">
                                                                        965
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <small id="phone"
                                                                   class="position-relative font-weight-bold text-error"
                                                                   style="top: -10px;"></small>
                                                        </div>
                                                        <!--<div class="col-12 text-center">-->
                                                        <!--<div class="btn-group text-center m-auto direction-inverse button-group round toggle">-->
                                                        <!--<input type="radio" v-model="gender" id="r1"-->
                                                        <!--value="male"-->
                                                        <!--name="r-group">-->
                                                        <!--<label class="btn btn-default" style="border-radius: 0"-->
                                                        <!--for="r1">{{this.$ml.get('male')}}</label>-->
                                                        <!--<input type="radio" v-model="gender" id="r2"-->
                                                        <!--value="female"-->
                                                        <!--name="r-group">-->
                                                        <!--<label class="btn btn-default" style="border-radius: 0"-->
                                                        <!--for="r2">{{this.$ml.get('female')}}</label>-->
                                                        <!--</div>-->
                                                        <!--</div>-->
                                                        <div class="col-12 text-left">
                                                            <base-input alternative
                                                                        type="password"
                                                                        v-model="password"
                                                                        :placeholder="this.$ml.get('password')"
                                                                        addon-left-icon="ni ni-lock-circle-open">
                                                            </base-input>
                                                            <small id="password"
                                                                   class="position-relative font-weight-bold text-error"
                                                                   style="top: -10px;"></small>
                                                        </div>
                                                        <div class="col-12 text-left">
                                                            <base-input alternative
                                                                        type="password"
                                                                        v-model="password_confirmation"
                                                                        :placeholder="this.$ml.get('confirm_password')"
                                                                        addon-left-icon="ni ni-lock-circle-open">
                                                            </base-input>
                                                            <small id="password_confirmation"
                                                                   class="position-relative font-weight-bold text-error"
                                                                   style="top: -10px;"></small>
                                                        </div>
                                                        <!--<div class="col-12 text-left">-->
                                                        <!--<base-input alternative-->
                                                        <!--addon-left-icon="ni ni-calendar-grid-58">-->
                                                        <!--<flat-picker slot-scope="{focus, blur}"-->
                                                        <!--@on-open="focus"-->
                                                        <!--@on-close="blur"-->
                                                        <!--:config="{allowInput: true}"-->
                                                        <!--class="form-control datepicker"-->
                                                        <!--v-model="date_birth">-->
                                                        <!--</flat-picker>-->
                                                        <!--</base-input>-->
                                                        <!--<small id="date_birth"-->
                                                        <!--class="position-relative font-weight-bold text-error"-->
                                                        <!--style="top: -10px;"></small>-->
                                                        <!--</div>-->
                                                    </div>
                                                    <div class="text-left">
                                                        <vue-recaptcha class="m-auto" :loadRecaptchaScript="true"
                                                                       @verify="onCaptchaVerified"
                                                                       sitekey="6LdWQj0UAAAAAIK0lw1Vt_e2kk_uUzKWe56gUHMU"></vue-recaptcha>
                                                        <small id="recaptchaToken"
                                                               class="position-relative font-weight-bold text-error"
                                                               style="top: -10px;"></small>
                                                    </div>
                                                    <div class="text-center">
                                                        <base-button type="default" class="my-4 bg-black"
                                                                     @click="handleRegister">
                                                            {{this.$ml.get('register')}}
                                                        </base-button>
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
                                                <router-link :to="{name:'login'}" class="text-black">
                                                    <small>{{this.$ml.get('have_account')}}</small>
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
    import flatPicker from "vue-flatpickr-component";
    import "flatpickr/dist/flatpickr.css";
    import VueRecaptcha from 'vue-recaptcha';
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    const LoginWithTwitter = require('login-with-twitter')

    export default {
        data() {
            return {
                date_birth: new Date(),
                lang: this.$ml.current,
                recaptchaToken: null,
                first_name: null,
                last_name: null,
                phone: null,
                email: null,
                password: null,
                password_confirmation: null,
                gender: 'male',
                isSignIn: false,
            }
        },
        methods: {
            ...mapActions([
                'checkStorage',
                'addAuthUser'
            ]),
            onCaptchaVerified(recaptchaToken) {
                this.recaptchaToken = recaptchaToken;
            },
            handleRegister() {
                let vm = this;
                let request_data = vm.prepareRequestData();
                console.log(request_data)
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.REGISTER, request_data)
                    .then((resp) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        let status = resp.data.status;
                        let data = resp.data.data;
                        if (!status) {
                            vm.showVaildationMassges(data.validation_errors);
                            return;
                        }
                        vm.$router.push({name: 'phone_verification', params: {phone: request_data.phone}})
                        // location.reload()
                    })
                    .catch((err) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;

                    })
            },
            handleGoogleRegister(request_data) {
                let vm = this;
                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.REGISTER_GOOGLE, request_data)
                    .then((resp) => {
                        console.log(resp.data)
                        let status = resp.data.status;
                        let data = resp.data.data;
                        if (!status) {
                            vm.showVaildationMassges(data.validation_errors);
                            return;
                        }
                        localStorage.setItem('auth', JSON.stringify(data));
                        vm.$store.dispatch('addAuthUser', data);
                        if (vm.$route.query.nextUrl) {
                            vm.$router.push({name: vm.$route.query.nextUrl})
                            return;
                        }
                        vm.$router.push({name: 'home'});
                        location.reload()
                    })
                    .catch((err) => {

                    })
            },
            prepareRequestData() {
                let vm = this;
                $('.text-error').text('');
                return {
                    recaptchaToken: vm.recaptchaToken,
                    first_name: vm.first_name,
                    last_name: vm.last_name,
                    phone: vm.phone,
                    email: vm.email,
                    password: vm.password,
                    password_confirmation: vm.password_confirmation,
                    gender: vm.gender,
                    date_birth: vm.date_birth,
                    lang: vm.lang,
                }
            },
            showVaildationMassges(errors) {
                $('#first_name, #last_name, #phone, #email, #password, #password_confirmation, #gender, #recaptchaToken, #date_birth').text('');
                $.each(errors, function (key, error) {
                    $('#' + key).text(error[0])
                })
            },
            googleSign() {
                let vm = this;
                vm.$gAuth.signIn()
                    .then(GoogleUser => {
                        let request_data = {
                            // id: GoogleUser.getBasicProfile().getId(),
                            // email: GoogleUser.getBasicProfile().getEmail(),
                            // full_name: GoogleUser.getBasicProfile().getName(),
                            // first_name: GoogleUser.getBasicProfile().getGivenName(),
                            // last_name: GoogleUser.getBasicProfile().getFamilyName(),
                            // avatar: GoogleUser.getBasicProfile().getImageUrl(),
                            token: GoogleUser.getAuthResponse().access_token,
                            id_token: GoogleUser.getAuthResponse().id_token,
                            provider: 'google'
                        };

                        vm.handleGoogleRegister(request_data);

                        this.isSignIn = this.$gAuth.isAuthorized
                    })
                    .catch(error => {
                        //on fail do something
                        console.log(error)
                    })
            },
            twitterSign() {
                let vm = this;
                let url = 'https://rnpdelivery.com/auth/twitter/callback';
                if (vm.$route.query.nextUrl) {
                    url += '?nextUrl=' + vm.$route.query.nextUrl;
                }
                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.AUTH_TWITTER, {
                    callback: url
                })
                    .then((resp) => {
                        let oauth_token = resp.data.oauth_token;
                        localStorage.setItem('twitter_keys', JSON.stringify(resp.data));
                        location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`
                    })
                    .catch((err) => {
                    });
                return '';
                // console.log(this.$auth.auth)
                // this.$auth.authenticate('twitter').then(response => {
                //
                //     console.log(response)
                //
                // }).catch(err => {
                //     console.log({err: err})
                // })

            },
        },
        mounted() {
            let vm = this;
            vm.checkStorage();
        },
        computed: {
            ...mapState([
                'auth'
            ]),
        },
        components: {VueRecaptcha, flatPicker}
    }
</script>
<style scoped>
    .text-error {
        color: #f00
    }

    .button-group input {
        display: none;
    }

    .button-group input:checked + label,
    .button-group input:checked + label:active {
        background-color: #2dce89bf;
    }
</style>
