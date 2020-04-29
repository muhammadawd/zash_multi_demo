<template>
    <div class="card text-left">
        <div class="card-header bg-black text-white">
            <b>{{this.$ml.get('order_summary')}}</b>
            <a href="" class="float-right">
                <b>{{this.$ml.get('clear_cart')}}</b>
            </a>
        </div>
        <div class="card-body">
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
                <tr>
                    <td>Testing item</td>
                    <td>2</td>
                    <td>150.00</td>
                    <td>300.00</td>
                </tr>
                <tr>
                    <td>Testing item</td>
                    <td>2</td>
                    <td>150.00</td>
                    <td>300.00</td>
                </tr>
                </tbody>
            </table>
            <hr>
        </div>
    </div>
</template>

<script>
    export default {
        name: "orderSummary"
    }
</script>

<style scoped>

</style>