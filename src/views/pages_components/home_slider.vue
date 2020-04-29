<template>
    <div v-if="slides.length > 0">
        <button class="btn btn-pause" @click="playSlider()">
            <i v-if="autoplaybtn" class="fa fa-play"></i>
            <i v-if="!autoplaybtn" class="fa fa-pause"></i>
        </button>
        <agile class="main" ref="main" :options="options1" :as-nav-for="asNavFor1">
            <div class="slide" v-for="(slide, index) in slides" :key="index" :class="`slide--${index}`">
                <div v-if="slide.file.type == 'image'">
                    <img :src="slide.image"/>
                </div>
                <div v-if="slide.file.type == 'video'">
                    <video width="1020px" controls>
                        <source :src="slide.image"/>
                        Your browser does not support HTML5 video.
                    </video>
                </div>
            </div>
        </agile>
        <agile class="thumbnails" ref="thumbnails" :options="options2" :as-nav-for="asNavFor2">
            <div class="slide slide--thumbniail" v-for="(slide, index) in slides" :key="index"
                 :class="`slide--${index}`" @click="$refs.thumbnails.goTo(index)">
                <img :src="slide.file.type == 'image' ? slide.image : '/img/brand/video-placeholder-1.png'"/>
            </div>
            <template slot="prevButton">
                <div class="agile__actions">
                    <button type="button" class="agile__nav-button agile__nav-button--prev"><i
                            class="fas fa-chevron-left"></i></button><!---->
                </div>
            </template>
            <template slot="nextButton">
                <div class="agile__actions">
                    <button type="button" class="agile__nav-button agile__nav-button--next"><i
                            class="fas fa-chevron-right"></i></button>
                </div>
            </template>
        </agile>
    </div>
</template>

<script>

    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import {VueAgile} from 'vue-agile'
    import 'vue-agile/dist/VueAgile.css'

    export default {
        name: "home_slider",
        components: {
            agile: VueAgile
        },
        data() {
            return {
                asNavFor1: [],
                asNavFor2: [],
                options1: {
                    dots: false,
                    fade: true,
                    pauseOnHover:false,
                    centerMode: true,
                    navButtons: false
                },


                options2: {
                    autoplay: true,
                    centerMode: true,
                    pauseOnHover:false,
                    dots: false,
                    navButtons: false,
                    slidesToShow: 3,
                    responsive: [
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 5
                            }
                        },


                        {
                            breakpoint: 1000,
                            settings: {
                                navButtons: true
                            }
                        }]
                },
                autoplaybtn: false,
                slides: []
            };


        },
        mounted() {
            let vm = this;
            this.getAllSliders();
            setTimeout(() => {
                vm.asNavFor1.push(vm.$refs.thumbnails);
                vm.asNavFor2.push(vm.$refs.main);
            }, 1000)
        },
        methods: {
            playSlider() {
                let vm = this;
                vm.autoplaybtn ? vm.autoplaybtn = false : vm.autoplaybtn = true;
                vm.$refs.main.toggleAutoPlay()
                vm.$refs.thumbnails.toggleAutoPlay()
            },
            getAllSliders() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                this.$apiServiesRoutes.API().get(this.$apiServiesRoutes.BASE_URL + this.$apiServiesRoutes.SITE_SLIDER, {
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
    .btn-pause {
        background:rgba(0,0,0,0.5);
        position: absolute;
        z-index: 9;
        color: #fff;
    }

    .main {
        margin-bottom: 30px;
    }

    .thumbnails {
        margin: 0 -5px;
        width: calc(100% + 10px);
    }

    .agile__nav-button {
        border: none;
        color: #ccc;
        cursor: pointer;
        font-size: 24px;
        transition-duration: 0.3s;
        background: transparent !important;
        border: 0 !important;;
    }

    .thumbnails .agile__nav-button {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .thumbnails .agile__nav-button--prev {
        left: -45px;
    }

    .thumbnails .agile__nav-button--next {
        right: -45px;
    }

    .agile__nav-button:hover {
        color: #888;
    }

    .agile__dot {
        margin: 0 10px;
    }

    .agile__dot button {
        background-color: #eee;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: block;
        height: 10px;
        font-size: 0;
        line-height: 0;
        margin: 0;
        padding: 0;
        transition-duration: 0.3s;
        width: 10px;
    }

    .agile__dot--current button, .agile__dot:hover button {
        background-color: #888;
    }

    .slide {
        align-items: center;
        box-sizing: border-box;
        color: #fff;
        display: flex;
        height: 550px;
        justify-content: center;
    }

    .slide--thumbniail {
        cursor: pointer;
        height: 100px;
        padding: 0 5px;
        transition: opacity 0.3s;
    }

    .slide--thumbniail:hover {
        opacity: 0.75;
    }

    .slide img {
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
        -o-object-position: center;
        object-position: center;
        width: 100%;
    }

    .slide .flex-text {
        display: none;
    }

    .slide agile__slide agile__slide--active agile__slide--current .flex-text {
        display: none;
    }
</style>