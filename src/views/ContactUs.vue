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
                                                <div class="text-muted text-center mb-3">
                                                    <span class="display-4 text-black" style="font-size: 18px">{{this.$ml.get('contact_us')}}</span>
                                                </div>
                                            </template>
                                            <template>
                                                <form role="form">
                                                    <base-input alternative
                                                                class="mb-3"
                                                                type="text"
                                                                :placeholder="this.$ml.get('first_name')"
                                                                addon-left-icon="ni ni-satisfied">
                                                    </base-input>
                                                    <base-input alternative
                                                                class="mb-3"
                                                                type="email"
                                                                :placeholder="this.$ml.get('email')"
                                                                addon-left-icon="ni ni-email-83">
                                                    </base-input>
                                                    <textarea class="form-control" :placeholder="this.$ml.get('message')" rows="4"></textarea>
                                                    <div class="text-center">
                                                    </div>
                                                    <div class="text-center">
                                                        <base-button type="default" class="my-4 bg-black">
                                                            {{this.$ml.get('send')}}
                                                        </base-button>
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
    import VueRecaptcha from 'vue-recaptcha';

    export default {
        data() {
            return {}
        },
        methods: {},
        components: {VueRecaptcha}
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
