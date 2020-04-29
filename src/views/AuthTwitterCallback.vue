<template>
    <div>
        <h2>Twitter Callback Redirect ...  </h2>
    </div>
</template>
<script>
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        data() {
            return {
                twitter_keys: '',
                oauth_token: '',
                oauth_verifier: '',
            }
        },
        mounted() {
            let vm = this;
            let searchParams = new URLSearchParams(window.location.search)
            // vm.oauth_token = vm.$route.query.oauth_token;
            // vm.oauth_verifier = vm.$route.query.oauth_verifier;
            vm.oauth_token = searchParams.get('oauth_token');
            vm.oauth_verifier = searchParams.get('oauth_verifier');
            vm.twitter_keys = JSON.parse(localStorage.getItem('twitter_keys'));
            vm.handleLoginTwitter();
        },
        methods: {
            handleLoginTwitter() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let request_data = {
                    oauth_verifier: vm.oauth_verifier,
                    oauth_token: vm.oauth_token,
                    oauth_token_secret: vm.twitter_keys.oauth_token_secret,
                };
                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.VERIFY_TWITTER, request_data)
                    .then((resp) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        let status = resp.data.status;
                        let data = resp.data.data;
                        let errors = resp.data.errors;
                        // return '';
                        if (!status) {
                            vm.showVaildationMassges(data.validation_errors);
                            vm.showErrorsMassges(errors);
                            return;
                        }
                        localStorage.setItem('auth', JSON.stringify(data));
                        vm.$store.dispatch('addAuthUser', data);
                        if (vm.$route.query.nextUrl) {
                            vm.$router.push({name: vm.$route.query.nextUrl});
                            location.reload()
                            return;
                        }
                        vm.$router.push({name: 'home'})
                        location.reload()
                    })
                    .catch((err) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;

                    })
            },
        }
    }
</script>
