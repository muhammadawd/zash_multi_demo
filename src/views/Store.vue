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
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="card shadow shadow-lg--hover mt-5">
                                            <div class="card-body">
                                                <nav aria-label="breadcrumb p-0">
                                                    <div class="container-fluid p-0">
                                                        <ol class="breadcrumb mt-2 p-0  bg-white">
                                                            <li class="breadcrumb-item"><a
                                                                    href="#">{{this.$ml.get('home')}}</a></li>
                                                            <li class="breadcrumb-item"><a
                                                                    href="#"> {{this.$ml.get('all_products')}}</a></li>
                                                            <li aria-current="page"
                                                                class="breadcrumb-item active">
                                                                {{this.$route.params.id}}
                                                            </li>
                                                        </ol>
                                                    </div>
                                                    <h3 class="font-weight-bold text-left display-4">
                                                        {{this.$ml.get('all_products')}}
                                                    </h3>
                                                </nav>
                                                <template>
                                                    <products></products>
                                                </template>
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
    import Vue from 'vue'
    import {BadgerAccordion, BadgerAccordionItem} from 'vue-badger-accordion'
    import VueScrollactive from 'vue-scrollactive'

    import products from '../views/pages_components/products';

    export default {
        data() {
            return {}
        },
        methods: {},
        components: {
            products,
        }
    }
</script>
<style scoped>
    .category_span {
        position: relative;
        top: -15px;
        left: 10px;
    }

    a.scrollactive-item.nav-item.is-active p {
        border-left: 4px solid #4f40ff;
        font-weight: bold;
    }

    .hero {
        min-height: 300px;
    }
</style>
