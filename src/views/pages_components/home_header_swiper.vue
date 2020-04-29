<template>
    <section class="header_height" style="position: relative;overflow: hidden;margin-bottom: 5px" v-if="slides.length">
        <div class="thumb-example">
            <!-- swiper1 -->
            <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
                <swiper-slide v-for="(current_slide,key) in slides" :key="key"
                              :style="{ backgroundImage: 'url(' + current_slide.image + ')' }"></swiper-slide>
                <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            </swiper>
        </div>
    </section>
</template>

<script>

    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'

    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'

    export default {
        name: "home_header_swiper",
        components: {
            swiper, swiperSlide
        },
        data() {
            return {
                current_slide: null,
                // slides: [
                //     {
                //         image: require('@/assets/images/1.png'),
                //         text: 'PLUTONE',
                //         icon: require('@/assets/images/data/icon1.png'),
                //     },
                //     {
                //         image: require('@/assets/images/1.png'),
                //         text: 'GIOVE',
                //         icon: require('@/assets/images/data/icon2.png'),
                //     }, {
                //         image: require('@/assets/images/1.png'),
                //         text: 'ICE ROCK',
                //         icon: require('@/assets/images/data/icon3.png'),
                //     }, {
                //         image: require('@/assets/images/1.png'),
                //         text: 'MARTE',
                //         icon: require('@/assets/images/data/icon4.png'),
                //     }, {
                //         image: require('@/assets/images/1.png'),
                //         text: 'NITTO',
                //         icon: require('@/assets/images/data/icon5.png'),
                //     }
                // ],
                slides:[],
                swiperOptionTop: {
                    loop: true,
                    autoplay: true,
                    centeredSlides: true,
                    loopedSlides: 5, // looped slides should be the same
                    spaceBetween: 10,
                    // navigation: {
                    //     nextEl: '.swiper-button-next',
                    //     prevEl: '.swiper-button-prev'
                    // }
                },
                swiperOptionThumbs: {
                    loop: true,
                    loopedSlides: 5, // looped slides should be the same
                    spaceBetween: 10,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    touchRatio: 0.2,
                    slideToClickedSlide: true
                }
            };
        },
        mounted() {
            let vm = this;


            this.getAllSliders();
            this.slidesAction();
        },
        methods: {
            slidesAction() {
                let vm = this;
                let i = 0;
                let length = vm.slides.length;
                vm.current_slide = vm.slides[i];
                i += 1;
                setInterval(() => {
                    if (length == i) i = 0;
                    vm.current_slide = vm.slides[i];
                    i += 1;
                }, 3000)
            },
            getAllSliders() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.SITE_SLIDER, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        let arr = [];
                        $.each(data.sliders, function (index, slide) {
                            arr.push(slide.image)
                        });
                        vm.slides = data.sliders
                    }
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;

                })
            },
        }
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

    .header_height {
        /*height: 100vh !important;*/
    }

    @media only screen and (max-width: 600px) {
        .header_height {
            /*height: 95vh !important;*/
        }
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

<style lang="scss" scoped>
    .thumb-example {
        height: 320px;
        background-color: #000;
    }

    .swiper {
        .swiper-slide {
            background-size: contain;
            background-position: center;
            margin-top: 50px;
        }

        &.gallery-top {
            height: 100% !important;
            width: 100%;
        }
        .swiper-button-prev.swiper-button-white, .swiper-button-next.swiper-button-white{
            margin-top: 20px;
        }
    }
</style>