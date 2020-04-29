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
                                        <div class="card shadow shadow-lg--hover mt-5">
                                            <div class="card-body">
                                                <nav aria-label="breadcrumb p-0">
                                                    <div class="container p-0">
                                                        <ol class="breadcrumb mt-2 p-0  bg-white">
                                                            <li class="breadcrumb-item"><a href="#">{{this.$ml.get('home')}}</a>
                                                            </li>
                                                            <li class="breadcrumb-item active" aria-current="page">
                                                                {{this.$ml.get('all_stores')}}
                                                            </li>
                                                        </ol>
                                                    </div>
                                                    <h3 class="font-weight-bold display-4 text-left">
                                                        {{this.$ml.get('all_stores')}} {{this.$ml.get('area')}} </h3>
                                                </nav>

                                                <div class="row">

                                                    <div class="col-md-4 py-5 bg-secondary border-top text-left border-right">

                                                        <base-input alternative
                                                                    v-model="query"
                                                                    :placeholder="this.$ml.get('search_key')"
                                                                    addon-left-icon="ni ni-zoom-split-in">
                                                        </base-input>

                                                        <div>
                                                            <base-switch :id="'cat_'+0"
                                                                         @change="changeCheckedCats('all')"></base-switch>
                                                            <span class="category_span font-weight-bold">{{this.$ml.get('all')}}</span>
                                                        </div>

                                                        <div v-for="(category,key) in categories" :key="key">
                                                            <base-switch :id="'cat_'+category.id"
                                                                         @change="changeCheckedCats(category.id)"></base-switch>
                                                            <span class="category_span font-weight-bold"> {{category.translated.title}}</span>
                                                        </div>

                                                    </div>

                                                    <div class="col-md-8 py-5 bg-secondary border-top  text-left">
                                                        <storeProducts :_category_ids="category_ids"
                                                                       :_init_category_ids="init_category_ids"
                                                                       :_query="query"
                                                                       :_address_id="address_id"
                                                                       :_sort_by="sort_by"></storeProducts>
                                                    </div>

                                                </div>

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

    import storeProducts from '../views/pages_components/storeProducts'
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        data() {
            return {
                lang: this.$ml.current,
                init_category_ids: [],
                category_ids: [],
                address_id: null,
                query: null,
                sort_by: null,
                categories: [],
            }
        },
        mounted() {
            let vm = this;
            this.sort_by = this.$route.query.sort_by;
            this.address_id = this.$route.query.address_id;
            let category = this.$route.query.category_id;

            vm.getCategories();

            if (!category) {
                this.init_category_ids.push('all');
                setTimeout(() => {
                    $(`#cat_${0}`).trigger('click')
                }, 500)
            } else {
                this.init_category_ids.push(category);
                setTimeout(() => {
                    $(`#cat_${category}`).trigger('click')
                }, 500)
            }
        },
        methods: {
            changeCheckedCats(category_id) {
                let vm = this;
                let arr = JSON.parse(JSON.stringify(vm.category_ids));
                if (!arr.includes(category_id)) {
                    arr.push(category_id);
                } else {
                    var filtered = arr.filter(function (value, index, arr) {
                        return value != category_id;
                    });
                    arr = filtered
                }
                vm.category_ids = arr;
                // vm.getCategories();
            },
            getCategories() {
                let vm = this;
                let categories = vm.category_ids;
                if (categories.length === 0) {
                    categories = vm.init_category_ids;
                }
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_CATEGORIES, {
                    params: {
                        lang: vm.lang,
                        category_ids: categories,
                        address_id: vm.address_id,
                        sort_by: vm.sort_by,
                        query: vm.query,
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.categories = data.categories;
                }).catch((error) => {

                })
            },
        },
        components: {
            storeProducts
        }
    }
</script>
<style scoped>
    .category_span {
        position: relative;
        top: -15px;
        left: 10px;
    }

</style>
