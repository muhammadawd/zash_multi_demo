import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppAdminHeader from "./layout/AppAdminHeader";
import AppNewHeader from "./layout/AppNewHeader";
import AppFooter from "./layout/AppFooter";
import Home from "./views/Home.vue";
import AllStores from "./views/AllStores.vue";
import FindStore from "./views/FindStore.vue";
import Store from "./views/Store.vue";
import SearchResult from "./views/SearchResult.vue";
import Offers from "./views/Offers.vue";
import Product from "./views/Product.vue";

import ResetPassword from "./views/ResetPassword.vue";
import ForgetPassword from "./views/ForgetPassword.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import PhoneVerification from "./views/PhoneVerification.vue";
import LoginPOS from "./views/LoginPOS.vue";
import AuthTwitterCallback from "./views/AuthTwitterCallback.vue";

import ContactUs from "./views/ContactUs.vue";
import AboutUs from "./views/AboutUs.vue";
import Location from "./views/Location.vue";
import RegisterVendor from "./views/RegisterVendor.vue";

import Invoice from "./views/Invoice.vue";
import Checkout from "./views/Checkout.vue";
import Account from "./views/Account.vue";
import Points from "./views/Points.vue";
import POS from "./views/POS.vue";

Vue.use(Router);

let router = new Router({
    linkExactActiveClass: "active",
    // mode: 'history','hash',
    mode: 'hash',
    routes: [
        {
            path: '/auth/twitter/callback',
            components: {
                default: AuthTwitterCallback,
            }
        },
        {
            path: '/phone/verification/:phone',
            name: 'phone_verification',
            components: {
                header: AppNewHeader,
                default: PhoneVerification,
                footer: AppFooter
            }
        },
        {
            path: "/login",
            name: "login",
            components: {
                header: AppNewHeader,
                default: Login,
                footer: AppFooter
            }
        },
        {
            path: "/login_pos",
            name: "login_pos",
            components: {
                header: AppNewHeader,
                default: LoginPOS,
                footer: AppFooter
            }
        },
        {
            path: "/register",
            name: "register",
            components: {
                header: AppNewHeader,
                default: Register,
                footer: AppFooter
            }
        },
        {
            path: "/register_vendor",
            name: "register_vendor",
            components: {
                header: AppNewHeader,
                default: RegisterVendor,
                footer: AppFooter
            }
        },
        {
            path: "/forget_password",
            name: "forget_password",
            components: {
                header: AppNewHeader,
                default: ForgetPassword,
                footer: AppFooter
            }
        },
        {
            path: "/reset_password/:token",
            name: "reset_password",
            components: {
                header: AppNewHeader,
                default: ResetPassword,
                footer: AppFooter
            }
        },
        {
            path: "/contact_us",
            name: "contact_us",
            components: {
                header: AppNewHeader,
                default: ContactUs,
                footer: AppFooter
            }
        },
        {
            path: "/",
            name: "home",
            components: {
                header: AppNewHeader,
                default: Home,
                footer: AppFooter
            }
        },
        {
            path: "/about_us",
            name: "about_us",
            components: {
                header: AppNewHeader,
                default: AboutUs,
                footer: AppFooter
            }
        },
        {
            path: "/location",
            name: "location",
            components: {
                header: AppNewHeader,
                default: Location,
                footer: AppFooter
            }
        },
        {
            path: "/all_stores",
            name: "all_stores",
            components: {
                header: AppNewHeader,
                default: AllStores,
                footer: AppFooter
            }
        },
        {
            path: "/findstore",
            name: "findstore",
            components: {
                header: AppNewHeader,
                default: FindStore,
                footer: AppFooter
            }
        },
        {
            path: "/store/:id",
            name: "store",
            components: {
                header: AppNewHeader,
                default: Store,
                footer: AppFooter
            }
        },
        {
            path: "/search_result",
            name: "search_result",
            components: {
                header: AppNewHeader,
                default: SearchResult,
                footer: AppFooter
            }
        },
        {
            path: "/offers",
            name: "offers",
            components: {
                header: AppNewHeader,
                default: Offers,
                footer: AppFooter
            }
        },
        {
            path: '/show_product/:id/:branch_id',
            name: 'show_product',
            components: {
                header: AppNewHeader,
                default: Product,
                footer: AppFooter
            }
        },
        {
            path: '/invoice',
            name: 'invoice',
            components: {
                default: Invoice,
            }
        },
        {
            path: '/checkout',
            name: 'checkout',
            meta: {
                requiresAuth: true
            },
            components: {
                header: AppNewHeader,
                default: Checkout,
                footer: AppFooter
            }
        },
        {
            path: '/account',
            name: 'account',
            meta: {
                requiresAuth: true
            },
            components: {
                header: AppNewHeader,
                default: Account,
                footer: AppFooter
            }
        },
        {
            path: '/my_points',
            name: 'my_points',
            meta: {
                requiresAuth: true
            },
            components: {
                header: AppNewHeader,
                default: Points,
                footer: AppFooter
            }
        },
        {
            path: '/pos',
            name: 'pos',
            meta: {
                requiresAuthPOS: true
            },
            components: {
                header: AppAdminHeader,
                default: POS,
                footer: AppFooter
            }
        },
    ],
    scrollBehavior: to => {
        if (to.hash) {
            console.log(to)
            return {selector: to.hash};
        } else {
            return {x: 0, y: 0};
        }
    }
});

/**
 * routes middleware
 */
router.beforeEach((to, from, next) => {
    // close menu mobile
    $('.collapse-close button').trigger('click');

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('auth') == null) {
            next({name: 'login', query: {nextUrl: to.name}});
        } else {
            next();
        }
    } else {
        next();
    }

    if (to.matched.some(record => record.meta.requiresAuthPOS)) {
        console.log('dsadsa')
        if (localStorage.getItem('auth_pos') == null) {
            next({name: 'login_pos', query: {nextUrl: to.name}});
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
