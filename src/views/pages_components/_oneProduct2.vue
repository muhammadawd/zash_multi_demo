<template>
    <div class="card card_curve shadow shadow-lg--hover mt-5" @mouseenter="mouseEnter()" @mouseleave="mouseLeave()">
        <div class="card-body text-center p-0 m-0" style="min-height: 250px">
            <div class="addtoCartbtn" v-on:click.stop="addToCart(product)">
                <span class="day">
                    <i class="fa fa-cart-plus"></i>
                </span>
                <!--<span class="month">{{$ml.get('add')}}</span>-->
            </div>
            <router-link :to="{name:'show_product',params:{'id':product.id,branch_id:product.branch_id}}">
                <div style="z-index: 9;width: 100%;background: red;opacity: 0.5;color: #fff;"
                     v-if="product.product_option_values[0].store_detail && (product.product_option_values[0].store_detail.quantity - product.product_option_values[0].store_detail.reserved == 0)"
                     class="position-absolute">{{$ml.get('out_off_stock')}}
                </div>
                <figure class="snip1527">
                    <div class="image"
                         v-lazy-container="{ selector: 'img', error:'img/icons/common/no_image.png', loading: 'img/icons/common/restricted.gif' }">
                        <img v-if="current_image" :data-src="current_image" width="100%"
                             alt="pr-sample23"/>
                    </div>
                    <figcaption>

                        <h3 class="text-black" style="font-size: 18px;width: 100%">{{product.translated.title}}</h3>
                        <div class="row mt-2">
                            <div class="col-12" style="color: #000;">
                                <template v-if="product.price_before_discount == 0">

                                    <p class="font-weight-bold text-center">
                                        {{parseFloat(product.minimum_price).toFixed(3)}}
                                        <small>{{getCurrency()}}</small>
                                    </p>
                                </template>
                                <template v-else>
                                    <p class="font-weight-bold float-right">
                                        {{parseFloat(product.minimum_price).toFixed(3)}}
                                        <small>{{getCurrency()}}</small>
                                    </p>
                                    <del class="font-weight-bold float-left">
                                        <!--<slot v-if="product.price_before_discount">-->
                                        {{parseFloat(product.price_before_discount).toFixed(3)}}
                                        <small>{{getCurrency()}}</small>
                                        <!--</slot>-->
                                    </del>
                                </template>
                            </div>
                        </div>
                    </figcaption>
                    <!--<a href="#"></a>-->
                </figure>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "one_product",
        data() {
            return {
                interval: null,
                selected_images: [],
                current_image: null,
            }
        },
        props: {
            product: Object,
            addToCart: Function
        },
        mounted() {
            // if (this.product.product_option_values[0].files.length) {
            //     let image_path = this.product.product_option_values[0].files[0].path;
            //     this.selected_images.push(image_path)
            // }

            this.selected_images = this.product.product_option_values[0].files;
            // this.selected_images = [];
            this.current_image = this.product.main_image;
            // this.current_image = 'https://zashzash.com/back_end/storage/images/products/3976009761581444485.png';
            this.selected_images.push({
                path: this.product.main_image,
                type: 'image'
            });
        },
        methods: {
            mouseEnter() {
                let i = 0;
                let length = this.selected_images.length;
                let interval = setInterval(() => {

                    this.current_image = this.selected_images[i].path;
                    console.log(this.current_image)
                    i = i + 1;
                    if (i == length) i = 0;
                }, 1000)
                this.interval = interval;
            },
            mouseLeave() {
                clearInterval(this.interval)
            },
            getCurrency() {
                return this.$store.getters.getCurrency
            },
        }
    }
</script>

<style>
    .progressive-image-wrapper {
        padding-bottom: 0 !important;
    }

    .addtoCartbtn {
        width: 50px;
        height: 50px;
        /*background-color: #2dce89bf;*/
        background-color: #2dce89bf;
        border:0.5px dashed #2dce89bf;
        color: #fff;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
        position: absolute;
        z-index: 99;
        top: 5px;
        right: 5px;
        box-shadow: 1px 2px 12px #999;
        /*padding: 0px;*/
    }
</style>
