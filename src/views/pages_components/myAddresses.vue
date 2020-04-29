<template>
    <div class="text-left mt-5">
        <div class="text-right">
            <h4 class="display-4" style="font-size: 16px">
                <a href="" @click.prevent="addAddressModal()">
                    <i class="fa fa-plus"></i>
                    {{this.$ml.get('add_new_address')}}
                </a>
            </h4>
        </div>
        <p v-if="saved_addresses.length == 0" class="font-weight-bold text-center text-default">
            {{this.$ml.get('please_add_address')}}</p>
        <ul v-if="saved_addresses.length > 0" class="list-unstyled direction">
            <li v-for="(saved,key) in saved_addresses" :key="key">
                <ul class="direction">
                    <!--<li>-->
                    <!--<div>-->
                    <!--<b>{{saved.governorate.translated.name}}</b> |-->
                    <!--<b>{{saved.city.translated.name}}</b>-->
                    <!--</div>-->
                    <!--</li>-->
                    <li>
                        <div>
                            <span class="font-weight-bold">{{$ml.get('full_address')}} : </span>
                            <span>{{saved.full_address}}</span>
                        </div>
                    </li>
                    <li v-if="saved.detailed_addresses">
                        <div>
                            <span class="font-weight-bold">{{$ml.get('additional_direction')}} : </span>
                            <span>{{saved.detailed_addresses}}</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span class="font-weight-bold">{{$ml.get('phone')}} : </span>
                            <span>{{saved.phone}}</span>
                        </div>
                    </li>
                    <!--<li>-->
                    <!--<div>-->
                    <!--<span class="font-weight-bold">{{$ml.get('building')}} : </span>-->
                    <!--<span>{{saved.building}}</span> |-->
                    <!--<span class="font-weight-bold">{{$ml.get('house')}} : </span>-->
                    <!--<span>{{saved.house}}</span> |-->
                    <!--<span class="font-weight-bold">{{$ml.get('floor')}} : </span>-->
                    <!--<span>{{saved.floor}}</span> |-->
                    <!--<span class="font-weight-bold">{{$ml.get('street')}} : </span>-->
                    <!--<span>{{saved.street}}</span>-->
                    <!--</div>-->
                    <!--</li>-->
                    <li class="list-unstyled">
                        <div class="text-right">
                            <a href="" @click.prevent="editAddress(saved,key)">{{$ml.get('edit')}}</a>
                            |
                            <a href="" @click.prevent="removeAddress(saved,key)">{{$ml.get('remove')}}</a>
                        </div>
                    </li>
                    <hr>
                </ul>
            </li>
        </ul>

        <modal :show.sync="modals.modal2"
               gradient="white"
               modal-classes="modal-danger text-black modal-dialog-centered modal-lg">
            <h6 slot="header" class="modal-title text-black font-weight-bold text-left display-4"
                id="modal-title-notification">
                {{this.$ml.get('add_address')}}</h6>

            <div class="py-3 text-center text-black">
                <div class="row">
                    <div class="col-md-12 text-left">
                        <b>{{this.$ml.get('contact_details')}}</b>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group input-group input-group-alternative">
                            <div class="input-group-prepend" style="width: 65px">
                                <input type="text" name="prefix" class="form-control" v-model="prefix"
                                       :placeholder="this.$ml.get('prefix')" value="965">
                            </div>
                            <input aria-describedby="addon-right addon-left" :placeholder="this.$ml.get('phone')"
                                   v-model="phone"
                                   class="form-control">
                        </div>
                        <div class="text-danger text-left" id="phones0"></div>
                    </div>
                    <!--<div class="col-md-5">-->
                    <!--<div class="form-group input-group-alternative">-->
                    <!--<input :placeholder="this.$ml.get('land_line')" v-model="land_line" class="form-control">-->
                    <!--</div>-->
                    <!--<div class="text-danger text-left" id="land_line0"></div>-->
                    <!--</div>-->
                    <div class="col-md-12">
                        <hr class="m-1">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-left">
                        <b>{{this.$ml.get('address_details')}}</b>
                    </div>
                    <!--<div class="col-md-6">-->
                    <!--<select class="form-control" v-model="gov_id">-->
                    <!--<option v-for="(govern,key) in addresses" :value="govern.id" :key="key">-->
                    <!--{{govern.translated.name}}-->
                    <!--</option>-->
                    <!--</select>-->
                    <!--<div class="text-danger text-left" id="gov_ids0"></div>-->
                    <!--</div>-->
                    <!--<div class="col-md-6">-->
                    <!--<select class="form-control" v-if="addresses.length > 0" v-model="city_id">-->
                    <!--<option v-for="(city,key) in addresses[0].cities" :value="city.id" :key="key">-->
                    <!--{{city.translated.name}}-->
                    <!--</option>-->
                    <!--</select>-->
                    <!--<div class="text-danger text-left" id="city_ids0"></div>-->
                    <!--</div>-->
                    <!--<div class="col-md-6 mt-3">-->
                    <!--<div class="radio-tile-group">-->
                    <!--<div class="input-container">-->
                    <!--<input class="radio-button" name="radio" type="radio" v-model="building_types"-->
                    <!--value="apartment">-->
                    <!--<div class="radio-tile">-->
                    <!--<div class="icon bike-icon" style="font-size: 15px;">-->
                    <!--<i class="fa fa-building-o"></i>-->
                    <!--</div>-->
                    <!--<label class="radio-tile-label">{{this.$ml.get('apartment')}}</label>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--<div class="input-container">-->
                    <!--<input class="radio-button" name="radio" type="radio" v-model="building_types"-->
                    <!--value="office">-->
                    <!--<div class="radio-tile">-->
                    <!--<div class="icon bike-icon" style="font-size: 15px;">-->
                    <!--<i class="fa fa-desktop"></i>-->
                    <!--</div>-->
                    <!--<label class="radio-tile-label">{{this.$ml.get('office')}}</label>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--<div class="input-container">-->
                    <!--<input class="radio-button" name="radio" type="radio" v-model="building_types"-->
                    <!--value="house"-->
                    <!--checked>-->
                    <!--<div class="radio-tile">-->
                    <!--<div class="icon bike-icon" style="font-size: 15px;">-->
                    <!--<i class="fa fa-home"></i>-->
                    <!--</div>-->
                    <!--<label class="radio-tile-label">{{this.$ml.get('house')}}</label>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->

                    <div class="col-md-12 mt-3">
                        <div class="form-group input-group input-group-alternative">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="ni ni-pin-3"></i>
                                </span>
                            </div>
                            <input aria-describedby="addon-right addon-left" v-model="full_address"
                                   :placeholder="this.$ml.get('full_address')"
                                   class="form-control">
                        </div>
                        <div class="text-danger text-left" id="full_address0"></div>
                        <div class="text-danger text-left" id="full_addresses0"></div>
                        <div class="form-group input-group input-group-alternative">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="ni ni-pin-3"></i>
                                </span>
                            </div>
                            <input aria-describedby="addon-right addon-left" v-model="additional_direction"
                                   :placeholder="this.$ml.get('additional_direction')"
                                   class="form-control">
                        </div>
                        <div class="text-danger text-left" id="additional_direction0"></div>
                        <div class="text-danger text-left" id="detailed_addresses0"></div>
                    </div>

                    <!--<div class="col-md-6 mt-3">-->
                    <!--<div class="form-group input-group input-group-alternative">-->
                    <!--<div class="input-group-prepend">-->
                    <!--<span class="input-group-text">-->
                    <!--<i class="ni ni-pin-3"></i>-->
                    <!--</span>-->
                    <!--</div>-->
                    <!--<input aria-describedby="addon-right addon-left" :placeholder="this.$ml.get('street')"-->
                    <!--v-model="street"-->
                    <!--class="form-control">-->
                    <!--</div>-->
                    <!--<div class="text-danger text-left" id="streets0"></div>-->
                    <!--<div class="form-group input-group input-group-alternative">-->
                    <!--<div class="input-group-prepend">-->
                    <!--<span class="input-group-text">-->
                    <!--<i class="ni ni-pin-3"></i>-->
                    <!--</span>-->
                    <!--</div>-->
                    <!--<input aria-describedby="addon-right addon-left" :placeholder="this.$ml.get('floor')"-->
                    <!--v-model="floor"-->
                    <!--class="form-control">-->
                    <!--</div>-->
                    <!--<div class="text-danger text-left" id="floors0"></div>-->
                    <!--</div>-->

                    <!--<div class="col-md-6 mt-3">-->
                    <!--<div class="form-group input-group input-group-alternative">-->
                    <!--<div class="input-group-prepend">-->
                    <!--<span class="input-group-text">-->
                    <!--<i class="ni ni-pin-3"></i>-->
                    <!--</span>-->
                    <!--</div>-->
                    <!--<input aria-describedby="addon-right addon-left" :placeholder="this.$ml.get('building')"-->
                    <!--v-model="building"-->
                    <!--class="form-control">-->
                    <!--</div>-->
                    <!--<div class="text-danger text-left" id="buildings0"></div>-->
                    <!--<div class="form-group input-group input-group-alternative">-->
                    <!--<div class="input-group-prepend">-->
                    <!--<span class="input-group-text">-->
                    <!--<i class="ni ni-pin-3"></i>-->
                    <!--</span>-->
                    <!--</div>-->
                    <!--<input aria-describedby="addon-right addon-left" :placeholder="this.$ml.get('house')"-->
                    <!--v-model="house"-->
                    <!--class="form-control">-->
                    <!--</div>-->
                    <!--<div class="text-danger text-left" id="houses0"></div>-->
                    <!--</div>-->
                </div>
            </div>

            <template slot="footer">
                <base-button type="black" @click="saveAddress">{{this.$ml.get('save')}}</base-button>
                <base-button type="link"
                             text-color="black"
                             @click="modals.modal2 = false">
                    {{this.$ml.get('close')}}
                </base-button>
            </template>
        </modal>
    </div>
</template>

<script>
    import Modal from "@/components/Modal.vue";
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'

    export default {
        name: "orderSummary",
        components: {
            Modal
        },
        mounted() {
            this.auth = JSON.parse(localStorage.getItem('auth'));

            this.phone = this.auth.user.phone
            this.mobile = this.auth.user.phone
            this.getSavedAddress(this.auth.user.id);
            this.getAddress()
        },
        data() {
            return {
                address: false,
                lang: this.$ml.current,
                prefix: '965',
                edit_key: null,
                address_id: null,
                phone: null,
                auth: null,
                land_line: null,
                building_types: 'house',
                full_address: null,
                additional_direction: null,
                street: null,
                floor: null,
                building: null,
                house: null,
                gov_id: 1,
                city_id: 1,
                saved_addresses: [],
                addresses: [],
                modals: {
                    modal1: false,
                    modal2: false,
                    modal3: false
                }
            };
        },
        methods: {
            addAddressModal() {
                this.modals.modal2 = true;
                this.resetData()
            },
            resetData() {
                this.edit_key = null;
                this.address_id = null;
                // this.phone = null;
                this.land_line = null;
                this.building_types = 'house';
                this.full_address = null;
                this.additional_direction = null;
                this.street = null;
                this.floor = null;
                this.building = null;
                this.house = null;
                this.gov_id = 1;
                this.city_id = 1;
            },
            saveAddress() {
                let vm = this;
                if (!vm.auth) {
                    //    unauthorized
                }
                this.$apiServiesRoutes.API().post(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.CREATE_CLIENT_ADDRESS, {
                    lang: vm.lang,
                    address_ids: [vm.address_id],
                    user_id: vm.auth.user.id,
                    // city_ids: [vm.city_id],
                    // gov_ids: [vm.gov_id],
                    full_addresses: [vm.full_address],
                    detailed_addresses: [vm.additional_direction],
                    phones: [vm.phone],
                    mobiles: [vm.land_line],
                    // streets: [vm.street],
                    // buildings: [vm.building],
                    // floors: [vm.floor],
                    // houses: [vm.house],
                    // building_types: [vm.building_types]
                }).then((resp) => {
                    // console.log(resp)
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (!status) {
                        vm.showAddressVaildationMassges(data.validation_errors);
                        return;
                    }
                    vm.modals.modal2 = false;
                    if (!vm.address_id) {
                        vm.saved_addresses.push(data.addresses[0]);
                    } else {
                        vm.saved_addresses[vm.edit_key] = data.addresses[0]
                    }
                    vm.resetData()
                }).catch((error) => {
                    vm.addresses = []
                })
            },
            showAddressVaildationMassges(errors) {
                $('#buildings0, #floors0 , #streets0 , #full_addresses0 , #mobiles0 , #phones0 ,#houses0').text('');
                $.each(errors, function (key, error) {
                    console.log(error)
                    $('#' + key.replace('.', '')).text(error[0])
                })
            },
            editAddress(element, key) {
                let vm = this;
                vm.modals.modal2 = true;
                this.edit_key = key;
                this.address_id = element.id;
                this.phone = element.phone;
                this.land_line = element.mobile;
                this.full_address = element.full_address;
                this.building_types = element.building_type;
                this.additional_direction = element.detailed_address;
                this.street = element.street;
                this.floor = element.floor;
                this.building = element.building;
                this.house = element.house;
                this.gov_id = element.gov_id;
                this.city_id = element.city_id;
            },
            deleteAddress(element, key) {
                let vm = this;
                // DELETE_CLIENT_ADDRESS
                console.log(key)
                this.$apiServiesRoutes.API().delete(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.DELETE_CLIENT_ADDRESS + `/${element.id}`).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        console.log()
                        vm.saved_addresses.splice(key, 1);
                    }
                }).catch((error) => {
                    vm.addresses = []
                })
            },
            removeAddress(element, key) {
                let vm = this;
                vm.$swal({
                    title: vm.$ml.get('are_you_sure'),
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: vm.$ml.get('yes'),
                    cancelButtonText: vm.$ml.get('no'),
                }).then((result) => {
                    if (result.value) {
                        vm.deleteAddress(element, key)
                    }
                });
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
            getSavedAddress(id) {
                // GET_CLIENT_ADDRESS
                let vm = this;
                this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.GET_CLIENT_ADDRESS + `/${id}`, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.saved_addresses = data.addresses;
                    }
                }).catch((error) => {
                    vm.addresses = []
                })
            }
        }
    }
</script>

<style scoped>
    .radio-tile-group {
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: left
    }

    .radio-tile-group .input-container {
        position: relative;
        height: 5.5rem;
        width: 5.5rem;
        margin: .5rem
    }

    .radio-tile-group .input-container .radio-button {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        margin: 0;
        cursor: pointer
    }

    .radio-tile-group .input-container .radio-tile {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border: 2px solid #888;
        border-radius: 5px;
        padding: 1rem;
        -webkit-transition: -webkit-transform .3s ease;
        transition: -webkit-transform .3s ease;
        transition: transform .3s ease;
        transition: transform .3s ease, -webkit-transform .3s ease
    }

    .radio-tile-group .input-container .icon i {
        color: #888;
        font-size: 25px
    }

    .radio-tile-group .input-container .radio-tile-label {
        text-align: center;
        font-size: .75rem;
        font-weight: 600;
        text-transform: uppercase;
        font-family: inherit;
        position: relative;
        top: 10px;
        color: #888
    }

    .radio-tile-group .input-container .radio-button:checked + .radio-tile {
        background-color: #000;
        border: 2px solid #fff;
        color: #fff;
        -webkit-transform: scale(1.1, 1.1);
        transform: scale(1.1, 1.1)
    }

    .radio-tile-group .input-container .radio-button:checked + .radio-tile .icon i {
        color: #fff;
        background-color: #000
    }

    .radio-tile-group .input-container .radio-button:checked + .radio-tile .radio-tile-label {
        color: #fff;
        background-color: #000;
        top: 10px;
        font-family: inherit
    }

</style>