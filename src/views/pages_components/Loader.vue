<template>
    <div class="loader_overlay" v-if="showLoader">
        <div class="content">
            <br>
            <img :src="$helper.getLogo()" class="bounce" alt="">
            <h5 class="display-5 p-0 m-0 text-white">{{this.$ml.get('loading')}}</h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loader",
        props: ['show'],
        data() {
            return {
                show_loader: true
            }
        },
        computed: {
            showLoader() {
                return this.show_loader;
            }
        }
    }
</script>

<style scoped>
    .loader_overlay {
        background: rgba(0, 0, 0, 0.7);
        z-index: 9999;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .loader_overlay .content {
        width: 210px;
        height: 200px;
        border-radius: 18px;
        margin: 300px auto;
        font-weight: bold;
        background-color: #1d1d1d;
    }

    .loader_overlay .content img {
        width: 75%;
        margin-top: 30px;
        height: 46px;
    }

    .bounce {
        bottom: 30px;
        left: 50%;
        width: 60px;
        height: 60px;
        margin-top: 40px;
        margin-bottom: 40px;
        animation: bounce 1s infinite;
        -webkit-animation: bounce 1s infinite;
        -moz-animation: bounce 1s infinite;
        -o-animation: bounce 1s infinite;
    }

    @-webkit-keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            -webkit-transform: translateY(0);
        }
        40% {
            -webkit-transform: translateY(-30px);
        }
        60% {
            -webkit-transform: translateY(-15px);
        }
    }

    @-moz-keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            -moz-transform: translateY(0);
        }
        40% {
            -moz-transform: translateY(-30px);
        }
        60% {
            -moz-transform: translateY(-15px);
        }
    }

    @-o-keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            -o-transform: translateY(0);
        }
        40% {
            -o-transform: translateY(-30px);
        }
        60% {
            -o-transform: translateY(-15px);
        }
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-30px);
        }
        60% {
            transform: translateY(-15px);
        }
    }
</style>