<template>
    <section class="header_height" style="position: relative;overflow: hidden;margin-bottom: 0;margin-top: 100px"
             v-if="current_slide">
        <div class="h1_text">
            <h1 class="h1_text_data">
                {{current_slide.translated.title}}</h1>
        </div>
        <div class="image_width">
            <!--<img :src="current_slide.icon" :alt="current_slide.icon" width="100%">-->
        </div>
        <div class="home_header_overlay"></div>
        <div v-if="current_slide" class="home_header"
             :style="{ backgroundImage: 'url(' + current_slide.image + ')',backgroundSize:'contain'}">

            <!--            <video class="video_content" autoplay loop>-->
            <!--                <source src="/img/Comp1.mp4" type="video/mp4">-->
            <!--            </video>-->
            <!--            <div class="image_corner"></div>-->
            <!--            <div class="image_line"></div>-->
        </div>
    </section>
</template>

<script>

    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import {VueAgile} from 'vue-agile'
    import 'vue-agile/dist/VueAgile.css'

    export default {
        name: "home_header",
        components: {
            agile: VueAgile
        },
        data() {
            return {
                current_slide: null,
                lang: this.$ml.current,
                // slides: [{
                //     image: require('@/assets/images/data/1.png'),
                //     text: 'PLUTONE',
                //     icon: require('@/assets/images/data/icon1.png'),
                // },
                //     {
                //         image: require('@/assets/images/data/2.png'),
                //         text: 'GIOVE',
                //         icon: require('@/assets/images/data/icon2.png'),
                //     }, {
                //         image: require('@/assets/images/data/3.png'),
                //         text: 'ICE ROCK',
                //         icon: require('@/assets/images/data/icon3.png'),
                //     }, {
                //         image: require('@/assets/images/data/4.png'),
                //         text: 'MARTE',
                //         icon: require('@/assets/images/data/icon4.png'),
                //     }, {
                //         image: require('@/assets/images/data/5.png'),
                //         text: 'NITTO',
                //         icon: require('@/assets/images/data/icon5.png'),
                //     }
                // ]
                slides: [],
            };


        },
        mounted() {
            this.getAllSliders();
            // this.slidesAction();
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
                    console.log(i)
                    console.log(vm.slides)
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
                        vm.slidesAction();
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
        height: 70vh !important;
    }

    @media only screen and (max-width: 600px) {
        .header_height {
            height: 95vh !important;
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
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        z-index: 99;
        bottom: 18%;
        left: 10%;
        padding: 0 5px;
    }

    .h1_text .h1_text_data {
        font-weight: bold;
        font-size: 50px;
        background: -webkit-linear-gradient(10deg, #fff, #62daa7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
