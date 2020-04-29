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
                                                        {{this.$ml.get('change_password_reset')}}</h4>
                                                </div>
                                            </template>
                                            <template>
                                                <div class="text-center text-muted mb-4"></div>
                                                <form role="form">
                                                    <div class="row">

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
                                                            <small id="token"
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
                                                        <div class="col-12 text-center">
                                                            <base-button type="default" class="my-4 bg-black"
                                                                         @click="resetPassword">
                                                                {{this.$ml.get('change_password')}}
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

    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        data() {
            return {
                password: null,
                lang: this.$ml.current,
                password_confirmation: null
            }
        },
        methods: {
            resetPassword() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let request_data = {
                    token: vm.$route.params.token,
                    password: vm.password,
                    lang: vm.lang,
                    password_confirmation: vm.password_confirmation,
                };
                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.UPDATE_PASSWORD, request_data)
                    .then((resp) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        let status = resp.data.status;
                        let data = resp.data.data;
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
            showVaildationMassges(errors) {
                $('#first_name, #last_name, #phone, #email, #password, #password_confirmation, #token, #recaptchaToken, #date_birth').text('');
                $.each(errors, function (key, error) {
                    $('#' + key).text(error[0])
                })
            },
        },
        components: {}
    }
</script>
<style scoped>

.text-error{
    color: #f00;
}
</style>
