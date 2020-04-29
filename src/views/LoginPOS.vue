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
                                                <form role="form" @submit.prevent="handleLogin">
                                                    <div class="row">

                                                        <div class="col-12 text-left">
                                                            <h3 class="text-center font-weight-bold">Admin - Point Of
                                                                Sale</h3>
                                                        </div>
                                                        <div class="col-12 text-left">
                                                            <base-input alternative
                                                                        class="mb-3"
                                                                        type="email"
                                                                        v-model="email"
                                                                        :placeholder="this.$ml.get('name')"
                                                                        addon-left-icon="ni ni-email-83">
                                                            </base-input>
                                                            <small id="username"
                                                                   class="position-relative font-weight-bold text-error"
                                                                   style="top: -10px;"></small>
                                                            <div v-if="resend_mail && email"
                                                                 class="text-left font-weight-bold p-1">
                                                                <a href="" @click.prevent="resendMail"
                                                                   class="text-info">{{this.$ml.get('resend_mail')}}</a>
                                                            </div>

                                                        </div>
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
                email: null,
                password: null,
                resend_mail: false,
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
                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.LOGIN_ADMIN, request_data)
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
                        localStorage.setItem('auth_pos', JSON.stringify(data));
                        if (vm.$route.query.nextUrl) {
                            vm.$router.push({name: vm.$route.query.nextUrl});
                            location.reload()
                            return;
                        }
                        vm.$router.push({name: 'pos'})
                        location.reload()
                    })
                    .catch((err) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;

                    })
            },
            handleGoogleLogin(request_data) {
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
                return {
                    username: vm.email,
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
                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.RESEND_VERFICATION_MAIL, request_data)
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

    .text-error{
        color: #f00;
    }

</style>
