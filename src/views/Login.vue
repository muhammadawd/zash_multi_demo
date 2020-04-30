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
                                                <form role="form" @submit.prevent="handleLogin">
                                                    <div class="row">

                                                        <div class="col-12 text-left">
                                                            <base-input alternative
                                                                        class="mb-3"
                                                                        type="email"
                                                                        v-model="email"
                                                                        :placeholder="this.$ml.get('email')"
                                                                        addon-left-icon="ni ni-email-83">
                                                            </base-input>
                                                            <small id="email"
                                                                   class="position-relative font-weight-bold text-error"
                                                                   style="top: -10px;"></small>
                                                            <div v-if="resend_mail && email"
                                                                 class="text-left font-weight-bold p-1">
                                                                <a href="" @click.prevent="resendMail"
                                                                   class="text-info">{{this.$ml.get('resend_mail')}}</a>
                                                            </div>
                                                            <div v-if="resend_code && email"
                                                                 class="text-left font-weight-bold p-1">
                                                                <a href=""
                                                                   @click.prevent="$router.push({name: 'phone_verification', params: {phone: email}})"
                                                                   class="text-info">{{this.$ml.get('verify')}}</a>
                                                            </div>
                                                        </div>

                                                        <!--<div class="col-12 text-left">-->
                                                        <!--<div class="form-group mb-3 input-group input-group-alternative">-->
                                                        <!--&lt;!&ndash;&ndash;&gt;-->
                                                        <!--<div class="input-group-prepend">-->
                                                        <!--<span class="input-group-text">-->
                                                        <!--<i class="ni ni-mobile-button"></i>-->
                                                        <!--</span>-->
                                                        <!--</div>-->
                                                        <!--<input aria-describedby="addon-right addon-left"-->
                                                        <!--v-model="phone"-->
                                                        <!--type="text"-->
                                                        <!--:placeholder="this.$ml.get('phone')"-->
                                                        <!--class="form-control"/>-->
                                                        <!--<div class="input-group-prepend">-->
                                                        <!--<span class="input-group-text">-->
                                                        <!--965-->
                                                        <!--</span>-->
                                                        <!--</div>-->
                                                        <!--</div>-->

                                                        <!--<div v-if="resend_code && phone"-->
                                                        <!--class="text-left font-weight-bold p-1">-->
                                                        <!--<a href=""-->
                                                        <!--@click.prevent="$router.push({name: 'phone_verification', params: {phone: email}})"-->
                                                        <!--class="text-info">{{this.$ml.get('verify')}}</a>-->
                                                        <!--</div>-->
                                                        <!--<small id="phone"-->
                                                        <!--class="position-relative font-weight-bold text-error"-->
                                                        <!--style="top: -10px;"></small>-->
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
                                                        <div class="col-12 text-center">
                                                            <base-button type="default" class="my-4 bg-black"
                                                                         @click="handleLogin">
                                                                {{this.$ml.get('sign_in')}}
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
                email: null,
                password: null,
                resend_mail: false,
                resend_code: false,
                isSignIn: false,
            }
        },
        mounted() {
            let vm = this;
            vm.checkStorage();
        },
        methods: {
            ...mapActions([
                'checkStorage',
                'addAuthUser'
            ]),
            handleLogin() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let request_data = vm.prepareRequestData();
                this.$apiServiesRoutes.API().post(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.LOGIN, request_data)
                    .then((resp) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        let status = resp.data.status;
                        let data = resp.data.data;
                        let errors = resp.data.errors;
                        if (!status) {
                            vm.showVaildationMassges(data.validation_errors);
                            vm.showErrorsMassges(errors);
                            return;
                        }
                        localStorage.setItem('auth', JSON.stringify(data));
                        vm.$store.dispatch('addAuthUser', data);
                        console.log(data)
                        if (vm.$route.query.nextUrl) {
                            vm.$router.push({name: vm.$route.query.nextUrl});
                            location.reload()
                            return;
                        }
                        console.log(data)
                        vm.$router.push({name: 'home'})
                        location.reload()
                    })
                    .catch((err) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;

                    })
            },
            handleGoogleLogin(request_data) {
                let vm = this;
                this.$apiServiesRoutes.API().post(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.REGISTER_GOOGLE, request_data)
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
                            vm.$router.push({name: vm.$route.query.nextUrl});
                            location.reload();
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
                $('.text-error').text('')
                return {
                    email: vm.email,
                    password: vm.password,
                    lang: vm.lang,
                }
            },
            showVaildationMassges(errors) {
                $('#first_name, #last_name, #phone, #email, #password, #password_confirmation, #gender, #recaptchaToken, #date_birth').text('');
                $.each(errors, function (key, error) {
                    $('#' + key).text(error[0])
                })
            },
            showErrorsMassges(errors) {
                let vm = this;
                $.each(errors, function (key, error) {
                    if (error === 'EMAIL_NOT_VERIFIED') vm.resend_mail = true;
                    if (error === 'PHONE_NOT_VERIFIED') vm.resend_code = true;
                });
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

                        vm.handleGoogleLogin(request_data);

                        this.isSignIn = this.$gAuth.isAuthorized
                    })
                    .catch(error => {
                        //on fail do something
                        console.log(error)
                    })
            },
            resendMail() {
                let vm = this;
                let request_data = {
                    email: this.email
                }
                this.$apiServiesRoutes.API().post(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.RESEND_VERFICATION_MAIL, request_data)
                    .then((resp) => {
                        let status = resp.data.status;
                        let data = resp.data.data;
                        if (!status) {
                            vm.resend_mail = false;
                            return;
                        }
                        vm.resend_mail = false;
                    })
                    .catch((err) => {

                    })
            },
            twitterSign() {
                let vm = this;
                let url = process.env.VUE_APP_TWITTER_CALLBACK;
                if (vm.$route.query.nextUrl) {
                    url += '?nextUrl=' + vm.$route.query.nextUrl;
                }
                this.$apiServiesRoutes.API().post(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.AUTH_TWITTER, {
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
