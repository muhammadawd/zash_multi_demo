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
                                    <div class="col-md-12">

                                        <tabs fill class="flex-column flex-md-row">
                                            <card shadow style="background: #eee">
<!--                                                <tab-pane :title="this.$ml.get('contact_us')" style="min-height: 400px">-->

                                                    <card type="secondary" shadow
                                                          header-classes="bg-white pb-5"
                                                          body-classes="px-lg-5 py-lg-5"
                                                          class="border-0">
                                                        <template>
                                                            <div class="text-center text-muted mb-4"></div>
                                                            <h3 class="display-4 text-left">
                                                                {{$ml.get('contact_us')}}</h3>
                                                            <form role="form">
                                                                <base-input alternative
                                                                            class="mb-3"
                                                                            type="text"
                                                                            v-model="contact_name"
                                                                            :placeholder="this.$ml.get('name')"
                                                                            addon-left-icon="ni ni-satisfied">
                                                                </base-input>
                                                                <div class="text-black text-left"
                                                                     id="contact_name"></div>
                                                                <base-input alternative
                                                                            class="mb-3"
                                                                            type="number"
                                                                            v-model="contact_phone"
                                                                            :placeholder="this.$ml.get('phone')"
                                                                            addon-left-icon="ni ni-satisfied">
                                                                </base-input>
                                                                <div class="text-black text-left"
                                                                     id="contact_phone"></div>
                                                                <base-input alternative
                                                                            class="mb-3"
                                                                            type="email"
                                                                            v-model="contact_email"
                                                                            :placeholder="this.$ml.get('email')"
                                                                            addon-left-icon="ni ni-email-83">
                                                                </base-input>
                                                                <div class="text-black text-left"
                                                                     id="contact_email"></div>
                                                                <textarea class="form-control form-control-alternative"
                                                                          v-model="contact_message"
                                                                          :placeholder="this.$ml.get('message')"
                                                                          rows="4"></textarea>
                                                                <div class="text-black text-left"
                                                                     id="contact_message"></div>
                                                                <div class="text-center">
                                                                </div>
                                                                <div class="text-center">
                                                                    <base-button type="default" class="my-4 bg-black"
                                                                                 @click="saveContact()">
                                                                        {{this.$ml.get('send')}}
                                                                    </base-button>
                                                                </div>
                                                            </form>
                                                        </template>
                                                    </card>
<!--                                                </tab-pane>-->
<!--                                                <tab-pane :title="this.$ml.get('join_us')" style="min-height: 400px">-->

<!--                                                    <card type="secondary" shadow-->
<!--                                                          header-classes="bg-white pb-5"-->
<!--                                                          body-classes="px-lg-5 py-lg-5"-->
<!--                                                          class="border-0">-->
<!--                                                        <template>-->
<!--                                                            <div class="text-center text-muted mb-4"></div>-->
<!--                                                            <h3 class="display-4 text-left">{{$ml.get('join_us')}}</h3>-->
<!--                                                            <form role="form">-->
<!--                                                                <base-input alternative-->
<!--                                                                            class="mb-3"-->
<!--                                                                            type="text"-->
<!--                                                                            v-model="join_first_name"-->
<!--                                                                            :placeholder="this.$ml.get('first_name')"-->
<!--                                                                            addon-left-icon="ni ni-satisfied">-->
<!--                                                                </base-input>-->
<!--                                                                <div class="text-black text-left"-->
<!--                                                                     id="join_first_name"></div>-->
<!--                                                                <base-input alternative-->
<!--                                                                            class="mb-3"-->
<!--                                                                            type="text"-->
<!--                                                                            v-model="join_last_name"-->
<!--                                                                            :placeholder="this.$ml.get('last_name')"-->
<!--                                                                            addon-left-icon="ni ni-satisfied">-->
<!--                                                                </base-input>-->
<!--                                                                <div class="text-black text-left"-->
<!--                                                                     id="join_last_name"></div>-->
<!--                                                                <base-input alternative-->
<!--                                                                            class="mb-3"-->
<!--                                                                            type="text"-->
<!--                                                                            v-model="join_branch_name"-->
<!--                                                                            :placeholder="this.$ml.get('branch_name')"-->
<!--                                                                            addon-left-icon="fa fa-user fa-lg">-->
<!--                                                                </base-input>-->
<!--                                                                <div class="text-black text-left"-->
<!--                                                                     id="join_branch_name"></div>-->
<!--                                                                <base-input alternative-->
<!--                                                                            class="mb-3"-->
<!--                                                                            type="number"-->
<!--                                                                            v-model="join_phone"-->
<!--                                                                            :placeholder="this.$ml.get('phone')"-->
<!--                                                                            addon-left-icon="fa fa-phone fa-lg">-->
<!--                                                                </base-input>-->
<!--                                                                <div class="text-black text-left" id="join_phone"></div>-->
<!--                                                                <base-input alternative-->
<!--                                                                            class="mb-3"-->
<!--                                                                            type="email"-->
<!--                                                                            v-model="join_email"-->
<!--                                                                            :placeholder="this.$ml.get('email')"-->
<!--                                                                            addon-left-icon="ni ni-email-83">-->
<!--                                                                </base-input>-->
<!--                                                                <div class="text-black text-left" id="join_email"></div>-->
<!--                                                                <select class="form-control form-control-alternative mb-3"-->
<!--                                                                        v-model="join_gov_id">-->
<!--                                                                    <option v-for="(govern,k) in addresses"-->
<!--                                                                            :key="k"-->
<!--                                                                            :value="govern.id">-->
<!--                                                                        {{govern.translated.name}}-->
<!--                                                                    </option>-->
<!--                                                                </select>-->
<!--                                                                <div class="text-black text-left"-->
<!--                                                                     id="join_address_id"></div>-->
<!--                                                                <select class="form-control form-control-alternative  mb-3"-->
<!--                                                                        v-if="addresses.length > 0"-->
<!--                                                                        v-model="join_city_id">-->
<!--                                                                    <option v-for="(city,k) in addresses[0].cities"-->
<!--                                                                            :value="city.id"-->
<!--                                                                            :key="k"-->
<!--                                                                            :selected="k == 0">-->
<!--                                                                        {{city.translated.name}}-->
<!--                                                                    </option>-->
<!--                                                                </select>-->
<!--                                                                <base-input alternative-->
<!--                                                                            class="mb-3"-->
<!--                                                                            type="text"-->
<!--                                                                            v-model="join_street"-->
<!--                                                                            :placeholder="this.$ml.get('street')"-->
<!--                                                                            addon-left-icon="fa fa-map fa-lg">-->
<!--                                                                </base-input>-->
<!--                                                                <div class="text-black text-left"-->
<!--                                                                     id="join_full_address"></div>-->
<!--                                                                <div class="text-center">-->
<!--                                                                    <vue-recaptcha class="m-auto"-->
<!--                                                                                   :loadRecaptchaScript="true"-->
<!--                                                                                   @verify="onCaptchaVerified"-->
<!--                                                                                   sitekey="6LdWQj0UAAAAAIK0lw1Vt_e2kk_uUzKWe56gUHMU"></vue-recaptcha>-->
<!--                                                                </div>-->
<!--                                                                <div class="text-black text-left"-->
<!--                                                                     id="join_recaptchaToken"></div>-->
<!--                                                                <div class="text-center">-->
<!--                                                                    <base-button type="default" class="my-4 bg-black"-->
<!--                                                                                 @click="saveJoinUs()">-->
<!--                                                                        {{this.$ml.get('register')}}-->
<!--                                                                    </base-button>-->
<!--                                                                </div>-->
<!--                                                            </form>-->
<!--                                                        </template>-->
<!--                                                    </card>-->
<!--                                                </tab-pane>-->


                                            </card>
                                        </tabs>
                                    </div>
                                    <div class="col-md-7 mt-5">
                                    </div>
                                    <div class="col-md-5 mt-5">
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
    import VueRecaptcha from 'vue-recaptcha';
    import Tabs from "@/components/Tabs/Tabs.vue";
    import TabPane from "@/components/Tabs/TabPane.vue";

    export default {
        data() {
            return {
                addresses: [],
                lang: this.$ml.current,
                recaptchaToken: null,
                join_first_name: null,
                join_last_name: null,
                join_branch_name: null,
                join_phone: null,
                join_email: null,
                join_gov_id: 1,
                join_city_id: 1,
                join_street: null,
                contact_name: null,
                contact_phone: null,
                contact_email: null,
                contact_message: null,
            }
        },
        mounted() {
            this.getAddress();
        },
        methods: {
            onCaptchaVerified(recaptchaToken) {
                this.recaptchaToken = recaptchaToken;
            },
            saveJoinUs() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let request_data = {
                    address_id: vm.join_city_id,
                    phone: vm.join_phone,
                    email: vm.join_email,
                    full_address: vm.join_street,
                    branch_name: vm.join_branch_name,
                    first_name: vm.join_first_name,
                    last_name: vm.join_last_name,
                    recaptchaToken: vm.recaptchaToken,
                };
                //CREATE_VENDOR

                this.$apiServiesRoutes.API().post(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.CREATE_VENDOR, request_data).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    if (!status) {
                        vm.showVaildationMassges(data.validation_errors, 'join_');
                        return;
                    }
                    vm.$swal({
                        title: vm.$ml.get('success'),
                        type: 'success',
                        timer: 1000
                    })
                    vm.resetForm()
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;

                })
                // console.log(request_data)
            },
            showVaildationMassges(errors, tag) {
                $(`#${tag}first_name, #${tag}last_name,#${tag}branch_name, #${tag}phone, #${tag}email, #${tag}recaptchaToken, #${tag}message`).text('');
                $.each(errors, function (key, error) {
                    $('#' + tag + key).text(error[0])
                })
            },
            resetForm() {
                let vm = this;
                vm.join_city_id = 1;
                vm.join_phone = null;
                vm.join_email = null;
                vm.join_street = null;
                vm.join_branch_name = null;
                vm.join_first_name = null;
                vm.join_last_name = null;
                vm.contact_name = null;
                vm.contact_phone = null;
                vm.contact_email = null;
                vm.contact_message = null;
                vm.recaptchaToken = null;
            },
            saveContact() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let request_data = {
                    phone: vm.contact_phone,
                    email: vm.contact_email,
                    name: vm.contact_name,
                    message: vm.contact_message,
                    recaptchaToken: vm.recaptchaToken,
                };
                //CREATE_CONTACT_US

                this.$apiServiesRoutes.API().post(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.CREATE_CONTACT_US, request_data).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    if (!status) {
                        vm.showVaildationMassges(data.validation_errors, 'contact_');
                        return;
                    }
                    vm.$swal({
                        title: vm.$ml.get('success'),
                        type: 'success',
                        timer: 1000
                    })
                    vm.resetForm()
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;

                })
                // console.log(request_data)
            },
            getAddress() {
                // GET_COUNTRIES_CITIES
                let vm = this;
                this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.GET_COUNTRIES_CITIES, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.addresses = data.governorates;
                    }
                }).catch((error) => {
                    vm.addresses = []
                })
            },
        },
        components: {
            VueRecaptcha,
            Tabs,
            TabPane
        }
    }
</script>
<style scoped>
    .text-xs-center {
        text-align: center;
    }

    .g-recaptcha {
        display: inline-block;
    }
</style>
