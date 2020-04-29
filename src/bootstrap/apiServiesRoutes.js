import axios from 'axios';
import {helper} from "@/bootstrap/helper";

let BASE_URL_ORIGIN = process.env.VUE_APP_API_SERVICE;

export const apiServiesRoutes = {
    BASE_URL: BASE_URL_ORIGIN,

    AUTH_TWITTER: '/user/get-twitter-token',
    VERIFY_TWITTER: '/user/twitterLogin',
    REGISTER: '/user/register',
    LOGIN: '/user/login',
    LOGIN_ADMIN: '/admin/login',
    REGISTER_GOOGLE: '/user/auth/login/callback',
    VERFICATION_PHONE: '/user/verify-phone',
    RESEND_VERFICATION_PHONE: '/user/reverify-phone',
    RESEND_VERFICATION_MAIL: '/user/reverify-user',
    RESET_PASSWORD: '/user/auth/reset-password',
    UPDATE_PASSWORD: '/user/auth/update-password',
    UPDATE_INFO: '/user/update-info',
    PRODUCT_AUTO_COMPLETE: '/products/filter-all-products-autocomplete',

    HOME_ADS: '/utilities/get-home-data',
    HOME_ADDRESSES: '/utilities/store-address',
    HOME_CATEGORIES: '/categories',
    HOME_BRANCHES: '/branch/all-without-paginate',
    SITE_SEARCH: '/products/filter-all-products',
    SITE_PRODUCTS: '/products/products-detailed',
    SITE_SLIDER: '/slider',

    MY_VOUCHERS: '/voucher',
    CREATE_VOUCHERS: '/voucher/create',

    FIND_STORES: '/branch/all',
    FIND_CATEGORIES: '/branch/all-category',

    FIND_PRODUCT: '/products/product-detailed',
    FIND_STORE_PRODUCTS: '/store/get-store-detailed-category',
    FIND_STORE_INFO: '/branch/find',
    FIND_STORE_RATINGS: '/rate/get-branch-rate',
    CREATE_STORE_RATINGS: '/rate/create-branch-rate',
    CREATE_SALE: '/sale/create',
    GET_USER_SALES: '/sale/user',

    CHECK_COUPON: '/offers/check-coupon',
    GET_OFFERS_COUPONS: '/branch/all-offers',
    CHECK_FOR_PROMOTION: '/offers/check-offers',

    SYNC_CART: '/shopping-cart-db/sync',
    DELETE_CART: '/shopping-cart-db/remove',
    GET_ALL_CART: '/shopping-cart-db',

    CREATE_CLIENT_ADDRESS: '/client/update-address',
    DELETE_CLIENT_ADDRESS: '/client/delete-address',
    GET_CLIENT_ADDRESS: '/client/get-address',
    GET_COUNTRIES_CITIES: '/utilities/get-government',

    CREATE_VENDOR: '/vendor-register/create',
    CREATE_CONTACT_US: '/contact-us/create',
    CREATE_SUBSCRIBE: '/subscribe/create',

    API: () => {
        let token = null;
        try {
            let auth_data = localStorage.getItem('auth_data');
            auth_data = JSON.parse(auth_data);
            token = auth_data.token;
        } catch (e) {
            token = null
        }

        return axios.create({
            baseURL: BASE_URL_ORIGIN,
            withCredentials: false,
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    },
};
