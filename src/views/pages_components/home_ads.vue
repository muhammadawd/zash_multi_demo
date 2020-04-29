<template>
    <section style="position: relative">
        <div class="row">
            <div class="col-md-6">
                <img src="https://usabilitygeek.com/wp-content/uploads/2019/03/bad-mobile-ads-lead.jpg"
                     alt="" width="100%">
                <img src="https://www.gradiweb.com/wp-content/uploads/2017/08/1-1-1.png" alt="" class="mt-3"
                     width="100%">
            </div>
            <div class="col-md-6">
                <img src="https://www.gradiweb.com/wp-content/uploads/2017/08/1-1-1.png" alt="" width="100%">
                <!--<img src="https://www.gradiweb.com/wp-content/uploads/2017/08/1-1-1.png" class="mt-3" alt=""-->
                <!--width="100%">-->
                <div class="row">
                    <div class="col-md-12 mt-2">
                        <swiper ref="mySwiper" :options="swiperOptions">
                            <swiper-slide>
                                <div style="background:#fff;">
                                    <img src="https://zashzash.com/back_end/storage/images/products/3134490271581640963.png"
                                         alt="" width="100%">
                                    <h5 class="text-center">GIOVE PL-055B S011</h5>
                                </div>
                            </swiper-slide>
                            <swiper-slide>
                                <div style="background: #fff;">
                                    <img src="https://zashzash.com/back_end/storage/images/products/15191399661581650190.png"
                                         alt="" width="100%">
                                    <h5 class="text-center">GIOVE PL-055B S036</h5>
                                </div>
                            </swiper-slide>
                            <swiper-slide>
                                <div style="background: #fff;">
                                    <img src="https://zashzash.com/back_end/storage/images/products/3134490271581640963.png"
                                         alt="" width="100%">
                                    <h5 class="text-center">GIOVE PL-055B S011</h5>
                                </div>
                            </swiper-slide>
                            <swiper-slide>
                                <div style="background: #fff;">
                                    <img src="https://zashzash.com/back_end/storage/images/products/15191399661581650190.png"
                                         alt="" width="100%">
                                    <h5 class="text-center">GIOVE PL-055B S036</h5>
                                </div>
                            </swiper-slide>
                            <swiper-slide>
                                <div style="background: #fff;">
                                    <img src="https://zashzash.com/back_end/storage/images/products/3134490271581640963.png"
                                         alt="" width="100%">
                                    <h5 class="text-center">GIOVE PL-055B S011</h5>
                                </div>
                            </swiper-slide>
                            <swiper-slide>
                                <div style="background: #fff;">
                                    <img src="https://zashzash.com/back_end/storage/images/products/15191399661581650190.png"
                                         alt="" width="100%">
                                    <h5 class="text-center">GIOVE PL-055B S036</h5>
                                </div>
                            </swiper-slide>
                            <!--<swiper-slide>-->
                            <!--<div style="background: #fff;height: 180px;line-height: 200px">-->
                            <!--<h3 style="line-height: 180px;text-align: center;color: #fff">Slide 3</h3>-->
                            <!--</div>-->
                            <!--</swiper-slide>-->
                            <!--<div class="swiper-pagination" slot="pagination"></div>-->
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/css/swiper.min.css'
    import {VueAgile} from 'vue-agile'
    import 'vue-agile/dist/VueAgile.css'

    export default {
        name: "home_ads",
        components: {
            // agile: VueAgile,
            swiper,
            swiperSlide,
        },
        data() {
            return {
                current_slide: null,
                swiperOptions: {
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    spaceBetween: 10,
                    slidesPerView: 2,
                    autoplay: true,
                    touchRatio: 0.2,
                    // breakpoints: {
                    //     1024: {
                    //         slidesPerView: 4,
                    //         spaceBetween: 40
                    //     },
                    //     768: {
                    //         slidesPerView: 4,
                    //         spaceBetween: 30
                    //     },
                    //     640: {
                    //         slidesPerView: 4,
                    //         spaceBetween: 20
                    //     },
                    //     320: {
                    //         slidesPerView: 4,
                    //         spaceBetween: 10
                    //     }
                    // }
                },
            };
        },
        mounted() {
            let vm = this;
            console.log('Current Swiper instance object', vm.swiper)
            // vm.swiper.slideTo(3, 1000, false)
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .home_header_overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        z-index: 1;
    }

    .home_header {
        background: #000;
        /*background: url('/img/theme/leather-bags-hoi-an.jpg') center center;*/
        background-size: 100%;
        background-size: cover;
        height: 800px;
        position: relative;
        overflow: hidden;
    }

    .video_content {
        position: relative;
        top: 0;
        height: 800px;
        width: 100% !important;
    }

    .image_corner {
        background: url("/img/brand/VagueVerte.png") top left no-repeat;
        background-size: 25%;
        height: 225px;
        position: absolute;
        bottom: 125px;
        left: -190px;
        width: 100%;
        z-index: 9999;
    }

    .image_line {
        background: #ffffff;
        clip-path: polygon(0 30%, 0% 100%, 100% 100%);
        height: 306px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 9999;
    }

    .h1_text {
        font-weight: bold;
        font-size: 50px;
        background: -webkit-linear-gradient(10deg, #eee, #333);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: absolute;
        z-index: 99;
        bottom: 18%;
        left: 10%;
    }

    .image_width {
        width: 300px;
        position: absolute;
        z-index: 99;
        top: 20%;
        right: 10%;
    }

    @media screen and (min-width: 1400px) {

        .image_width {
            width: 30%
        }
    }
</style>
