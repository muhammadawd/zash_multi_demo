import Vue from 'vue'
import {MLInstaller, MLCreate, MLanguage} from 'vue-multilanguage'

Vue.use(MLInstaller);

export default new MLCreate({
    initial: 'ar',
    // development  , production
    save: process.env.NODE_ENV === 'production',
    languages: [
        new MLanguage('en').create({
            by: 'By ',
            languages: 'english language',
            share_whatsapp: 'Share Whatsapp',
            ads: 'All Advertisment',
            footer_social_p: 'Follow Us On Social Networking Site',
            subscribe: 'Subscribe',
            subscribe_holder: 'Enter your email address',
            subscribe_p: 'I subscribe to receive fashion news',
            offers: 'Offers',
            most_sales: 'Most Sales',
            all_store: 'All Stores',
            login: 'Login',
            register: 'register',
            register_vendor: 'Register Vendor',
            find_store: 'Find Store',
            select_area: 'Select Area',
            select_gender: 'Gender',
            select_filter: 'Filter By',
            select_store: 'Select By Store',
            search_key: 'Search Query',
            filter: 'Filter',
            show_more: 'Show More',
            search_result_p: 'Your Search Result For: ',
            ar: 'Ar',
            en: 'En',
            find_home: 'Find Store',
            order_home: 'Order Your Clothes',
            enjoy_home: 'Then Enjoy',
            home: 'Home',
            all_stores: 'All Stores',
            all_categories: 'All Categories',
            your_cart: 'Your Cart',
            area: 'Area',
            sort_by: 'Sort By',
            recommended: 'Recommended',
            ratings: 'Ratings',
            a_z: 'A - Z',
            newest: 'Newest',
            min_order_amount: 'Min . Order Amount',
            show_product: 'Show',
            no_data_cart: 'There are no items in your cart',
            sub_total: 'Sub Total',
            total: 'Total',
            submit_checkout: 'Process Checkout',
            site_search: 'search products , trademarks & categories ...',
            products: 'All Products',
            google: 'Google',
            twitter: 'Twitter',
            facebook: 'Facebook',
            sign_with: 'Or sign in with credentials',
            or_sign_with: 'Sign In With',
            sign_in: 'Sign In',
            email: 'Email',
            password: 'Password',
            specifications: 'Specifications',
            customer_reviews: 'Customer Reviews',
            first_name: 'First Name',
            last_name: 'Last Name',
            confirm_password: 'Password Confirmation',
            description: 'Description',
            add_to_cart: 'Add To Cart',
            first_rate: 'Be the first to rate this product',
            rate_it: 'Rate this product:',
            change_lang: 'Change Language',
            checkout: 'Checkout',
            order_summary: 'Order Summary',
            modify_order: 'Modify Order',
            items: 'Item(s)',
            qty: 'Qty',
            price: 'Price',
            add_address: 'Add Address',
            add: 'Add',
            please_add_address: 'Please add a new address to proceed with checkout',
            save: 'Save',
            close: 'Close',
            prefix: 'Prefix',
            phone: 'Phone Number',
            contact_details: 'Contact Details',
            address_details: 'Address Details',
            full_address: 'Full Address',
            payment_summary: 'Payment Summary',
            voucherCode: 'Voucher Code',
            redeem: 'redeem',
            payment_methods: 'Payment Methods',
            my_account: 'My Account',
            my_orders: 'My Orders',
            addresses: 'My Addresses',
            edit: 'Edit',
            search: 'search',
            remove: 'Remove',
            add_new_address: 'Add New Address',
            forget_password: 'Forgot password?',
            reset_sent: 'Reset Mail Have Sent Successfully Please Check Your Mail To Change Password ',
            create_account: 'Create New Account',
            have_account: 'Already Have Account !',
            type_mail_reset: 'Type Your E-Mail To Reset Password',
            show_details: 'Show Details',
            contact_us: 'Contact Us',
            message: 'Message',
            send: 'send',
            male: 'male',
            female: 'female',
            coupons: 'coupons ',
            promotions: 'Promotions',
            info: 'Info',
            store_name: 'Store Name',
            land_line: 'LandLine No.',
            office: 'Office',
            house: 'House',
            apartment: 'Apartment',
            street: 'Street',
            building: 'Building',
            floor: 'Floor',
            additional_direction: 'Additional Direction',
            no_ratings: 'There are currently no reviews available for this store',
            logout: 'Logout',
            resend_mail: 'Resend Verfication Mail',
            change_password_reset: 'Confirm To Change Password',
            change_password: 'Update Password',
            loading: 'Loading ..',
            select_category: 'Select Category',
            no_data: 'No Data',
            all: 'All',
            select_quantity: 'Select Quantity',
            clear_cart: 'Clear Cart',
            in_stock: 'In Stock',
            out_off_stock: 'Out Of Stock',
            error: 'Error',
            cash: 'Cash On Delivery',
            knet: 'Pay With Knet',
            select_product_first: 'Please Select Product First',
            already_added: 'Already Added To Cart',
            rate_store: 'Write Comment To Rate Store',
            no_pov: 'there is no product related to selected Options , please re-choose options',
            out_of_stock: 'Out Of stock',
            are_you_sure: 'Are You Sure ?',
            yes: 'Yes',
            no: 'No',
            select_branch: 'Select Branch',
            selected_address: 'Select Address',
            current_coupon: 'Current Coupon Is `',
            coupon_value: ' With Value Of',
            coupon_earn: ' Now You Can Earn Coupon With Code to get discount',
            offer_p_promotion_1: 'Buy ',
            offer_p_promotion_2: 'Pieces And Get ',
            offer_p_promotion_3: 'When You Bill Total Greater Than',
            offer_p_promotion_4: 'Pieces For Free',
            offer_m_promotion_1: 'Buy ',
            offer_m_promotion_2: 'Pieces And Get ',
            offer_m_promotion_3: 'When You Bill Total Greater Than',
            offer_m_promotion_4: 'Cash Discount',
            coupon_total: 'Coupon Discount',
            offers_total: 'Offers Discount',
            discount_total: 'Total Discount',
            success: 'Success',
            code_offer_sure: 'Just You Have To Be Sure , Choose One Method Offers Or Coupon',
            no_sufficient_amount: 'insufficient amount max allowed quantity is ',
            added_to_cart: 'added to cart',
            sale_complete: 'Sale Complete , We will contact you soon',
            edited_success: 'Edited Success',
            reset_options: 'Reset Options',
            quantity: 'Quantity',
            item: 'Item',
            name: 'Name',
            join_us: 'Join Us',
            branch_name: 'Branch Name',
            no_result: 'No Result',
            cart: 'cart',
            categories: 'categoies',
            all_products: 'All Products',
            undefined_price: 'Undefined Price',
            undefined_price_p: ' "This product is available, but its price has not been determined. The price is decided by the administration after ordering." ',
            about_us: 'About Us',
            video: 'video',
            map: 'Map',
            location: 'our location',
            360: '360',
            more_details: 'more details',
            top_products: 'Top Products',
            header_1: 'Offers & Gifts',
            header_p_1: 'Shopping cart online',
            header_2: 'Delivery',
            header_p_2: 'Shopping cart online',
            header_3: 'Cart',
            header_p_3: 'Shopping cart online',
            phone_verification: 'phone verification',
            verify: 'verify',
            fils: 'fils',
            verify_msg: 'verify your phone by typing the code sent by sms',
            code: 'code',
            kwd: 'kwd',
            seconds: 'Seconds',
            resend: 'Resend Code',
            email_or_phone: 'Phone or Email',
            wait_resend: 'Wait A few Second To Resend Code',
            visa_master: 'Visa / Master',
            cards: 'Cards',
            my_points: 'My Points',
            transform_points: 'Transform Points',
            payment_fees: 'Payment Fees',
            price_range: 'Price Range',
            to_money_percent: 'Price Of Transfer Points To Cash Per Point',
            email_optional: 'Email',
            vouchers: 'vouchers',
            is_used: 'is used',
            used: 'used',
            not_used: 'not used',
            value: 'value',
            points: 'points',
            order_details: 'Order Details',
            cancel: 'cancel'
        }),

        new MLanguage('ar').create({
            email_optional: 'البريد الالكتروني ',
            phone_verification: 'تفعيل رقم الهاتف',
            more_details: 'تفاصيل اكثر',
            360: '360',
            cancel: 'الغاء',
            order_details: 'تفاصيل الطلب',
            is_used: 'الاستخدام',
            used: 'مستخدم',
            not_used: 'غير مستخدم',
            value: 'القيمة',
            points: 'النقاط',
            location: 'موقعنا',
            fils: 'فلس',
            vouchers: 'قسائم الشراء',
            to_money_percent: 'سعر تحويل النقاط الى قسيمة شراء لكل نقطة',
            transform_points: 'تحويل النقاط',
            my_points: 'نقاطي',
            verify: 'تفعيل',
            price_range: 'متوسط اسعار المنتجات',
            payment_fees: 'مصاريف الدفع',
            visa_master: 'الدفع بواسطة Visa / Master',
            cards: 'الدفع بواسطة Cards',
            email_or_phone: 'اكتب البريد الالكتروني او رقم الهاتف',
            code: 'الرمز',
            by: 'بواسطة',
            seconds: 'ثواني',
            resend: 'اعادة الارسال',
            verify_msg: 'قم بتفعيل رقم هاتفك عن طريق كتابة الكود المرسل بواسطة sms',
            wait_resend: 'اذا كان لديك مشكلة انتظر   قليلا لاعادة الارسال',
            languages: 'اللغة العربية',
            footer_social_p: 'تابعنا على صفحات التواصل الاجتماعي',
            subscribe: 'اشترك الان',
            subscribe_holder: 'ادخل البريد الالكتروني',
            subscribe_p: 'اشترك الان ليصلك اخر الاخبار عن اجدد المنتجات والعروض المقدمة',
            offers: 'العروض',
            most_sales: 'الاكثر مبيعا',
            all_store: 'جميع المتاجر',
            login: 'تسجيل الدخول',
            register: 'حساب جديد',
            register_vendor: 'انشاء متجر',
            find_store: 'ابحث عن المتاجر',
            select_area: 'اختر المنطقة',
            select_gender: 'الجنس',
            select_filter: 'تصفية',
            select_store: 'تصفية بواسطة المخزن',
            search_key: 'كلمة البحث',
            filter: 'تصفية',
            search_result_p: 'نتائج البحث عن : ',
            show_more: 'عرض المزيد',
            ar: 'عربي',
            en: 'انجليزي',
            find_home: 'ابحث عن المتجر',
            order_home: 'اطلب طلبك',
            enjoy_home: 'استمتع بطلبك',
            home: 'الرئيسية',
            all_stores: 'جميع المتاجر',
            all_categories: 'جميع التصنيفات',
            your_cart: 'سلة مشترياتك',
            area: 'بالمنطقة',
            sort_by: 'ترتيب بواسطة',
            recommended: 'موصي به',
            ratings: 'التقييم',
            a_z: 'أ - ي',
            newest: 'الاحدث',
            min_order_amount: 'الاقل تكلفة',
            show_product: 'عرض ',
            no_data_cart: 'ﻻ يوجد اى منتجات فى السلة الخاصة بك',
            sub_total: 'اجمالى',
            total: 'الاجمالى النهائي',
            submit_checkout: 'اضغط لانهاء عملية الطلب',
            products: 'جميع المنتجات',
            google: 'جوجل',
            twitter: 'تويتر',
            facebook: 'فيسبوك',
            sign_with: 'او سجل باستخدام بياناتك الشخصية',
            or_sign_with: 'سجل الدخول بواسطة',
            sign_in: 'دخول',
            email: 'البريد الالكتروني',
            password: 'كلمة المرور',
            specifications: 'المواصفات',
            customer_reviews: 'تقييمات العملاء',
            first_name: 'الاسم الاول',
            last_name: 'الاسم الاخير',
            confirm_password: 'تأكيد كلمة المرور',
            description: 'الوصف',
            add_to_cart: 'اضافة الي السلة',
            first_rate: 'كن اول من يقيم المنتج',
            rate_it: 'قيم المنتج الان',
            change_lang: 'تغيير اللغة',
            checkout: 'انهاء الطلب',
            order_summary: 'ملخص الطلب',
            modify_order: 'تعديل الطلب',
            items: 'منتج',
            qty: 'عدد',
            price: 'سعر',
            add_address: 'اضافة عنوان',
            add: 'اضافة',
            please_add_address: 'من فضلك اضف عنوان من اجل انهاء عمليه الشراء',
            save: 'حفظ',
            close: 'اغلاق',
            prefix: 'البادئة',
            phone: 'رقم الهاتف',
            contact_details: 'بيانات التواصل',
            address_details: 'بيانات العنوان',
            full_address: 'العنوان بالكامل',
            payment_summary: 'ملخص المدفوعات',
            payment_methods: 'وسائل الدفع',
            voucherCode: 'كوبون كود او قسيمة شراء ',
            redeem: 'تحقيق',
            my_account: 'حسابي',
            my_orders: '  طلباتي',
            addresses: 'عناويني',
            edit: 'تعديل',
            remove: 'حذف',
            search: 'البحث',
            kwd: 'د.ك',
            add_new_address: 'اضافة عنوان جديد',
            forget_password: 'نسيت كلمة المرور',
            reset_sent: ' لقد تم ارسال الرابط الى رقم هاتفك لتغيير كلمة المرور',
            create_account: 'انشاء حساب جديد',
            have_account: 'لدي حساب بالفعل!',
            type_mail_reset: 'اكتب بريدك الالكتروني لتغيير كلمة المرور',
            show_details: 'عرض التفاصيل',
            contact_us: 'تواصل معنا',
            message: 'نص الرسالة',
            send: 'ارسال  ',
            male: 'ذكر',
            female: 'انثي  ',
            coupons: 'كوبونات ',
            promotions: 'عروض',
            info: 'بيانات',
            store_name: 'اسم المتجر',
            land_line: 'هاتف ارضي',
            office: 'مكتب',
            house: 'منزل',
            apartment: 'شقة',
            street: 'شارع',
            building: 'مبني',
            floor: 'طابق',
            additional_direction: 'اتجاهات اضافيه',
            no_ratings: 'عفوا لا يوجد تقييمات حالية لهذا المتجر',
            resend_mail: 'اعادة ارسال بريد التأكيد',
            logout: 'تسجيل الخروج',
            change_password_reset: 'اكتب كلمة مرور جديدة',
            change_password: 'تحديث كلمة المرور',
            loading: 'جارِ التحميل ',
            select_category: ' اختر التصنيف',
            no_data: 'ﻻ توجد بيانات',
            all: 'الكل',
            select_quantity: 'اختر الكمية',
            in_stock: 'متوفر',
            out_off_stock: 'غير متوفر',
            clear_cart: 'افراغ السلة',
            error: 'خطأ',
            cash: 'الدفع عند التوصيل',
            knet: 'الدفع بواسطة كي نت',
            select_product_first: 'من فضلك قم بتحديد المنتج اولا',
            already_added: 'تمت الاضافة بالفعل',
            rate_store: 'اكتب تعليقك لاضافة تقييم',
            no_pov: 'ﻻ يوجد منتج متوافق مع هذه الخصائص من فضلك اعد اختيار الخصائص',
            out_of_stock: 'ﻻ توجد كميات محدد لهذا المنتج',
            are_you_sure: 'هل انت متأكد',
            yes: 'نعم',
            no: 'ﻻ',
            select_branch: 'اختر المتجر',
            selected_address: 'العنوان المحدد',
            current_coupon: 'الكود المستخدم حاليا `',
            coupon_value: 'بقيمة تساوي ',
            coupon_earn: 'الان يمكنك ان تحصل على خصم مبلغ على اجمالى مشترياتك عند استخدامك الكود  ',
            offer_p_promotion_1: 'اشتري ',
            offer_p_promotion_2: 'قطعة واحصل على ',
            offer_p_promotion_3: 'عندما يكون اجمالى فاتورتك اكبر من ',
            offer_p_promotion_4: 'قطعة مجانية',
            offer_m_promotion_1: 'اشتري ',
            offer_m_promotion_2: 'قطعة واحصل على ',
            offer_m_promotion_3: 'عندما تكون اجمالى فاتورتك اكبر من ',
            offer_m_promotion_4: 'خصم  ',
            coupon_total: 'خصم كوبون ',
            offers_total: 'خصم عروض ',
            discount_total: '  اجمالى الخصومات',
            success: 'تمت بنجاح',
            code_offer_sure: 'عليك التأكد من استخدامك طريقة واحدة فقط للخصومات اما الكوبونات او العروض  ',
            no_sufficient_amount: 'كمية غير مناسبة اقصي قيمة يمكن طلبها هي ',
            added_to_cart: 'تمت الاضافة بنجاح',
            sale_complete: ' سیتم التواصل معاك علي الهاتف بخصوص الاوردر',
            edited_success: '  تم التعديل بنجاح',
            reset_options: 'تصفية الخصائص',
            quantity: 'الكمية',
            item: 'المنتج',
            branch_name: 'اسم المتجر',
            name: 'الاسم',
            join_us: 'انضم الينا',
            no_result: 'ﻻ توجد بيانات',
            cart: 'السلة',
            categories: 'التصنيفات',
            all_products: 'جميع المنتجات',
            ads: 'جميع الاعلانات',
            undefined_price: 'غير محدد  ',
            undefined_price_p: '  "هذا المنتج متاح ولكن لم يتم تحديد سعره، يتم تحديد السعر من الاداره بعد الطلب "  ',
            about_us: 'عن المتجر',
            video: 'فيديو',
            map: 'الخريطة',
            top_products: 'المنتجات الاكثر مبيعا',
            share_whatsapp: '  شارك واتساب',
            site_search: 'ابحث عن تصنيفات ومنتجات ...',
            header_1: 'عروض وهدايا',
            header_p_1: 'انتظر العروض والهدايا',
            header_2: 'الشحن والتوصيل',
            header_p_2: 'شحن طلبك الى المنزل فى اسرع وقت',
            header_3: 'سلة الشراء',
            header_p_3: 'تسوق وادفع الان اونلاين',
        })
    ]
})
