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
                                <tabs fill class="flex-column flex-md-row">
                                    <card shadow>
                                        <div class="row">
                                            <div class="col-md-7">
                                                <h3 class="display-4">
                                                    {{$ml.get('all_stores')}}
                                                </h3>
                                            </div>
                                            <div class="col-md-5 text-center">
                                                <div class="form-group input-group">
                                                    <input aria-describedby="addon-right addon-left"
                                                           v-model="query"
                                                           @change="getStores('',true)"
                                                           :placeholder="$ml.get('search_key')"
                                                           class="form-control">
                                                    <div class="input-group-append">
                                                        <span class="input-group-text"><i
                                                                class="ni ni-zoom-split-in"></i></span>
                                                    </div>
                                                </div>
                                                <!--                                                <button class="btn btn-black mt-2" @click="getStores('',true)">-->
                                                <!--                                                    {{$ml.get('search_key')}}-->
                                                <!--                                                </button>-->
                                            </div>
                                            <div class="col-md-12 text-center" v-if="branches.length == 0">
                                                <h3 class="display-4">{{$ml.get('no_result')}}</h3>
                                            </div>
                                            <div class="col-md-3 col-6 p-1" v-for="(branch,key) in branches" :key="key">
                                                <router-link class="card shadow shadow-lg--hover mt-5"
                                                             :to="{name:'store',params:{'id':branch.id}}"
                                                             style="min-height: 280px;cursor: pointer">
                                                    <div class="card-body text-center">
                                                        <img :src="branch.logo ? branch.logo : 'img/icons/common/no_image.png'"
                                                             class="img-fluid max-h-350"
                                                             alt="">
                                                        <hr class="m-2">
                                                        <h4 class="font-weight-bold  text-capitalize">
                                                            {{branch.translated.title}}</h4>
                                                        <h6 class="font-weight-bold  text-capitalize"
                                                            style="font-size: 14px">
                                                            <span v-for="(category ,key) in branch.categories" :key="key"
                                                                  v-if="key < 2">
                                                                {{category.translated.title}}
                                                                <span v-if="key > 2">,</span>
                                                            </span>
                                                        </h6>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                    </card>
                                    <infinite-loading @distance="1" @infinite="getStores">
                                        <div slot="no-more"></div>
                                        <div slot="no-results"></div>
                                    </infinite-loading>
                                </tabs>

                            </div>
                        </div>
                    </div>
                    <div class="px-4">
                        <div class="row">
                            <div class="col-md-12  mb-5">
                                <div class="row row-grid">
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

    import {ModelSelect} from 'vue-search-select'
    import Tabs from "@/components/Tabs/Tabs.vue";
    import TabPane from "@/components/Tabs/TabPane.vue";
    import Modal from "@/components/Modal.vue";
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        data() {
            return {
                lang: this.$ml.current,
                current_branch: null,
                query: null,
                page: 1,
                branches: [],
            }
        },
        mounted() {
            // this.getStores('', true);
        },
        methods: {
            getStores($state, reset = false) {
                let vm = this;
                if (reset) {
                    vm.page = 1;
                    vm.branches = [];
                }
                vm.$root.$children[0].$refs.loader.show_loader = true;

                this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.FIND_STORES, {
                    params: {
                        lang: vm.lang,
                        query: vm.query,
                        page: vm.page,
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (data.branches.data.length) {
                        vm.page += 1;
                        vm.branches.push(...data.branches.data)
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {

                    vm.$root.$children[0].$refs.loader.show_loader = false;
                })
            },
        },
        components: {
            Tabs,
            TabPane,
            ModelSelect,
            InfiniteLoading,
            Modal
        }
    }
</script>
<style scoped>
    .ui.fluid.dropdown {
        background-color: #000 !important;
        color: #fff !important;
    }

    .icon-float {
        position: absolute;
        top: 8px;
        z-index: 99;
    }

    .icon-float i {
        font-size: 25px;
    }

    .search {
        color: #fff !important;
        font-weight: bold !important;
    }


    .ui.fluid.dropdown > .dropdown.icon {
        display: none !important;
    }

    .ui.search.dropdown > .text {
        color: #fff !important;
        font-weight: bold !important;
        top: 4px !important;
    }

    .mt-10 {
        margin-top: 100px;
    }

    .px-4 {
        z-index: 9;
    }

    .bg-gray-50 {
        background-color: #eee;
    }

    .max-h-350 {
        min-height: 150px;
        max-height: 170px;
    }
</style>
