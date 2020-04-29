<template>
    <section class="position-relative">
        <div class="overlay_color"></div>
        <footer class="footer has-cards" style="padding-top: 10px">
            <section class="section-profile-cover section-shaped my-0" style="z-index: 9;width: 100%;height: 0">
                <div class="shape shape-style-1 ">
                    <span class="d-none"></span>
                    <span class="d-none"></span>
                    <span class="d-none"></span>
                    <span class="d-none"></span>
                    <span class="d-none"></span>
                    <span class="d-none"></span>
                    <span class="d-none"></span>
                    <span class="d-none"></span>
                    <span class="d-none"></span>
                    <span class="d-none"></span>
                    <!--                <span></span>-->
                    <span class="d-none"></span>
                </div>
            </section>
            <div class="container container-lg">
                <!--<router-link :to="{name:'register_vendor'}">-->
                <!--<div class="contact_us text-left" :style="this.$ml.current == 'ar' ? 'right:0': 'left:0'">-->
                <!--<i class="ni ni-mobile-button"></i>-->
                <!--{{this.$ml.get('contact_us')}}-->
                <!--</div>-->
                <!--</router-link>-->
                <!--my-md-->
                <div class="row row-grid align-items-center">
                    <div class="col-lg-2" style="visibility: hidden">
                        <!--<ul class="list-unstyled d-none d-lg-block d-md-block">-->
                        <!--<li>-->
                        <!--<a :href="settings.appstore">-->
                        <!--<img src="img/theme/appstore.jpg" class="img-fluid mb-4" alt="">-->
                        <!--</a>-->
                        <!--</li>-->
                        <!--<li>-->
                        <!--<a :href="settings.googleplay">-->
                        <!--<img src="img/theme/playstore.jpg" class="img-fluid mb-2" alt="">-->
                        <!--</a>-->
                        <!--</li>-->
                        <!--</ul>-->
                        <!--<ul class="list-unstyled d-inline-block d-sm-inline-block d-md-none">-->
                        <!--<li class="d-inline-block w-50">-->
                        <!--<a :href="settings.appstore">-->
                        <!--<img src="img/theme/appstore.jpg" class="img-fluid mb-4" alt="">-->
                        <!--</a>-->
                        <!--</li>-->
                        <!--<li class="d-inline-block w-50">-->
                        <!--<a :href="settings.googleplay">-->
                        <!--<img src="img/theme/playstore.jpg" class="img-fluid mb-2" alt="">-->
                        <!--</a>-->
                        <!--</li>-->
                        <!--</ul>-->
                    </div>
                    <div class="col-lg-6">
                        <p class="text-white text-left">{{this.$ml.get('subscribe_p')}}</p>
                        <div class="form-group input-group">
                            <input aria-describedby="addon-left addon-left" v-model="subscribe"
                                   :placeholder="this.$ml.get('subscribe_holder')"
                                   class="form-control p-1 text-left">
                            <div class="input-group-append">
                                <button class="btn btn-neutral btn-icon text-black-50" @click="saveSubscribe()"
                                        style="background-color: #888;">
                                    {{this.$ml.get('subscribe')}}
                                </button>
                            </div>
                        </div>
                        <div class="text-white" id="subscribe_email"></div>
                    </div>
                    <div class="col-lg-4 text-left text-lg-center btn-wrapper">
                        <p class="text-white">{{this.$ml.get('footer_social_p')}}</p>
                        <a target="_blank" rel="noopener" :href="settings.facebook"
                           class="btn btn-icon-only btn-round btn-icon-radius-50 bg-white">
                            <i class="fa fa-facebook fa-lg"></i>
                        </a>
                        <a target="_blank" rel="noopener" :href="settings.twitter"
                           class="btn btn-icon-only btn-round btn-icon-radius-50 bg-white">
                            <i class="fa fa-twitter fa-lg"></i>
                        </a>
                        <a target="_blank" rel="noopener" :href="settings.instagram"
                           class="btn btn-icon-only btn-round btn-icon-radius-50 bg-white">
                            <i class="fa fa-instagram fa-lg"></i>
                        </a>
                        <a target="_blank" rel="noopener" :href="settings.snapchat"
                           class="btn btn-icon-only btn-round btn-icon-radius-50 bg-white">
                            <i class="fa fa-snapchat fa-lg"></i>
                        </a>
                        <a target="_blank" rel="noopener" :href="settings.youtube"
                           class="btn btn-icon-only btn-round btn-icon-radius-50 bg-white d-none">
                            <i class="fa fa-youtube fa-lg"></i>
                        </a>
                        <!--<a target="_blank" rel="noopener" :href="settings.pinterest"-->
                        <!--class="btn btn-icon-only btn-round btn-icon-radius-50 bg-white">-->
                        <!--<i class="fa fa-pinterest fa-lg"></i>-->
                        <!--</a>-->
                    </div>
                </div>
                <hr>
                <div class="row align-items-center justify-content-md-between direction-inverse">
                    <div class="col-md-4">
                        <div class="copyright text-center">
                            &copy; {{year}}
                            <a href="" target="_blank" class="text-white" rel="noopener">Approc Team</a>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <ul class="list-unstyled nav nav-footer justify-content-center">
                            <li class="nav-item m-2">
                                <img :src="require('@/assets/images/_knet.png')" width="50" alt="">
                            </li>
                            <li class="nav-item m-2">
                                <img :src="require('@/assets/images/_delv.png')" width="50" alt="">
                            </li>
                            <li class="nav-item m-2">
                                <img :src="require('@/assets/images/_master.png')" width="50" alt="">
                            </li>
                            <li class="nav-item m-2">
                                <img :src="require('@/assets/images/_visa.png')" width="50" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </section>
</template>
<script>
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        name: 'app-footer',
        data() {
            return {
                subscribe: null,
                settings: {
                    facebook: null,
                    twitter: null,
                    snapchat: null,
                    instagram: null,
                    pinterest: null,
                    youtube: null,
                    googleplay: null,
                    appstore: null,
                },
                year: new Date().getFullYear()
            }
        },
        mounted() {
            this.getAllSettings();
        },
        methods: {
            saveSubscribe() {
                let vm = this;
                let request_data = {
                    email: vm.subscribe
                }
                this.$apiServiesRoutes.API().post(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.CREATE_SUBSCRIBE, request_data)
                    .then((resp) => {
                        let status = resp.data.status;
                        let data = resp.data.data;
                        if (!status) {
                            $('#subscribe_email').text(data.validation_errors.email[0])
                            return
                        }
                        $('#subscribe_email').text('')
                        vm.$swal({
                            title: vm.$ml.get('success'),
                            type: 'success',
                            timer: 1000
                        })
                        vm.subscribe = null;

                    }).catch((err) => {

                });
            },
            getAllSettings() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let settings = localStorage.getItem('settings')
                if (settings) {
                    settings = JSON.parse(settings);
                    vm.settings = settings;
                    // return
                }
                this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.HOME_ADS, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        let logo = '';
                        let pointModule = '';
                        let to_money_percent = '0';
                        try {
                            logo = data.setting.logo[0].path.path;
                        } catch (e) {
                            logo = '';
                        }
                        try {
                            pointModule = data.pointSystem.point_status[0].value
                        } catch (e) {
                            pointModule = '';
                        }
                        try {
                            to_money_percent = data.pointSystem.to_money_percent[0].value
                        } catch (e) {
                            to_money_percent = '';
                        }
                        let settings = {
                            facebook: data.setting.facebook[0].value,
                            twitter: data.setting.twitter[0].value,
                            snapchat: data.setting.snapchat[0].value,
                            instagram: data.setting.instagram[0].value,
                            pinterest: data.setting.pinterest[0].value,
                            youtube: data.setting.youtube[0].value,
                            googleplay: data.setting.googleplay[0].value,
                            appstore: data.setting.appstore[0].value,
                            logo: logo
                        };
                        vm.settings = settings;
                        localStorage.setItem('expiration', JSON.stringify('الايام المتبقية لديك 2 يوم'))
                        localStorage.setItem('settings', JSON.stringify(settings))
                        localStorage.setItem('pointModule', JSON.stringify(pointModule))
                        localStorage.setItem('to_money_percent', JSON.stringify(to_money_percent))
                    }
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;

                })
            },
        }
    };
</script>
<style scoped>
    .contact_us {
        position: fixed;
        bottom: 0;
        z-index: 888;
        width: 300px;
        color: #000;
        background: #eee;
        padding: 10px 15px 5px 15px;
        font-weight: bold;
        border: 1px solid #888;
    }

    .overlay_color {
        background: #000;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 0;
    }
</style>
