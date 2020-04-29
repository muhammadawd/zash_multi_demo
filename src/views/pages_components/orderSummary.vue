<template>
    <div class="cards text-left">
        <div class="card-header text-black" style="background: #fafafa">
            <b>{{this.$ml.get('order_summary')}}</b>
            <a href="" @click.prevent="close('orderSummaryContainer')" class="float-right text-black">{{$ml.get('cancel')}}</a>
            <!--<b class="float-right">-->
            <!--{{this.$ml.get('total')}} <br> {{getTotalCost}}-->
            <!--</b>-->
            <!--            <a href="" class="float-right">-->
            <!--                <b>{{this.$ml.get('modify_order')}}</b>-->
            <!--            </a>-->
        </div>
        <div class="card-bodys pre-scrollable">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>{{this.$ml.get('items')}}</th>
                    <th>{{this.$ml.get('qty')}}</th>
                    <th>{{this.$ml.get('price')}}</th>
                    <th>{{this.$ml.get('total')}}</th>
                </tr>
                </thead>
                <tbody>
                <slot v-for="(element,key) in cart">
                    <tr :key="key">
                        <td class="text-left">
                            <b>{{element.product_translation.title}}</b>
                            <span :id="'product_row_'+key" style="color: #f00"></span>
                        </td>
                        <td class="text-left">{{element.min_amount_needed}}</td>
                        <td class="text-left">{{parseFloat(element.pov.price).toFixed(3)}}</td>
                        <td class="text-left">{{(parseFloat(element.min_amount_needed) *
                            parseFloat(element.pov.price)).toFixed(3)}}
                        </td>
                    </tr>
                </slot>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "orderSummary",
        data() {
            return {
                cart_elements: []
            }
        },
        mounted() {
            this.cart_elements = this.cart;
            this.updateProductsSummary(this.cart_elements)
        },
        props: {
            updateProductsSummary: Function,
        },
        computed: {
            ...mapState([
                'cart',
                'offers'
            ]),
            getTotalCost() {
                let vm = this;
                let total = 0;

                $.each(vm.cart, function (index, item) {
                    total = total + (item.min_amount_needed * item.pov.price);
                });
                return total.toFixed(3);
            }
        },
        methods: {
            close(card) {
                $(`.${card}`).removeClass('opened')
            },
            ...mapActions([
                'addToCart',
                'deleteToCart',
                'checkStorage',
                'updateToCart',
                'saveToCart'
            ])
        }
    }
</script>

<style scoped>
    .overflow-ellipsis {
        /*min-width: 400px;*/
        width: 450px;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>