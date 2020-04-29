<template>
    <form role="form">
        <div class="row">
            <div class="col-md-12">
                <base-input alternative
                            class="mb-3"
                            type="text"
                            v-model="first_name"
                            :placeholder="this.$ml.get('first_name')"
                            addon-left-icon="ni ni-satisfied">
                </base-input>
                <small id="first_name"
                       class="position-relative font-weight-bold text-danger"
                       style="top: -10px;"></small>
            </div>
            <div class="col-md-12">
                <base-input alternative
                            class="mb-3"
                            type="text"
                            v-model="last_name"
                            :placeholder="this.$ml.get('last_name')"
                            addon-left-icon="ni ni-satisfied">
                </base-input>
                <small id="last_name"
                       class="position-relative font-weight-bold text-danger"
                       style="top: -10px;"></small>
            </div>
            <div class="col-md-6">
                <base-input alternative
                            addon-left-icon="ni ni-calendar-grid-58">
                    <flat-picker slot-scope="{focus, blur}"
                                 @on-open="focus"
                                 @on-close="blur"
                                 :config="{allowInput: true}"
                                 class="form-control datepicker"
                                 v-model="birth_date">
                    </flat-picker>
                </base-input>
                <small id="birth_date"
                       class="position-relative font-weight-bold text-danger"
                       style="top: -10px;"></small>
            </div>
            <div class="col-md-6">
                <select v-model="gender" class="form-control form-control-alternative">
                    <option value="male">{{this.$ml.get('male')}}</option>
                    <option value="female">{{this.$ml.get('female')}}</option>
                </select>
                <small id="gender"
                       class="position-relative font-weight-bold text-danger"
                       style="top: -10px;"></small>
            </div>
        </div>
        <div class="text-center">
            <base-button type="success" class="my-4" @click="updateAccount()">
                {{this.$ml.get('edit')}}
            </base-button>
        </div>
    </form>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import flatPicker from "vue-flatpickr-component";
    import "flatpickr/dist/flatpickr.css";
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import Vue from 'vue'
    import Message from 'vue-m-message'

    Vue.use(Message);

    export default {
        name: "myAccount",
        components: {flatPicker},
        data() {
            return {
                token: null,
                first_name: null,
                last_name: null,
                gender: null,
                birth_date: new Date(),
                lang: this.$ml.current,
            }
        },
        computed: {
            ...mapState([
                'auth'
            ]),
        },
        mounted() {
            let vm = this;
            let auth = localStorage.getItem('auth');
            auth = JSON.parse(auth);
            if (auth) {
                vm.token = auth.token;
                vm.first_name = auth.user.first_name;
                vm.last_name = auth.user.last_name;
                vm.gender = auth.user.gender;
                vm.birth_date = auth.user.birth_date ? auth.user.birth_date : new Date();
            }
        },
        methods: {
            updateAccount() {
                let vm = this;
                console.log({
                    first_name: vm.first_name,
                    last_name: vm.last_name,
                    gender: vm.gender,
                    birth_date: vm.birth_date,
                })
                this.$apiServiesRoutes.API().post(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.UPDATE_INFO,
                    {
                        first_name: vm.first_name,
                        last_name: vm.last_name,
                        gender: vm.gender,
                        birth_date: vm.birth_date,
                    }, {headers: {Authorization: "Bearer " + vm.token}}).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (!status) {
                        vm.showVaildationMassges(data.validation_errors);
                        return;
                    }
                    Message({
                        title: vm.$ml.get('success'),
                        message: vm.$ml.get('edited_success'),
                        className: 'bg-gray text-white',
                        zIndex: 9999999,
                        position: 'bottom-center',
                        // type: 'error',
                        showClose: true
                    });
                    let auth = localStorage.getItem('auth');
                    auth = JSON.parse(auth);
                    auth.user = data.user;
                    console.log(data.user)

                    localStorage.setItem('auth', JSON.stringify(auth));
                    vm.$store.dispatch('addAuthUser', auth);
                }).catch((err) => {

                })
            },
            showVaildationMassges(errors) {
                $('#first_name, #last_name, #phone, #email, #password, #password_confirmation, #gender, #recaptchaToken, #birth_date').text('');
                $.each(errors, function (key, error) {
                    $('#' + key).text(error[0])
                })
            },
        }
    }
</script>

<style scoped>

</style>