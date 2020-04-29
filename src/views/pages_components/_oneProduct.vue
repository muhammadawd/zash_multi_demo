<template>
    <div class="card shadow shadow-lg--hover mt-5">
        <div class="card-body text-center" style="min-height: 350px">
            <router-link :to="{name:'show_product',params:{'id':product.id,branch_id:product.branch_id}}">
                <img v-if="product.main_image" :src="product.main_image"
                     class="img-fluid max-h-350"
                     alt="">
                <img src="img/icons/common/no_image.png" v-if="!product.main_image"
                     class="img-fluid max-h-350"
                     alt="">
            </router-link>
            <hr class="m-0 mb-2">
            <h4 class="font-weight-bold text-capitalize"
                style="white-space: nowrap;overflow: hidden;width: 100%;text-overflow: ellipsis;">
                {{product.translated.title}}
            </h4>
            <div class="row mt-2">
<!--                <div class="col-12" style="color: #000;">-->
<!--                    <p class="font-weight-bold float-right">-->
<!--                        {{parseFloat(product.minimum_price).toFixed(3)}}-->
<!--                        <small>{{getCurrency()}}</small>-->
<!--                    </p>-->
<!--                    <del class="font-weight-bold float-left">-->
<!--                        {{parseFloat(product.price_before_discount).toFixed(3)}}-->
<!--                        <small>{{getCurrency()}}</small>-->
<!--                    </del>-->
<!--                </div>-->
            </div>
            <div class="row mt-2">

                <div class="col-12">
                    <div class="btn-group direction-inverse">
                        <!--                        <button class="btn btn-danger btn-md"-->
                        <!--                                @click="addToCart(product)">-->
                        <!--                            <i class="fa fa-lg fa-cart-plus"></i>-->
                        <!--                        </button>-->
                        <router-link :to="{name:'show_product',params:{'id':product.id,branch_id:product.branch_id}}"
                                     class="btn btn-default btn-block">
                            {{this.$ml.get('show_product')}}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "one_product",
        data() {
            return {
                selected_images: [],
            }
        },
        props: {
            product: Object,
            addToCart: Function
        },
        mounted() {
            // console.log(this.product.product_option_values[0])
            // this.selected_images = this.product.product_option_values[0].files;
            // this.selected_images.push({
            //     path: this.product.main_image,
            //     type: 'image'
            // });
        },
        methods: {
            getCurrency() {
                return this.$store.getters.getCurrency
            },
        }
    }
</script>

<style scoped>
    .max-h-350 {
        max-height: 220px;
    }
</style>
