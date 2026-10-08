/**
 * ==============================================================================
 * ELECTRO E-COMMERCE - CORE JAVASCRIPT SYSTEM
 * 100% Plain Vanilla JavaScript - No external libraries
 * Multi-Currency Switcher, Multi-Language Translation, Live Product Search,
 * Category Filtering, Hero Auto-Slider (1.8s), Wishlist Heart / Like Engine,
 * Cart & Order Management with LocalStorage Synchronization.
 * ==============================================================================
 */

(function () {
    'use strict';

    // ==========================================================================
    // 0. LOCALSTORAGE KEYS & CONFIGURATIONS
    // ==========================================================================
    const STORAGE_KEYS = {
        USERS: 'electro_users_db',
        CURRENT_USER: 'electro_current_user',
        CART: 'electro_cart_items',
        ORDERS: 'electro_user_orders',
        WISHLIST: 'electro_user_wishlist',
        REVIEWS: 'electro_user_reviews',
        MESSAGES: 'electro_contact_messages',
        CURRENCY: 'electro_selected_currency',
        LANGUAGE: 'electro_selected_lang'
    };

    // Supported Currencies with real-world exchange rates relative to USD ($1 base)
    const CURRENCIES = {
        USD: { symbol: '$', rate: 1.0, name: 'USD ($)', position: 'prefix', label: 'USD ($)' },
        INR: { symbol: '₹', rate: 83.50, name: 'INR (₹ Rupees)', position: 'prefix', label: 'INR (₹)' },
        RUB: { symbol: '₽', rate: 92.00, name: 'RUB (₽ Rubles)', position: 'suffix', label: 'RUB (₽)' },
        JPY: { symbol: '¥', rate: 155.00, name: 'JPY (¥ Yen)', position: 'prefix', label: 'JPY (¥)' },
        EUR: { symbol: '€', rate: 0.92, name: 'EUR (€ Euro)', position: 'prefix', label: 'EUR (€)' },
        GBP: { symbol: '£', rate: 0.79, name: 'GBP (£ Pound)', position: 'prefix', label: 'GBP (£)' },
        AED: { symbol: 'AED ', rate: 3.67, name: 'AED (د.إ Dirham)', position: 'prefix', label: 'AED (د.إ)' }
    };

    // Multi-Language Translation Dictionary
    const I18N_DICTIONARY = {
        en: {
            top_help: "Help",
            top_support: "Support",
            top_contact: "Contact",
            top_call_us: "Call Us:(+012) 1234 567890",
            my_dashboard: "My Dashboard",
            search_placeholder: "Search Looking For?",
            all_categories: "All Category",
            nav_all_categories: "All Categories",
            nav_home: "Home",
            nav_shop: "Shop",
            nav_offers: "Offers",
            nav_single: "Single Page",
            nav_pages: "Pages",
            nav_contact: "Contact",
            add_to_cart: "Add To Cart",
            btn_add: "Add",
            shop_now: "Shop Now",
            special_offer: "Special Offer",
            save_up_to: "SAVE UP TO $200",
            terms_apply: "Terms and Condition Apply",
            free_return: "FREE RETURN",
            free_return_desc: "30 days money back guarantee!",
            free_shipping: "FREE SHIPPING",
            free_shipping_desc: "Free shipping on all order",
            support_247: "SUPPORT 24/7",
            support_247_desc: "Contact us 24 hours a day",
            best_seller_title: "BEST SELLER PRODUCTS",
            liked_products_title: "Liked Products",
            order_list_title: "Order List & Purchases",
            cart_status_title: "Add To Cart Status",
            overview_title: "Account Overview",
            edit_profile_title: "Edit Profile & Address",
            returns_feedback_title: "Returns & Feedback",
            sign_out: "Sign Out",
            search_results_heading: "Search Results",
            search_found_meta: "Showing products matching your search",
            clear_search: "✕ Clear & Show All",
            no_products_found: "No products found matching your search. Try another keyword or browse all categories.",
            wishlist_empty: "You haven't liked any products yet. Click ❤️ on any product to save it here!",
            total_purchased: "Total Purchased",
            orders_placed: "Orders Placed",
            items_in_cart: "Items in Cart",
            favorite_category: "Favorite Category"
        },
        hi: {
            top_help: "मदद",
            top_support: "सहायता",
            top_contact: "संपर्क",
            top_call_us: "कॉल करें:(+012) 1234 567890",
            my_dashboard: "मेरा डैशबोर्ड",
            search_placeholder: "उत्पाद खोजें (जैसे कैमरा, फोन, लैपटॉप)...",
            all_categories: "सभी श्रेणियां",
            nav_all_categories: "सभी श्रेणियां",
            nav_home: "होम",
            nav_shop: "शॉप",
            nav_offers: "ऑफ़र्स",
            nav_single: "उत्पाद विवरण",
            nav_pages: "पेज",
            nav_contact: "संपर्क करें",
            add_to_cart: "कार्ट में जोड़ें",
            btn_add: "जोड़ें",
            shop_now: "अभी खरीदें",
            special_offer: "विशेष ऑफ़र",
            save_up_to: "बड़ी छूट ₹16,700 तक",
            terms_apply: "नियम एवं शर्तें लागू",
            free_return: "मुफ़्त वापसी",
            free_return_desc: "30 दिनों में पैसे वापसी की गारंटी!",
            free_shipping: "मुफ़्त डिलीवरी",
            free_shipping_desc: "सभी ऑर्डरों पर मुफ़्त शिपिंग",
            support_247: "24/7 सहायता",
            support_247_desc: "हमसे 24 घंटे कभी भी संपर्क करें",
            best_seller_title: "सर्वश्रेष्ठ बिकने वाले उत्पाद",
            liked_products_title: "पसंद किए गए उत्पाद",
            order_list_title: "ऑर्डर सूची और खरीदारी",
            cart_status_title: "कार्ट स्थिति और ऑर्डर",
            overview_title: "खाता अवलोकन",
            edit_profile_title: "प्रोफ़ाइल और पता बदलें",
            returns_feedback_title: "वापसी और फीडबैक",
            sign_out: "साइन आउट",
            search_results_heading: "खोज परिणाम",
            search_found_meta: "आपकी खोज के अनुसार उत्पाद दिखाए जा रहे हैं",
            clear_search: "✕ खोज हटाएं और सब देखें",
            no_products_found: "आपकी खोज के अनुसार कोई उत्पाद नहीं मिला। कृपया दूसरा शब्द खोजें।",
            wishlist_empty: "आपने अभी तक कोई उत्पाद पसंद नहीं किया है। किसी भी उत्पाद पर ❤️ दबाकर उसे यहाँ जोड़ें!",
            total_purchased: "कुल खरीदारी",
            orders_placed: "किए गए ऑर्डर",
            items_in_cart: "कार्ट में उत्पाद",
            favorite_category: "पसंदीदा श्रेणी"
        },
        ru: {
            top_help: "Помощь",
            top_support: "Поддержка",
            top_contact: "Контакты",
            top_call_us: "Позвоните нам:(+012) 1234 567890",
            my_dashboard: "Мой профиль",
            search_placeholder: "Что вы ищете?",
            all_categories: "Все категории",
            nav_all_categories: "Все категории",
            nav_home: "Главная",
            nav_shop: "Магазин",
            nav_offers: "Акции",
            nav_single: "Товар",
            nav_pages: "Страницы",
            nav_contact: "Контакты",
            add_to_cart: "В корзину",
            btn_add: "Добавить",
            shop_now: "Купить сейчас",
            special_offer: "Спецпредложение",
            save_up_to: "СКИДКА ДО 18 000 ₽",
            terms_apply: "Применяются условия акции",
            free_return: "БЕСПЛАТНЫЙ ВОЗВРАТ",
            free_return_desc: "Гарантия возврата 30 дней!",
            free_shipping: "БЕСПЛАТНАЯ ДОСТАВКА",
            free_shipping_desc: "Бесплатная доставка на все заказы",
            support_247: "ПОДДЕРЖКА 24/7",
            support_247_desc: "Круглосуточная помощь",
            best_seller_title: "ХИТЫ ПРОДАЖ",
            liked_products_title: "Избранные товары",
            order_list_title: "Список заказов",
            cart_status_title: "Статус корзины",
            overview_title: "Обзор аккаунта",
            edit_profile_title: "Редактировать профиль",
            returns_feedback_title: "Возврат и отзывы",
            sign_out: "Выйти",
            search_results_heading: "Результаты поиска",
            search_found_meta: "Найденные товары по запросу",
            clear_search: "✕ Очистить поиск",
            no_products_found: "Товары не найдены. Попробуйте другой запрос.",
            wishlist_empty: "У вас пока нет избранных товаров. Нажмите ❤️ на любом товаре!",
            total_purchased: "Всего куплено",
            orders_placed: "Заказов оформлено",
            items_in_cart: "Товаров в корзине",
            favorite_category: "Любимая категория"
        },
        ja: {
            top_help: "ヘルプ",
            top_support: "サポート",
            top_contact: "お問い合わせ",
            top_call_us: "お電話:(+012) 1234 567890",
            my_dashboard: "マイページ",
            search_placeholder: "何をお探しですか？",
            all_categories: "すべてのカテゴリー",
            nav_all_categories: "全カテゴリー",
            nav_home: "ホーム",
            nav_shop: "ショップ",
            nav_offers: "お得セール",
            nav_single: "商品詳細",
            nav_pages: "ページ",
            nav_contact: "お問い合わせ",
            add_to_cart: "カートに追加",
            btn_add: "追加",
            shop_now: "今すぐ購入",
            special_offer: "特別セール",
            save_up_to: "最大 ¥30,000 OFF",
            terms_apply: "利用規約が適用されます",
            free_return: "無料返品",
            free_return_desc: "30日間返金保証！",
            free_shipping: "送料無料",
            free_shipping_desc: "全品送料無料",
            support_247: "24時間サポート",
            support_247_desc: "年中無休で対応",
            best_seller_title: "ベストセラー商品",
            liked_products_title: "お気に入り商品",
            order_list_title: "注文履歴",
            cart_status_title: "カート状況",
            overview_title: "アカウント概要",
            edit_profile_title: "プロファイル編集",
            returns_feedback_title: "返品・レビュー",
            sign_out: "ログアウト",
            search_results_heading: "検索結果",
            search_found_meta: "条件に一致する商品",
            clear_search: "✕ クリアして全表示",
            no_products_found: "一致する商品が見つかりませんでした。",
            wishlist_empty: "お気に入りの商品はまだありません。❤️を押して追加してください！",
            total_purchased: "購入総額",
            orders_placed: "注文数",
            items_in_cart: "カート内商品",
            favorite_category: "お気に入りカテゴリー"
        },
        es: {
            top_help: "Ayuda",
            top_support: "Soporte",
            top_contact: "Contacto",
            top_call_us: "Llámanos:(+012) 1234 567890",
            my_dashboard: "Mi Cuenta",
            search_placeholder: "¿Qué estás buscando?",
            all_categories: "Todas las categorías",
            nav_all_categories: "Categorías",
            nav_home: "Inicio",
            nav_shop: "Tienda",
            nav_offers: "Ofertas",
            nav_single: "Producto",
            nav_pages: "Páginas",
            nav_contact: "Contacto",
            add_to_cart: "Añadir al Carrito",
            btn_add: "Añadir",
            shop_now: "Comprar Ahora",
            special_offer: "Oferta Especial",
            save_up_to: "AHORRA HASTA 200€",
            terms_apply: "Aplican términos y condiciones",
            free_return: "DEVOLUCIÓN GRATIS",
            free_return_desc: "¡30 días de garantía!",
            free_shipping: "ENVÍO GRATIS",
            free_shipping_desc: "Envío gratis en todos los pedidos",
            support_247: "SOPORTE 24/7",
            support_247_desc: "Atención 24 horas al día",
            best_seller_title: "MÁS VENDIDOS",
            liked_products_title: "Productos Favoritos",
            order_list_title: "Mis Pedidos",
            cart_status_title: "Estado del Carrito",
            overview_title: "Resumen de Cuenta",
            edit_profile_title: "Editar Perfil",
            returns_feedback_title: "Devoluciones y Opiniones",
            sign_out: "Cerrar Sesión",
            search_results_heading: "Resultados de búsqueda",
            search_found_meta: "Mostrando productos encontrados",
            clear_search: "✕ Limpiar y ver todo",
            no_products_found: "No se encontraron productos. Prueba con otra palabra.",
            wishlist_empty: "Aún no tienes productos favoritos. Haz clic en ❤️ para guardarlos.",
            total_purchased: "Total Comprado",
            orders_placed: "Pedidos Realizados",
            items_in_cart: "Artículos en Carrito",
            favorite_category: "Categoría Favorita"
        },
        de: {
            top_help: "Hilfe",
            top_support: "Kundendienst",
            top_contact: "Kontakt",
            top_call_us: "Rufen Sie an:(+012) 1234 567890",
            my_dashboard: "Mein Konto",
            search_placeholder: "Wonach suchen Sie?",
            all_categories: "Alle Kategorien",
            nav_all_categories: "Kategorien",
            nav_home: "Startseite",
            nav_shop: "Shop",
            nav_offers: "Angebote",
            nav_single: "Produkt",
            nav_pages: "Seiten",
            nav_contact: "Kontakt",
            add_to_cart: "In den Warenkorb",
            btn_add: "Hinzufügen",
            shop_now: "Jetzt Kaufen",
            special_offer: "Sonderangebot",
            save_up_to: "SPAREN SIE BIS ZU 200€",
            terms_apply: "Es gelten AGB",
            free_return: "KOSTENLOSE RÜCKGABE",
            free_return_desc: "30 Tage Geld-zurück-Garantie!",
            free_shipping: "KOSTENLOSER VERSAND",
            free_shipping_desc: "Kostenloser Versand für alle Bestellungen",
            support_247: "24/7 KUNDENDIENST",
            support_247_desc: "24 Stunden am Tag erreichbar",
            best_seller_title: "BESTSELLER PRODUKTE",
            liked_products_title: "Lieblingsprodukte",
            order_list_title: "Bestellübersicht",
            cart_status_title: "Warenkorb-Status",
            overview_title: "Konto-Übersicht",
            edit_profile_title: "Profil bearbeiten",
            returns_feedback_title: "Rückgabe & Feedback",
            sign_out: "Abmelden",
            search_results_heading: "Suchergebnisse",
            search_found_meta: "Gefundene Produkte für Ihre Suche",
            clear_search: "✕ Suche zurücksetzen",
            no_products_found: "Keine passenden Produkte gefunden. Bitte andere Suchbegriffe testen.",
            wishlist_empty: "Keine Lieblingsprodukte vorhanden. Klicken Sie auf ❤️, um Produkte zu speichern!",
            total_purchased: "Gesamteinkäufe",
            orders_placed: "Bestellungen",
            items_in_cart: "Artikel im Warenkorb",
            favorite_category: "Bevorzugte Kategorie"
        },
        ar: {
            top_help: "مساعدة",
            top_support: "الدعم",
            top_contact: "اتصل بنا",
            top_call_us: "اتصل بنا:(+012) 1234 567890",
            my_dashboard: "لوحة التحكم",
            search_placeholder: "عن ماذا تبحث؟",
            all_categories: "جميع الفئات",
            nav_all_categories: "الفئات",
            nav_home: "الرئيسية",
            nav_shop: "المتجر",
            nav_offers: "العروض",
            nav_single: "صفحة المنتج",
            nav_pages: "الصفحات",
            nav_contact: "اتصل بنا",
            add_to_cart: "أضف إلى السلة",
            btn_add: "إضافة",
            shop_now: "تسوق الآن",
            special_offer: "عرض خاص",
            save_up_to: "وفر حتى 700 د.إ",
            terms_apply: "تطبق الشروط والأحكام",
            free_return: "إرجاع مجاني",
            free_return_desc: "ضمان استرجاع الأموال لمدة 30 يومًا!",
            free_shipping: "شحن مجاني",
            free_shipping_desc: "شحن مجاني على جميع الطلبات",
            support_247: "دعم على مدار الساعة",
            support_247_desc: "تواصل معنا في أي وقت",
            best_seller_title: "المنتجات الأكثر مبيعاً",
            liked_products_title: "المنتجات المفضلة",
            order_list_title: "قائمة الطلبات",
            cart_status_title: "حالة السلة",
            overview_title: "نظرة عامة على الحساب",
            edit_profile_title: "تعديل الملف الشخصي",
            returns_feedback_title: "الإرجاع والتقييمات",
            sign_out: "تسجيل الخروج",
            search_results_heading: "نتائج البحث",
            search_found_meta: "المنتجات المطابقة لبحثك",
            clear_search: "✕ مسح البحث وعرض الكل",
            no_products_found: "لم يتم العثور على أي منتج. يرجى تجربة كلمة بحث أخرى.",
            wishlist_empty: "لم تقم بإضافة أي منتج للمفضلة بعد. انقر فوق ❤️ للحفظ هنا!",
            total_purchased: "إجمالي المشتريات",
            orders_placed: "الطلبات المسجلة",
            items_in_cart: "القطع في السلة",
            favorite_category: "الفئة المفضلة"
        }
    };

    // Complete Comprehensive Catalog for Search, Category Filtering & Add to Cart
    const PRODUCT_CATALOG = [
        { id: 'cam-1', name: 'Smart Camera 4K Pro', category: 'Photography', price: 335.00, oldPrice: 380.00, img: 'assets/bestseller_cam2.png', rating: 5, stock: 20 },
        { id: 'lens-1', name: 'Professional Camera Lens 50mm', category: 'Photography', price: 299.00, oldPrice: 350.00, img: 'assets/bestseller_lens2.png', rating: 5, stock: 15 },
        { id: 'pol-1', name: 'Smart Polaroid Instant Camera', category: 'Photography', price: 99.00, oldPrice: 149.00, img: 'assets/bestseller_polaroid.png', rating: 5, stock: 25 },
        { id: 'dslr-1', name: 'Canon EOS 90D Cinematic DSLR Kit', category: 'Photography', price: 899.00, oldPrice: 1100.00, img: 'assets/dslr_camera.jpg', rating: 5, stock: 10 },
        { id: 'lap-1', name: 'Apple iPad Mini G2356 Retina', category: 'SmartPhone', price: 1050.00, oldPrice: 1250.00, img: 'assets/item_laptop.png', rating: 5, stock: 12 },
        { id: 'phone-1', name: 'Samsung Galaxy Cyan Smartphone', category: 'SmartPhone', price: 850.00, oldPrice: 990.00, img: 'assets/item_cyan_phone.png', rating: 5, stock: 18 },
        { id: 'phone-hand', name: 'SmartPhone Touch OLED Edition', category: 'SmartPhone', price: 1050.00, oldPrice: 1250.00, img: 'assets/item_phone_hand_clean.png', rating: 5, stock: 22 },
        { id: 'tab-1', name: 'Digital Tablet with Precision Pen', category: 'Electronics', price: 720.00, oldPrice: 850.00, img: 'assets/item_tablet_pen.png', rating: 5, stock: 14 },
        { id: 'drone-1', name: '4K Ultra Quadcopter Drone Master', category: 'Electronics', price: 499.00, oldPrice: 650.00, img: 'assets/product_drone.jpg', rating: 5, stock: 8 },
        { id: 'head-1', name: 'Wireless Studio Headphones HD', category: 'Audio', price: 189.00, oldPrice: 270.00, img: 'assets/floating_headphones_hd.png', rating: 5, stock: 30 },
        { id: 'earbuds-1', name: 'Pure Bass ANC Wireless Earbuds', category: 'Audio', price: 129.00, oldPrice: 179.00, img: 'assets/product_earbuds.jpg', rating: 5, stock: 35 },
        { id: 'web-1', name: 'HD Webcam Clip Pro 1080P', category: 'Accessories', price: 59.00, oldPrice: 89.00, img: 'assets/bestseller_webcam.png', rating: 5, stock: 40 },
        { id: 'watch-1', name: 'Smart Luxury Titanium Watch', category: 'Accessories', price: 249.00, oldPrice: 320.00, img: 'assets/promo_watch.png', rating: 5, stock: 16 }
    ];

    // ==========================================================================
    // 1. DATA ACCESS HELPERS (LocalStorage)
    // ==========================================================================
    function getStoredData(key, fallback) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (e) {
            console.error('LocalStorage read error for ' + key, e);
            return fallback;
        }
    }

    function setStoredData(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('LocalStorage write error for ' + key, e);
        }
    }

    function initSeedData() {
        const users = getStoredData(STORAGE_KEYS.USERS, null);
        if (!users || users.length === 0) {
            const defaultUser = {
                id: 'usr-101',
                name: 'Saksham Pandey',
                username: 'saksham',
                email: 'saksham@example.com',
                phone: '+91 9876543210',
                address: '123 Tech Avenue, Suite 402, New York, NY, USA',
                favoriteCategory: 'Smartphones & Tablets',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
                registeredAt: 'Sep 2026',
                password: 'password123'
            };
            setStoredData(STORAGE_KEYS.USERS, [defaultUser]);
            setStoredData(STORAGE_KEYS.CURRENT_USER, defaultUser);
        }

        const orders = getStoredData(STORAGE_KEYS.ORDERS, null);
        if (!orders || orders.length === 0) {
            const sampleOrders = [
                {
                    orderId: 'ORD-89421',
                    date: '2026-09-28',
                    total: 1050.00,
                    status: 'Purchased & Delivered',
                    isPurchased: true,
                    items: [
                        { id: 'lap-1', name: 'Apple iPad Mini G2356 Retina', price: 1050.00, qty: 1, img: 'assets/item_laptop.png' }
                    ],
                    shippingAddress: '123 Tech Avenue, Suite 402, New York, NY, USA',
                    paymentMethod: 'Cash on Delivery'
                },
                {
                    orderId: 'ORD-88104',
                    date: '2026-09-15',
                    total: 189.00,
                    status: 'Purchased & Delivered',
                    isPurchased: true,
                    items: [
                        { id: 'head-1', name: 'Wireless Studio Headphones HD', price: 189.00, qty: 1, img: 'assets/floating_headphones_hd.png' }
                    ],
                    shippingAddress: '123 Tech Avenue, Suite 402, New York, NY, USA',
                    paymentMethod: 'Online Payment'
                }
            ];
            setStoredData(STORAGE_KEYS.ORDERS, sampleOrders);
        }

        const wishlist = getStoredData(STORAGE_KEYS.WISHLIST, null);
        if (!wishlist || wishlist.length === 0) {
            const sampleWishlist = [
                { id: 'head-1', name: 'Wireless Studio Headphones HD', category: 'Audio', price: 189.00, img: 'assets/floating_headphones_hd.png' },
                { id: 'cam-1', name: 'Smart Camera 4K Pro', category: 'Photography', price: 335.00, img: 'assets/bestseller_cam2.png' }
            ];
            setStoredData(STORAGE_KEYS.WISHLIST, sampleWishlist);
        }
    }

    // ==========================================================================
    // 2. CURRENCY CONVERSION SERVICE
    // ==========================================================================
    const Currency = {
        getCurrent() {
            const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY);
            return (saved && CURRENCIES[saved]) ? saved : 'USD';
        },

        setCurrency(code) {
            if (!CURRENCIES[code]) return;
            localStorage.setItem(STORAGE_KEYS.CURRENCY, code);

            // Update all currency select dropdowns
            document.querySelectorAll('.top-select-currency').forEach(sel => {
                sel.value = code;
            });

            this.updateAllPrices();
            showToast(`Currency changed to ${CURRENCIES[code].name}! Prices updated. 💱`, 'success');
        },

        formatPrice(amountInUSD, overrideCode = null) {
            const code = overrideCode || this.getCurrent();
            const cur = CURRENCIES[code] || CURRENCIES.USD;
            const num = parseFloat(amountInUSD) || 0;
            const converted = num * cur.rate;

            let formattedNumber;
            if (code === 'JPY') {
                formattedNumber = Math.round(converted).toLocaleString();
            } else {
                formattedNumber = converted.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }

            if (cur.position === 'suffix') {
                return `${formattedNumber} ${cur.symbol}`;
            }
            return `${cur.symbol}${formattedNumber}`;
        },

        updateAllPrices() {
            const currentCode = this.getCurrent();

            // 1. Scan and register all elements carrying prices
            const priceSelectors = [
                '.reference-price-sale',
                '.reference-price-original',
                '.reference-offers-price-current',
                '.reference-offers-price-old',
                '.single-prod-price',
                '.single-prod-old-price',
                '.current-price',
                '.old-price',
                '.save-tag',
                '.offers-page-price-current',
                '.offers-page-price-old',
                '.reference-banner-camera-price',
                '[data-base-price]'
            ];

            const elements = document.querySelectorAll(priceSelectors.join(', '));
            elements.forEach(el => {
                let basePrice = el.dataset.basePrice;

                if (!basePrice) {
                    const text = el.textContent || '';
                    // Extract numeric part (e.g., "$1,250.00" -> 1250, "Save $48.00" -> 48)
                    const match = text.match(/([0-9]+[0-9,]*(?:\.[0-9]{1,2})?)/);
                    if (match) {
                        const cleanNum = parseFloat(match[1].replace(/,/g, ''));
                        if (!isNaN(cleanNum)) {
                            el.dataset.basePrice = cleanNum;
                            basePrice = cleanNum;

                            // Check for prefix like "Save "
                            if (text.toLowerCase().includes('save')) {
                                el.dataset.pricePrefix = 'Save ';
                            }
                        }
                    }
                }

                if (basePrice) {
                    const num = parseFloat(basePrice);
                    const prefix = el.dataset.pricePrefix || '';
                    el.textContent = prefix + this.formatPrice(num, currentCode);
                }
            });

            // 2. Update Header Cart Display
            updateNavCartBadge();

            // 3. Update Profile Stat Total Spent if present
            const statTotalSpent = document.getElementById('stat-total-spent');
            if (statTotalSpent) {
                const totalSpent = Orders.getTotalSpent();
                statTotalSpent.textContent = this.formatPrice(totalSpent, currentCode);
            }
        }
    };

    // ==========================================================================
    // 3. MULTI-LANGUAGE TRANSLATION SERVICE (I18n)
    // ==========================================================================
    const I18n = {
        getCurrent() {
            const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
            return (saved && I18N_DICTIONARY[saved]) ? saved : 'en';
        },

        setLanguage(code) {
            if (!I18N_DICTIONARY[code]) return;
            localStorage.setItem(STORAGE_KEYS.LANGUAGE, code);

            document.querySelectorAll('.top-select-language').forEach(sel => {
                sel.value = code;
            });

            this.translatePage();
            showToast(`Language switched to ${code.toUpperCase()}! 🌐`, 'success');
        },

        get(key) {
            const lang = this.getCurrent();
            const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.en;
            return dict[key] || I18N_DICTIONARY.en[key] || key;
        },

        translatePage() {
            const lang = this.getCurrent();
            const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.en;

            // Set document lang attribute
            document.documentElement.lang = lang;

            // Translate elements with data-i18n
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dict[key]) {
                    el.textContent = dict[key];
                }
            });

            // Translate search placeholder
            document.querySelectorAll('.search-input').forEach(inp => {
                inp.placeholder = dict.search_placeholder;
            });

            // Translate navigation categories title
            document.querySelectorAll('.categories-title').forEach(el => {
                el.textContent = dict.nav_all_categories;
            });

            // Translate common navigation items
            const navMap = {
                'Home': dict.nav_home,
                'Shop': dict.nav_shop,
                'Offers': dict.nav_offers,
                'Single Page': dict.nav_single,
                'Pages': dict.nav_pages,
                'Contact': dict.nav_contact
            };

            document.querySelectorAll('.nav-menu a.nav-item').forEach(link => {
                const text = link.childNodes[0] ? link.childNodes[0].textContent.trim() : '';
                if (navMap[text]) {
                    if (link.childNodes[0].nodeType === Node.TEXT_NODE) {
                        link.childNodes[0].textContent = navMap[text];
                    } else {
                        link.textContent = navMap[text];
                    }
                }
            });

            // Translate common buttons
            document.querySelectorAll('.hero-cta-btn').forEach(btn => {
                btn.textContent = dict.shop_now;
            });

            document.querySelectorAll('.btn-add-cart span, .reference-drawer-add-cart span').forEach(sp => {
                sp.textContent = dict.add_to_cart;
            });
        }
    };

    // ==========================================================================
    // 4. WISHLIST / LIKE ENGINE (Heart Toggle & Profile Sync)
    // ==========================================================================
    const Wishlist = {
        getItems() {
            return getStoredData(STORAGE_KEYS.WISHLIST, []);
        },

        saveItems(items) {
            setStoredData(STORAGE_KEYS.WISHLIST, items);
            this.updateWishlistUI();
        },

        isLiked(productId) {
            const items = this.getItems();
            return items.some(i => i.id === productId);
        },

        toggleLike(product) {
            let items = this.getItems();
            const idx = items.findIndex(i => i.id === product.id);
            let liked = false;

            if (idx > -1) {
                items.splice(idx, 1);
                liked = false;
                showToast(`Removed "${product.name}" from Liked Products 🤍`, 'info');
            } else {
                items.push({
                    id: product.id,
                    name: product.name,
                    category: product.category || 'Electronics',
                    price: parseFloat(product.price) || 99.00,
                    img: product.img || 'assets/item_laptop.png',
                    likedAt: new Date().toISOString()
                });
                liked = true;
                showToast(`Added "${product.name}" to Liked Products ❤️`, 'success');
            }

            this.saveItems(items);
            return liked;
        },

        remove(productId) {
            let items = this.getItems();
            items = items.filter(i => i.id !== productId);
            this.saveItems(items);
            showToast('Product removed from Liked Products 🤍', 'info');
        },

        updateWishlistUI() {
            const items = this.getItems();
            const count = items.length;

            // Update badge counts in header/profile
            document.querySelectorAll('#liked-count-badge, [data-wishlist-count]').forEach(el => {
                el.textContent = count;
                el.style.display = count > 0 ? 'inline-block' : 'inline-block';
            });

            const summaryEl = document.getElementById('liked-summary-count');
            if (summaryEl) {
                summaryEl.textContent = `${count} Items`;
            }

            // Sync all heart icons on active cards
            document.querySelectorAll('.reference-expand-card, .offers-page-deal-card, .reference-catalog-item').forEach(card => {
                const prodId = card.getAttribute('data-product-id');
                const heartBtn = card.querySelector('.reference-drawer-circle-btn[title*="Wishlist"], .offers-page-wishlist-btn, [data-wishlist-btn]');
                if (heartBtn && prodId) {
                    if (this.isLiked(prodId)) {
                        heartBtn.classList.add('is-liked');
                    } else {
                        heartBtn.classList.remove('is-liked');
                    }
                }
            });

            // Re-render profile liked products grid if present
            const profileGrid = document.getElementById('profile-liked-grid');
            if (profileGrid) {
                if (items.length === 0) {
                    profileGrid.innerHTML = `
                        <div class="liked-empty-box" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: #fafafa; border-radius: 8px; border: 1px dashed #cbd5e1;">
                            <span style="font-size: 38px; display: block; margin-bottom: 8px;">❤️</span>
                            <h4 style="font-size: 16px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">No Liked Products Yet</h4>
                            <p style="font-size: 13.5px; color: #64748b; margin-bottom: 16px;">Click the heart icon on any product to save your favorite items here.</p>
                            <a href="offers.html" style="display: inline-block; background: #e58840; color: #ffffff; padding: 8px 20px; border-radius: 20px; text-decoration: none; font-size: 13px; font-weight: 700;">Explore Products 🛍️</a>
                        </div>
                    `;
                } else {
                    profileGrid.innerHTML = items.map(item => `
                        <div class="liked-card" data-product-id="${item.id}">
                            <div class="liked-card-img-wrap">
                                <img src="${item.img}" alt="${item.name}" class="liked-card-img">
                            </div>
                            <div class="liked-card-body">
                                <span class="liked-card-category">${item.category}</span>
                                <h4 class="liked-card-title">${item.name}</h4>
                                <div class="liked-card-price" data-base-price="${item.price}">${Currency.formatPrice(item.price)}</div>
                                <div class="liked-card-actions">
                                    <button type="button" class="btn-liked-add-cart" data-product-id="${item.id}">Add to Cart 🛒</button>
                                    <button type="button" class="btn-liked-remove" data-product-id="${item.id}" title="Remove from Wishlist">✕</button>
                                </div>
                            </div>
                        </div>
                    `).join('');

                    // Hook actions inside rendered cards
                    profileGrid.querySelectorAll('.btn-liked-add-cart').forEach(btn => {
                        btn.addEventListener('click', function () {
                            const id = this.getAttribute('data-product-id');
                            const item = items.find(i => i.id === id);
                            if (item) {
                                Cart.addItem(item, 1);
                            }
                        });
                    });

                    profileGrid.querySelectorAll('.btn-liked-remove').forEach(btn => {
                        btn.addEventListener('click', function () {
                            const id = this.getAttribute('data-product-id');
                            Wishlist.remove(id);
                        });
                    });
                }
            }
        }
    };

    // ==========================================================================
    // 5. LIVE SEARCH & ALL CATEGORIES FILTERING ENGINE
    // ==========================================================================
    const Search = {
        filter(query = '', category = 'all') {
            const q = query.trim().toLowerCase();
            const cat = category.trim().toLowerCase();

            return PRODUCT_CATALOG.filter(product => {
                // Category filter
                let catMatch = true;
                if (cat && cat !== 'all') {
                    catMatch = product.category.toLowerCase().includes(cat);
                }

                // Query filter
                let queryMatch = true;
                if (q) {
                    queryMatch = product.name.toLowerCase().includes(q) ||
                                 product.category.toLowerCase().includes(q);
                }

                return catMatch && queryMatch;
            });
        },

        filterAndDisplay(query = '', category = 'all') {
            const isHomePage = window.location.pathname.endsWith('index.html') ||
                               window.location.pathname.endsWith('/') ||
                               !window.location.pathname.includes('.html');

            if (!isHomePage) {
                // Redirect to homepage with search query params
                const params = new URLSearchParams();
                if (query) params.set('search', query);
                if (category && category !== 'all') params.set('cat', category);
                window.location.href = `index.html?${params.toString()}`;
                return;
            }

            const resultsSection = document.getElementById('search-results-section');
            if (!resultsSection) return;

            const grid = document.getElementById('search-results-grid');
            const titleEl = document.getElementById('search-results-title');
            const metaEl = document.getElementById('search-results-meta');

            const matches = this.filter(query, category);

            // Hide normal homepage sections as explicitly requested by user
            document.body.classList.add('body-searching');
            resultsSection.style.display = 'block';

            // Update title and meta summary
            let titleText = I18n.get('search_results_heading');
            if (category && category !== 'all') {
                titleText = `Category: ${category}`;
            }
            if (query) {
                titleText = `Search: "${query}"`;
            }
            if (titleEl) titleEl.textContent = titleText;

            if (metaEl) {
                metaEl.textContent = `${matches.length} products found ${query ? `matching "${query}"` : ''} ${category !== 'all' ? `in ${category}` : ''}`;
            }

            if (matches.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: #fafafa; border-radius: 8px;">
                        <span style="font-size: 42px; display: block; margin-bottom: 10px;">🔍</span>
                        <h3 style="font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 8px;">No Products Found</h3>
                        <p style="font-size: 14px; color: #64748b; max-width: 460px; margin: 0 auto 18px;">${I18n.get('no_products_found')}</p>
                        <button type="button" class="btn-clear-search" onclick="Electro.Search.clearSearch()" style="background:#e58840; color:#fff; border:none; padding:8px 24px; border-radius:20px; font-weight:700; cursor:pointer;">Show All Products</button>
                    </div>
                `;
            } else {
                grid.innerHTML = matches.map(p => `
                    <div class="reference-expand-card search-card-item" data-product-id="${p.id}">
                        <div class="reference-card-top-content">
                            <div class="reference-card-thumb-wrapper">
                                <img src="${p.img}" alt="${p.name}" class="reference-card-thumb">
                                <a href="single-product.html" class="reference-quick-view-overlay" title="View Product">
                                    <svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                                </a>
                            </div>
                            <div class="reference-card-details">
                                <span class="reference-card-cat-name">${p.category}</span>
                                <a href="single-product.html" class="reference-card-prod-title" title="${p.name}">${p.name}</a>
                                <div class="reference-card-stars">
                                    <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                </div>
                                <div class="reference-card-prices">
                                    ${p.oldPrice ? `<span class="reference-price-original" data-base-price="${p.oldPrice}">${Currency.formatPrice(p.oldPrice)}</span>` : ''}
                                    <span class="reference-price-sale" data-base-price="${p.price}">${Currency.formatPrice(p.price)}</span>
                                </div>
                            </div>
                        </div>
                        <div class="reference-card-hover-drawer">
                            <a href="#" class="reference-drawer-add-cart" data-product-id="${p.id}">
                                <svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                                <span>Add To Cart</span>
                            </a>
                            <div class="reference-drawer-actions-right">
                                <a href="single-product.html" class="reference-drawer-circle-btn" title="View Specifications">
                                    <svg viewBox="0 0 24 24"><path d="M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v2h2V1h-2v2zm0 15H5l5-6v6zm9-15h-5v2h5v13l-5-6v7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                                </a>
                                <a href="#" class="reference-drawer-circle-btn ${Wishlist.isLiked(p.id) ? 'is-liked' : ''}" data-product-id="${p.id}" title="Add to Wishlist" aria-label="Add to Wishlist">
                                    <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            // Smooth scroll into search results
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },

        clearSearch() {
            const resultsSection = document.getElementById('search-results-section');
            if (resultsSection) resultsSection.style.display = 'none';

            document.body.classList.remove('body-searching');

            document.querySelectorAll('.search-input').forEach(i => i.value = '');
            document.querySelectorAll('#header-category-select').forEach(s => s.value = 'all');
        },

        checkURLParams() {
            const params = new URLSearchParams(window.location.search);
            const searchVal = params.get('search');
            const catVal = params.get('cat');

            if (searchVal || catVal) {
                const searchInp = document.querySelector('.search-input');
                const catSelect = document.getElementById('header-category-select');

                if (searchInp && searchVal) searchInp.value = searchVal;
                if (catSelect && catVal) catSelect.value = catVal;

                this.filterAndDisplay(searchVal || '', catVal || 'all');
            }
        }
    };

    // ==========================================================================
    // 6. AUTHENTICATION SERVICE
    // ==========================================================================
    const Auth = {
        getCurrentUser() {
            return getStoredData(STORAGE_KEYS.CURRENT_USER, null);
        },
        setCurrentUser(user) {
            setStoredData(STORAGE_KEYS.CURRENT_USER, user);
            updateNavProfile();
        },
        register(userData) {
            const users = getStoredData(STORAGE_KEYS.USERS, []);
            const existing = users.find(u => 
                (userData.email && u.email.toLowerCase() === userData.email.toLowerCase()) || 
                (userData.phone && u.phone === userData.phone) ||
                (userData.username && u.username.toLowerCase() === userData.username.toLowerCase())
            );
            if (existing) {
                return { success: false, message: 'User with this Email, Phone, or Username already exists!' };
            }

            const newUser = {
                id: 'usr-' + Date.now(),
                name: userData.name || userData.username || 'Valued Customer',
                username: userData.username || (userData.email ? userData.email.split('@')[0] : 'user'),
                email: userData.email || '',
                phone: userData.phone || '',
                address: userData.address || '',
                favoriteCategory: userData.favoriteCategory || 'Smartphones',
                avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
                password: userData.password,
                registeredAt: new Date().toLocaleDateString()
            };

            users.push(newUser);
            setStoredData(STORAGE_KEYS.USERS, users);
            this.setCurrentUser(newUser);
            return { success: true, user: newUser };
        },
        login(identifier, password) {
            const users = getStoredData(STORAGE_KEYS.USERS, []);
            const cleanId = (identifier || '').trim().toLowerCase();
            const user = users.find(u => 
                (u.email && u.email.toLowerCase() === cleanId) ||
                (u.phone && u.phone.trim() === identifier.trim()) ||
                (u.username && u.username.toLowerCase() === cleanId)
            );

            if (!user) {
                return { success: false, message: 'Account not found with this Phone, Email, or Username.' };
            }
            if (user.password !== password) {
                return { success: false, message: 'Invalid password. Please try again.' };
            }

            this.setCurrentUser(user);
            return { success: true, user: user };
        },
        logout() {
            localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
            updateNavProfile();
            showToast('You have been logged out successfully.', 'info');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 800);
        },
        updateProfile(updatedData) {
            const currentUser = this.getCurrentUser();
            if (!currentUser) return false;

            const users = getStoredData(STORAGE_KEYS.USERS, []);
            const userIndex = users.findIndex(u => u.id === currentUser.id);

            const merged = { ...currentUser, ...updatedData };
            if (userIndex !== -1) {
                users[userIndex] = merged;
                setStoredData(STORAGE_KEYS.USERS, users);
            }
            this.setCurrentUser(merged);
            return true;
        }
    };

    // ==========================================================================
    // 7. CART SERVICE (LocalStorage Synchronized)
    // ==========================================================================
    const Cart = {
        getItems() {
            return getStoredData(STORAGE_KEYS.CART, []);
        },
        saveItems(items) {
            setStoredData(STORAGE_KEYS.CART, items);
            updateNavCartBadge();
        },
        addItem(item, qty = 1) {
            const items = this.getItems();
            const existingIndex = items.findIndex(i => i.id === item.id);

            if (existingIndex > -1) {
                items[existingIndex].qty += qty;
            } else {
                items.push({
                    id: item.id,
                    name: item.name,
                    price: parseFloat(item.price) || 0,
                    img: item.img || 'assets/item_laptop.png',
                    category: item.category || 'General',
                    qty: qty,
                    isPurchased: false,
                    addedAt: new Date().toISOString()
                });
            }

            this.saveItems(items);
            showToast(`Added "${item.name}" to cart! 🛒`, 'success');
        },
        removeItem(id) {
            let items = this.getItems();
            items = items.filter(i => i.id !== id);
            this.saveItems(items);
            showToast('Item removed from cart.', 'info');
        },
        updateQuantity(id, qty) {
            const items = this.getItems();
            const target = items.find(i => i.id === id);
            if (target) {
                target.qty = Math.max(1, parseInt(qty) || 1);
                this.saveItems(items);
            }
        },
        clear() {
            this.saveItems([]);
        },
        getSubtotal() {
            const items = this.getItems();
            return items.reduce((sum, item) => sum + (item.price * item.qty), 0);
        },
        getCount() {
            const items = this.getItems();
            return items.reduce((sum, item) => sum + item.qty, 0);
        }
    };

    // ==========================================================================
    // 8. ORDER SERVICE (Order Now / Checkout Flow)
    // ==========================================================================
    const Orders = {
        getAll() {
            return getStoredData(STORAGE_KEYS.ORDERS, []);
        },
        createOrder(shippingInfo, singleItem = null) {
            const cartItems = singleItem ? [singleItem] : Cart.getItems();
            if (cartItems.length === 0) {
                return { success: false, message: 'Cart is empty!' };
            }

            const total = cartItems.reduce((sum, i) => sum + (i.price * i.qty), 0);
            const newOrder = {
                orderId: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
                date: new Date().toISOString().split('T')[0],
                total: total,
                status: 'Purchased & Confirmed',
                isPurchased: true,
                items: cartItems.map(i => ({ ...i, isPurchased: true })),
                shippingAddress: shippingInfo.address || 'Address on file',
                phone: shippingInfo.phone || '',
                recipientName: shippingInfo.name || 'Valued Customer',
                paymentMethod: shippingInfo.paymentMethod || 'Cash on Delivery'
            };

            const orders = this.getAll();
            orders.unshift(newOrder);
            setStoredData(STORAGE_KEYS.ORDERS, orders);

            if (!singleItem) {
                Cart.clear();
            } else {
                Cart.removeItem(singleItem.id);
            }

            return { success: true, order: newOrder };
        },
        getTotalSpent() {
            const orders = this.getAll();
            return orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
        }
    };

    // ==========================================================================
    // 9. TOAST NOTIFICATION SYSTEM
    // ==========================================================================
    function showToast(message, type = 'success') {
        if (typeof document === 'undefined' || !document.body) {
            console.log(`[Toast ${type}] ${message}`);
            return;
        }
        let container = document.getElementById('electro-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'electro-toast-container';
            container.className = 'electro-toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `electro-toast electro-toast-${type}`;
        
        let iconSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
        if (type === 'info') {
            iconSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>';
        } else if (type === 'error') {
            iconSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 13.59z"/></svg>';
        }

        toast.innerHTML = `
            <span class="electro-toast-icon">${iconSvg}</span>
            <span class="electro-toast-message">${message}</span>
            <button type="button" class="electro-toast-close" aria-label="Close">&times;</button>
        `;

        container.appendChild(toast);

        const timer = setTimeout(() => {
            toast.classList.add('electro-toast-fadeout');
            setTimeout(() => toast.remove(), 300);
        }, 3200);

        toast.querySelector('.electro-toast-close').addEventListener('click', () => {
            clearTimeout(timer);
            toast.remove();
        });
    }

    // ==========================================================================
    // 10. UI SYNCHRONIZATION (Header Cart, Profile, Badges)
    // ==========================================================================
    function updateNavCartBadge() {
        const count = Cart.getCount();
        const subtotal = Cart.getSubtotal();
        const currentCurrency = Currency.getCurrent();

        document.querySelectorAll('.header-cart-badge, [data-cart-count]').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'inline-flex' : 'none';
        });

        document.querySelectorAll('[data-cart-total], .cart-total-display').forEach(el => {
            el.textContent = Currency.formatPrice(subtotal, currentCurrency);
        });
    }

    function updateNavProfile() {
        const user = Auth.getCurrentUser();
        const profileLinks = document.querySelectorAll('.dashboard-link, .nav-my-dashboard, [data-profile-link]');
        profileLinks.forEach(link => {
            if (user) {
                link.innerHTML = `
                    <span class="top-user-chip">
                        <img src="${user.avatar || 'assets/item_laptop.png'}" alt="${user.name}" class="top-user-avatar">
                        <span>${user.name}</span>
                        <span class="top-user-badge">VIP</span>
                    </span>
                `;
                link.setAttribute('href', 'profile.html');
                link.setAttribute('title', `Logged in as ${user.name}`);
            } else {
                link.innerHTML = `<span>My Dashboard</span>`;
                link.setAttribute('href', 'auth.html');
                link.setAttribute('title', 'Sign In or Register');
            }
        });
    }

    // ==========================================================================
    // 11. GLOBAL EVENT LISTENERS & HOOKS
    // ==========================================================================
    function setupGlobalListeners() {
        // Currency Dropdown Change
        document.querySelectorAll('.top-select-currency').forEach(sel => {
            sel.value = Currency.getCurrent();
            sel.addEventListener('change', function () {
                Currency.setCurrency(this.value);
            });
        });

        // Language Dropdown Change
        document.querySelectorAll('.top-select-language').forEach(sel => {
            sel.value = I18n.getCurrent();
            sel.addEventListener('change', function () {
                I18n.setLanguage(this.value);
            });
        });

        // Header Category Dropdown Change
        document.querySelectorAll('#header-category-select').forEach(sel => {
            sel.addEventListener('change', function () {
                const searchInp = document.querySelector('.search-input');
                const q = searchInp ? searchInp.value : '';
                Search.filterAndDisplay(q, this.value);
            });
        });

        // Search Input & Search Button
        document.querySelectorAll('.search-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const searchInp = document.querySelector('.search-input');
                const catSel = document.getElementById('header-category-select');
                const q = searchInp ? searchInp.value : '';
                const cat = catSel ? catSel.value : 'all';
                Search.filterAndDisplay(q, cat);
            });
        });

        document.querySelectorAll('.search-input').forEach(inp => {
            inp.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const catSel = document.getElementById('header-category-select');
                    const cat = catSel ? catSel.value : 'all';
                    Search.filterAndDisplay(this.value, cat);
                }
            });
        });

        // Clear Search Button
        const clearBtn = document.getElementById('btn-clear-search');
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                Search.clearSearch();
            });
        }

        // Nav Ribbon All Categories Menu Item Click
        document.querySelectorAll('.nav-cat-item').forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const cat = this.getAttribute('data-category') || 'all';
                const catSel = document.getElementById('header-category-select');
                if (catSel) catSel.value = cat;

                const searchInp = document.querySelector('.search-input');
                const q = searchInp ? searchInp.value : '';
                Search.filterAndDisplay(q, cat);
            });
        });

        // Click Event Delegation for Cart & Wishlist
        document.addEventListener('click', function (e) {
            // A. Check for Add to Cart
            const cartBtn = e.target.closest('.reference-drawer-add-cart, .reference-offers-cart-btn, [data-add-to-cart], .btn-add-to-cart, .btn-add-cart');
            if (cartBtn) {
                e.preventDefault();
                let product = null;
                const prodId = cartBtn.getAttribute('data-product-id');

                if (prodId) {
                    product = PRODUCT_CATALOG.find(p => p.id === prodId);
                }

                if (!product) {
                    const card = cartBtn.closest('.reference-expand-card, .reference-offers-product-card, .single-product-main-card, .hero-promo-card');
                    if (card) {
                        const titleEl = card.querySelector('.reference-card-prod-title, .reference-offers-card-name, .single-prod-title, .product-title, h1, h2, h3');
                        const priceEl = card.querySelector('.reference-price-sale, .reference-offers-price-current, .single-prod-price, .current-price');
                        const imgEl = card.querySelector('img');
                        const catEl = card.querySelector('.reference-card-cat-name, .reference-offers-card-category, .product-category');

                        const title = titleEl ? titleEl.textContent.trim() : 'Electro Product';
                        const price = priceEl && priceEl.dataset.basePrice ? parseFloat(priceEl.dataset.basePrice) : 99.00;
                        const img = imgEl ? imgEl.getAttribute('src') : 'assets/item_laptop.png';
                        const category = catEl ? catEl.textContent.trim() : 'Electronics';

                        product = {
                            id: prodId || ('prod-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20)),
                            name: title,
                            price: price,
                            img: img,
                            category: category
                        };
                    }
                }

                if (!product) product = PRODUCT_CATALOG[0];

                const qtyInput = document.getElementById('single-product-qty');
                const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;
                Cart.addItem(product, qty);
                return;
            }

            // B. Check for Wishlist / Like Heart Click
            const likeBtn = e.target.closest('.reference-drawer-circle-btn[title*="Wishlist"], .reference-drawer-circle-btn[aria-label*="Wishlist"], .offers-page-wishlist-btn, [data-wishlist-btn], .btn-like');
            if (likeBtn) {
                e.preventDefault();
                let product = null;
                const prodId = likeBtn.getAttribute('data-product-id');

                if (prodId) {
                    product = PRODUCT_CATALOG.find(p => p.id === prodId);
                }

                if (!product) {
                    const card = likeBtn.closest('.reference-expand-card, .offers-page-deal-card, .reference-catalog-item');
                    if (card) {
                        const cardId = card.getAttribute('data-product-id');
                        if (cardId) product = PRODUCT_CATALOG.find(p => p.id === cardId);

                        if (!product) {
                            const titleEl = card.querySelector('.reference-card-prod-title, .offers-page-product-title, h3, h4');
                            const priceEl = card.querySelector('.reference-price-sale, .offers-page-price-current');
                            const imgEl = card.querySelector('img');
                            const catEl = card.querySelector('.reference-card-cat-name, .offers-page-category-tag');

                            const title = titleEl ? titleEl.textContent.trim() : 'Electro Gadget';
                            const price = priceEl && priceEl.dataset.basePrice ? parseFloat(priceEl.dataset.basePrice) : 99.00;
                            const img = imgEl ? imgEl.getAttribute('src') : 'assets/item_laptop.png';
                            const category = catEl ? catEl.textContent.trim() : 'Electronics';

                            product = {
                                id: cardId || ('prod-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20)),
                                name: title,
                                price: price,
                                img: img,
                                category: category
                            };
                        }
                    }
                }

                if (!product) product = PRODUCT_CATALOG[0];

                const isNowLiked = Wishlist.toggleLike(product);
                if (isNowLiked) {
                    likeBtn.classList.add('is-liked');
                } else {
                    likeBtn.classList.remove('is-liked');
                }
                return;
            }
        });
    }

    // ==========================================================================
    // 12. DYNAMIC PRODUCT ROTATION, 3D SWINGING & HERO AUTO-SLIDER (1.8s)
    // ==========================================================================
    function initDynamicProductRotators() {
        // --- 12A. Dual Floating Banners Animation Class ---
        const cameraCard = document.querySelector('.reference-banner-camera-card');
        const headphoneCard = document.querySelector('.reference-banner-headphone-card');

        if (cameraCard && headphoneCard) {
            cameraCard.classList.add('electro-slide-left');
            headphoneCard.classList.add('electro-slide-right');
        }

        // --- 12B. Hero Showcase Auto-Slider (Every 1.8 Seconds) ---
        const heroSection = document.querySelector('.hero-showcase');
        if (heroSection) {
            const heroPrev = heroSection.querySelector('.hero-arrows .arrow-btn:first-child');
            const heroNext = heroSection.querySelector('.hero-arrows .arrow-btn:last-child');
            const heroHeading = heroSection.querySelector('.hero-heading');
            const heroEyebrow = heroSection.querySelector('.hero-eyebrow');
            const heroImg = heroSection.querySelector('.monitor-img');

            const heroSlides = [
                {
                    eyebrow: 'SAVE UP TO $200',
                    heading: 'On Selected<br>Laptops &<br>Desktop Or<br>Smartphone',
                    img: 'assets/monitor_transparent.png'
                },
                {
                    eyebrow: 'SPECIAL DISCOUNT 45%',
                    heading: 'Next-Gen 4K<br>Smart OLED<br>Monitors &<br>Displays',
                    img: 'assets/product_smartspeaker.jpg'
                },
                {
                    eyebrow: 'FLASH SALE UP TO $300',
                    heading: 'High-End Pro<br>Workstations &<br>Studio Gear<br>Hardware',
                    img: 'assets/item_laptop.png'
                },
                {
                    eyebrow: 'NEW ARRIVAL 2026',
                    heading: 'Ultra Cinematic<br>4K Quadcopter<br>Drones &<br>Cameras',
                    img: 'assets/product_drone.jpg'
                }
            ];

            let heroIdx = 0;

            function setHeroSlide(idx) {
                heroIdx = (idx + heroSlides.length) % heroSlides.length;
                const slide = heroSlides[heroIdx];
                if (heroHeading) heroHeading.innerHTML = slide.heading;
                if (heroEyebrow) heroEyebrow.textContent = slide.eyebrow;
                if (heroImg) {
                    heroImg.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                    heroImg.style.opacity = '0';
                    heroImg.style.transform = 'scale(0.92)';
                    setTimeout(() => {
                        heroImg.src = slide.img;
                        heroImg.style.opacity = '1';
                        heroImg.style.transform = 'scale(1)';
                    }, 240);
                }
            }

            // Auto-slide every 1.8 seconds (1800ms) as requested
            let heroTimer = setInterval(() => {
                setHeroSlide(heroIdx + 1);
            }, 1800);

            // Pause on hover
            const heroMainCard = heroSection.querySelector('.hero-main-card');
            if (heroMainCard) {
                heroMainCard.addEventListener('mouseenter', () => clearInterval(heroTimer));
                heroMainCard.addEventListener('mouseleave', () => {
                    clearInterval(heroTimer);
                    heroTimer = setInterval(() => setHeroSlide(heroIdx + 1), 1800);
                });
            }

            if (heroPrev) {
                heroPrev.addEventListener('click', (e) => {
                    e.preventDefault();
                    clearInterval(heroTimer);
                    setHeroSlide(heroIdx - 1);
                });
            }
            if (heroNext) {
                heroNext.addEventListener('click', (e) => {
                    e.preventDefault();
                    clearInterval(heroTimer);
                    setHeroSlide(heroIdx + 1);
                });
            }
        }

        // --- 12C. All Product Items Carousel Slider Buttons ---
        const allProductsSection = document.getElementById('all-product-items');
        if (allProductsSection) {
            const prevBtn = allProductsSection.querySelector('.reference-carousel-controls a:first-child');
            const nextBtn = allProductsSection.querySelector('.reference-carousel-controls a:last-child');
            const grid = allProductsSection.querySelector('.reference-catalog-grid');

            if (grid && prevBtn && nextBtn) {
                prevBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    grid.scrollBy({ left: -380, behavior: 'smooth' });
                });
                nextBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    grid.scrollBy({ left: 380, behavior: 'smooth' });
                });
            }
        }
    }

    // ==========================================================================
    // 13. PUBLIC API & DOM READY INITIALIZATION
    // ==========================================================================
    window.Electro = {
        STORAGE_KEYS,
        CURRENCIES,
        I18N_DICTIONARY,
        PRODUCT_CATALOG,
        Currency,
        I18n,
        Wishlist,
        Search,
        Auth,
        Cart,
        Orders,
        formatPrice: (amount, code) => Currency.formatPrice(amount, code),
        showToast,
        updateNavCartBadge,
        updateNavProfile
    };

    document.addEventListener('DOMContentLoaded', function () {
        initSeedData();
        setupGlobalListeners();
        updateNavCartBadge();
        updateNavProfile();
        Currency.updateAllPrices();
        I18n.translatePage();
        Wishlist.updateWishlistUI();
        initDynamicProductRotators();
        Search.checkURLParams();
    });

})();
