<template>
    <div>
        <!--<div style="margin-top: 10px"></div>-->
        <div class="row mt-1">
            <div class="col-md-12" v-if="categories.length">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body p-2" style="overflow: hidden">
                                <u-animate-container>
                                    <div class="row" :class="more ? '': 'more_data'">
                                        <div class="col-md-1 col-3" v-for="(cat , key) in categories" :key="key"
                                             @click="$router.push({name:'search_result',query:{q:(cat.translated.title ? cat.translated.title.toLowerCase() : '')}})">
                                            <u-animate
                                                    name="bounceInDown"
                                                    :delay="getDelayTime(key)+'s'"
                                                    duration="1s"
                                                    :iteration="1"
                                                    :offset="0"
                                                    animateClass="animated"
                                                    :begin="false"
                                            >
                                                <div v-if="!cat.main_image" class="card card_rounded text-center mt-2"
                                                     :style="{background:getRandomColors(key)}">
                                                    <!--<img src="" alt="">-->
                                                    <i class="fa fa-gift fa-lg"></i>
                                                </div>
                                                <div v-if="cat.main_image" class="card card_rounded text-center mt-2">
                                                    <img :src="cat.main_image" width="100%" alt="">
                                                </div>
                                                <div class="text-center">
                                                    <h3 class="font-weight-bold pt-2"
                                                        style="font-size: 12px;">
                                                        {{cat.translated.title}}
                                                    </h3>
                                                </div>
                                            </u-animate>
                                        </div>
                                    </div>
                                </u-animate-container>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-success font-weight-bold mt-2 text-center" @click="more=true" v-if="!more">
                    {{$ml.get('show_more')}}
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import Vue from 'vue';
    import VueWow from 'vue-wow'

    // mount with global
    Vue.use(VueWow)

    import {mapState, mapActions} from 'vuex'

    // mount with component
    import {UAnimateContainer, UAnimate} from 'vue-wow'

    export default {
        name: "home_categories",
        components: {
            UAnimateContainer,
            UAnimate
        },
        data() {
            return {
                more: false,
                lang: this.$ml.current,
                categories: [],
            }
        },
        methods: {
            getRandomColors(i) {
                let colors = ['#eb4559', '#f78259', '#ea6227', '#00bcd4',
                    '#aeefec', '#522d5b', '#323232', '#cd8d7b',
                    '#21bf73', '#6e5773', '#192965', '#be8abf',
                    '#851d41', '#7fcd91', '#ff6f5e', '#e32249',
                    '#75b79e', '#12cad6', '#004445', '#f8b400',
                    '#3e206d', '#8ac6d1', '#ee8572', '#c0ffb3'];
                try {
                    return colors[i];
                } catch (e) {
                    return '#000';
                }

            },
            getDelayTime(i) {
                return i / 5
            },
            getAllCategory() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.FIND_CATEGORIES, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    if (status) {
                        vm.categories = data.categories
                        return;
                    }
                    vm.categories = [];
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    vm.categories = [];
                })
            },
        },
        mounted() {
            this.getAllCategory()
        },
        computed: {
            ...mapState([
                'auth',
                'cart'
            ]),
        },
    }
</script>

<style>
    .card_rounded {
        width: 55px;
        height: 55px;
        line-height: 55px;
        border-radius: 50% !important;
        margin: auto;
        cursor: pointer;
    }

    .card_rounded i {
        line-height: 55px;
        color: #fff;
    }

    .more_data {
        height: 100px;
        overflow: hidden;
    }

    @media only screen and (max-width: 600px) {
        .more_data {
            height: 215px;
        }
    }
</style>
