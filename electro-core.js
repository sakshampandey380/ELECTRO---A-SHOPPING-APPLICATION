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
    "en": {
        "Help": "Help",
        "Support": "Support",
        "Contact": "Contact",
        "Contact Us": "Contact Us",
        "Contact Us - Electro Electronics": "Contact Us - Electro Electronics",
        "Call Us:(+012) 1234 567890": "Call Us:(+012) 1234 567890",
        "My Dashboard": "My Dashboard",
        "My Account": "My Account",
        "Search Looking For?": "Search Looking For?",
        "All Category": "All Category",
        "All Categories": "All Categories",
        "Home": "Home",
        "Shop": "Shop",
        "Offers": "Offers",
        "All Offers": "All Offers",
        "Offers Page": "Offers Page",
        "Single Page": "Single Page",
        "Single Product": "Single Product",
        "Single Product - Electro Electronics": "Single Product - Electro Electronics",
        "Pages": "Pages",
        "Total:": "Total:",
        "0 Items": "0 Items",
        "Items": "Items",
        "Select Currency": "Select Currency",
        "Select Language": "Select Language",
        "Save Up To 50% Off": "Save Up To 50% Off",
        "Get UP To 50% Off": "Get UP To 50% Off",
        "Hot Deals This Week": "Hot Deals This Week",
        "Special Offer": "Special Offer",
        "SAVE UP TO $200": "SAVE UP TO $200",
        "SAVE UP TO A $200": "SAVE UP TO A $200",
        "Terms and Condition Apply": "Terms and Condition Apply",
        "Shop Now": "Shop Now",
        "Explore Products": "Explore Products",
        "Starting at": "Starting at",
        "Limited Time Deals": "Limited Time Deals",
        "FREE RETURN": "FREE RETURN",
        "30 days money back guarantee!": "30 days money back guarantee!",
        "Free return products in 30 days": "Free return products in 30 days",
        "FREE SHIPPING": "FREE SHIPPING",
        "Free shipping on all order": "Free shipping on all order",
        "SUPPORT 24/7": "SUPPORT 24/7",
        "Contact us 24 hours a day": "Contact us 24 hours a day",
        "100% SECURE": "100% SECURE",
        "Payment 100% Secure": "Payment 100% Secure",
        "SECURE PAYMENT": "SECURE PAYMENT",
        "ONLINE SERVICE": "ONLINE SERVICE",
        "We support online 24 hrs a day": "We support online 24 hrs a day",
        "RECEIVE GIFT CARD": "RECEIVE GIFT CARD",
        "Receive gift all over order $50": "Receive gift all over order $50",
        "BEST SELLER PRODUCTS": "BEST SELLER PRODUCTS",
        "Best Seller Products": "Best Seller Products",
        "Bestseller Products": "Bestseller Products",
        "Liked Products": "Liked Products",
        "Customer Reviews": "Customer Reviews",
        "Featured Products": "Featured Products",
        "Featured Deals": "Featured Deals",
        "Featured": "Featured",
        "New Arrivals": "New Arrivals",
        "Our Top Brands": "Our Top Brands",
        "Our Products": "Our Products",
        "All Products": "All Products",
        "All Product Items": "All Product Items",
        "Top Selling": "Top Selling",
        "Top Tier": "Top Tier",
        "Key Technical Specifications": "Key Technical Specifications",
        "Product Description": "Product Description",
        "Overview": "Overview",
        "Testimonials": "Testimonials",
        "Related Products": "Related Products",
        "PRODUCT TAGS": "PRODUCT TAGS",
        "Products Categories": "Products Categories",
        "Brands": "Brands",
        "Deals": "Deals",
        "Extras": "Extras",
        "Mega Weekend Tech Bonanza": "Mega Weekend Tech Bonanza",
        "Photography": "Photography",
        "Photography & Gadgets": "Photography & Gadgets",
        "Photography & Video": "Photography & Video",
        "SmartPhone": "SmartPhone",
        "SmartPhones": "SmartPhones",
        "Smartphones & Mobiles": "Smartphones & Mobiles",
        "Smartphones & Tablets": "Smartphones & Tablets",
        "SmartPhone & Smart TV": "SmartPhone & Smart TV",
        "Electronics": "Electronics",
        "Electronics & Computer": "Electronics & Computer",
        "Audio": "Audio",
        "Audio & Sound": "Audio & Sound",
        "Audio & Studio": "Audio & Studio",
        "Audio & Studio Headphones": "Audio & Studio Headphones",
        "Audio & Headphones": "Audio & Headphones",
        "Audio Equipment": "Audio Equipment",
        "Accessories": "Accessories",
        "Gadget Accessories": "Gadget Accessories",
        "Gadget Accessories & Watches": "Gadget Accessories & Watches",
        "Laptops & Desktops": "Laptops & Desktops",
        "Laptops, PCs & Desktops": "Laptops, PCs & Desktops",
        "Laptops & Computers": "Laptops & Computers",
        "Computers & Laptops": "Computers & Laptops",
        "Mobiles & Tablets": "Mobiles & Tablets",
        "Tablets & Mobiles": "Tablets & Mobiles",
        "Tablets & Computing": "Tablets & Computing",
        "Cameras & Drones": "Cameras & Drones",
        "Cameras & Lenses": "Cameras & Lenses",
        "Cameras & Photo": "Cameras & Photo",
        "Cameras & Photography": "Cameras & Photography",
        "Smart Watches": "Smart Watches",
        "Smart Whatch": "Smart Whatch",
        "Headphones & Audio": "Headphones & Audio",
        "Gaming & VR": "Gaming & VR",
        "Gaming & PC": "Gaming & PC",
        "Wearable Tech": "Wearable Tech",
        "Wearables": "Wearables",
        "Home Appliances": "Home Appliances",
        "Smart Home & Audio": "Smart Home & Audio",
        "Drones & Robotics": "Drones & Robotics",
        "Camera": "Camera",
        "Cameras": "Cameras",
        "Laptop": "Laptop",
        "Headphone": "Headphone",
        "Optics": "Optics",
        "Smart Camera 4K Pro": "Smart Camera 4K Pro",
        "Professional Camera Lens 50mm": "Professional Camera Lens 50mm",
        "Smart Polaroid Instant Camera": "Smart Polaroid Instant Camera",
        "Canon EOS 90D Cinematic DSLR Kit": "Canon EOS 90D Cinematic DSLR Kit",
        "Canon EOS Rebel 4K DSLR": "Canon EOS Rebel 4K DSLR",
        "Canon EOS Rebel 4K DSLR Camera": "Canon EOS Rebel 4K DSLR Camera",
        "Apple iPad Mini G2356 Retina": "Apple iPad Mini G2356 Retina",
        "Apple iPad Mini": "Apple iPad Mini",
        "Apple iPad Mini G2356": "Apple iPad Mini G2356",
        "Apple iPad Pro 11\" M2 Retina": "Apple iPad Pro 11\" M2 Retina",
        "Apple iPad Pro 11&quot; M2 Retina": "Apple iPad Pro 11&quot; M2 Retina",
        "Apple MacBook Pro 16\" M3 Max": "Apple MacBook Pro 16\" M3 Max",
        "Apple MacBook Pro 16&quot; M3 Max": "Apple MacBook Pro 16&quot; M3 Max",
        "Samsung Galaxy Cyan Smartphone": "Samsung Galaxy Cyan Smartphone",
        "Samsung Galaxy S24 Ultra 5G": "Samsung Galaxy S24 Ultra 5G",
        "SmartPhone Touch OLED Edition": "SmartPhone Touch OLED Edition",
        "Digital Tablet with Precision Pen": "Digital Tablet with Precision Pen",
        "10.9-inch Retina Display Tablet": "10.9-inch Retina Display Tablet",
        "4K Ultra Quadcopter Drone Master": "4K Ultra Quadcopter Drone Master",
        "4K Ultra HD GPS Drone Quadcopter": "4K Ultra HD GPS Drone Quadcopter",
        "DJI Mavic Air 4K Aerial Drone": "DJI Mavic Air 4K Aerial Drone",
        "DJI Mavic Air 4K Drone": "DJI Mavic Air 4K Drone",
        "Wireless Studio Headphones HD": "Wireless Studio Headphones HD",
        "Sony Studio ANC Headphones": "Sony Studio ANC Headphones",
        "Sony Studio Wireless ANC Headphones": "Sony Studio Wireless ANC Headphones",
        "Sony WH-1000XM5 Studio ANC": "Sony WH-1000XM5 Studio ANC",
        "Pure Bass ANC Wireless Earbuds": "Pure Bass ANC Wireless Earbuds",
        "True Wireless Stereo Earbuds": "True Wireless Stereo Earbuds",
        "HD Webcam Clip Pro 1080P": "HD Webcam Clip Pro 1080P",
        "Smart Luxury Titanium Watch": "Smart Luxury Titanium Watch",
        "Smart Fitness Watch Band": "Smart Fitness Watch Band",
        "Nikkor 70-200mm f/2.8 VR Lens": "Nikkor 70-200mm f/2.8 VR Lens",
        "Nikkor 70-200mm f/2.8 VR": "Nikkor 70-200mm f/2.8 VR",
        "RGB Mechanical Gaming Keyboard": "RGB Mechanical Gaming Keyboard",
        "Pro Optical Gaming Mouse": "Pro Optical Gaming Mouse",
        "Waterproof Bluetooth Speaker": "Waterproof Bluetooth Speaker",
        "Smart Home AI Voice Speaker": "Smart Home AI Voice Speaker",
        "Wireless Noise-Cancelling Headphones": "Wireless Noise-Cancelling Headphones",
        "Wireless Pro Bluetooth Controller": "Wireless Pro Bluetooth Controller",
        "20000mAh Fast Charging Power Bank": "20000mAh Fast Charging Power Bank",
        "Add To Cart": "Add To Cart",
        "Add to Cart": "Add to Cart",
        "Add": "Add",
        "Add to Cart 🛒": "Add to Cart 🛒",
        "Buy Now": "Buy Now",
        "Direct Order": "Direct Order",
        "Order Now ⚡": "Order Now ⚡",
        "View Product": "View Product",
        "View Specifications": "View Specifications",
        "Add to Wishlist": "Add to Wishlist",
        "Remove from Wishlist": "Remove from Wishlist",
        "Wishlist": "Wishlist",
        "Show All Products": "Show All Products",
        "Clear Search": "Clear Search",
        "No Products Found": "No Products Found",
        "In Stock": "In Stock",
        "Available:": "Available:",
        "Sale": "Sale",
        "New": "New",
        "Hot": "Hot",
        "Top Rated": "Top Rated",
        "Free Delivery": "Free Delivery",
        "Quick View": "Quick View",
        "Compare": "Compare",
        "Compare Products": "Compare Products",
        "Remove": "Remove",
        "Clear All": "Clear All",
        "View More": "View More",
        "View Large ↗": "View Large ↗",
        "Back to Top": "Back to Top",
        "Sort by:": "Sort by:",
        "Price: Low to High": "Price: Low to High",
        "Price: High to Low": "Price: High to Low",
        "Discount: High to Low": "Discount: High to Low",
        "Select By Color": "Select By Color",
        "White": "White",
        "Green": "Green",
        "Gold": "Gold",
        "+ Browse Products": "+ Browse Products",
        "Explore Offers & Products": "Explore Offers & Products",
        "Search Offer Products...": "Search Offer Products...",
        "Search Results": "Search Results",
        "Showing products matching your search": "Showing products matching your search",
        "✕ Clear & Show All": "✕ Clear & Show All",
        "products found": "products found",
        "matching": "matching",
        "in": "in",
        "Category:": "Category:",
        "Search:": "Search:",
        "Cart Page": "Cart Page",
        "Shopping Cart": "Shopping Cart",
        "Shopping Cart & Checkout": "Shopping Cart & Checkout",
        "Shopping Cart & Checkout - Electro": "Shopping Cart & Checkout - Electro",
        "Cart & Checkout": "Cart & Checkout",
        "Product": "Product",
        "Price": "Price",
        "Unit Price": "Unit Price",
        "Quantity": "Quantity",
        "Subtotal": "Subtotal",
        "Subtotal:": "Subtotal:",
        "Action": "Action",
        "Order Summary": "Order Summary",
        "Shipping": "Shipping",
        "Free": "Free",
        "Tax": "Tax",
        "Tax (0%):": "Tax (0%):",
        "Total Amount": "Total Amount",
        "Total Amount:": "Total Amount:",
        "Estimated Shipping:": "Estimated Shipping:",
        "Proceed to Checkout": "Proceed to Checkout",
        "Checkout": "Checkout",
        "Continue Shopping": "Continue Shopping",
        "Your cart is currently empty.": "Your cart is currently empty.",
        "Your shopping cart is currently empty.": "Your shopping cart is currently empty.",
        "Have a coupon code?": "Have a coupon code?",
        "Enter coupon": "Enter coupon",
        "Apply": "Apply",
        "Go to Cart Page ↗": "Go to Cart Page ↗",
        "Payment Method": "Payment Method",
        "Cash on Delivery (COD)": "Cash on Delivery (COD)",
        "Credit / Debit Card": "Credit / Debit Card",
        "UPI / Net Banking": "UPI / Net Banking",
        "Recipient Name *": "Recipient Name *",
        "Delivery Address *": "Delivery Address *",
        "Shipping Address *": "Shipping Address *",
        "Full Shipping Address": "Full Shipping Address",
        "Shipping & Delivery Details": "Shipping & Delivery Details",
        "My Profile": "My Profile",
        "My Profile & Dashboard - Electro": "My Profile & Dashboard - Electro",
        "User Profile": "User Profile",
        "User Profile & Orders": "User Profile & Orders",
        "Customer Dashboard": "Customer Dashboard",
        "Account Overview": "Account Overview",
        "Order List": "Order List",
        "Order History": "Order History",
        "Edit Profile": "Edit Profile",
        "Returns & Feedback": "Returns & Feedback",
        "Returns": "Returns",
        "Sign Out": "Sign Out",
        "Total Purchased": "Total Purchased",
        "Orders Placed": "Orders Placed",
        "Items in Cart": "Items in Cart",
        "Favorite Category": "Favorite Category",
        "Recent Orders": "Recent Orders",
        "Order ID": "Order ID",
        "Date": "Date",
        "Status": "Status",
        "Total": "Total",
        "Full Name": "Full Name",
        "Full Name *": "Full Name *",
        "Email Address": "Email Address",
        "Email Address *": "Email Address *",
        "Phone Number": "Phone Number",
        "Phone Number *": "Phone Number *",
        "Address": "Address",
        "Save Changes": "Save Changes",
        "Save Profile Changes": "Save Profile Changes",
        "Profile Photo (Avatar Image URL)": "Profile Photo (Avatar Image URL)",
        "Your Favorite Category *": "Your Favorite Category *",
        "Member Since:": "Member Since:",
        "Purchased Status": "Purchased Status",
        "No Liked Products Yet": "No Liked Products Yet",
        "Click the heart icon on any product to save your favorite items here.": "Click the heart icon on any product to save your favorite items here.",
        "Feedback or Return Item Request": "Feedback or Return Item Request",
        "How was your overall shopping experience?": "How was your overall shopping experience?",
        "Submit Feedback": "Submit Feedback",
        "Login / Sign Up": "Login / Sign Up",
        "Account Sign In & Register - Electro": "Account Sign In & Register - Electro",
        "Sign In to Electro": "Sign In to Electro",
        "Sign In & Register": "Sign In & Register",
        "Create My Account": "Create My Account",
        "Create Account": "Create Account",
        "Username *": "Username *",
        "Password *": "Password *",
        "Password": "Password",
        "Confirm Password": "Confirm Password",
        "Remember Me": "Remember Me",
        "Forgot Password?": "Forgot Password?",
        "Sign In": "Sign In",
        "Sign Up": "Sign Up",
        "SignUp": "SignUp",
        "Sign In here": "Sign In here",
        "Sign Up now": "Sign Up now",
        "Don't have an account yet?": "Don't have an account yet?",
        "Already registered?": "Already registered?",
        "Seller Login": "Seller Login",
        "Account Portal": "Account Portal",
        "We Value Your Security": "We Value Your Security",
        "Get In Touch": "Get In Touch",
        "Let's Connect": "Let's Connect",
        "Send Us A Message": "Send Us A Message",
        "Send Your Message": "Send Your Message",
        "Mail Us": "Mail Us",
        "Telephone": "Telephone",
        "Subject": "Subject",
        "Message": "Message",
        "Send Message": "Send Message",
        "Your Name *": "Your Name *",
        "Your Email *": "Your Email *",
        "Your Phone": "Your Phone",
        "Your Project": "Your Project",
        "Description": "Description",
        "Specifications": "Specifications",
        "Reviews": "Reviews",
        "Image Sensor": "Image Sensor",
        "Image Processor": "Image Processor",
        "ISO Sensitivity": "ISO Sensitivity",
        "Autofocus System": "Autofocus System",
        "Video Recording": "Video Recording",
        "Continuous Shooting": "Continuous Shooting",
        "Viewfinder": "Viewfinder",
        "Display Screen": "Display Screen",
        "Wireless Connectivity": "Wireless Connectivity",
        "Battery Life": "Battery Life",
        "Dimensions & Weight": "Dimensions & Weight",
        "Warranty": "Warranty",
        "What is in the Box:": "What is in the Box:",
        "Product SKU:": "Product SKU:",
        "Category": "Category",
        "Leave a Reply": "Leave a Reply",
        "Your Review *": "Your Review *",
        "Submit Review": "Submit Review",
        "Share": "Share",
        "Discover massive discounts of up to 60% on premium audio gear, smartwatches, instant cameras, and computer accessories. All products include original manufacturer warranties.": "Discover massive discounts of up to 60% on premium audio gear, smartwatches, instant cameras, and computer accessories. All products include original manufacturer warranties.",
        "All products you have liked or saved to your wishlist across Electro are stored here. Add them straight to your cart or order them instantly.": "All products you have liked or saved to your wishlist across Electro are stored here. Add them straight to your cart or order them instantly.",
        "Here you can see items added to your cart, whether they are already ordered or waiting in cart, and immediately order now.": "Here you can see items added to your cart, whether they are already ordered or waiting in cart, and immediately order now.",
        "Tell us about your experience shopping on Electro or request an easy 30-day money-back return.": "Tell us about your experience shopping on Electro or request an easy 30-day money-back return.",
        "The contact form is currently active. Get in touch with our expert 24/7 customer support team for inquiries, order status, or wholesale requests.": "The contact form is currently active. Get in touch with our expert 24/7 customer support team for inquiries, order status, or wholesale requests.",
        "We are here for you! how can we help, We are here for you!": "We are here for you! how can we help, We are here for you!",
        "Get an extra 15% discount on all orders over $150. Use promo voucher at checkout.": "Get an extra 15% discount on all orders over $150. Use promo voucher at checkout.",
        "High-resolution professional DSLR camera featuring a 24.1 Megapixel CMOS sensor, 4K UHD video recording, DIGIC 8 image processor, Dual Pixel CMOS AF, and seamless built-in Wi-Fi and Bluetooth connectivity.": "High-resolution professional DSLR camera featuring a 24.1 Megapixel CMOS sensor, 4K UHD video recording, DIGIC 8 image processor, Dual Pixel CMOS AF, and seamless built-in Wi-Fi and Bluetooth connectivity.",
        ". Engineered for passionate photographers and creative videographers, this flagship camera combines a cutting-edge 24.1 Megapixel CMOS APS-C sensor with the lightning-fast DIGIC 8 image processor to render breathtakingly sharp photos and cinematic 4K UHD 24p videos.": ". Engineered for passionate photographers and creative videographers, this flagship camera combines a cutting-edge 24.1 Megapixel CMOS APS-C sensor with the lightning-fast DIGIC 8 image processor to render breathtakingly sharp photos and cinematic 4K UHD 24p videos.",
        "Experience world-class imaging capability with the": "Experience world-class imaging capability with the",
        "Your email address will not be published. Required fields are marked *": "Your email address will not be published. Required fields are marked *",
        "Phone Number, Email, or Username": "Phone Number, Email, or Username",
        "e.g. saksham@example.com or +91 9876543210": "e.g. saksham@example.com or +91 9876543210",
        "About Us": "About Us",
        "Customer Care": "Customer Care",
        "Customer Service": "Customer Service",
        "Quick Links": "Quick Links",
        "Information": "Information",
        "Privacy Policy": "Privacy Policy",
        "Terms of Service": "Terms of Service",
        "Terms & Conditions": "Terms & Conditions",
        "Return Policy": "Return Policy",
        "Shipping Policy": "Shipping Policy",
        "Delivery Information": "Delivery Information",
        "Track Order": "Track Order",
        "Track Your Order": "Track Your Order",
        "FAQ": "FAQ",
        "Newsletter": "Newsletter",
        "Subscribe to our newsletter for exclusive discounts and updates.": "Subscribe to our newsletter for exclusive discounts and updates.",
        "Enter your email address": "Enter your email address",
        "Subscribe": "Subscribe",
        "All right reserved.": "All right reserved.",
        "All Rights Reserved.": "All Rights Reserved.",
        "Site Map": "Site Map",
        "Affiliates": "Affiliates",
        "Gift Vouchers": "Gift Vouchers",
        "Unsubscribe Notification": "Unsubscribe Notification",
        "Enter your email": "Enter your email",
        "Enter your password": "Enter your password",
        "Create a strong password": "Create a strong password",
        "Full street address, city, zip code": "Full street address, city, zip code",
        "Mention item returned or share what you loved about our service...": "Mention item returned or share what you loved about our service...",
        "Write your experience with this product...": "Write your experience with this product...",
        "keywords": "keywords",
        "SPECIAL DISCOUNT 45%": "SPECIAL DISCOUNT 45%",
        "FLASH SALE UP TO ": "FLASH SALE UP TO ",
        "NEW ARRIVAL 2026": "NEW ARRIVAL 2026",
        "On Selected<br>Laptops &<br>Desktop Or<br>Smartphone": "On Selected<br>Laptops &<br>Desktop Or<br>Smartphone",
        "Next-Gen 4K<br>Smart OLED<br>Monitors &<br>Displays": "Next-Gen 4K<br>Smart OLED<br>Monitors &<br>Displays",
        "High-End Pro<br>Workstations &<br>Studio Gear<br>Hardware": "High-End Pro<br>Workstations &<br>Studio Gear<br>Hardware",
        "Ultra Cinematic<br>4K Quadcopter<br>Drones &<br>Cameras": "Ultra Cinematic<br>4K Quadcopter<br>Drones &<br>Cameras"
    },
    "hi": {
        "Help": "सहायता",
        "Support": "सहयोग",
        "Contact": "संपर्क",
        "Contact Us": "हमसे संपर्क करें",
        "Contact Us - Electro Electronics": "हमसे संपर्क करें - इलेक्ट्रो इलेक्ट्रॉनिक्स",
        "Call Us:(+012) 1234 567890": "कॉल करें:(+012) 1234 567890",
        "My Dashboard": "मेरा डैशबोर्ड",
        "My Account": "मेरा खाता",
        "Search Looking For?": "आप क्या खोज रहे हैं?",
        "All Category": "सभी श्रेणियां",
        "All Categories": "सभी श्रेणियां",
        "Home": "होम",
        "Shop": "दुकान",
        "Offers": "ऑफर्स",
        "All Offers": "सभी ऑफर्स",
        "Offers Page": "ऑफर्स पेज",
        "Single Page": "उत्पाद विवरण",
        "Single Product": "एकल उत्पाद",
        "Single Product - Electro Electronics": "उत्पाद विवरण - इलेक्ट्रो इलेक्ट्रॉनिक्स",
        "Pages": "पेज",
        "Total:": "कुल:",
        "0 Items": "0 वस्तुएं",
        "Items": "वस्तुएं",
        "Select Currency": "मुद्रा चुनें",
        "Select Language": "भाषा चुनें",
        "Save Up To 50% Off": "50% तक की छूट पाएं",
        "Get UP To 50% Off": "50% तक की छूट पाएं",
        "Hot Deals This Week": "इस सप्ताह के धमाकेदार ऑफर्स",
        "Special Offer": "विशेष ऑफर",
        "SAVE UP TO $200": "बचत करें $200 तक",
        "SAVE UP TO A $200": "बचत करें $200 तक",
        "Terms and Condition Apply": "नियम एवं शर्तें लागू",
        "Shop Now": "अभी खरीदें",
        "Explore Products": "उत्पाद देखें",
        "Starting at": "शुरुआती कीमत",
        "Limited Time Deals": "सीमित समय के सौदे",
        "FREE RETURN": "मुफ़्त वापसी",
        "30 days money back guarantee!": "30 दिनों की मनी बैक गारंटी!",
        "Free return products in 30 days": "30 दिनों में मुफ़्त उत्पाद वापसी",
        "FREE SHIPPING": "मुफ़्त शिपिंग",
        "Free shipping on all order": "सभी ऑर्डर पर मुफ़्त डिलीवरी",
        "SUPPORT 24/7": "24/7 सहायता",
        "Contact us 24 hours a day": "दिन के 24 घंटे हमसे संपर्क करें",
        "100% SECURE": "100% सुरक्षित",
        "Payment 100% Secure": "100% सुरक्षित भुगतान",
        "SECURE PAYMENT": "सुरक्षित भुगतान",
        "ONLINE SERVICE": "ऑनलाइन सेवा",
        "We support online 24 hrs a day": "हम दिन के 24 घंटे ऑनलाइन सहायता प्रदान करते हैं",
        "RECEIVE GIFT CARD": "गिफ्ट कार्ड प्राप्त करें",
        "Receive gift all over order $50": "$50 से अधिक के प्रत्येक ऑर्डर पर उपहार पाएं",
        "BEST SELLER PRODUCTS": "सबसे लोकप्रिय उत्पाद",
        "Best Seller Products": "सबसे लोकप्रिय उत्पाद",
        "Bestseller Products": "सबसे लोकप्रिय उत्पाद",
        "Liked Products": "पसंद किए गए उत्पाद",
        "Customer Reviews": "ग्राहकों की समीक्षाएं",
        "Featured Products": "विशेष उत्पाद",
        "Featured Deals": "विशेष सौदे",
        "Featured": "विशेष",
        "New Arrivals": "नए आगमन",
        "Our Top Brands": "हमारे शीर्ष ब्रांड्स",
        "Our Products": "हमारे उत्पाद",
        "All Products": "सभी उत्पाद",
        "All Product Items": "सभी उत्पाद वस्तुएं",
        "Top Selling": "सर्वाधिक बिकने वाले",
        "Top Tier": "प्रीमियम श्रेणी",
        "Key Technical Specifications": "प्रमुख तकनीकी विनिर्देश",
        "Product Description": "उत्पाद का विवरण",
        "Overview": "अवलोकन",
        "Testimonials": "ग्राहक प्रशंसापत्र",
        "Related Products": "संबंधित उत्पाद",
        "PRODUCT TAGS": "उत्पाद टैग",
        "Products Categories": "उत्पाद श्रेणियां",
        "Brands": "ब्रांड्स",
        "Deals": "डील्स",
        "Extras": "अतिरिक्त सुविधाएं",
        "Mega Weekend Tech Bonanza": "मेगा वीकेंड टेक बोनान्ज़ा",
        "Photography": "फोटोग्राफी",
        "Photography & Gadgets": "फोटोग्राफी और गैजेट्स",
        "Photography & Video": "फोटोग्राफी और वीडियो",
        "SmartPhone": "स्मार्टफोन",
        "SmartPhones": "स्मार्टफोन",
        "Smartphones & Mobiles": "स्मार्टफोन और मोबाइल",
        "Smartphones & Tablets": "स्मार्टफोन और टैबलेट",
        "SmartPhone & Smart TV": "स्मार्टफोन और स्मार्ट टीवी",
        "Electronics": "इलेक्ट्रॉनिक्स",
        "Electronics & Computer": "इलेक्ट्रॉनिक्स और कंप्यूटर",
        "Audio": "ऑडियो",
        "Audio & Sound": "ऑडियो और साउंड",
        "Audio & Studio": "ऑडियो और स्टूडियो",
        "Audio & Studio Headphones": "ऑडियो और स्टूडियो हेडफोन",
        "Audio & Headphones": "ऑडियो और हेडफोन",
        "Audio Equipment": "ऑडियो उपकरण",
        "Accessories": "एक्सेसरीज",
        "Gadget Accessories": "गैजेट एक्सेसरीज",
        "Gadget Accessories & Watches": "गैजेट एक्सेसरीज और घड़ियां",
        "Laptops & Desktops": "लैपटॉप और डेस्कटॉप",
        "Laptops, PCs & Desktops": "लैपटॉप, पीसी और डेस्कटॉप",
        "Laptops & Computers": "लैपटॉप और कंप्यूटर",
        "Computers & Laptops": "कंप्यूटर और लैपटॉप",
        "Mobiles & Tablets": "मोबाइल और टैबलेट",
        "Tablets & Mobiles": "टैबलेट और मोबाइल",
        "Tablets & Computing": "टैबलेट और कंप्यूटिंग",
        "Cameras & Drones": "कैमरे और ड्रोन",
        "Cameras & Lenses": "कैमरे और लेंस",
        "Cameras & Photo": "कैमरे और फोटो",
        "Cameras & Photography": "कैमरे और फोटोग्राफी",
        "Smart Watches": "स्मार्ट घड़ियां",
        "Smart Whatch": "स्मार्ट घड़ी",
        "Headphones & Audio": "हेडफ़ोन और ऑडियो",
        "Gaming & VR": "गेमिंग और वीआर",
        "Gaming & PC": "गेमिंग और पीसी",
        "Wearable Tech": "पहनने योग्य तकनीक",
        "Wearables": "वियरेबल्स",
        "Home Appliances": "घरेलू उपकरण",
        "Smart Home & Audio": "स्मार्ट होम और ऑडियो",
        "Drones & Robotics": "ड्रोन और रोबोटिक्स",
        "Camera": "कैमरा",
        "Cameras": "कैमरे",
        "Laptop": "लैपटॉप",
        "Headphone": "हेडफोन",
        "Optics": "ऑप्टिक्स लेंस",
        "Smart Camera 4K Pro": "स्मार्ट कैमरा 4K प्रो",
        "Professional Camera Lens 50mm": "प्रोफेशनल कैमरा लेंस 50mm",
        "Smart Polaroid Instant Camera": "स्मार्ट पोलरॉइड इंस्टेंट कैमरा",
        "Canon EOS 90D Cinematic DSLR Kit": "कैनन EOS 90D सिनेमैटिक DSLR किट",
        "Canon EOS Rebel 4K DSLR": "कैनन EOS रेबेल 4K DSLR",
        "Canon EOS Rebel 4K DSLR Camera": "कैनन EOS रेबेल 4K DSLR कैमरा",
        "Apple iPad Mini G2356 Retina": "एप्पल आईपैड मिनी रेटिना",
        "Apple iPad Mini": "एप्पल आईपैड मिनी",
        "Apple iPad Mini G2356": "एप्पल आईपैड मिनी G2356",
        "Apple iPad Pro 11\" M2 Retina": "एप्पल आईपैड प्रो 11\" M2 रेटिना",
        "Apple iPad Pro 11&quot; M2 Retina": "एप्पल आईपैड प्रो 11\" M2 रेटिना",
        "Apple MacBook Pro 16\" M3 Max": "एप्पल मैकबुक प्रो 16\" M3 मैक्स",
        "Apple MacBook Pro 16&quot; M3 Max": "एप्पल मैकबुक प्रो 16\" M3 मैक्स",
        "Samsung Galaxy Cyan Smartphone": "सैमसंग गैलेक्सी स्यान स्मार्टफोन",
        "Samsung Galaxy S24 Ultra 5G": "सैमसंग गैलेक्सी S24 अल्ट्रा 5G",
        "SmartPhone Touch OLED Edition": "स्मार्टफोन टच ओलेड एडिशन",
        "Digital Tablet with Precision Pen": "प्रिसिजन पेन के साथ डिजिटल टैबलेट",
        "10.9-inch Retina Display Tablet": "10.9-इंच रेटिना डिस्प्ले टैबलेट",
        "4K Ultra Quadcopter Drone Master": "4K अल्ट्रा क्वाडकॉप्टर ड्रोन मास्टर",
        "4K Ultra HD GPS Drone Quadcopter": "4K अल्ट्रा HD जीपीएस ड्रोन क्वाडकॉप्टर",
        "DJI Mavic Air 4K Aerial Drone": "डीजेआई मैविक एयर 4K एरियल ड्रोन",
        "DJI Mavic Air 4K Drone": "डीजेआई मैविक एयर 4K ड्रोन",
        "Wireless Studio Headphones HD": "वायरलेस स्टूडियो हेडफोन HD",
        "Sony Studio ANC Headphones": "सोनी स्टूडियो ANC हेडफ़ोन",
        "Sony Studio Wireless ANC Headphones": "सोनी स्टूडियो वायरलेस ANC हेडफ़ोन",
        "Sony WH-1000XM5 Studio ANC": "सोनी WH-1000XM5 स्टूडियो ANC",
        "Pure Bass ANC Wireless Earbuds": "प्योर बास ANC वायरलेस ईयरबड्स",
        "True Wireless Stereo Earbuds": "ट्रू वायरलेस स्टीरियो ईयरबड्स",
        "HD Webcam Clip Pro 1080P": "HD वेबकैम क्लिप प्रो 1080P",
        "Smart Luxury Titanium Watch": "स्मार्ट लक्जरी टाइटेनियम घड़ी",
        "Smart Fitness Watch Band": "स्मार्ट फिटनेस वॉच बैंड",
        "Nikkor 70-200mm f/2.8 VR Lens": "निक्कोर 70-200mm f/2.8 VR लेंस",
        "Nikkor 70-200mm f/2.8 VR": "निक्कोर 70-200mm f/2.8 VR",
        "RGB Mechanical Gaming Keyboard": "RGB मैकेनिकल गेमिंग कीबोर्ड",
        "Pro Optical Gaming Mouse": "प्रो ऑप्टिकल गेमिंग माउस",
        "Waterproof Bluetooth Speaker": "वाटरप्रूफ ब्लूटूथ स्पीकर",
        "Smart Home AI Voice Speaker": "स्मार्ट होम एआई वॉयस स्पीकर",
        "Wireless Noise-Cancelling Headphones": "वायरलेस नॉइज़-कैंसलिंग हेडफ़ोन",
        "Wireless Pro Bluetooth Controller": "वायरलेस प्रो ब्लूटूथ कंट्रोलर",
        "20000mAh Fast Charging Power Bank": "20000mAh फास्ट चार्जिंग पावर बैंक",
        "Add To Cart": "कार्ट में जोड़ें",
        "Add to Cart": "कार्ट में जोड़ें",
        "Add": "जोड़ें",
        "Add to Cart 🛒": "कार्ट में जोड़ें 🛒",
        "Buy Now": "अभी खरीदें",
        "Direct Order": "सीधा ऑर्डर करें",
        "Order Now ⚡": "अभी ऑर्डर करें ⚡",
        "View Product": "उत्पाद देखें",
        "View Specifications": "विनिर्देश देखें",
        "Add to Wishlist": "इच्छासूची में जोड़ें",
        "Remove from Wishlist": "इच्छासूची से हटाएं",
        "Wishlist": "इच्छासूची",
        "Show All Products": "सभी उत्पाद देखें",
        "Clear Search": "खोज साफ़ करें",
        "No Products Found": "कोई उत्पाद नहीं मिला",
        "In Stock": "उपलब्ध है",
        "Available:": "उपलब्ध:",
        "Sale": "सेल",
        "New": "नया",
        "Hot": "हॉट",
        "Top Rated": "सर्वश्रेष्ठ रेटेड",
        "Free Delivery": "मुफ़्त डिलीवरी",
        "Quick View": "त्वरित दृश्य",
        "Compare": "तुलना करें",
        "Compare Products": "उत्पादों की तुलना करें",
        "Remove": "हटाएं",
        "Clear All": "सभी साफ़ करें",
        "View More": "और देखें",
        "View Large ↗": "बड़ा देखें ↗",
        "Back to Top": "शीर्ष पर वापस जाएं",
        "Sort by:": "क्रमबद्ध करें:",
        "Price: Low to High": "कीमत: कम से ज्यादा",
        "Price: High to Low": "कीमत: ज्यादा से कम",
        "Discount: High to Low": "छूट: ज्यादा से कम",
        "Select By Color": "रंग के आधार पर चुनें",
        "White": "सफेद",
        "Green": "हरा",
        "Gold": "गोल्डन",
        "+ Browse Products": "+ उत्पाद ब्राउज़ करें",
        "Explore Offers & Products": "ऑफ़र और उत्पाद देखें",
        "Search Offer Products...": "ऑफर उत्पाद खोजें...",
        "Search Results": "खोज परिणाम",
        "Showing products matching your search": "आपकी खोज से मेल खाने वाले उत्पाद प्रदर्शित हो रहे हैं",
        "✕ Clear & Show All": "✕ साफ़ करें और सब देखें",
        "products found": "उत्पाद मिले",
        "matching": "के अनुसार",
        "in": "में",
        "Category:": "श्रेणी:",
        "Search:": "खोज:",
        "Cart Page": "कार्ट पेज",
        "Shopping Cart": "शॉपिंग कार्ट",
        "Shopping Cart & Checkout": "शॉपिंग कार्ट और चेकआउट",
        "Shopping Cart & Checkout - Electro": "शॉपिंग कार्ट और चेकआउट - इलेक्ट्रो",
        "Cart & Checkout": "कार्ट और चेकआउट",
        "Product": "उत्पाद",
        "Price": "मूल्य",
        "Unit Price": "इकाई मूल्य",
        "Quantity": "मात्रा",
        "Subtotal": "उप-योग",
        "Subtotal:": "उप-योग:",
        "Action": "कार्रवाई",
        "Order Summary": "ऑर्डर सारांश",
        "Shipping": "शिपिंग",
        "Free": "मुफ़्त",
        "Tax": "कर",
        "Tax (0%):": "कर (0%):",
        "Total Amount": "कुल राशि",
        "Total Amount:": "कुल राशि:",
        "Estimated Shipping:": "अनुमानित शिपिंग:",
        "Proceed to Checkout": "चेकआउट के लिए आगे बढ़ें",
        "Checkout": "चेकआउट",
        "Continue Shopping": "खरीदारी जारी रखें",
        "Your cart is currently empty.": "आपकी कार्ट वर्तमान में खाली है।",
        "Your shopping cart is currently empty.": "आपकी शॉपिंग कार्ट वर्तमान में खाली है।",
        "Have a coupon code?": "कूपन कोड है?",
        "Enter coupon": "कूपन दर्ज करें",
        "Apply": "लागू करें",
        "Go to Cart Page ↗": "कार्ट पेज पर जाएं ↗",
        "Payment Method": "भुगतान का तरीका",
        "Cash on Delivery (COD)": "कैश ऑन डिलीवरी (COD)",
        "Credit / Debit Card": "क्रेडिट / डेबिट कार्ड",
        "UPI / Net Banking": "यूपीआई / नेट बैंकिंग",
        "Recipient Name *": "प्राप्तकर्ता का नाम *",
        "Delivery Address *": "वितरण पता *",
        "Shipping Address *": "शिपिंग पता *",
        "Full Shipping Address": "पूरा शिपिंग पता",
        "Shipping & Delivery Details": "शिपिंग और डिलीवरी विवरण",
        "My Profile": "मेरी प्रोफ़ाइल",
        "My Profile & Dashboard - Electro": "मेरी प्रोफ़ाइल और डैशबोर्ड - इलेक्ट्रो",
        "User Profile": "उपयोगकर्ता प्रोफ़ाइल",
        "User Profile & Orders": "उपयोगकर्ता प्रोफ़ाइल और ऑर्डर",
        "Customer Dashboard": "ग्राहक डैशबोर्ड",
        "Account Overview": "खाता अवलोकन",
        "Order List": "ऑर्डर सूची",
        "Order History": "ऑर्डर इतिहास",
        "Edit Profile": "प्रोफ़ाइल संपादित करें",
        "Returns & Feedback": "वापसी और फीडबैक",
        "Returns": "वापसी",
        "Sign Out": "साइन आउट",
        "Total Purchased": "कुल खरीदारी",
        "Orders Placed": "किए गए ऑर्डर",
        "Items in Cart": "कार्ट में वस्तुएं",
        "Favorite Category": "पसंदीदा श्रेणी",
        "Recent Orders": "हाल के ऑर्डर",
        "Order ID": "ऑर्डर आईडी",
        "Date": "दिनांक",
        "Status": "स्थिति",
        "Total": "कुल",
        "Full Name": "पूरा नाम",
        "Full Name *": "पूरा नाम *",
        "Email Address": "ईमेल पता",
        "Email Address *": "ईमेल पता *",
        "Phone Number": "फ़ोन नंबर",
        "Phone Number *": "फ़ोन नंबर *",
        "Address": "पता",
        "Save Changes": "परिवर्तन सहेजें",
        "Save Profile Changes": "प्रोफ़ाइल परिवर्तन सहेजें",
        "Profile Photo (Avatar Image URL)": "प्रोफ़ाइल फ़ोटो (अवतार इमेज URL)",
        "Your Favorite Category *": "आपकी पसंदीदा श्रेणी *",
        "Member Since:": "सदस्यता वर्ष:",
        "Purchased Status": "खरीद की स्थिति",
        "No Liked Products Yet": "अभी तक कोई पसंद किया गया उत्पाद नहीं है",
        "Click the heart icon on any product to save your favorite items here.": "अपने पसंदीदा उत्पादों को यहां सहेजने के लिए हार्ट आइकन पर क्लिक करें।",
        "Feedback or Return Item Request": "फीडबैक या वापसी का अनुरोध",
        "How was your overall shopping experience?": "आपका समग्र खरीदारी अनुभव कैसा रहा?",
        "Submit Feedback": "फीडबैक सबमिट करें",
        "Login / Sign Up": "लॉगिन / साइन अप",
        "Account Sign In & Register - Electro": "खाता साइन इन और पंजीकरण - इलेक्ट्रो",
        "Sign In to Electro": "इलेक्ट्रो में साइन इन करें",
        "Sign In & Register": "साइन इन और पंजीकरण",
        "Create My Account": "मेरा खाता बनाएं",
        "Create Account": "खाता बनाएं",
        "Username *": "उपयोगकर्ता नाम *",
        "Password *": "पासवर्ड *",
        "Password": "पासवर्ड",
        "Confirm Password": "पासवर्ड की पुष्टि करें",
        "Remember Me": "मुझे याद रखें",
        "Forgot Password?": "पासवर्ड भूल गए?",
        "Sign In": "साइन इन करें",
        "Sign Up": "साइन अप करें",
        "SignUp": "साइन अप",
        "Sign In here": "यहाँ साइन इन करें",
        "Sign Up now": "अभी साइन अप करें",
        "Don't have an account yet?": "क्या आपका अभी तक कोई खाता नहीं है?",
        "Already registered?": "क्या आप पहले से पंजीकृत हैं?",
        "Seller Login": "विक्रेता लॉगिन",
        "Account Portal": "अकाउंट पोर्टल",
        "We Value Your Security": "हम आपकी सुरक्षा को महत्व देते हैं",
        "Get In Touch": "संपर्क में रहें",
        "Let's Connect": "आइए जुड़ें",
        "Send Us A Message": "हमें संदेश भेजें",
        "Send Your Message": "अपना संदेश भेजें",
        "Mail Us": "हमें मेल करें",
        "Telephone": "टेलीफोन",
        "Subject": "विषय",
        "Message": "संदेश",
        "Send Message": "संदेश भेजें",
        "Your Name *": "आपका नाम *",
        "Your Email *": "आपका ईमेल *",
        "Your Phone": "आपका फोन",
        "Your Project": "आपका प्रोजेक्ट",
        "Description": "विवरण",
        "Specifications": "विनिर्देश",
        "Reviews": "समीक्षाएं",
        "Image Sensor": "इमेज सेंसर",
        "Image Processor": "इमेज प्रोसेसर",
        "ISO Sensitivity": "आईएसओ संवेदनशीलता",
        "Autofocus System": "ऑटोफोकस सिस्टम",
        "Video Recording": "वीडियो रिकॉर्डिंग",
        "Continuous Shooting": "कंटीन्यूअस शूटिंग",
        "Viewfinder": "व्यूफ़ाइंडर",
        "Display Screen": "डिस्प्ले स्क्रीन",
        "Wireless Connectivity": "वायरलेस कनेक्टिविटी",
        "Battery Life": "बैटरी लाइफ",
        "Dimensions & Weight": "आकार एवं वजन",
        "Warranty": "वारंटी",
        "What is in the Box:": "बॉक्स में क्या है:",
        "Product SKU:": "उत्पाद SKU:",
        "Category": "श्रेणी",
        "Leave a Reply": "प्रतिक्रिया दें",
        "Your Review *": "आपकी समीक्षा *",
        "Submit Review": "समीक्षा सबमिट करें",
        "Share": "साझा करें",
        "Discover massive discounts of up to 60% on premium audio gear, smartwatches, instant cameras, and computer accessories. All products include original manufacturer warranties.": "प्रीमियम ऑडियो गियर, स्मार्ट घड़ियों, इंस्टेंट कैमरों और कंप्यूटर एक्सेसरीज़ पर 60% तक की भारी छूट पाएं। सभी उत्पादों में मूल निर्माता वारंटी शामिल है।",
        "All products you have liked or saved to your wishlist across Electro are stored here. Add them straight to your cart or order them instantly.": "इलेक्ट्रो पर आपके द्वारा पसंद किए गए या इच्छासूची में सहेजे गए सभी उत्पाद यहां संग्रहीत हैं। उन्हें सीधे अपनी कार्ट में जोड़ें या तुरंत ऑर्डर करें।",
        "Here you can see items added to your cart, whether they are already ordered or waiting in cart, and immediately order now.": "यहां आप अपनी कार्ट में जोड़ी गई वस्तुएं देख सकते हैं, चाहे वे पहले से ऑर्डर की गई हों या कार्ट में हों, और तुरंत ऑर्डर कर सकते हैं।",
        "Tell us about your experience shopping on Electro or request an easy 30-day money-back return.": "इलेक्ट्रो पर अपने खरीदारी के अनुभव के बारे में बताएं या 30-दिनों की आसान मनी-बैक वापसी का अनुरोध करें।",
        "The contact form is currently active. Get in touch with our expert 24/7 customer support team for inquiries, order status, or wholesale requests.": "संपर्क फ़ॉर्म वर्तमान में सक्रिय है। पूछताछ, ऑर्डर की स्थिति या थोक अनुरोधों के लिए हमारी 24/7 विशेषज्ञ ग्राहक सहायता टीम से संपर्क करें।",
        "We are here for you! how can we help, We are here for you!": "हम आपके लिए यहां हैं! हम आपकी क्या सहायता कर सकते हैं?",
        "Get an extra 15% discount on all orders over $150. Use promo voucher at checkout.": "$150 से अधिक के सभी ऑर्डर पर 15% की अतिरिक्त छूट पाएं। चेकआउट पर प्रोमो वाउचर का उपयोग करें।",
        "High-resolution professional DSLR camera featuring a 24.1 Megapixel CMOS sensor, 4K UHD video recording, DIGIC 8 image processor, Dual Pixel CMOS AF, and seamless built-in Wi-Fi and Bluetooth connectivity.": "हाई-रिजॉल्यूशन प्रोफेशनल DSLR कैमरा, जिसमें 24.1 मेगापिक्सल CMOS सेंसर, 4K UHD वीडियो रिकॉर्डिंग, DIGIC 8 इमेज प्रोसेसर और बिल्ट-इन वाई-फाई/ब्लूटूथ शामिल हैं।",
        ". Engineered for passionate photographers and creative videographers, this flagship camera combines a cutting-edge 24.1 Megapixel CMOS APS-C sensor with the lightning-fast DIGIC 8 image processor to render breathtakingly sharp photos and cinematic 4K UHD 24p videos.": "उत्साही फोटोग्राफरों और रचनात्मक वीडियोग्राफरों के लिए डिज़ाइन किया गया यह फ्लैगशिप कैमरा 24.1 मेगापिक्सल CMOS APS-C सेंसर और DIGIC 8 प्रोसेसर से बेहद स्पष्ट तस्वीरें और 4K वीडियो बनाता है।",
        "Experience world-class imaging capability with the": "विश्व स्तरीय इमेजिंग क्षमता का अनुभव करें",
        "Your email address will not be published. Required fields are marked *": "आपका ईमेल पता प्रकाशित नहीं किया जाएगा। आवश्यक फ़ील्ड * से चिह्नित हैं",
        "Phone Number, Email, or Username": "फ़ोन नंबर, ईमेल या उपयोगकर्ता नाम",
        "e.g. saksham@example.com or +91 9876543210": "उदा. saksham@example.com या +91 9876543210",
        "About Us": "हमारे बारे में",
        "Customer Care": "ग्राहक सेवा",
        "Customer Service": "ग्राहक सेवा",
        "Quick Links": "त्वरित लिंक",
        "Information": "जानकारी",
        "Privacy Policy": "गोपनीयता नीति",
        "Terms of Service": "सेवा की शर्तें",
        "Terms & Conditions": "नियम एवं शर्तें",
        "Return Policy": "वापसी नीति",
        "Shipping Policy": "शिपिंग नीति",
        "Delivery Information": "डिलीवरी की जानकारी",
        "Track Order": "ऑर्डर ट्रैक करें",
        "Track Your Order": "अपना ऑर्डर ट्रैक करें",
        "FAQ": "सामान्य प्रश्न",
        "Newsletter": "न्यूज़लेटर",
        "Subscribe to our newsletter for exclusive discounts and updates.": "विशेष छूट और अपडेट के लिए हमारे न्यूज़लेटर की सदस्यता लें।",
        "Enter your email address": "अपना ईमेल पता दर्ज करें",
        "Subscribe": "सदस्यता लें",
        "All right reserved.": "सर्वाधिकार सुरक्षित।",
        "All Rights Reserved.": "सर्वाधिकार सुरक्षित।",
        "Site Map": "साइट मैप",
        "Affiliates": "सहयोगी",
        "Gift Vouchers": "गिफ्ट वाउचर",
        "Unsubscribe Notification": "सदस्यता समाप्ति सूचना",
        "Enter your email": "अपना ईमेल दर्ज करें",
        "Enter your password": "अपना पासवर्ड दर्ज करें",
        "Create a strong password": "एक मजबूत पासवर्ड बनाएं",
        "Full street address, city, zip code": "पूरा पता, शहर, पिन कोड",
        "Mention item returned or share what you loved about our service...": "वापस किए गए सामान का उल्लेख करें या अपनी राय साझा करें...",
        "Write your experience with this product...": "इस उत्पाद के साथ अपना अनुभव लिखें...",
        "keywords": "कीवर्ड",
        "SPECIAL DISCOUNT 45%": "विशेष छूट 45%",
        "FLASH SALE UP TO ": "फ्लैश सेल  तक की छूट",
        "NEW ARRIVAL 2026": "नया आगमन 2026",
        "On Selected<br>Laptops &<br>Desktop Or<br>Smartphone": "चुनिंदा<br>लैपटॉप और<br>डेस्कटॉप या<br>स्मार्टफोन पर",
        "Next-Gen 4K<br>Smart OLED<br>Monitors &<br>Displays": "नेक्स्ट-जेन 4K<br>स्मार्ट OLED<br>मॉनिटर और<br>डिस्प्ले",
        "High-End Pro<br>Workstations &<br>Studio Gear<br>Hardware": "हाई-एंड प्रो<br>वर्कस्टेशन और<br>स्टूडियो गियर<br>हार्डवेयर",
        "Ultra Cinematic<br>4K Quadcopter<br>Drones &<br>Cameras": "अल्ट्रा सिनेमैटिक<br>4K क्वाडकॉप्टर<br>ड्रोन और<br>कैमरे"
    },
    "ru": {
        "Help": "Помощь",
        "Support": "Поддержка",
        "Contact": "Контакты",
        "Contact Us": "Свяжитесь с нами",
        "Contact Us - Electro Electronics": "Контакты - Electro Electronics",
        "Call Us:(+012) 1234 567890": "Телефон:(+012) 1234 567890",
        "My Dashboard": "Моя панель",
        "My Account": "Мой аккаунт",
        "Search Looking For?": "Что вы ищете?",
        "All Category": "Все категории",
        "All Categories": "Все категории",
        "Home": "Главная",
        "Shop": "Магазин",
        "Offers": "Акции",
        "All Offers": "Все акции",
        "Offers Page": "Страница акций",
        "Single Page": "Страница товара",
        "Single Product": "Один товар",
        "Single Product - Electro Electronics": "Страница товара - Electro Electronics",
        "Pages": "Страницы",
        "Total:": "Итого:",
        "0 Items": "0 товаров",
        "Items": "Товары",
        "Select Currency": "Выберите валюту",
        "Select Language": "Выберите язык",
        "Save Up To 50% Off": "Скидки до 50%",
        "Get UP To 50% Off": "Получите скидку до 50%",
        "Hot Deals This Week": "Горячие предложения недели",
        "Special Offer": "Специальное предложение",
        "SAVE UP TO $200": "ЭКОНОМИЯ ДО $200",
        "SAVE UP TO A $200": "ЭКОНОМИЯ ДО $200",
        "Terms and Condition Apply": "Применяются правила и условия",
        "Shop Now": "Купить сейчас",
        "Explore Products": "Смотреть товары",
        "Starting at": "От",
        "Limited Time Deals": "Ограниченное по времени предложение",
        "FREE RETURN": "БЕСПЛАТНЫЙ ВОЗВРАТ",
        "30 days money back guarantee!": "30 дней гарантии возврата денег!",
        "Free return products in 30 days": "Бесплатный возврат товаров в течение 30 дней",
        "FREE SHIPPING": "БЕСПЛАТНАЯ ДОСТАВКА",
        "Free shipping on all order": "Бесплатная доставка всех заказов",
        "SUPPORT 24/7": "ПОДДЕРЖКА 24/7",
        "Contact us 24 hours a day": "Свяжитесь с нами 24 часа в сутки",
        "100% SECURE": "100% БЕЗОПАСНО",
        "Payment 100% Secure": "Оплата на 100% безопасна",
        "SECURE PAYMENT": "БЕЗОПАСНЫЙ ПЛАТЕЖ",
        "ONLINE SERVICE": "ОНЛАЙН СЕРВИС",
        "We support online 24 hrs a day": "Мы поддерживаем онлайн 24 часа в сутки",
        "RECEIVE GIFT CARD": "ПОЛУЧИТЕ ПОДАРОЧНУЮ КАРТУ",
        "Receive gift all over order $50": "Получите подарок при заказе от $50",
        "BEST SELLER PRODUCTS": "ХИТЫ ПРОДАЖ",
        "Best Seller Products": "Хиты продаж",
        "Bestseller Products": "Хиты продаж",
        "Liked Products": "Понравившиеся товары",
        "Customer Reviews": "Отзывы клиентов",
        "Featured Products": "Рекомендуемые товары",
        "Featured Deals": "Рекомендуемые акции",
        "Featured": "Рекомендуемые",
        "New Arrivals": "Новые поступления",
        "Our Top Brands": "Наши ведущие бренды",
        "Our Products": "Наши товары",
        "All Products": "Все товары",
        "All Product Items": "Все товары",
        "Top Selling": "Лидеры продаж",
        "Top Tier": "Премиум класс",
        "Key Technical Specifications": "Основные технические характеристики",
        "Product Description": "Описание товара",
        "Overview": "Обзор",
        "Testimonials": "Отзывы",
        "Related Products": "Похожие товары",
        "PRODUCT TAGS": "ТЕГИ ТОВАРОВ",
        "Products Categories": "Категории товаров",
        "Brands": "Бренды",
        "Deals": "Акции",
        "Extras": "Дополнительно",
        "Mega Weekend Tech Bonanza": "Мега выходные техно-скидок",
        "Photography": "Фотография",
        "Photography & Gadgets": "Фототехника и гаджеты",
        "Photography & Video": "Фото и видео",
        "SmartPhone": "Смартфон",
        "SmartPhones": "Смартфоны",
        "Smartphones & Mobiles": "Смартфоны и телефоны",
        "Smartphones & Tablets": "Смартфоны и планшеты",
        "SmartPhone & Smart TV": "Смартфоны и Смарт ТВ",
        "Electronics": "Электроника",
        "Electronics & Computer": "Электроника и компьютеры",
        "Audio": "Аудио",
        "Audio & Sound": "Аудио и звук",
        "Audio & Studio": "Аудио и студия",
        "Audio & Studio Headphones": "Студийные наушники",
        "Audio & Headphones": "Аудио и наушники",
        "Audio Equipment": "Аудиооборудование",
        "Accessories": "Аксессуары",
        "Gadget Accessories": "Аксессуары для гаджетов",
        "Gadget Accessories & Watches": "Аксессуары и часы",
        "Laptops & Desktops": "Ноутбуки и ПК",
        "Laptops, PCs & Desktops": "Ноутбуки, ПК и компьютеры",
        "Laptops & Computers": "Ноутбуки и компьютеры",
        "Computers & Laptops": "Компьютеры и ноутбуки",
        "Mobiles & Tablets": "Телефоны и планшеты",
        "Tablets & Mobiles": "Планшеты и телефоны",
        "Tablets & Computing": "Планшеты и компьютеры",
        "Cameras & Drones": "Камеры и дроны",
        "Cameras & Lenses": "Камеры и объективы",
        "Cameras & Photo": "Фотоаппараты и фото",
        "Cameras & Photography": "Камеры и фотография",
        "Smart Watches": "Смарт-часы",
        "Smart Whatch": "Смарт-часы",
        "Headphones & Audio": "Наушники и аудио",
        "Gaming & VR": "Гейминг и VR",
        "Gaming & PC": "Гейминг и ПК",
        "Wearable Tech": "Носимая электроника",
        "Wearables": "Носимые устройства",
        "Home Appliances": "Бытовая техника",
        "Smart Home & Audio": "Умный дом и аудио",
        "Drones & Robotics": "Дроны и робототехника",
        "Camera": "Камера",
        "Cameras": "Камеры",
        "Laptop": "Ноутбук",
        "Headphone": "Наушники",
        "Optics": "Оपтика",
        "Smart Camera 4K Pro": "Умная камера 4K Pro",
        "Professional Camera Lens 50mm": "Профессиональный объектив 50мм",
        "Smart Polaroid Instant Camera": "Мгновенная камера Polaroid",
        "Canon EOS 90D Cinematic DSLR Kit": "Комплект DSLR Canon EOS 90D Cinematic",
        "Canon EOS Rebel 4K DSLR": "Камера Canon EOS Rebel 4K DSLR",
        "Canon EOS Rebel 4K DSLR Camera": "Камера Canon EOS Rebel 4K DSLR",
        "Apple iPad Mini G2356 Retina": "Apple iPad Mini G2356 Retina",
        "Apple iPad Mini": "Apple iPad Mini",
        "Apple iPad Mini G2356": "Apple iPad Mini G2356",
        "Apple iPad Pro 11\" M2 Retina": "Apple iPad Pro 11\" M2 Retina",
        "Apple iPad Pro 11&quot; M2 Retina": "Apple iPad Pro 11\" M2 Retina",
        "Apple MacBook Pro 16\" M3 Max": "Apple MacBook Pro 16\" M3 Max",
        "Apple MacBook Pro 16&quot; M3 Max": "Apple MacBook Pro 16\" M3 Max",
        "Samsung Galaxy Cyan Smartphone": "Смартфон Samsung Galaxy Cyan",
        "Samsung Galaxy S24 Ultra 5G": "Samsung Galaxy S24 Ultra 5G",
        "SmartPhone Touch OLED Edition": "Смартфон Touch OLED Edition",
        "Digital Tablet with Precision Pen": "Планшет с высокоточным пером",
        "10.9-inch Retina Display Tablet": "Планшет 10.9\" Retina Display",
        "4K Ultra Quadcopter Drone Master": "Квадрокоптер 4K Ultra Master",
        "4K Ultra HD GPS Drone Quadcopter": "Квадрокоптер 4K Ultra HD GPS",
        "DJI Mavic Air 4K Aerial Drone": "Дрон DJI Mavic Air 4K",
        "DJI Mavic Air 4K Drone": "Дрон DJI Mavic Air 4K",
        "Wireless Studio Headphones HD": "Беспроводные студийные наушники HD",
        "Sony Studio ANC Headphones": "Наушники Sony Studio ANC",
        "Sony Studio Wireless ANC Headphones": "Беспроводные наушники Sony Studio ANC",
        "Sony WH-1000XM5 Studio ANC": "Sony WH-1000XM5 Studio ANC",
        "Pure Bass ANC Wireless Earbuds": "Беспроводные наушники Pure Bass ANC",
        "True Wireless Stereo Earbuds": "Беспроводные наушники True Wireless Stereo",
        "HD Webcam Clip Pro 1080P": "Веб-камера HD Clip Pro 1080P",
        "Smart Luxury Titanium Watch": "Умные часы Luxury Titanium",
        "Smart Fitness Watch Band": "Фитнес-браслет Smart Fitness Watch",
        "Nikkor 70-200mm f/2.8 VR Lens": "Объектив Nikkor 70-200mm f/2.8 VR",
        "Nikkor 70-200mm f/2.8 VR": "Nikkor 70-200mm f/2.8 VR",
        "RGB Mechanical Gaming Keyboard": "Механическая игровая клавиатура RGB",
        "Pro Optical Gaming Mouse": "Оптическая игровая мышь Pro",
        "Waterproof Bluetooth Speaker": "Влагозащищенная колонка Bluetooth",
        "Smart Home AI Voice Speaker": "Умная колонка с голосовым ИИ",
        "Wireless Noise-Cancelling Headphones": "Беспроводные шумоподавляющие наушники",
        "Wireless Pro Bluetooth Controller": "Беспроводной контроллер Bluetooth Pro",
        "20000mAh Fast Charging Power Bank": "Внешний аккумулятор 20000mAh Fast Charging",
        "Add To Cart": "В корзину",
        "Add to Cart": "В корзину",
        "Add": "Добавить",
        "Add to Cart 🛒": "В корзину 🛒",
        "Buy Now": "Купить сейчас",
        "Direct Order": "Быстрый заказ",
        "Order Now ⚡": "Заказать сейчас ⚡",
        "View Product": "Посмотреть товар",
        "View Specifications": "Характеристики",
        "Add to Wishlist": "В список желаний",
        "Remove from Wishlist": "Удалить из желаний",
        "Wishlist": "Список желаний",
        "Show All Products": "Показать все товары",
        "Clear Search": "Очистить поиск",
        "No Products Found": "Товары не найдены",
        "In Stock": "В наличии",
        "Available:": "В наличии:",
        "Sale": "Скидка",
        "New": "Новинка",
        "Hot": "Хит",
        "Top Rated": "Лучшие оценки",
        "Free Delivery": "Бесплатная доставка",
        "Quick View": "Быстрый просмотр",
        "Compare": "Сравнить",
        "Compare Products": "Сравнить товары",
        "Remove": "Удалить",
        "Clear All": "Очистить все",
        "View More": "Смотреть больше",
        "View Large ↗": "Увеличить ↗",
        "Back to Top": "Наверх",
        "Sort by:": "Сортировка:",
        "Price: Low to High": "Цена: по возрастанию",
        "Price: High to Low": "Цена: по убыванию",
        "Discount: High to Low": "Скидка: по убыванию",
        "Select By Color": "Выбрать по цвету",
        "White": "Белый",
        "Green": "Зеленый",
        "Gold": "Золотой",
        "+ Browse Products": "+ Просмотр товаров",
        "Explore Offers & Products": "Изучите акции и товары",
        "Search Offer Products...": "Поиск акционных товаров...",
        "Search Results": "Результаты поиска",
        "Showing products matching your search": "Отображаются товары, соответствующие вашему поиску",
        "✕ Clear & Show All": "✕ Очистить и показать все",
        "products found": "товаров найдено",
        "matching": "по запросу",
        "in": "в",
        "Category:": "Категория:",
        "Search:": "Поиск:",
        "Cart Page": "Страница корзины",
        "Shopping Cart": "Корзина покупок",
        "Shopping Cart & Checkout": "Корзина и оформление",
        "Shopping Cart & Checkout - Electro": "Корзина и оформление - Electro",
        "Cart & Checkout": "Корзина и оплата",
        "Product": "Товар",
        "Price": "Цена",
        "Unit Price": "Цена за единицу",
        "Quantity": "Количество",
        "Subtotal": "Подитог",
        "Subtotal:": "Подитог:",
        "Action": "Действие",
        "Order Summary": "Сводка заказа",
        "Shipping": "Доставка",
        "Free": "Бесплатно",
        "Tax": "Налог",
        "Tax (0%):": "Налог (0%):",
        "Total Amount": "Общая сумма",
        "Total Amount:": "Общая сумма:",
        "Estimated Shipping:": "Расчетная доставка:",
        "Proceed to Checkout": "Перейти к оформлению",
        "Checkout": "Оформление заказа",
        "Continue Shopping": "Продолжить покупки",
        "Your cart is currently empty.": "Ваша корзина пуста.",
        "Your shopping cart is currently empty.": "Ваша корзина покупок пуста.",
        "Have a coupon code?": "Есть промокод?",
        "Enter coupon": "Введите купон",
        "Apply": "Применить",
        "Go to Cart Page ↗": "В корзину ↗",
        "Payment Method": "Способ оплаты",
        "Cash on Delivery (COD)": "Оплата при получении (COD)",
        "Credit / Debit Card": "Кредитная / дебетовая карта",
        "UPI / Net Banking": "UPI / Онлайн-банкинг",
        "Recipient Name *": "Имя получателя *",
        "Delivery Address *": "Адрес доставки *",
        "Shipping Address *": "Адрес доставки *",
        "Full Shipping Address": "Полный адрес доставки",
        "Shipping & Delivery Details": "Детали доставки",
        "My Profile": "Мой профиль",
        "My Profile & Dashboard - Electro": "Мой профиль и панель - Electro",
        "User Profile": "Профиль пользователя",
        "User Profile & Orders": "Профиль и заказы",
        "Customer Dashboard": "Панель клиента",
        "Account Overview": "Обзор аккаунта",
        "Order List": "Список заказов",
        "Order History": "История заказов",
        "Edit Profile": "Редактировать профиль",
        "Returns & Feedback": "Возвраты и отзывы",
        "Returns": "Возвраты",
        "Sign Out": "Выйти",
        "Total Purchased": "Всего куплено",
        "Orders Placed": "Оформлено заказов",
        "Items in Cart": "Товаров в корзине",
        "Favorite Category": "Любимая категория",
        "Recent Orders": "Недавние заказы",
        "Order ID": "Номер заказа",
        "Date": "Дата",
        "Status": "Статус",
        "Total": "Итого",
        "Full Name": "Полное имя",
        "Full Name *": "Полное имя *",
        "Email Address": "Электронная почта",
        "Email Address *": "Электронная почта *",
        "Phone Number": "Номер телефона",
        "Phone Number *": "Номер телефона *",
        "Address": "Адрес",
        "Save Changes": "Сохранить изменения",
        "Save Profile Changes": "Сохранить изменения профиля",
        "Profile Photo (Avatar Image URL)": "Фото профиля (URL аватара)",
        "Your Favorite Category *": "Ваша любимая категория *",
        "Member Since:": "Участник с:",
        "Purchased Status": "Статус покупки",
        "No Liked Products Yet": "Нет избранных товаров",
        "Click the heart icon on any product to save your favorite items here.": "Нажмите на значок сердечка, чтобы сохранить товары сюда.",
        "Feedback or Return Item Request": "Отзыв или запрос на возврат товара",
        "How was your overall shopping experience?": "Каковы ваши впечатления от покупок в целом?",
        "Submit Feedback": "Отправить отзыв",
        "Login / Sign Up": "Вход / Регистрация",
        "Account Sign In & Register - Electro": "Вход и регистрация - Electro",
        "Sign In to Electro": "Вход в Electro",
        "Sign In & Register": "Вход и регистрация",
        "Create My Account": "Создать мой аккаунт",
        "Create Account": "Создать аккаунт",
        "Username *": "Имя пользователя *",
        "Password *": "Пароль *",
        "Password": "Пароль",
        "Confirm Password": "Подтвердите пароль",
        "Remember Me": "Запомнить меня",
        "Forgot Password?": "Забыли пароль?",
        "Sign In": "Войти",
        "Sign Up": "Зарегистрироваться",
        "SignUp": "Регистрация",
        "Sign In here": "Войдите здесь",
        "Sign Up now": "Зарегистрируйтесь сейчас",
        "Don't have an account yet?": "Еще нет аккаунта?",
        "Already registered?": "Уже зарегистрированы?",
        "Seller Login": "Вход для продавцов",
        "Account Portal": "Портал аккаунта",
        "We Value Your Security": "Мы ценим вашу безопасность",
        "Get In Touch": "Свяжитесь с нами",
        "Let's Connect": "Давайте свяжемся",
        "Send Us A Message": "Напишите нам сообщение",
        "Send Your Message": "Отправьте ваше сообщение",
        "Mail Us": "Напишите нам на почту",
        "Telephone": "Телефон",
        "Subject": "Тема",
        "Message": "Сообщение",
        "Send Message": "Отправить сообщение",
        "Your Name *": "Ваше имя *",
        "Your Email *": "Ваш Email *",
        "Your Phone": "Ваш телефон",
        "Your Project": "Ваш проект",
        "Description": "Описание",
        "Specifications": "Характеристики",
        "Reviews": "Отзывы",
        "Image Sensor": "Матрица",
        "Image Processor": "Процессор обработки",
        "ISO Sensitivity": "Чувствительность ISO",
        "Autofocus System": "Система автофокуса",
        "Video Recording": "Запись видео",
        "Continuous Shooting": "Серийная съемка",
        "Viewfinder": "Видоискатель",
        "Display Screen": "Экран дисплея",
        "Wireless Connectivity": "Беспроводная связь",
        "Battery Life": "Время работы",
        "Dimensions & Weight": "Размеры и вес",
        "Warranty": "Гарантия",
        "What is in the Box:": "Комплектация:",
        "Product SKU:": "Артикуल SKU:",
        "Category": "Категория",
        "Leave a Reply": "Оставить отзыव",
        "Your Review *": "Ваш отзыв *",
        "Submit Review": "Отправить отзыв",
        "Share": "Поделиться",
        "Discover massive discounts of up to 60% on premium audio gear, smartwatches, instant cameras, and computer accessories. All products include original manufacturer warranties.": "Откройте для себя скидки до 60% на аудиотехнику, смарт-часы, мгновенные камеры и аксессуары для ПК. Все товары с официальной гарантией.",
        "All products you have liked or saved to your wishlist across Electro are stored here. Add them straight to your cart or order them instantly.": "Все товары, добавленные в избранное на сайте Electro, сохраняются здесь. Добавьте их в корзину или оформите мгновенный заказ.",
        "Here you can see items added to your cart, whether they are already ordered or waiting in cart, and immediately order now.": "Здесь вы можете просмотреть товары в корзине, оформлены они или ожидают, и сразу же оформить заказ.",
        "Tell us about your experience shopping on Electro or request an easy 30-day money-back return.": "Расскажите нам о вашем опыте покупок на Electro или оформите простой возврат средств в течение 30 дней.",
        "The contact form is currently active. Get in touch with our expert 24/7 customer support team for inquiries, order status, or wholesale requests.": "Форма обратной связи активна. Свяжитесь с нашей круглосуточной службой поддержки 24/7 по любым вопросам.",
        "We are here for you! how can we help, We are here for you!": "Мы здесь для вас! Чем мы можем вам помочь?",
        "Get an extra 15% discount on all orders over $150. Use promo voucher at checkout.": "Получите дополнительную скидку 15% на все заказы свыше $150. Используйте промокод при оплате.",
        "High-resolution professional DSLR camera featuring a 24.1 Megapixel CMOS sensor, 4K UHD video recording, DIGIC 8 image processor, Dual Pixel CMOS AF, and seamless built-in Wi-Fi and Bluetooth connectivity.": "Профессиональная цифровая зеркальная камера с датчиком CMOS 24.1 Мп, записью видео 4K UHD, процессором DIGIC 8 и поддержкой Wi-Fi и Bluetooth.",
        ". Engineered for passionate photographers and creative videographers, this flagship camera combines a cutting-edge 24.1 Megapixel CMOS APS-C sensor with the lightning-fast DIGIC 8 image processor to render breathtakingly sharp photos and cinematic 4K UHD 24p videos.": "Созданная для увлеченных фотографов и видеографов, эта флагманская камера сочетает матрицу 24.1 Мп APS-C с быстрым процессором DIGIC 8 для съемки резких фото и 4K видео.",
        "Experience world-class imaging capability with the": "Оцените непревзойденное качество изображения с",
        "Your email address will not be published. Required fields are marked *": "Ваш адрес электронной почты не будет опубликован. Обязательные поля помечены *",
        "Phone Number, Email, or Username": "Номер телефона, email или имя пользователя",
        "e.g. saksham@example.com or +91 9876543210": "напр. saksham@example.com или +91 9876543210",
        "About Us": "О нас",
        "Customer Care": "Обслуживание клиентов",
        "Customer Service": "Служба поддержки",
        "Quick Links": "Быстрые ссылки",
        "Information": "Информация",
        "Privacy Policy": "Политика конфиденциальности",
        "Terms of Service": "Условия обслуживания",
        "Terms & Conditions": "Правила и условия",
        "Return Policy": "Политика возврата",
        "Shipping Policy": "Политика доставки",
        "Delivery Information": "Информация о доставке",
        "Track Order": "Отследить заказ",
        "Track Your Order": "Отследите ваш заказ",
        "FAQ": "Частые вопросы",
        "Newsletter": "Рассылка",
        "Subscribe to our newsletter for exclusive discounts and updates.": "Подпишитесь на нашу рассылку для эксклюзивных скидок.",
        "Enter your email address": "Введите ваш адрес электронной почты",
        "Subscribe": "Подписаться",
        "All right reserved.": "Все права защищены.",
        "All Rights Reserved.": "Все права защищены.",
        "Site Map": "Карта сайта",
        "Affiliates": "Партнеры",
        "Gift Vouchers": "Подарочные сертификаты",
        "Unsubscribe Notification": "Уведомление об отписке",
        "Enter your email": "Введите ваш email",
        "Enter your password": "Введите ваш пароль",
        "Create a strong password": "Создайте надежный пароль",
        "Full street address, city, zip code": "Полный адрес, город, индекс",
        "Mention item returned or share what you loved about our service...": "Укажите возвращаемый товар или поделитесь впечатлениями...",
        "Write your experience with this product...": "Напишите ваши впечатления об этом товаре...",
        "keywords": "ключевые слова",
        "SPECIAL DISCOUNT 45%": "СПЕЦИАЛЬНАЯ СКИДКА 45%",
        "FLASH SALE UP TO ": "ФЛЭШ-РАСПРОДАЖА ДО ",
        "NEW ARRIVAL 2026": "НОВИНКА 2026 ГОДА",
        "On Selected<br>Laptops &<br>Desktop Or<br>Smartphone": "На выбранные<br>ноутбуки и<br>ПК или<br>смартфоны",
        "Next-Gen 4K<br>Smart OLED<br>Monitors &<br>Displays": "Новое поколение 4K<br>Smart OLED<br>мониторов и<br>дисплеев",
        "High-End Pro<br>Workstations &<br>Studio Gear<br>Hardware": "Профессиональные<br>рабочие станции и<br>студийное<br>оборудование",
        "Ultra Cinematic<br>4K Quadcopter<br>Drones &<br>Cameras": "Ультракинематографичные<br>4K квадрокоптеры<br>дроны и<br>камеры"
    },
    "ja": {
        "Help": "ヘルプ",
        "Support": "サポート",
        "Contact": "お問い合わせ",
        "Contact Us": "お問い合わせ",
        "Contact Us - Electro Electronics": "お問い合わせ - Electro Electronics",
        "Call Us:(+012) 1234 567890": "お電話:(+012) 1234 567890",
        "My Dashboard": "ダッシュボード",
        "My Account": "マイアカウント",
        "Search Looking For?": "何をお探しですか？",
        "All Category": "すべてのカテゴリー",
        "All Categories": "すべてのカテゴリー",
        "Home": "ホーム",
        "Shop": "ショップ",
        "Offers": "セール",
        "All Offers": "すべてのセール",
        "Offers Page": "セールページ",
        "Single Page": "商品ページ",
        "Single Product": "単一商品",
        "Single Product - Electro Electronics": "商品詳細 - Electro Electronics",
        "Pages": "ページ",
        "Total:": "合計:",
        "0 Items": "0点",
        "Items": "アイテム",
        "Select Currency": "通貨を選択",
        "Select Language": "言語を選択",
        "Save Up To 50% Off": "最大50％オフ",
        "Get UP To 50% Off": "最大50％オフをゲット",
        "Hot Deals This Week": "今週のホットセール",
        "Special Offer": "特別オファー",
        "SAVE UP TO $200": "最大$200割引",
        "SAVE UP TO A $200": "最大$200割引",
        "Terms and Condition Apply": "利用規約が適用されます",
        "Shop Now": "今すぐ購入",
        "Explore Products": "商品を見る",
        "Starting at": "価格：",
        "Limited Time Deals": "期間限定セール",
        "FREE RETURN": "無料返品",
        "30 days money back guarantee!": "30日間の返金保証！",
        "Free return products in 30 days": "30日以内なら返品無料",
        "FREE SHIPPING": "送料無料",
        "Free shipping on all order": "全品送料無料",
        "SUPPORT 24/7": "24時間年中無休サポート",
        "Contact us 24 hours a day": "24時間いつでもお問い合わせ可能",
        "100% SECURE": "100%安全",
        "Payment 100% Secure": "100%安全な支払い",
        "SECURE PAYMENT": "安全な決済",
        "ONLINE SERVICE": "オンラインサービス",
        "We support online 24 hrs a day": "24時間オンラインでサポートします",
        "RECEIVE GIFT CARD": "ギフトカードを受け取る",
        "Receive gift all over order $50": "$50以上のご注文でギフトをプレゼント",
        "BEST SELLER PRODUCTS": "ベストセラー商品",
        "Best Seller Products": "ベストセラー商品",
        "Bestseller Products": "ベストセラー商品",
        "Liked Products": "お気に入り商品",
        "Customer Reviews": "カスタマーレビュー",
        "Featured Products": "注目商品",
        "Featured Deals": "注目のセール",
        "Featured": "おすすめ",
        "New Arrivals": "新着商品",
        "Our Top Brands": "トップブランド",
        "Our Products": "取り扱い商品",
        "All Products": "すべての商品",
        "All Product Items": "全商品リスト",
        "Top Selling": "売れ筋商品",
        "Top Tier": "最高峰モデル",
        "Key Technical Specifications": "主な仕様",
        "Product Description": "商品説明",
        "Overview": "概要",
        "Testimonials": "お客様の声",
        "Related Products": "関連商品",
        "PRODUCT TAGS": "商品タグ",
        "Products Categories": "商品カテゴリー",
        "Brands": "ブランド",
        "Deals": "お得な情報",
        "Extras": "その他",
        "Mega Weekend Tech Bonanza": "メガ週末テックボナンザ",
        "Photography": "写真・カメラ",
        "Photography & Gadgets": "写真・ガジェット",
        "Photography & Video": "写真・ビデオ",
        "SmartPhone": "スマートフォン",
        "SmartPhones": "スマートフォン",
        "Smartphones & Mobiles": "スマートフォン・携帯電話",
        "Smartphones & Tablets": "スマートフォン＆タブレット",
        "SmartPhone & Smart TV": "スマートフォン＆スマートTV",
        "Electronics": "電化製品",
        "Electronics & Computer": "電化製品・コンピューター",
        "Audio": "オーディオ",
        "Audio & Sound": "音響・サウンド",
        "Audio & Studio": "オーディオ・スタジオ",
        "Audio & Studio Headphones": "オーディオ＆スタジオヘッドフォン",
        "Audio & Headphones": "オーディオ＆ヘッドフォン",
        "Audio Equipment": "音響機器",
        "Accessories": "アクセサリー",
        "Gadget Accessories": "ガジェットアクセサリー",
        "Gadget Accessories & Watches": "アクセサリー・腕時計",
        "Laptops & Desktops": "ノートPC・デスクトップ",
        "Laptops, PCs & Desktops": "ノートPC、デスクトップ",
        "Laptops & Computers": "ノートPC＆コンピューター",
        "Computers & Laptops": "コンピューター・ノートPC",
        "Mobiles & Tablets": "モバイル・タブレット",
        "Tablets & Mobiles": "タブレット・携帯電話",
        "Tablets & Computing": "タブレット・コンピューティング",
        "Cameras & Drones": "カメラ・ドローン",
        "Cameras & Lenses": "カメラ・レンズ",
        "Cameras & Photo": "カメラ・写真",
        "Cameras & Photography": "カメラ・写真撮影",
        "Smart Watches": "スマートウォッチ",
        "Smart Whatch": "スマートウォッチ",
        "Headphones & Audio": "ヘッドフォン・音響",
        "Gaming & VR": "ゲーム・VR",
        "Gaming & PC": "ゲーミング・PC",
        "Wearable Tech": "ウェアラブル端末",
        "Wearables": "ウェアラブル",
        "Home Appliances": "家電製品",
        "Smart Home & Audio": "スマートホーム・オーディオ",
        "Drones & Robotics": "ドローン・ロボティクス",
        "Camera": "カメラ",
        "Cameras": "カメラ",
        "Laptop": "ノートPC",
        "Headphone": "ヘッドフォン",
        "Optics": "光学機器",
        "Smart Camera 4K Pro": "スマートカメラ 4K Pro",
        "Professional Camera Lens 50mm": "プロ仕様カメラレンズ 50mm",
        "Smart Polaroid Instant Camera": "スマートポラロイドインスタントカメラ",
        "Canon EOS 90D Cinematic DSLR Kit": "Canon EOS 90D シネマティックDSLRキット",
        "Canon EOS Rebel 4K DSLR": "Canon EOS Rebel 4K DSLR",
        "Canon EOS Rebel 4K DSLR Camera": "Canon EOS Rebel 4K DSLR カメラ",
        "Apple iPad Mini G2356 Retina": "Apple iPad Mini G2356 Retina",
        "Apple iPad Mini": "Apple iPad Mini",
        "Apple iPad Mini G2356": "Apple iPad Mini G2356",
        "Apple iPad Pro 11\" M2 Retina": "Apple iPad Pro 11\" M2 Retina",
        "Apple iPad Pro 11&quot; M2 Retina": "Apple iPad Pro 11\" M2 Retina",
        "Apple MacBook Pro 16\" M3 Max": "Apple MacBook Pro 16\" M3 Max",
        "Apple MacBook Pro 16&quot; M3 Max": "Apple MacBook Pro 16\" M3 Max",
        "Samsung Galaxy Cyan Smartphone": "Samsung Galaxy Cyan スマートフォン",
        "Samsung Galaxy S24 Ultra 5G": "Samsung Galaxy S24 Ultra 5G",
        "SmartPhone Touch OLED Edition": "スマートフォン Touch OLED Edition",
        "Digital Tablet with Precision Pen": "高精度ペン付きデジタルタブレット",
        "10.9-inch Retina Display Tablet": "10.9インチ Retinaディスプレイ タブレット",
        "4K Ultra Quadcopter Drone Master": "4K Ultra クアッドコプター ドローン マスター",
        "4K Ultra HD GPS Drone Quadcopter": "4K Ultra HD GPS ドローン クアッドコプター",
        "DJI Mavic Air 4K Aerial Drone": "DJI Mavic Air 4K 空撮ドローン",
        "DJI Mavic Air 4K Drone": "DJI Mavic Air 4K ドローン",
        "Wireless Studio Headphones HD": "ワイヤレススタジオヘッドフォン HD",
        "Sony Studio ANC Headphones": "Sony Studio ANC ヘッドフォン",
        "Sony Studio Wireless ANC Headphones": "Sony Studio ワイヤレスANCヘッドフォン",
        "Sony WH-1000XM5 Studio ANC": "Sony WH-1000XM5 Studio ANC",
        "Pure Bass ANC Wireless Earbuds": "Pure Bass ANC ワイヤレスイヤホン",
        "True Wireless Stereo Earbuds": "完全ワイヤレスステレオイヤホン",
        "HD Webcam Clip Pro 1080P": "HD ウェブカメラ Clip Pro 1080P",
        "Smart Luxury Titanium Watch": "スマート ラグジュアリー チタン ウォッチ",
        "Smart Fitness Watch Band": "スマートフィットネスウォッチバンド",
        "Nikkor 70-200mm f/2.8 VR Lens": "Nikkor 70-200mm f/2.8 VR レンズ",
        "Nikkor 70-200mm f/2.8 VR": "Nikkor 70-200mm f/2.8 VR",
        "RGB Mechanical Gaming Keyboard": "RGB メカニカルゲーミングキーボード",
        "Pro Optical Gaming Mouse": "Pro 光学式ゲーミングマウス",
        "Waterproof Bluetooth Speaker": "防水Bluetoothスピーカー",
        "Smart Home AI Voice Speaker": "スマートホーム AI音声スピーカー",
        "Wireless Noise-Cancelling Headphones": "ワイヤレスノイズキャンセリングヘッドフォン",
        "Wireless Pro Bluetooth Controller": "ワイヤレス Pro Bluetooth コントローラー",
        "20000mAh Fast Charging Power Bank": "20000mAh 急速充電モバイルバッテリー",
        "Add To Cart": "カートに追加",
        "Add to Cart": "カートに追加",
        "Add": "追加",
        "Add to Cart 🛒": "カートに追加 🛒",
        "Buy Now": "今すぐ購入",
        "Direct Order": "直接注文",
        "Order Now ⚡": "今すぐ注文 ⚡",
        "View Product": "商品を見る",
        "View Specifications": "仕様を見る",
        "Add to Wishlist": "お気に入りに追加",
        "Remove from Wishlist": "お気に入りから削除",
        "Wishlist": "お気に入り",
        "Show All Products": "すべての商品を表示",
        "Clear Search": "検索をクリア",
        "No Products Found": "商品が見つかりません",
        "In Stock": "在庫あり",
        "Available:": "在庫数：",
        "Sale": "セール",
        "New": "新着",
        "Hot": "人気",
        "Top Rated": "高評価",
        "Free Delivery": "無料配送",
        "Quick View": "クイックビュー",
        "Compare": "比較する",
        "Compare Products": "商品を比較",
        "Remove": "削除",
        "Clear All": "すべてクリア",
        "View More": "もっと見る",
        "View Large ↗": "拡大表示 ↗",
        "Back to Top": "トップへ戻る",
        "Sort by:": "並び替え：",
        "Price: Low to High": "価格：安い順",
        "Price: High to Low": "価格：高い順",
        "Discount: High to Low": "割引率：高い順",
        "Select By Color": "カラーで選ぶ",
        "White": "ホワイト",
        "Green": "グリーン",
        "Gold": "ゴールド",
        "+ Browse Products": "+ 商品を探す",
        "Explore Offers & Products": "セールと商品を探索",
        "Search Offer Products...": "セール商品を検索...",
        "Search Results": "検索結果",
        "Showing products matching your search": "検索に一致する商品を表示中",
        "✕ Clear & Show All": "✕ クリアしてすべて表示",
        "products found": "件の商品が見つかりました",
        "matching": "一致する",
        "in": "内",
        "Category:": "カテゴリー:",
        "Search:": "検索:",
        "Cart Page": "カートページ",
        "Shopping Cart": "ショッピングカート",
        "Shopping Cart & Checkout": "ショッピングカート＆チェックアウト",
        "Shopping Cart & Checkout - Electro": "ショッピングカート＆チェックアウト - Electro",
        "Cart & Checkout": "カート＆チェックアウト",
        "Product": "商品",
        "Price": "価格",
        "Unit Price": "単価",
        "Quantity": "数量",
        "Subtotal": "小計",
        "Subtotal:": "小計:",
        "Action": "操作",
        "Order Summary": "注文概要",
        "Shipping": "配送料",
        "Free": "無料",
        "Tax": "税金",
        "Tax (0%):": "消費税 (0%):",
        "Total Amount": "合計金額",
        "Total Amount:": "合計金額:",
        "Estimated Shipping:": "推定配送料：",
        "Proceed to Checkout": "購入手続きに進む",
        "Checkout": "レジへ進む",
        "Continue Shopping": "買い物を続ける",
        "Your cart is currently empty.": "カートは空です。",
        "Your shopping cart is currently empty.": "ショッピングカートは現在空です。",
        "Have a coupon code?": "クーポンコードをお持ちですか？",
        "Enter coupon": "クーポンを入力",
        "Apply": "適用",
        "Go to Cart Page ↗": "カートページへ ↗",
        "Payment Method": "支払い方法",
        "Cash on Delivery (COD)": "代金引換 (COD)",
        "Credit / Debit Card": "クレジットカード / デビットカード",
        "UPI / Net Banking": "UPI / ネットバンキング",
        "Recipient Name *": "受取人氏名 *",
        "Delivery Address *": "配送先住所 *",
        "Shipping Address *": "配送先住所 *",
        "Full Shipping Address": "詳細配送先住所",
        "Shipping & Delivery Details": "配送および配達の詳細",
        "My Profile": "マイプロフィール",
        "My Profile & Dashboard - Electro": "マイプロフィール＆ダッシュボード - Electro",
        "User Profile": "ユーザープロフィール",
        "User Profile & Orders": "プロフィール＆注文履歴",
        "Customer Dashboard": "お客様ダッシュボード",
        "Account Overview": "アカウント概要",
        "Order List": "注文履歴",
        "Order History": "注文履歴",
        "Edit Profile": "プロフィール編集",
        "Returns & Feedback": "返品・フィードバック",
        "Returns": "返品",
        "Sign Out": "ログアウト",
        "Total Purchased": "累計購入額",
        "Orders Placed": "注文回数",
        "Items in Cart": "カート内のアイテム",
        "Favorite Category": "お気に入りカテゴリー",
        "Recent Orders": "最近の注文",
        "Order ID": "注文番号",
        "Date": "注文日",
        "Status": "状態",
        "Total": "合計",
        "Full Name": "氏名",
        "Full Name *": "氏名 *",
        "Email Address": "メールアドレス",
        "Email Address *": "メールアドレス *",
        "Phone Number": "電話番号",
        "Phone Number *": "電話番号 *",
        "Address": "住所",
        "Save Changes": "変更を保存",
        "Save Profile Changes": "プロフィール変更を保存",
        "Profile Photo (Avatar Image URL)": "プロフィール写真 (URL)",
        "Your Favorite Category *": "お気に入りのカテゴリー *",
        "Member Since:": "登録日：",
        "Purchased Status": "購入ステータス",
        "No Liked Products Yet": "お気に入りはまだありません",
        "Click the heart icon on any product to save your favorite items here.": "ハートアイコンをクリックしてお気に入りに保存してください。",
        "Feedback or Return Item Request": "フィードバックまたは返品リクエスト",
        "How was your overall shopping experience?": "お買い物体験はいかがでしたか？",
        "Submit Feedback": "フィードバックを送信",
        "Login / Sign Up": "ログイン / 新規登録",
        "Account Sign In & Register - Electro": "サインイン＆新規登録 - Electro",
        "Sign In to Electro": "Electroにサインイン",
        "Sign In & Register": "サインイン＆登録",
        "Create My Account": "アカウントを作成",
        "Create Account": "アカウント作成",
        "Username *": "ユーザー名 *",
        "Password *": "パスワード *",
        "Password": "パスワード",
        "Confirm Password": "パスワード確認",
        "Remember Me": "ログイン状態を保持",
        "Forgot Password?": "パスワードをお忘れですか？",
        "Sign In": "サインイン",
        "Sign Up": "登録する",
        "SignUp": "新規登録",
        "Sign In here": "こちらからサインイン",
        "Sign Up now": "今すぐ新規登録",
        "Don't have an account yet?": "まだアカウントをお持ちでないですか？",
        "Already registered?": "すでにご登録済みですか？",
        "Seller Login": "販売者ログイン",
        "Account Portal": "アカウントポータル",
        "We Value Your Security": "お客様のセキュリティを最優先します",
        "Get In Touch": "お問い合わせ",
        "Let's Connect": "つながりましょう",
        "Send Us A Message": "メッセージを送信",
        "Send Your Message": "メッセージを送信",
        "Mail Us": "メールを送る",
        "Telephone": "電話",
        "Subject": "件名",
        "Message": "メッセージ",
        "Send Message": "メッセージを送信",
        "Your Name *": "お名前 *",
        "Your Email *": "メールアドレス *",
        "Your Phone": "お電話番号",
        "Your Project": "ご相談内容",
        "Description": "説明",
        "Specifications": "仕様",
        "Reviews": "レビュー",
        "Image Sensor": "イメージセンサー",
        "Image Processor": "画像処理エンジン",
        "ISO Sensitivity": "ISO感度",
        "Autofocus System": "オートフォーカス方式",
        "Video Recording": "動画撮影",
        "Continuous Shooting": "連写性能",
        "Viewfinder": "ファインダー",
        "Display Screen": "ディスプレイ画面",
        "Wireless Connectivity": "ワイヤレス接続",
        "Battery Life": "バッテリー持続時間",
        "Dimensions & Weight": "サイズ・重量",
        "Warranty": "保証",
        "What is in the Box:": "同梱物：",
        "Product SKU:": "商品SKU：",
        "Category": "カテゴリー",
        "Leave a Reply": "レビューを投稿",
        "Your Review *": "レビュー内容 *",
        "Submit Review": "レビューを送信",
        "Share": "共有",
        "Discover massive discounts of up to 60% on premium audio gear, smartwatches, instant cameras, and computer accessories. All products include original manufacturer warranties.": "高級オーディオ機器、スマートウォッチ、インスタントカメラ、PC周辺機器が最大60%OFF。全商品にメーカー保証付き。",
        "All products you have liked or saved to your wishlist across Electro are stored here. Add them straight to your cart or order them instantly.": "Electroでお気に入りやウィッシュリストに保存したすべての商品がここに表示されます。カートに追加してすぐにご注文いただけます。",
        "Here you can see items added to your cart, whether they are already ordered or waiting in cart, and immediately order now.": "ここでは、カートに追加された商品や注文済みの商品を確認し、すぐに注文を行うことができます。",
        "Tell us about your experience shopping on Electro or request an easy 30-day money-back return.": "Electroでのお買い物体験をお聞かせいただくか、30日間の安心返金返品をお申込みください。",
        "The contact form is currently active. Get in touch with our expert 24/7 customer support team for inquiries, order status, or wholesale requests.": "お問い合わせフォームは現在ご利用可能です。ご質問やご注文状況、卸売りのお問い合わせは24時間年中無休のサポートチームへご連絡ください。",
        "We are here for you! how can we help, We are here for you!": "いつでもお手伝いいたします！どのようなご用件でしょうか？",
        "Get an extra 15% discount on all orders over $150. Use promo voucher at checkout.": "$150以上のご注文でさらに15％割引。お会計時にプロモーションコードをご利用ください。",
        "High-resolution professional DSLR camera featuring a 24.1 Megapixel CMOS sensor, 4K UHD video recording, DIGIC 8 image processor, Dual Pixel CMOS AF, and seamless built-in Wi-Fi and Bluetooth connectivity.": "2410万画素CMOSセンサー、4K UHD動画撮影、DIGIC 8画像処理エンジン、Wi-Fi/Bluetooth接続を備えた高解像度プロフェッショナルDSLRカメラ。",
        ". Engineered for passionate photographers and creative videographers, this flagship camera combines a cutting-edge 24.1 Megapixel CMOS APS-C sensor with the lightning-fast DIGIC 8 image processor to render breathtakingly sharp photos and cinematic 4K UHD 24p videos.": "情熱的な写真家や映像クリエイターのために設計されたこのフラッグシップカメラは、2410万画素APS-Cセンサーと高速DIGIC 8エンジンを搭載。",
        "Experience world-class imaging capability with the": "世界最高峰の描写力を体験してください：",
        "Your email address will not be published. Required fields are marked *": "メールアドレスは公開されません。必須項目には * が付いています",
        "Phone Number, Email, or Username": "電話番号、メールアドレス、またはユーザー名",
        "e.g. saksham@example.com or +91 9876543210": "例: saksham@example.com または +91 9876543210",
        "About Us": "会社概要",
        "Customer Care": "カスタマーサポート",
        "Customer Service": "カスタマーサービス",
        "Quick Links": "クイックリンク",
        "Information": "インフォメーション",
        "Privacy Policy": "プライバシーポリシー",
        "Terms of Service": "利用規約",
        "Terms & Conditions": "利用規約",
        "Return Policy": "返品ポリシー",
        "Shipping Policy": "配送ポリシー",
        "Delivery Information": "配送情報",
        "Track Order": "注文を追跡",
        "Track Your Order": "ご注文を追跡",
        "FAQ": "よくある質問",
        "Newsletter": "ニュースレター",
        "Subscribe to our newsletter for exclusive discounts and updates.": "特別割引や最新情報を受け取るために購読してください。",
        "Enter your email address": "メールアドレスを入力",
        "Subscribe": "購読する",
        "All right reserved.": "全著作権所有。",
        "All Rights Reserved.": "全著作権所有。",
        "Site Map": "サイトマップ",
        "Affiliates": "アフィリエイト",
        "Gift Vouchers": "ギフト券",
        "Unsubscribe Notification": "配信停止通知",
        "Enter your email": "メールアドレスを入力",
        "Enter your password": "パスワードを入力",
        "Create a strong password": "強力なパスワードを作成",
        "Full street address, city, zip code": "詳細な住所、都市、郵便番号",
        "Mention item returned or share what you loved about our service...": "返品する商品やサービスの感想をご記入ください...",
        "Write your experience with this product...": "この商品の感想をお書きください...",
        "keywords": "キーワード",
        "SPECIAL DISCOUNT 45%": "特別割引 45%",
        "FLASH SALE UP TO ": "フラッシュセール 最大",
        "NEW ARRIVAL 2026": "2026年最新モデル",
        "On Selected<br>Laptops &<br>Desktop Or<br>Smartphone": "厳選された<br>ノートPC＆<br>デスクトップ・<br>スマホ対象",
        "Next-Gen 4K<br>Smart OLED<br>Monitors &<br>Displays": "次世代4K<br>スマートOLED<br>モニター＆<br>ディスプレイ",
        "High-End Pro<br>Workstations &<br>Studio Gear<br>Hardware": "ハイエンドPro<br>ワークステーション＆<br>スタジオ音響<br>機器",
        "Ultra Cinematic<br>4K Quadcopter<br>Drones &<br>Cameras": "ウルトラシネマティック<br>4K クアッドコプター<br>ドローン＆<br>カメラ"
    },
    "es": {
        "Help": "Ayuda",
        "Support": "Soporte",
        "Contact": "Contacto",
        "Contact Us": "Contáctenos",
        "Contact Us - Electro Electronics": "Contáctenos - Electro Electronics",
        "Call Us:(+012) 1234 567890": "Llámanos:(+012) 1234 567890",
        "My Dashboard": "Mi Panel",
        "My Account": "Mi Cuenta",
        "Search Looking For?": "¿Qué estás buscando?",
        "All Category": "Todas las Categorías",
        "All Categories": "Todas las Categorías",
        "Home": "Inicio",
        "Shop": "Tienda",
        "Offers": "Ofertas",
        "All Offers": "Todas las Ofertas",
        "Offers Page": "Página de Ofertas",
        "Single Page": "Página de Producto",
        "Single Product": "Producto Individual",
        "Single Product - Electro Electronics": "Detalles del Producto - Electro Electronics",
        "Pages": "Páginas",
        "Total:": "Total:",
        "0 Items": "0 artículos",
        "Items": "Artículos",
        "Select Currency": "Seleccionar Moneda",
        "Select Language": "Seleccionar Idioma",
        "Save Up To 50% Off": "Ahorra Hasta 50% Dto",
        "Get UP To 50% Off": "Obtén Hasta 50% Dto",
        "Hot Deals This Week": "Grandes Ofertas de la Semana",
        "Special Offer": "Oferta Especial",
        "SAVE UP TO $200": "AHORRA HASTA $200",
        "SAVE UP TO A $200": "AHORRA HASTA $200",
        "Terms and Condition Apply": "Aplican Términos y Condiciones",
        "Shop Now": "Comprar Ahora",
        "Explore Products": "Explorar Productos",
        "Starting at": "Desde",
        "Limited Time Deals": "Ofertas por Tiempo Limitado",
        "FREE RETURN": "DEVOLUCIÓN GRATUITA",
        "30 days money back guarantee!": "¡Garantía de devolución de 30 días!",
        "Free return products in 30 days": "Devolución gratuita en 30 días",
        "FREE SHIPPING": "ENVÍO GRATIS",
        "Free shipping on all order": "Envío gratis en todos los pedidos",
        "SUPPORT 24/7": "SOPORTE 24/7",
        "Contact us 24 hours a day": "Contáctanos las 24 horas del día",
        "100% SECURE": "100% SEGURO",
        "Payment 100% Secure": "Pago 100% Seguro",
        "SECURE PAYMENT": "PAGO SEGURO",
        "ONLINE SERVICE": "SERVICIO EN LÍNEA",
        "We support online 24 hrs a day": "Brindamos soporte en línea las 24 horas del día",
        "RECEIVE GIFT CARD": "RECIBE TARJETA DE REGALO",
        "Receive gift all over order $50": "Recibe regalo en pedidos superiores a $50",
        "BEST SELLER PRODUCTS": "PRODUCTOS MÁS VENDIDOS",
        "Best Seller Products": "Productos Más Vendidos",
        "Bestseller Products": "Productos Más Vendidos",
        "Liked Products": "Productos Favoritos",
        "Customer Reviews": "Reseñas de Clientes",
        "Featured Products": "Productos Destacados",
        "Featured Deals": "Ofertas Destacadas",
        "Featured": "Destacado",
        "New Arrivals": "Novedades",
        "Our Top Brands": "Nuestras Mejores Marcas",
        "Our Products": "Nuestros Productos",
        "All Products": "Todos los Productos",
        "All Product Items": "Todos los Artículos de Productos",
        "Top Selling": "Más Vendidos",
        "Top Tier": "Nivel Superior",
        "Key Technical Specifications": "Especificaciones Técnicas Clave",
        "Product Description": "Descripción del Producto",
        "Overview": "Descripción General",
        "Testimonials": "Testimonios",
        "Related Products": "Productos Relacionados",
        "PRODUCT TAGS": "ETIQUETAS DE PRODUCTO",
        "Products Categories": "Categorías de Productos",
        "Brands": "Marcas",
        "Deals": "Ofertas",
        "Extras": "Extras",
        "Mega Weekend Tech Bonanza": "Mega Bonanza Tecnológica de Fin de Semana",
        "Photography": "Fotografía",
        "Photography & Gadgets": "Fotografía y Gadgets",
        "Photography & Video": "Fotografía y Video",
        "SmartPhone": "Teléfono Inteligente",
        "SmartPhones": "Teléfonos Inteligentes",
        "Smartphones & Mobiles": "Teléfonos Inteligentes y Móviles",
        "Smartphones & Tablets": "Teléfonos Inteligentes y Tabletas",
        "SmartPhone & Smart TV": "Teléfonos Inteligentes y Smart TV",
        "Electronics": "Electrónica",
        "Electronics & Computer": "Electrónica y Computación",
        "Audio": "Audio",
        "Audio & Sound": "Audio y Sonido",
        "Audio & Studio": "Audio y Estudio",
        "Audio & Studio Headphones": "Auriculares de Audio y Estudio",
        "Audio & Headphones": "Audio y Auriculares",
        "Audio Equipment": "Equipos de Audio",
        "Accessories": "Accesorios",
        "Gadget Accessories": "Accesorios para Gadgets",
        "Gadget Accessories & Watches": "Accesorios y Relojes",
        "Laptops & Desktops": "Portátiles y Computadoras",
        "Laptops, PCs & Desktops": "Portátiles, PCs y Escritorio",
        "Laptops & Computers": "Portátiles y Computadoras",
        "Computers & Laptops": "Computadoras y Portátiles",
        "Mobiles & Tablets": "Móviles y Tabletas",
        "Tablets & Mobiles": "Tabletas y Móviles",
        "Tablets & Computing": "Tabletas y Computación",
        "Cameras & Drones": "Cámaras y Drones",
        "Cameras & Lenses": "Cámaras y Lentes",
        "Cameras & Photo": "Cámaras y Fotografía",
        "Cameras & Photography": "Cámaras y Fotografía",
        "Smart Watches": "Relojes Inteligentes",
        "Smart Whatch": "Reloj Inteligente",
        "Headphones & Audio": "Auriculares y Audio",
        "Gaming & VR": "Juegos y Realidad Virtual",
        "Gaming & PC": "Juegos y PC",
        "Wearable Tech": "Tecnología Portátil",
        "Wearables": "Dispositivos Portátiles",
        "Home Appliances": "Electrodomésticos",
        "Smart Home & Audio": "Hogar Inteligente y Audio",
        "Drones & Robotics": "Drones y Robótica",
        "Camera": "Cámara",
        "Cameras": "Cámaras",
        "Laptop": "Portátil",
        "Headphone": "Auriculares",
        "Optics": "Óptica",
        "Smart Camera 4K Pro": "Cámara Inteligente 4K Pro",
        "Professional Camera Lens 50mm": "Lente Profesional para Cámara 50mm",
        "Smart Polaroid Instant Camera": "Cámara Instantánea Inteligente Polaroid",
        "Canon EOS 90D Cinematic DSLR Kit": "Kit DSLR Cinemático Canon EOS 90D",
        "Canon EOS Rebel 4K DSLR": "Cámara DSLR Canon EOS Rebel 4K",
        "Canon EOS Rebel 4K DSLR Camera": "Cámara DSLR Canon EOS Rebel 4K",
        "Apple iPad Mini G2356 Retina": "Apple iPad Mini G2356 Retina",
        "Apple iPad Mini": "Apple iPad Mini",
        "Apple iPad Mini G2356": "Apple iPad Mini G2356",
        "Apple iPad Pro 11\" M2 Retina": "Apple iPad Pro 11\" M2 Retina",
        "Apple iPad Pro 11&quot; M2 Retina": "Apple iPad Pro 11\" M2 Retina",
        "Apple MacBook Pro 16\" M3 Max": "Apple MacBook Pro 16\" M3 Max",
        "Apple MacBook Pro 16&quot; M3 Max": "Apple MacBook Pro 16\" M3 Max",
        "Samsung Galaxy Cyan Smartphone": "Teléfono Samsung Galaxy Cyan",
        "Samsung Galaxy S24 Ultra 5G": "Samsung Galaxy S24 Ultra 5G",
        "SmartPhone Touch OLED Edition": "Teléfono Inteligente Touch OLED Edition",
        "Digital Tablet with Precision Pen": "Tableta Digital con Lápiz de Precisión",
        "10.9-inch Retina Display Tablet": "Tableta con Pantalla Retina de 10.9 pulgadas",
        "4K Ultra Quadcopter Drone Master": "Dron Cuadricóptero 4K Ultra Master",
        "4K Ultra HD GPS Drone Quadcopter": "Dron Cuadricóptero 4K Ultra HD con GPS",
        "DJI Mavic Air 4K Aerial Drone": "Dron Aéreo DJI Mavic Air 4K",
        "DJI Mavic Air 4K Drone": "Dron DJI Mavic Air 4K",
        "Wireless Studio Headphones HD": "Auriculares Inalámbricos de Estudio HD",
        "Sony Studio ANC Headphones": "Auriculares Sony Studio ANC",
        "Sony Studio Wireless ANC Headphones": "Auriculares Inalámbricos Sony Studio ANC",
        "Sony WH-1000XM5 Studio ANC": "Sony WH-1000XM5 Studio ANC",
        "Pure Bass ANC Wireless Earbuds": "Auriculares Inalámbricos Pure Bass ANC",
        "True Wireless Stereo Earbuds": "Auriculares Estéreo Totalmente Inalámbricos",
        "HD Webcam Clip Pro 1080P": "Cámara Web HD Clip Pro 1080P",
        "Smart Luxury Titanium Watch": "Reloj Inteligente de Titanio de Lujo",
        "Smart Fitness Watch Band": "Pulsera Inteligente de Actividad",
        "Nikkor 70-200mm f/2.8 VR Lens": "Lente Nikkor 70-200mm f/2.8 VR",
        "Nikkor 70-200mm f/2.8 VR": "Nikkor 70-200mm f/2.8 VR",
        "RGB Mechanical Gaming Keyboard": "Teclado Mecánico para Juegos RGB",
        "Pro Optical Gaming Mouse": "Ratón Óptico Profesional para Juegos",
        "Waterproof Bluetooth Speaker": "Altavoz Bluetooth Impermeable",
        "Smart Home AI Voice Speaker": "Altavoz Inteligente con IA por Voz",
        "Wireless Noise-Cancelling Headphones": "Auriculares Inalámbricos con Cancelación de Ruido",
        "Wireless Pro Bluetooth Controller": "Controlador Inalámbrico Pro Bluetooth",
        "20000mAh Fast Charging Power Bank": "Batería Portátil de Carga Rápida 20000mAh",
        "Add To Cart": "Añadir al Carrito",
        "Add to Cart": "Añadir al Carrito",
        "Add": "Añadir",
        "Add to Cart 🛒": "Añadir al Carrito 🛒",
        "Buy Now": "Comprar Ahora",
        "Direct Order": "Pedido Directo",
        "Order Now ⚡": "Pedir Ahora ⚡",
        "View Product": "Ver Producto",
        "View Specifications": "Ver Especificaciones",
        "Add to Wishlist": "Añadir a Deseos",
        "Remove from Wishlist": "Quitar de Deseos",
        "Wishlist": "Lista de Deseos",
        "Show All Products": "Mostrar Todos los Productos",
        "Clear Search": "Limpiar Búsqueda",
        "No Products Found": "No se encontraron productos",
        "In Stock": "En Stock",
        "Available:": "Disponible:",
        "Sale": "Oferta",
        "New": "Nuevo",
        "Hot": "Popular",
        "Top Rated": "Mejor Valorado",
        "Free Delivery": "Entrega Gratuita",
        "Quick View": "Vista Rápida",
        "Compare": "Comparar",
        "Compare Products": "Comparar Productos",
        "Remove": "Eliminar",
        "Clear All": "Borrar Todo",
        "View More": "Ver Más",
        "View Large ↗": "Ver Grande ↗",
        "Back to Top": "Volver Arriba",
        "Sort by:": "Ordenar por:",
        "Price: Low to High": "Precio: de menor a mayor",
        "Price: High to Low": "Precio: de mayor a menor",
        "Discount: High to Low": "Descuento: de mayor a menor",
        "Select By Color": "Seleccionar por Color",
        "White": "Blanco",
        "Green": "Verde",
        "Gold": "Dorado",
        "+ Browse Products": "+ Explorar Productos",
        "Explore Offers & Products": "Explorar Ofertas y Productos",
        "Search Offer Products...": "Buscar productos en oferta...",
        "Search Results": "Resultados de Búsqueda",
        "Showing products matching your search": "Mostrando productos que coinciden con su búsqueda",
        "✕ Clear & Show All": "✕ Limpiar y Mostrar Todo",
        "products found": "productos encontrados",
        "matching": "coincidentes con",
        "in": "en",
        "Category:": "Categoría:",
        "Search:": "Búsqueda:",
        "Cart Page": "Página del Carrito",
        "Shopping Cart": "Carrito de Compras",
        "Shopping Cart & Checkout": "Carrito de Compras y Pago",
        "Shopping Cart & Checkout - Electro": "Carrito de Compras y Pago - Electro",
        "Cart & Checkout": "Carrito y Pago",
        "Product": "Producto",
        "Price": "Precio",
        "Unit Price": "Precio Unitario",
        "Quantity": "Cantidad",
        "Subtotal": "Subtotal",
        "Subtotal:": "Subtotal:",
        "Action": "Acción",
        "Order Summary": "Resumen del Pedido",
        "Shipping": "Envío",
        "Free": "Gratis",
        "Tax": "Impuestos",
        "Tax (0%):": "Impuestos (0%):",
        "Total Amount": "Monto Total",
        "Total Amount:": "Monto Total:",
        "Estimated Shipping:": "Envío Estimado:",
        "Proceed to Checkout": "Proceder al Pago",
        "Checkout": "Pagar",
        "Continue Shopping": "Continuar Comprando",
        "Your cart is currently empty.": "Tu carrito está actualmente vacío.",
        "Your shopping cart is currently empty.": "Tu carrito de compras está actualmente vacío.",
        "Have a coupon code?": "¿Tienes un cupón?",
        "Enter coupon": "Ingresa cupón",
        "Apply": "Aplicar",
        "Go to Cart Page ↗": "Ir al Carrito ↗",
        "Payment Method": "Método de Pago",
        "Cash on Delivery (COD)": "Pago Contra Entrega (COD)",
        "Credit / Debit Card": "Tarjeta de Crédito / Débito",
        "UPI / Net Banking": "UPI / Banca por Internet",
        "Recipient Name *": "Nombre del Destinatario *",
        "Delivery Address *": "Dirección de Entrega *",
        "Shipping Address *": "Dirección de Envío *",
        "Full Shipping Address": "Dirección Completa de Envío",
        "Shipping & Delivery Details": "Detalles de Envío y Entrega",
        "My Profile": "Mi Perfil",
        "My Profile & Dashboard - Electro": "Mi Perfil y Panel - Electro",
        "User Profile": "Perfil de Usuario",
        "User Profile & Orders": "Perfil de Usuario y Pedidos",
        "Customer Dashboard": "Panel de Cliente",
        "Account Overview": "Resumen de la Cuenta",
        "Order List": "Lista de Pedidos",
        "Order History": "Historial de Pedidos",
        "Edit Profile": "Editar Perfil",
        "Returns & Feedback": "Devoluciones y Comentarios",
        "Returns": "Devoluciones",
        "Sign Out": "Cerrar Sesión",
        "Total Purchased": "Total Comprado",
        "Orders Placed": "Pedidos Realizados",
        "Items in Cart": "Artículos en Carrito",
        "Favorite Category": "Categoría Favorita",
        "Recent Orders": "Pedidos Recientes",
        "Order ID": "ID de Pedido",
        "Date": "Fecha",
        "Status": "Estado",
        "Total": "Total",
        "Full Name": "Nombre Completo",
        "Full Name *": "Nombre Completo *",
        "Email Address": "Correo Electrónico",
        "Email Address *": "Correo Electrónico *",
        "Phone Number": "Número de Teléfono",
        "Phone Number *": "Número de Teléfono *",
        "Address": "Dirección",
        "Save Changes": "Guardar Cambios",
        "Save Profile Changes": "Guardar Cambios del Perfil",
        "Profile Photo (Avatar Image URL)": "Foto de Perfil (URL de Avatar)",
        "Your Favorite Category *": "Tu Categoría Favorita *",
        "Member Since:": "Miembro Desde:",
        "Purchased Status": "Estado de Compra",
        "No Liked Products Yet": "Aún no hay productos favoritos",
        "Click the heart icon on any product to save your favorite items here.": "Haz clic en el icono de corazón para guardar tus artículos favoritos aquí.",
        "Feedback or Return Item Request": "Comentarios o Solicitud de Devolución",
        "How was your overall shopping experience?": "¿Cómo fue tu experiencia general de compra?",
        "Submit Feedback": "Enviar Comentarios",
        "Login / Sign Up": "Iniciar Sesión / Registrarse",
        "Account Sign In & Register - Electro": "Iniciar Sesión y Registrarse - Electro",
        "Sign In to Electro": "Iniciar Sesión en Electro",
        "Sign In & Register": "Iniciar Sesión y Registro",
        "Create My Account": "Crear Mi Cuenta",
        "Create Account": "Crear Cuenta",
        "Username *": "Nombre de Usuario *",
        "Password *": "Contraseña *",
        "Password": "Contraseña",
        "Confirm Password": "Confirmar Contraseña",
        "Remember Me": "Recordarme",
        "Forgot Password?": "¿Olvidaste tu contraseña?",
        "Sign In": "Iniciar Sesión",
        "Sign Up": "Registrarse",
        "SignUp": "Registrarse",
        "Sign In here": "Inicia sesión aquí",
        "Sign Up now": "Regístrate ahora",
        "Don't have an account yet?": "¿Aún no tienes una cuenta?",
        "Already registered?": "¿Ya estás registrado?",
        "Seller Login": "Acceso Vendedores",
        "Account Portal": "Portal de Cuenta",
        "We Value Your Security": "Valoramos tu Seguridad",
        "Get In Touch": "Ponerse en Contacto",
        "Let's Connect": "Conectemos",
        "Send Us A Message": "Envíanos un Mensaje",
        "Send Your Message": "Envía Tu Mensaje",
        "Mail Us": "Escríbenos",
        "Telephone": "Teléfono",
        "Subject": "Asunto",
        "Message": "Mensaje",
        "Send Message": "Enviar Mensaje",
        "Your Name *": "Tu Nombre *",
        "Your Email *": "Tu Correo *",
        "Your Phone": "Tu Teléfono",
        "Your Project": "Tu Proyecto",
        "Description": "Descripción",
        "Specifications": "Especificaciones",
        "Reviews": "Opiniones",
        "Image Sensor": "Sensor de Imagen",
        "Image Processor": "Procesador de Imagen",
        "ISO Sensitivity": "Sensibilidad ISO",
        "Autofocus System": "Sistema de Enfoque",
        "Video Recording": "Grabación de Video",
        "Continuous Shooting": "Disparo Continuo",
        "Viewfinder": "Visor",
        "Display Screen": "Pantalla",
        "Wireless Connectivity": "Conectividad Inalámbrica",
        "Battery Life": "Duración de Batería",
        "Dimensions & Weight": "Dimensiones y Peso",
        "Warranty": "Garantía",
        "What is in the Box:": "Contenido de la Caja:",
        "Product SKU:": "SKU del Producto:",
        "Category": "Categoría",
        "Leave a Reply": "Dejar una Opinión",
        "Your Review *": "Tu Opinión *",
        "Submit Review": "Enviar Opinión",
        "Share": "Compartir",
        "Discover massive discounts of up to 60% on premium audio gear, smartwatches, instant cameras, and computer accessories. All products include original manufacturer warranties.": "Descubre grandes descuentos de hasta un 60% en equipos de audio premium, relojes inteligentes, cámaras instantáneas y accesorios de computadora.",
        "All products you have liked or saved to your wishlist across Electro are stored here. Add them straight to your cart or order them instantly.": "Todos los productos que te han gustado o guardado en tu lista de deseos en Electro están almacenados aquí. Agrégalos al carrito u ordénalos al instante.",
        "Here you can see items added to your cart, whether they are already ordered or waiting in cart, and immediately order now.": "Aquí puedes ver los artículos añadidos a tu carrito, ya sea que ya estén pedidos o en espera, y pedirlos de inmediato.",
        "Tell us about your experience shopping on Electro or request an easy 30-day money-back return.": "Cuéntanos sobre tu experiencia de compra en Electro o solicita una devolución fácil con garantía de 30 días.",
        "The contact form is currently active. Get in touch with our expert 24/7 customer support team for inquiries, order status, or wholesale requests.": "El formulario de contacto está actualmente activo. Ponte en contacto con nuestro equipo de soporte 24/7 para cualquier consulta.",
        "We are here for you! how can we help, We are here for you!": "¡Estamos aquí para ayudarte! ¿En qué podemos colaborar?",
        "Get an extra 15% discount on all orders over $150. Use promo voucher at checkout.": "Obtén un 15% de descuento adicional en todos los pedidos superiores a $150. Usa el cupón en el pago.",
        "High-resolution professional DSLR camera featuring a 24.1 Megapixel CMOS sensor, 4K UHD video recording, DIGIC 8 image processor, Dual Pixel CMOS AF, and seamless built-in Wi-Fi and Bluetooth connectivity.": "Cámara réflex digital profesional de alta resolución con sensor CMOS de 24.1 megapíxeles, grabación de vídeo 4K UHD, procesador DIGIC 8 y Wi-Fi.",
        ". Engineered for passionate photographers and creative videographers, this flagship camera combines a cutting-edge 24.1 Megapixel CMOS APS-C sensor with the lightning-fast DIGIC 8 image processor to render breathtakingly sharp photos and cinematic 4K UHD 24p videos.": "Diseñada para fotógrafos apasionados y creadores de vídeo, esta cámara combina un sensor APS-C de 24.1 MP con el procesador DIGIC 8 para capturar imágenes nítidas y vídeo 4K.",
        "Experience world-class imaging capability with the": "Experimenta una capacidad de imagen de clase mundial con el",
        "Your email address will not be published. Required fields are marked *": "Tu dirección de correo electrónico no será publicada. Los campos obligatorios están marcados con *",
        "Phone Number, Email, or Username": "Número de Teléfono, Correo o Usuario",
        "e.g. saksham@example.com or +91 9876543210": "ej. saksham@example.com o +91 9876543210",
        "About Us": "Sobre Nosotros",
        "Customer Care": "Atención al Cliente",
        "Customer Service": "Servicio al Cliente",
        "Quick Links": "Enlaces Rápidos",
        "Information": "Información",
        "Privacy Policy": "Política de Privacidad",
        "Terms of Service": "Términos del Servicio",
        "Terms & Conditions": "Términos y Condiciones",
        "Return Policy": "Política de Devolución",
        "Shipping Policy": "Política de Envío",
        "Delivery Information": "Información de Entrega",
        "Track Order": "Rastrear Pedido",
        "Track Your Order": "Rastrea Tu Pedido",
        "FAQ": "Preguntas Frecuentes",
        "Newsletter": "Boletín de Noticias",
        "Subscribe to our newsletter for exclusive discounts and updates.": "Suscríbete a nuestro boletín para descuentos exclusivos.",
        "Enter your email address": "Introduce tu correo electrónico",
        "Subscribe": "Suscribirse",
        "All right reserved.": "Todos los derechos reservados.",
        "All Rights Reserved.": "Todos los derechos reservados.",
        "Site Map": "Mapa del Sitio",
        "Affiliates": "Afiliados",
        "Gift Vouchers": "Vales de Regalo",
        "Unsubscribe Notification": "Notificación de Cancelación",
        "Enter your email": "Introduce tu correo",
        "Enter your password": "Introduce tu contraseña",
        "Create a strong password": "Crea una contraseña segura",
        "Full street address, city, zip code": "Dirección completa, ciudad, código postal",
        "Mention item returned or share what you loved about our service...": "Menciona el artículo devuelto o comparte tu opinión...",
        "Write your experience with this product...": "Escribe tu experiencia con este producto...",
        "keywords": "palabras clave",
        "SPECIAL DISCOUNT 45%": "DESCUENTO ESPECIAL 45%",
        "FLASH SALE UP TO ": "VENTA FLASH HASTA ",
        "NEW ARRIVAL 2026": "NUEVA LLEGADA 2026",
        "On Selected<br>Laptops &<br>Desktop Or<br>Smartphone": "En seleccionados<br>Portátiles y<br>Escritorio o<br>Teléfonos",
        "Next-Gen 4K<br>Smart OLED<br>Monitors &<br>Displays": "Monitores y<br>Pantallas OLED<br>Inteligentes 4K<br>de Nueva Generación",
        "High-End Pro<br>Workstations &<br>Studio Gear<br>Hardware": "Estaciones Pro<br>y Equipos de<br>Estudio de Alta<br>Gama",
        "Ultra Cinematic<br>4K Quadcopter<br>Drones &<br>Cameras": "Drones Cuadricópteros<br>y Cámaras 4K<br>Ultra Cinemáticas"
    },
    "de": {
        "Help": "Hilfe",
        "Support": "Kundendienst",
        "Contact": "Kontakt",
        "Contact Us": "Kontaktieren Sie uns",
        "Contact Us - Electro Electronics": "Kontaktieren Sie uns - Electro Electronics",
        "Call Us:(+012) 1234 567890": "Rufen Sie an:(+012) 1234 567890",
        "My Dashboard": "Mein Konto",
        "My Account": "Mein Konto",
        "Search Looking For?": "Wonach suchen Sie?",
        "All Category": "Alle Kategorien",
        "All Categories": "Alle Kategorien",
        "Home": "Startseite",
        "Shop": "Shop",
        "Offers": "Angebote",
        "All Offers": "Alle Angebote",
        "Offers Page": "Angebotsseite",
        "Single Page": "Produktseite",
        "Single Product": "Einzelprodukt",
        "Single Product - Electro Electronics": "Produktdetails - Electro Electronics",
        "Pages": "Seiten",
        "Total:": "Gesamt:",
        "0 Items": "0 Artikel",
        "Items": "Artikel",
        "Select Currency": "Währung wählen",
        "Select Language": "Sprache wählen",
        "Save Up To 50% Off": "Sparen Sie bis zu 50%",
        "Get UP To 50% Off": "Bis zu 50% Rabatt",
        "Hot Deals This Week": "Top-Angebote dieser Woche",
        "Special Offer": "Sonderangebot",
        "SAVE UP TO $200": "SPAREN SIE BIS ZU 200$",
        "SAVE UP TO A $200": "SPAREN SIE BIS ZU 200$",
        "Terms and Condition Apply": "Es gelten AGB",
        "Shop Now": "Jetzt Kaufen",
        "Explore Products": "Produkte entdecken",
        "Starting at": "Ab",
        "Limited Time Deals": "Zeitlich begrenzte Angebote",
        "FREE RETURN": "KOSTENLOSE RÜCKGABE",
        "30 days money back guarantee!": "30 Tage Geld-zurück-Garantie!",
        "Free return products in 30 days": "Kostenlose Rückgabe innerhalb von 30 Tagen",
        "FREE SHIPPING": "KOSTENLOSER VERSAND",
        "Free shipping on all order": "Kostenloser Versand für alle Bestellungen",
        "SUPPORT 24/7": "24/7 KUNDENDIENST",
        "Contact us 24 hours a day": "24 Stunden am Tag erreichbar",
        "100% SECURE": "100% SICHER",
        "Payment 100% Secure": "Zahlung 100% sicher",
        "SECURE PAYMENT": "SICHERE ZAHLUNG",
        "ONLINE SERVICE": "ONLINE-SERVICE",
        "We support online 24 hrs a day": "Wir unterstützen Sie 24 Stunden am Tag online",
        "RECEIVE GIFT CARD": "GESCHENKKARTE ERHALTEN",
        "Receive gift all over order $50": "Geschenk erhalten bei Bestellungen über 50$",
        "BEST SELLER PRODUCTS": "BESTSELLER PRODUKTE",
        "Best Seller Products": "Bestseller Produkte",
        "Bestseller Products": "Bestseller Produkte",
        "Liked Products": "Lieblingsprodukte",
        "Customer Reviews": "Kundenbewertungen",
        "Featured Products": "Vorgestellte Produkte",
        "Featured Deals": "Vorgestellte Angebote",
        "Featured": "Empfohlen",
        "New Arrivals": "Neuheiten",
        "Our Top Brands": "Unsere Top-Marken",
        "Our Products": "Unsere Produkte",
        "All Products": "Alle Produkte",
        "All Product Items": "Alle Produktartikel",
        "Top Selling": "Meistverkauft",
        "Top Tier": "Spitzenklasse",
        "Key Technical Specifications": "Wichtige technische Daten",
        "Product Description": "Produktbeschreibung",
        "Overview": "Übersicht",
        "Testimonials": "Erfahrungsberichte",
        "Related Products": "Ähnliche Produkte",
        "PRODUCT TAGS": "PRODUKT-TAGS",
        "Products Categories": "Produktkategorien",
        "Brands": "Marken",
        "Deals": "Angebote",
        "Extras": "Extras",
        "Mega Weekend Tech Bonanza": "Mega-Wochenende Tech-Aktion",
        "Photography": "Fotografie",
        "Photography & Gadgets": "Fotografie & Gadgets",
        "Photography & Video": "Fotografie & Video",
        "SmartPhone": "Smartphone",
        "SmartPhones": "Smartphones",
        "Smartphones & Mobiles": "Smartphones & Mobiltelefone",
        "Smartphones & Tablets": "Smartphones & Tablets",
        "SmartPhone & Smart TV": "Smartphones & Smart-TV",
        "Electronics": "Elektronik",
        "Electronics & Computer": "Elektronik & Computer",
        "Audio": "Audio",
        "Audio & Sound": "Audio & Ton",
        "Audio & Studio": "Audio & Studio",
        "Audio & Studio Headphones": "Audio- & Studio-Kopfhörer",
        "Audio & Headphones": "Audio & Kopfhörer",
        "Audio Equipment": "Audiogeräte",
        "Accessories": "Zubehör",
        "Gadget Accessories": "Gadget-Zubehör",
        "Gadget Accessories & Watches": "Zubehör & Uhren",
        "Laptops & Desktops": "Laptops & PCs",
        "Laptops, PCs & Desktops": "Laptops, PCs & Desktop",
        "Laptops & Computers": "Laptops & Computer",
        "Computers & Laptops": "Computer & Laptops",
        "Mobiles & Tablets": "Smartphones & Tablets",
        "Tablets & Mobiles": "Tablets & Handys",
        "Tablets & Computing": "Tablets & Computer",
        "Cameras & Drones": "Kameras & Drohnen",
        "Cameras & Lenses": "Kameras & Objektive",
        "Cameras & Photo": "Kameras & Foto",
        "Cameras & Photography": "Kameras & Fotografie",
        "Smart Watches": "Smartwatches",
        "Smart Whatch": "Smartwatch",
        "Headphones & Audio": "Kopfhörer & Audio",
        "Gaming & VR": "Gaming & VR",
        "Gaming & PC": "Gaming & PC",
        "Wearable Tech": "Wearables",
        "Wearables": "Wearables",
        "Home Appliances": "Haushaltsgeräte",
        "Smart Home & Audio": "Smart Home & Audio",
        "Drones & Robotics": "Drohnen & Robotik",
        "Camera": "Kamera",
        "Cameras": "Kameras",
        "Laptop": "Laptop",
        "Headphone": "Kopfhörer",
        "Optics": "Optik",
        "Smart Camera 4K Pro": "Smart-Kamera 4K Pro",
        "Professional Camera Lens 50mm": "Professionelles Kameraobjektiv 50mm",
        "Smart Polaroid Instant Camera": "Smart Polaroid Sofortbildkamera",
        "Canon EOS 90D Cinematic DSLR Kit": "Canon EOS 90D Kinematik-DSLR-Kit",
        "Canon EOS Rebel 4K DSLR": "Canon EOS Rebel 4K DSLR",
        "Canon EOS Rebel 4K DSLR Camera": "Canon EOS Rebel 4K DSLR Kamera",
        "Apple iPad Mini G2356 Retina": "Apple iPad Mini G2356 Retina",
        "Apple iPad Mini": "Apple iPad Mini",
        "Apple iPad Mini G2356": "Apple iPad Mini G2356",
        "Apple iPad Pro 11\" M2 Retina": "Apple iPad Pro 11\" M2 Retina",
        "Apple iPad Pro 11&quot; M2 Retina": "Apple iPad Pro 11\" M2 Retina",
        "Apple MacBook Pro 16\" M3 Max": "Apple MacBook Pro 16\" M3 Max",
        "Apple MacBook Pro 16&quot; M3 Max": "Apple MacBook Pro 16\" M3 Max",
        "Samsung Galaxy Cyan Smartphone": "Samsung Galaxy Cyan Smartphone",
        "Samsung Galaxy S24 Ultra 5G": "Samsung Galaxy S24 Ultra 5G",
        "SmartPhone Touch OLED Edition": "Smartphone Touch OLED Edition",
        "Digital Tablet with Precision Pen": "Digitales Tablet mit Präzisionsstift",
        "10.9-inch Retina Display Tablet": "10,9-Zoll Retina Display Tablet",
        "4K Ultra Quadcopter Drone Master": "4K Ultra Quadrocopter Drohne Master",
        "4K Ultra HD GPS Drone Quadcopter": "4K Ultra HD GPS Drohne Quadrocopter",
        "DJI Mavic Air 4K Aerial Drone": "DJI Mavic Air 4K Kameradrohne",
        "DJI Mavic Air 4K Drone": "DJI Mavic Air 4K Drohne",
        "Wireless Studio Headphones HD": "Kabellose Studio-Kopfhörer HD",
        "Sony Studio ANC Headphones": "Sony Studio ANC Kopfhörer",
        "Sony Studio Wireless ANC Headphones": "Kabellose Sony Studio ANC Kopfhörer",
        "Sony WH-1000XM5 Studio ANC": "Sony WH-1000XM5 Studio ANC",
        "Pure Bass ANC Wireless Earbuds": "Pure Bass ANC Kabellose Ohrhörer",
        "True Wireless Stereo Earbuds": "True Wireless Stereo In-Ear-Kopfhörer",
        "HD Webcam Clip Pro 1080P": "HD Webcam Clip Pro 1080P",
        "Smart Luxury Titanium Watch": "Smart Luxury Titan-Uhr",
        "Smart Fitness Watch Band": "Smart-Fitness-Armbanduhr",
        "Nikkor 70-200mm f/2.8 VR Lens": "Nikkor 70-200mm f/2.8 VR Objektiv",
        "Nikkor 70-200mm f/2.8 VR": "Nikkor 70-200mm f/2.8 VR",
        "RGB Mechanical Gaming Keyboard": "Mechanische RGB-Gaming-Tastatur",
        "Pro Optical Gaming Mouse": "Optische Pro-Gaming-Maus",
        "Waterproof Bluetooth Speaker": "Wasserdichter Bluetooth-Lautsprecher",
        "Smart Home AI Voice Speaker": "Smart Home KI-Sprachlautsprecher",
        "Wireless Noise-Cancelling Headphones": "Kabellose Kopfhörer mit Geräuschunterdrückung",
        "Wireless Pro Bluetooth Controller": "Kabelloser Pro-Bluetooth-Controller",
        "20000mAh Fast Charging Power Bank": "20000mAh Schnelllade-Powerbank",
        "Add To Cart": "In den Warenkorb",
        "Add to Cart": "In den Warenkorb",
        "Add": "Hinzufügen",
        "Add to Cart 🛒": "In den Warenkorb 🛒",
        "Buy Now": "Jetzt Kaufen",
        "Direct Order": "Direktbestellung",
        "Order Now ⚡": "Jetzt bestellen ⚡",
        "View Product": "Produkt ansehen",
        "View Specifications": "Spezifikationen anzeigen",
        "Add to Wishlist": "Auf die Wunschliste",
        "Remove from Wishlist": "Von Wunschliste entfernen",
        "Wishlist": "Wunschliste",
        "Show All Products": "Alle Produkte anzeigen",
        "Clear Search": "Suche löschen",
        "No Products Found": "Keine Produkte gefunden",
        "In Stock": "Auf Lager",
        "Available:": "Verfügbar:",
        "Sale": "Angebot",
        "New": "Neu",
        "Hot": "Heiß",
        "Top Rated": "Bestbewertet",
        "Free Delivery": "Kostenlose Lieferung",
        "Quick View": "Schnellansicht",
        "Compare": "Vergleichen",
        "Compare Products": "Produkte vergleichen",
        "Remove": "Entfernen",
        "Clear All": "Alles löschen",
        "View More": "Mehr anzeigen",
        "View Large ↗": "Großansicht ↗",
        "Back to Top": "Zurück nach oben",
        "Sort by:": "Sortieren nach:",
        "Price: Low to High": "Preis: aufsteigend",
        "Price: High to Low": "Preis: absteigend",
        "Discount: High to Low": "Rabatt: absteigend",
        "Select By Color": "Nach Farbe wählen",
        "White": "Weiß",
        "Green": "Grün",
        "Gold": "Gold",
        "+ Browse Products": "+ Produkte durchsuchen",
        "Explore Offers & Products": "Angebote & Produkte entdecken",
        "Search Offer Products...": "Angebote durchsuchen...",
        "Search Results": "Suchergebnisse",
        "Showing products matching your search": "Produkte werden angezeigt, die Ihrer Suche entsprechen",
        "✕ Clear & Show All": "✕ Löschen & Alle anzeigen",
        "products found": "Produkte gefunden",
        "matching": "passend zu",
        "in": "in",
        "Category:": "Kategorie:",
        "Search:": "Suche:",
        "Cart Page": "Warenkorbseite",
        "Shopping Cart": "Warenkorb",
        "Shopping Cart & Checkout": "Warenkorb & Kasse",
        "Shopping Cart & Checkout - Electro": "Warenkorb & Kasse - Electro",
        "Cart & Checkout": "Warenkorb & Kasse",
        "Product": "Produkt",
        "Price": "Preis",
        "Unit Price": "Einzelpreis",
        "Quantity": "Menge",
        "Subtotal": "Zwischensumme",
        "Subtotal:": "Zwischensumme:",
        "Action": "Aktion",
        "Order Summary": "Bestellübersicht",
        "Shipping": "Versand",
        "Free": "Kostenlos",
        "Tax": "Steuer",
        "Tax (0%):": "Steuer (0%):",
        "Total Amount": "Gesamtbetrag",
        "Total Amount:": "Gesamtbetrag:",
        "Estimated Shipping:": "Geschätzter Versand:",
        "Proceed to Checkout": "Zur Kasse gehen",
        "Checkout": "Kasse",
        "Continue Shopping": "Weiter einkaufen",
        "Your cart is currently empty.": "Ihr Warenkorb ist derzeit leer.",
        "Your shopping cart is currently empty.": "Ihr Warenkorb ist derzeit leer.",
        "Have a coupon code?": "Gutscheincode vorhanden?",
        "Enter coupon": "Gutschein eingeben",
        "Apply": "Anwenden",
        "Go to Cart Page ↗": "Zum Warenkorb ↗",
        "Payment Method": "Zahlungsmethode",
        "Cash on Delivery (COD)": "Nachnahme (COD)",
        "Credit / Debit Card": "Kredit- / Debitkarte",
        "UPI / Net Banking": "UPI / Online-Banking",
        "Recipient Name *": "Name des Empfängers *",
        "Delivery Address *": "Lieferadresse *",
        "Shipping Address *": "Versandadresse *",
        "Full Shipping Address": "Vollständige Lieferadresse",
        "Shipping & Delivery Details": "Versand- & Lieferdetails",
        "My Profile": "Mein Profil",
        "My Profile & Dashboard - Electro": "Mein Profil & Dashboard - Electro",
        "User Profile": "Benutzerprofil",
        "User Profile & Orders": "Benutzerprofil & Bestellungen",
        "Customer Dashboard": "Kunden-Dashboard",
        "Account Overview": "Konto-Übersicht",
        "Order List": "Bestellliste",
        "Order History": "Bestellverlauf",
        "Edit Profile": "Profil bearbeiten",
        "Returns & Feedback": "Rückgabe & Feedback",
        "Returns": "Rücksendungen",
        "Sign Out": "Abmelden",
        "Total Purchased": "Gesamteinkäufe",
        "Orders Placed": "Bestellungen",
        "Items in Cart": "Artikel im Warenkorb",
        "Favorite Category": "Bevorzugte Kategorie",
        "Recent Orders": "Letzte Bestellungen",
        "Order ID": "Bestell-Nr.",
        "Date": "Datum",
        "Status": "Status",
        "Total": "Gesamt",
        "Full Name": "Vollständiger Name",
        "Full Name *": "Vollständiger Name *",
        "Email Address": "E-Mail-Adresse",
        "Email Address *": "E-Mail-Adresse *",
        "Phone Number": "Telefonnummer",
        "Phone Number *": "Telefonnummer *",
        "Address": "Adresse",
        "Save Changes": "Änderungen speichern",
        "Save Profile Changes": "Profiländerungen speichern",
        "Profile Photo (Avatar Image URL)": "Profilfoto (Avatar-Bild-URL)",
        "Your Favorite Category *": "Ihre Lieblingskategorie *",
        "Member Since:": "Mitglied seit:",
        "Purchased Status": "Kaufstatus",
        "No Liked Products Yet": "Noch keine Lieblingsprodukte",
        "Click the heart icon on any product to save your favorite items here.": "Klicken Sie auf das Herzsymbol, um Produkte zu speichern.",
        "Feedback or Return Item Request": "Feedback oder Rücksendeantrag",
        "How was your overall shopping experience?": "Wie war Ihr gesamtes Einkaufserlebnis?",
        "Submit Feedback": "Feedback senden",
        "Login / Sign Up": "Anmelden / Registrieren",
        "Account Sign In & Register - Electro": "Anmelden & Registrieren - Electro",
        "Sign In to Electro": "Bei Electro anmelden",
        "Sign In & Register": "Anmelden & Registrieren",
        "Create My Account": "Mein Konto erstellen",
        "Create Account": "Konto erstellen",
        "Username *": "Benutzername *",
        "Password *": "Passwort *",
        "Password": "Passwort",
        "Confirm Password": "Passwort bestätigen",
        "Remember Me": "Angemeldet bleiben",
        "Forgot Password?": "Passwort vergessen?",
        "Sign In": "Anmelden",
        "Sign Up": "Registrieren",
        "SignUp": "Registrieren",
        "Sign In here": "Hier anmelden",
        "Sign Up now": "Jetzt registrieren",
        "Don't have an account yet?": "Haben Sie noch kein Konto?",
        "Already registered?": "Bereits registriert?",
        "Seller Login": "Verkäufer-Login",
        "Account Portal": "Konto-Portal",
        "We Value Your Security": "Wir schätzen Ihre Sicherheit",
        "Get In Touch": "In Kontakt treten",
        "Let's Connect": "Verbinden wir uns",
        "Send Us A Message": "Nachricht senden",
        "Send Your Message": "Senden Sie Ihre Nachricht",
        "Mail Us": "Mailen Sie uns",
        "Telephone": "Telefon",
        "Subject": "Betreff",
        "Message": "Nachricht",
        "Send Message": "Nachricht senden",
        "Your Name *": "Ihr Name *",
        "Your Email *": "Ihre E-Mail *",
        "Your Phone": "Ihre Telefonnummer",
        "Your Project": "Ihr Projekt",
        "Description": "Beschreibung",
        "Specifications": "Spezifikationen",
        "Reviews": "Bewertungen",
        "Image Sensor": "Bildsensor",
        "Image Processor": "Bildprozessor",
        "ISO Sensitivity": "ISO-Empfindlichkeit",
        "Autofocus System": "Autofokus-System",
        "Video Recording": "Videoaufnahme",
        "Continuous Shooting": "Serienaufnahme",
        "Viewfinder": "Sucher",
        "Display Screen": "Display-Bildschirm",
        "Wireless Connectivity": "Drahtlose Konnektivität",
        "Battery Life": "Akkulaufzeit",
        "Dimensions & Weight": "Abmessungen & Gewicht",
        "Warranty": "Garantie",
        "What is in the Box:": "Lieferumfang:",
        "Product SKU:": "Produkt-SKU:",
        "Category": "Kategorie",
        "Leave a Reply": "Kommentar hinterlassen",
        "Your Review *": "Ihre Bewertung *",
        "Submit Review": "Bewertung absenden",
        "Share": "Teilen",
        "Discover massive discounts of up to 60% on premium audio gear, smartwatches, instant cameras, and computer accessories. All products include original manufacturer warranties.": "Entdecken Sie Rabatte von bis zu 60% auf Premium-Audiogeräte, Smartwatches, Sofortbildkameras und Computerzubehör.",
        "All products you have liked or saved to your wishlist across Electro are stored here. Add them straight to your cart or order them instantly.": "Alle Produkte, die Sie auf Electro favorisiert oder auf Ihrer Wunschliste gespeichert haben, finden Sie hier. Fügen Sie sie direkt Ihrem Warenkorb hinzu.",
        "Here you can see items added to your cart, whether they are already ordered or waiting in cart, and immediately order now.": "Hier sehen Sie Artikel in Ihrem Warenkorb, ob bereits bestellt oder wartend, und können direkt bestellen.",
        "Tell us about your experience shopping on Electro or request an easy 30-day money-back return.": "Teilen Sie uns Ihre Einkaufserfahrung auf Electro mit oder beantragen Sie eine unkomplizierte 30-Tage-Geld-zurück-Rückgabe.",
        "The contact form is currently active. Get in touch with our expert 24/7 customer support team for inquiries, order status, or wholesale requests.": "Das Kontaktformular ist aktiv. Wenden Sie sich bei Fragen, zum Bestellstatus oder für Großhandelsanfragen an unseren 24/7-Support.",
        "We are here for you! how can we help, We are here for you!": "Wir sind für Sie da! Wie können wir Ihnen helfen?",
        "Get an extra 15% discount on all orders over $150. Use promo voucher at checkout.": "Erhalten Sie zusätzliche 15% Rabatt auf alle Bestellungen über 150$. Verwenden Sie den Gutschein an der Kasse.",
        "High-resolution professional DSLR camera featuring a 24.1 Megapixel CMOS sensor, 4K UHD video recording, DIGIC 8 image processor, Dual Pixel CMOS AF, and seamless built-in Wi-Fi and Bluetooth connectivity.": "Hochauflösende professionelle DSLR-Kamera mit 24,1-Megapixel-CMOS-Sensor, 4K-UHD-Videoaufnahme, DIGIC-8-Bildprozessor und WLAN.",
        ". Engineered for passionate photographers and creative videographers, this flagship camera combines a cutting-edge 24.1 Megapixel CMOS APS-C sensor with the lightning-fast DIGIC 8 image processor to render breathtakingly sharp photos and cinematic 4K UHD 24p videos.": "Entwickelt für leidenschaftliche Fotografen und Videofilmer, kombiniert diese Flaggschiff-Kamera einen 24,1-MP-APS-C-Sensor mit dem DIGIC-8-Bildprozessor.",
        "Experience world-class imaging capability with the": "Erleben Sie erstklassige Bildqualität mit der",
        "Your email address will not be published. Required fields are marked *": "Ihre E-Mail-Adresse wird nicht veröffentlicht. Erforderliche Felder sind mit * markiert",
        "Phone Number, Email, or Username": "Telefonnummer, E-Mail oder Benutzername",
        "e.g. saksham@example.com or +91 9876543210": "z.B. saksham@example.com oder +91 9876543210",
        "About Us": "Über uns",
        "Customer Care": "Kundenservice",
        "Customer Service": "Kundendienst",
        "Quick Links": "Schnelllinks",
        "Information": "Informationen",
        "Privacy Policy": "Datenschutzrichtlinie",
        "Terms of Service": "Nutzungsbedingungen",
        "Terms & Conditions": "Allgemeine Geschäftsbedingungen",
        "Return Policy": "Rückgaberichtlinie",
        "Shipping Policy": "Versandrichtlinie",
        "Delivery Information": "Lieferinformationen",
        "Track Order": "Bestellung verfolgen",
        "Track Your Order": "Verfolgen Sie Ihre Bestellung",
        "FAQ": "FAQ",
        "Newsletter": "Newsletter",
        "Subscribe to our newsletter for exclusive discounts and updates.": "Abonnieren Sie unseren Newsletter für Rabatte.",
        "Enter your email address": "Geben Sie Ihre E-Mail-Adresse ein",
        "Subscribe": "Abonnieren",
        "All right reserved.": "Alle Rechte vorbehalten.",
        "All Rights Reserved.": "Alle Rechte vorbehalten.",
        "Site Map": "Seitenübersicht",
        "Affiliates": "Partnerprogramm",
        "Gift Vouchers": "Geschenkgutscheine",
        "Unsubscribe Notification": "Abmeldebenachrichtigung",
        "Enter your email": "Geben Sie Ihre E-Mail ein",
        "Enter your password": "Geben Sie Ihr Passwort ein",
        "Create a strong password": "Erstellen Sie ein sicheres Passwort",
        "Full street address, city, zip code": "Vollständige Adresse, Stadt, PLZ",
        "Mention item returned or share what you loved about our service...": "Geben Sie den Rücksendeartikel an oder teilen Sie Ihr Feedback...",
        "Write your experience with this product...": "Schreiben Sie Ihre Erfahrung mit diesem Produkt...",
        "keywords": "Suchbegriffe",
        "SPECIAL DISCOUNT 45%": "SONDERRABATT 45%",
        "FLASH SALE UP TO ": "BLITZVERKAUF BIS ZU 300$",
        "NEW ARRIVAL 2026": "NEUHEIT 2026",
        "On Selected<br>Laptops &<br>Desktop Or<br>Smartphone": "Auf ausgewählte<br>Laptops &<br>Desktop oder<br>Smartphones",
        "Next-Gen 4K<br>Smart OLED<br>Monitors &<br>Displays": "Next-Gen 4K<br>Smart-OLED<br>Monitore &<br>Displays",
        "High-End Pro<br>Workstations &<br>Studio Gear<br>Hardware": "High-End Pro<br>Workstations &<br>Studio-Gear<br>Hardware",
        "Ultra Cinematic<br>4K Quadcopter<br>Drones &<br>Cameras": "Ultra-Cinematic<br>4K Quadrocopter<br>Drohnen &<br>Kameras"
    },
    "ar": {
        "Help": "مساعدة",
        "Support": "الدعم",
        "Contact": "اتصل بنا",
        "Contact Us": "اتصل بنا",
        "Contact Us - Electro Electronics": "اتصل بنا - إلكترو للإلكترونيات",
        "Call Us:(+012) 1234 567890": "اتصل بنا:(+012) 1234 567890",
        "My Dashboard": "لوحة التحكم",
        "My Account": "حسابي",
        "Search Looking For?": "عن ماذا تبحث؟",
        "All Category": "جميع الفئات",
        "All Categories": "جميع الفئات",
        "Home": "الرئيسية",
        "Shop": "المتجر",
        "Offers": "العروض",
        "All Offers": "جميع العروض",
        "Offers Page": "صفحة العروض",
        "Single Page": "صفحة المنتج",
        "Single Product": "منتج فردي",
        "Single Product - Electro Electronics": "تفاصيل المنتج - إلكترو للإلكترونيات",
        "Pages": "الصفحات",
        "Total:": "الإجمالي:",
        "0 Items": "0 عناصر",
        "Items": "عناصر",
        "Select Currency": "اختر العملة",
        "Select Language": "اختر اللغة",
        "Save Up To 50% Off": "وفر حتى 50% خصم",
        "Get UP To 50% Off": "احصل على خصم يصل إلى 50%",
        "Hot Deals This Week": "أفضل عروض هذا الأسبوع",
        "Special Offer": "عرض خاص",
        "SAVE UP TO $200": "وفر حتى 200$",
        "SAVE UP TO A $200": "وفر حتى 200$",
        "Terms and Condition Apply": "تطبق الشروط والأحكام",
        "Shop Now": "تسوق الآن",
        "Explore Products": "استكشف المنتجات",
        "Starting at": "يبدأ من",
        "Limited Time Deals": "عروض لفترة محدودة",
        "FREE RETURN": "إرجاع مجاني",
        "30 days money back guarantee!": "ضمان استرجاع الأموال لمدة 30 يومًا!",
        "Free return products in 30 days": "إرجاع مجاني للمنتجات خلال 30 يومًا",
        "FREE SHIPPING": "شحن مجاني",
        "Free shipping on all order": "شحن مجاني لجميع الطلبات",
        "SUPPORT 24/7": "دعم 24/7",
        "Contact us 24 hours a day": "تواصل معنا على مدار 24 ساعة",
        "100% SECURE": "100% آمن",
        "Payment 100% Secure": "دفع آمن 100%",
        "SECURE PAYMENT": "دفع آمن",
        "ONLINE SERVICE": "خدمة عبر الإنترنت",
        "We support online 24 hrs a day": "ندعمكم عبر الإنترنت على مدار 24 ساعة يومياً",
        "RECEIVE GIFT CARD": "احصل على بطاقة هدايا",
        "Receive gift all over order $50": "احصل على هدية مع كل طلب يزيد عن 50$",
        "BEST SELLER PRODUCTS": "المنتجات الأكثر مبيعاً",
        "Best Seller Products": "المنتجات الأكثر مبيعاً",
        "Bestseller Products": "المنتجات الأكثر مبيعاً",
        "Liked Products": "المنتجات المفضلة",
        "Customer Reviews": "آراء العملاء",
        "Featured Products": "منتجات مميزة",
        "Featured Deals": "عروض مميزة",
        "Featured": "مميز",
        "New Arrivals": "وصل حديثاً",
        "Our Top Brands": "أفضل علاماتना التجارية",
        "Our Products": "منتجاتنا",
        "All Products": "جميع المنتجات",
        "All Product Items": "جميع أصناف المنتجات",
        "Top Selling": "الأكثر مبيعاً",
        "Top Tier": "الفئة الأولى",
        "Key Technical Specifications": "المواصفات الفنية الرئيسية",
        "Product Description": "وصف المنتج",
        "Overview": "نظرة عامة",
        "Testimonials": "آراء وتقييمات",
        "Related Products": "منتجات ذات صلة",
        "PRODUCT TAGS": "علامات المنتج",
        "Products Categories": "فئات المنتجات",
        "Brands": "العلامات التجارية",
        "Deals": "عروض",
        "Extras": "إضافات",
        "Mega Weekend Tech Bonanza": "مهرجان التكنولوجيا الكبير في عطلة نهاية الأسبوع",
        "Photography": "التصوير",
        "Photography & Gadgets": "التصوير والأجهزة الذكية",
        "Photography & Video": "التصوير والفيديو",
        "SmartPhone": "الهاتف الذكي",
        "SmartPhones": "الهواتف الذكية",
        "Smartphones & Mobiles": "الهواتف الذكية والمحمولة",
        "Smartphones & Tablets": "الهواتف الذكية والأجهزة اللوحية",
        "SmartPhone & Smart TV": "هواتف ذكية وتلفزيونات ذكية",
        "Electronics": "إلكترونيات",
        "Electronics & Computer": "الإلكترونيات والكمبيوتر",
        "Audio": "الصوتيات",
        "Audio & Sound": "الصوت والأنظمة الصوتية",
        "Audio & Studio": "الصوتيات والاستوديو",
        "Audio & Studio Headphones": "سماعات الصوت والاستوديو",
        "Audio & Headphones": "الصوتيات وسماعات الرأس",
        "Audio Equipment": "معدات الصوت",
        "Accessories": "إक्सسوارات",
        "Gadget Accessories": "إكسسوارات الأجهزة",
        "Gadget Accessories & Watches": "إكسسوارات وساعات",
        "Laptops & Desktops": "أجهزة الكمبيوتر المحمولة والمكتبية",
        "Laptops, PCs & Desktops": "أجهزة الكمبيوتر المحمولة والمكتبية",
        "Laptops & Computers": "أجهزة الكمبيوتر المحمولة والمكتبية",
        "Computers & Laptops": "أجهزة الكمبيوتر واللابتوب",
        "Mobiles & Tablets": "الهواتف والأجهزة اللوحية",
        "Tablets & Mobiles": "الأجهزة اللوحية والمحمولة",
        "Tablets & Computing": "الأجهزة اللوحية والحوسبة",
        "Cameras & Drones": "كاميرات وطائرات درون",
        "Cameras & Lenses": "كاميرات وعدسات",
        "Cameras & Photo": "كاميرات وتصوير",
        "Cameras & Photography": "كاميرات وفوتوغرافيا",
        "Smart Watches": "ساعات ذكية",
        "Smart Whatch": "ساعة ذكية",
        "Headphones & Audio": "سماعات الرأس والصوتيات",
        "Gaming & VR": "ألعاب وواقع افتراضي",
        "Gaming & PC": "ألعاب وكمبيوتر",
        "Wearable Tech": "التكنولوجيا القابلة للارتداء",
        "Wearables": "أجهزة قابلة للارتداء",
        "Home Appliances": "الأجهزة المنزلية",
        "Smart Home & Audio": "المنزل الذكي والصوتيات",
        "Drones & Robotics": "طائرات درون وروبوتات",
        "Camera": "كاميرا",
        "Cameras": "كاميرات",
        "Laptop": "كمبيوتر محمول",
        "Headphone": "سماعات",
        "Optics": "بصريات",
        "Smart Camera 4K Pro": "كاميرا ذكية 4K برو",
        "Professional Camera Lens 50mm": "عدسة كاميرا احترافية 50 ملم",
        "Smart Polaroid Instant Camera": "كاميرا بولارويد الفورية الذكية",
        "Canon EOS 90D Cinematic DSLR Kit": "طقم كاميرا كانون EOS 90D دي إس إل آر",
        "Canon EOS Rebel 4K DSLR": "كاميرا كانون EOS Rebel 4K دي إس إل آر",
        "Canon EOS Rebel 4K DSLR Camera": "كاميرا كانون EOS Rebel 4K دي إس إل آر",
        "Apple iPad Mini G2356 Retina": "آبل آيباد ميني ريتينا",
        "Apple iPad Mini": "آبل آيباد ميني",
        "Apple iPad Mini G2356": "آبل آيباد ميني G2356",
        "Apple iPad Pro 11\" M2 Retina": "آبل آيباد برو 11 بوصة M2 ريتينا",
        "Apple iPad Pro 11&quot; M2 Retina": "آبل آيباد برو 11 بوصة M2 ريتينا",
        "Apple MacBook Pro 16\" M3 Max": "آبل ماك بوك برو 16 بوصة M3 ماكس",
        "Apple MacBook Pro 16&quot; M3 Max": "آبل ماك بوك برو 16 بوصة M3 ماكس",
        "Samsung Galaxy Cyan Smartphone": "هاتف سامسونج جالاكسي سيان",
        "Samsung Galaxy S24 Ultra 5G": "سامسونج جالاكسي S24 ألترا 5G",
        "SmartPhone Touch OLED Edition": "هاتف ذكي تاتش أوليد",
        "Digital Tablet with Precision Pen": "تابلت رقمي مع قلم فائق الدقة",
        "10.9-inch Retina Display Tablet": "تابلت بشاشة ريتينا 10.9 بوصة",
        "4K Ultra Quadcopter Drone Master": "طائرة درون كوادكوبتر 4K ألترا",
        "4K Ultra HD GPS Drone Quadcopter": "طائرة درون كوادكوبتر 4K فائقة الدقة بنظام GPS",
        "DJI Mavic Air 4K Aerial Drone": "طائرة درون جوية DJI مافيك اير 4K",
        "DJI Mavic Air 4K Drone": "طائرة درون DJI مافيك اير 4K",
        "Wireless Studio Headphones HD": "سماعات ستوديو لاسلكية عالية الدقة",
        "Sony Studio ANC Headphones": "سماعات سوني ستوديو عازلة للضوضاء",
        "Sony Studio Wireless ANC Headphones": "سماعات سوني ستوديو اللاسلكية عازلة للضوضاء",
        "Sony WH-1000XM5 Studio ANC": "سوني WH-1000XM5 ستوديو ANC",
        "Pure Bass ANC Wireless Earbuds": "سماعات أذن لاسلكية عازلة للضوضاء",
        "True Wireless Stereo Earbuds": "سماعات أذن لاسلكية ستيريو حقيقية",
        "HD Webcam Clip Pro 1080P": "كاميرا ويب عالية الدقة 1080 بكسل",
        "Smart Luxury Titanium Watch": "ساعة ذكية فاخرة من التيتانيوم",
        "Smart Fitness Watch Band": "سوار لياقة بدنية ذكي",
        "Nikkor 70-200mm f/2.8 VR Lens": "عدسة نيكور 70-200 ملم f/2.8 VR",
        "Nikkor 70-200mm f/2.8 VR": "نيكور 70-200 ملم f/2.8 VR",
        "RGB Mechanical Gaming Keyboard": "لوحة مفاتيح ميكانيكية للألعاب بإضاءة RGB",
        "Pro Optical Gaming Mouse": "ماوس بصري احترافي للألعاب",
        "Waterproof Bluetooth Speaker": "مكبر صوت بلوتوث مقاوم للماء",
        "Smart Home AI Voice Speaker": "مكبر صوت ذكي منزلي بالذكاء الاصطناعي",
        "Wireless Noise-Cancelling Headphones": "سماعات لاسلكية عازلة للضوضاء",
        "Wireless Pro Bluetooth Controller": "وحدة تحكم لاسلكية احترافية بالبلوتوث",
        "20000mAh Fast Charging Power Bank": "باور بانك 20000 مللي أمبير سريع الشحن",
        "Add To Cart": "أضف إلى السلة",
        "Add to Cart": "أضف إلى السلة",
        "Add": "إضافة",
        "Add to Cart 🛒": "أضف إلى السلة 🛒",
        "Buy Now": "اشتر الآن",
        "Direct Order": "طلب مباشر",
        "Order Now ⚡": "اطلب الآن ⚡",
        "View Product": "عرض المنتج",
        "View Specifications": "عرض المواصفات",
        "Add to Wishlist": "إضافة للمفضلة",
        "Remove from Wishlist": "إزالة من المفضلة",
        "Wishlist": "قائمة الرغبات",
        "Show All Products": "عرض جميع المنتجات",
        "Clear Search": "مسح البحث",
        "No Products Found": "لم يتم العثور على منتجات",
        "In Stock": "متوفر بالمخزون",
        "Available:": "المتاح:",
        "Sale": "تخفيض",
        "New": "جديد",
        "Hot": "رائج",
        "Top Rated": "الأعلى تقييماً",
        "Free Delivery": "توصيل مجاني",
        "Quick View": "نظرة سريعة",
        "Compare": "مقارنة",
        "Compare Products": "مقارنة المنتجات",
        "Remove": "إزالة",
        "Clear All": "مسح الكل",
        "View More": "عرض المزيد",
        "View Large ↗": "عرض كبير ↗",
        "Back to Top": "العودة للأعلى",
        "Sort by:": "ترتيب حسب:",
        "Price: Low to High": "السعر: من الأقل للأعلى",
        "Price: High to Low": "السعر: من الأعلى للأقل",
        "Discount: High to Low": "الخصم: من الأعلى للأقل",
        "Select By Color": "اختر حسب اللون",
        "White": "أبيض",
        "Green": "أخضر",
        "Gold": "ذهبي",
        "+ Browse Products": "+ تصفح المنتجات",
        "Explore Offers & Products": "استكشف العروض والمنتجات",
        "Search Offer Products...": "البحث في عروض المنتجات...",
        "Search Results": "نتائج البحث",
        "Showing products matching your search": "عرض المنتجات المطابقة لبحثك",
        "✕ Clear & Show All": "✕ مسح وعرض الكل",
        "products found": "منتجات تم العثور عليها",
        "matching": "مطابقة لـ",
        "in": "في",
        "Category:": "الفئة:",
        "Search:": "بحث:",
        "Cart Page": "صفحة السلة",
        "Shopping Cart": "سلة التسوق",
        "Shopping Cart & Checkout": "سلة التسوق والدفع",
        "Shopping Cart & Checkout - Electro": "سلة التسوق والدفع - إلكترو",
        "Cart & Checkout": "السلة والدفع",
        "Product": "المنتج",
        "Price": "السعر",
        "Unit Price": "سعر الوحدة",
        "Quantity": "الكمية",
        "Subtotal": "المجموع الفرعي",
        "Subtotal:": "المجموع الفرعي:",
        "Action": "إجراء",
        "Order Summary": "ملخص الطلب",
        "Shipping": "الشحن",
        "Free": "مجاني",
        "Tax": "الضريبة",
        "Tax (0%):": "الضريبة (0%):",
        "Total Amount": "المبلغ الإجمالي",
        "Total Amount:": "المبلغ الإجمالي:",
        "Estimated Shipping:": "الشحن المقدر:",
        "Proceed to Checkout": "متابعة الدفع",
        "Checkout": "الدفع",
        "Continue Shopping": "مواصلة التسوق",
        "Your cart is currently empty.": "سلتك فارغة حالياً.",
        "Your shopping cart is currently empty.": "سلة التسوق فارغة حالياً.",
        "Have a coupon code?": "هل لديك كود خصم؟",
        "Enter coupon": "أدخل الكوبون",
        "Apply": "تطبيق",
        "Go to Cart Page ↗": "الذهاب إلى صفحة السلة ↗",
        "Payment Method": "طريقة الدفع",
        "Cash on Delivery (COD)": "الدفع عند الاستلام (COD)",
        "Credit / Debit Card": "بطاقة ائتمان / خصم",
        "UPI / Net Banking": "UPI / الخدمات المصرفية عبر الإنترنت",
        "Recipient Name *": "اسم المستلم *",
        "Delivery Address *": "عنوان التوصيل *",
        "Shipping Address *": "عنوان الشحن *",
        "Full Shipping Address": "عنوان الشحن الكامل",
        "Shipping & Delivery Details": "تفاصيل الشحن والتوصيل",
        "My Profile": "ملفي الشخصي",
        "My Profile & Dashboard - Electro": "ملفي الشخصي ولوحة التحكم - إلكترو",
        "User Profile": "ملف المستخدم",
        "User Profile & Orders": "ملف المستخدم والطلبات",
        "Customer Dashboard": "لوحة تحكم العميل",
        "Account Overview": "نظرة عامة على الحساب",
        "Order List": "قائمة الطلبات",
        "Order History": "سجل الطلبات",
        "Edit Profile": "تعديل الملف الشخصي",
        "Returns & Feedback": "الإرجاع والتقييمات",
        "Returns": "المرتجعات",
        "Sign Out": "تسجيل الخروج",
        "Total Purchased": "إجمالي المشتريات",
        "Orders Placed": "الطلبات المسجلة",
        "Items in Cart": "القطع في السلة",
        "Favorite Category": "الفئة المفضلة",
        "Recent Orders": "الطلبات الأخيرة",
        "Order ID": "رقم الطلب",
        "Date": "التاريخ",
        "Status": "الحالة",
        "Total": "المجموع",
        "Full Name": "الاسم الكامل",
        "Full Name *": "الاسم الكامل *",
        "Email Address": "عنوان البريد الإلكتروني",
        "Email Address *": "عنوان البريد الإلكتروني *",
        "Phone Number": "رقم الهاتف",
        "Phone Number *": "رقم الهاتف *",
        "Address": "العنوان",
        "Save Changes": "حفظ التغييرات",
        "Save Profile Changes": "حفظ تغييرات الملف الشخصي",
        "Profile Photo (Avatar Image URL)": "صورة الملف الشخصي (رابط الصورة)",
        "Your Favorite Category *": "فئتك المفضلة *",
        "Member Since:": "عضو منذ:",
        "Purchased Status": "حالة الشراء",
        "No Liked Products Yet": "لا توجد منتجات مفضلة بعد",
        "Click the heart icon on any product to save your favorite items here.": "انقر على رمز القلب لحفظ المنتجات المفضلة هنا.",
        "Feedback or Return Item Request": "ملاحظات أو طلب إرجاع منتج",
        "How was your overall shopping experience?": "كيف كانت تجربة التسوق بشكل عام؟",
        "Submit Feedback": "إرسال الملاحظات",
        "Login / Sign Up": "تسجيل الدخول / إنشاء حساب",
        "Account Sign In & Register - Electro": "تسجيل الدخول والتسجيل - إلكترو",
        "Sign In to Electro": "تسجيل الدخول إلى إلكترو",
        "Sign In & Register": "تسجيل الدخول والتسجيل",
        "Create My Account": "إنشاء حسابي",
        "Create Account": "إنشاء حساب",
        "Username *": "اسم المستخدم *",
        "Password *": "كلمة المرور *",
        "Password": "كلمة المرور",
        "Confirm Password": "تأكيد كلمة المرور",
        "Remember Me": "تذكرني",
        "Forgot Password?": "هل نسيت كلمة المرور؟",
        "Sign In": "تسجيل الدخول",
        "Sign Up": "إنشاء حساب",
        "SignUp": "التسجيل",
        "Sign In here": "سجل الدخول هنا",
        "Sign Up now": "سجل الآن",
        "Don't have an account yet?": "أليس لديك حساب بعد؟",
        "Already registered?": "مسجل بالفعل؟",
        "Seller Login": "دخول البائعين",
        "Account Portal": "بوابة الحساب",
        "We Value Your Security": "نحن نقدر أمانك",
        "Get In Touch": "تواصل معنا",
        "Let's Connect": "لنتواصل",
        "Send Us A Message": "أرسل لنا رسالة",
        "Send Your Message": "أرسل رسالتك",
        "Mail Us": "راسلنا بالبريد",
        "Telephone": "الهاتف",
        "Subject": "الموضوع",
        "Message": "الرسالة",
        "Send Message": "إرسال الرسالة",
        "Your Name *": "اسمك *",
        "Your Email *": "بريدك الإلكتروني *",
        "Your Phone": "هاتفك",
        "Your Project": "مشروعك",
        "Description": "الوصف",
        "Specifications": "المواصفات",
        "Reviews": "التقييمات",
        "Image Sensor": "مستشعر الصور",
        "Image Processor": "معالج الصور",
        "ISO Sensitivity": "حساسية ISO",
        "Autofocus System": "نظام التركيز التلقائي",
        "Video Recording": "تسجيل الفيديو",
        "Continuous Shooting": "التصوير المتتابع",
        "Viewfinder": "محدد المنظر",
        "Display Screen": "شاشة العرض",
        "Wireless Connectivity": "الاتصال اللاسلكي",
        "Battery Life": "عمر البطارية",
        "Dimensions & Weight": "الأبعاد والوزن",
        "Warranty": "الضمان",
        "What is in the Box:": "محتويات الصندوق:",
        "Product SKU:": "رمز المنتج (SKU):",
        "Category": "الفئة",
        "Leave a Reply": "اترك تعليقاً",
        "Your Review *": "تقييمك *",
        "Submit Review": "إرسال التقييم",
        "Share": "مشاركة",
        "Discover massive discounts of up to 60% on premium audio gear, smartwatches, instant cameras, and computer accessories. All products include original manufacturer warranties.": "اكتشف خصومات هائلة تصل إلى 60% على معدات الصوت المتميزة والساعات الذكية والكاميرات الفورية وملحقات الكمبيوتر مع ضمان الشركة المصنعة.",
        "All products you have liked or saved to your wishlist across Electro are stored here. Add them straight to your cart or order them instantly.": "يتم تخزين جميع المنتجات التي نالت إعجابك أو قمت بحفظها في قائمة رغباتك هنا. أضفها مباشرة إلى سلتك أو اطلبها فوراً.",
        "Here you can see items added to your cart, whether they are already ordered or waiting in cart, and immediately order now.": "هنا يمكنك رؤية المنتجات المضافة إلى سلة التسوق الخاصة بك وإتمام الطلب على الفور.",
        "Tell us about your experience shopping on Electro or request an easy 30-day money-back return.": "أخبرنا عن تجربة التسوق الخاصة بك في إلكترو أو اطلب إرجاع أموالك بسهولة خلال 30 يومًا.",
        "The contact form is currently active. Get in touch with our expert 24/7 customer support team for inquiries, order status, or wholesale requests.": "نموذج الاتصال متاح حالياً. تواصل مع فريق دعم العملاء الخبير على مدار 24/7 للاستفسارات وحالة الطلب.",
        "We are here for you! how can we help, We are here for you!": "نحن هنا من أجلك! كيف يمكننا مساعدتك؟",
        "Get an extra 15% discount on all orders over $150. Use promo voucher at checkout.": "احصل على خصم إضافي بنسبة 15% على جميع الطلبات التي تزيد عن 150 دولارًا. استخدم القسيمة الترويجية عند الدفع.",
        "High-resolution professional DSLR camera featuring a 24.1 Megapixel CMOS sensor, 4K UHD video recording, DIGIC 8 image processor, Dual Pixel CMOS AF, and seamless built-in Wi-Fi and Bluetooth connectivity.": "كاميرا احترافية عالية الدقة مزودة بمستشعر CMOS بدقة 24.1 ميجابكسل، وتسجيل فيديو بدقة 4K UHD، ومعالج DIGIC 8، وتقنية Wi-Fi مدمجة.",
        ". Engineered for passionate photographers and creative videographers, this flagship camera combines a cutting-edge 24.1 Megapixel CMOS APS-C sensor with the lightning-fast DIGIC 8 image processor to render breathtakingly sharp photos and cinematic 4K UHD 24p videos.": "صُممت هذه الكاميرا الرائدة للمصورين ومصوري الفيديو المبدعين، وتجمع بين مستشعر APS-C بدقة 24.1 ميجابكسل ومعالج DIGIC 8 لتقديم صور حادة وفيديو سينمائي 4K.",
        "Experience world-class imaging capability with the": "جرب قدرات تصوير عالمية المستوى مع",
        "Your email address will not be published. Required fields are marked *": "لن يتم نشر عنوان بريدك الإلكتروني. الحقول الإلزامية مشار إليها بـ *",
        "Phone Number, Email, or Username": "رقم الهاتف أو البريد الإلكتروني أو اسم المستخدم",
        "e.g. saksham@example.com or +91 9876543210": "مثال saksham@example.com أو +91 9876543210",
        "About Us": "من نحن",
        "Customer Care": "خدمة العملاء",
        "Customer Service": "خدمة العملاء",
        "Quick Links": "روابط سريعة",
        "Information": "معلومات",
        "Privacy Policy": "سياسة الخصوصية",
        "Terms of Service": "شروط الخدمة",
        "Terms & Conditions": "الشروط والأحكام",
        "Return Policy": "سياسة الإرجاع",
        "Shipping Policy": "سياسة الشحن",
        "Delivery Information": "معلومات التوصيل",
        "Track Order": "تتبع الطلب",
        "Track Your Order": "تتبع طلبك",
        "FAQ": "الأسئلة الشائعة",
        "Newsletter": "النشرة الإخبارية",
        "Subscribe to our newsletter for exclusive discounts and updates.": "اشترك في نشرتنا البريدية للحصول على خصومات حصرية.",
        "Enter your email address": "أدخل بريدك الإلكتروني",
        "Subscribe": "اشتراك",
        "All right reserved.": "جميع الحقوق محفوظة.",
        "All Rights Reserved.": "جميع الحقوق محفوظة.",
        "Site Map": "خريطة الموقع",
        "Affiliates": "الشركاء والمسوقون",
        "Gift Vouchers": "قسائم الهدايا",
        "Unsubscribe Notification": "إشعار إلغاء الاشتراك",
        "Enter your email": "أدخل بريدك الإلكتروني",
        "Enter your password": "أدخل كلمة المرور",
        "Create a strong password": "أنشئ كلمة مرور قوية",
        "Full street address, city, zip code": "العنوان بالكامل، المدينة، الرمز البريدي",
        "Mention item returned or share what you loved about our service...": "اذكر المنتج المرتجع أو شارك تجربتك معنا...",
        "Write your experience with this product...": "اكتب تجربتك مع هذا المنتج...",
        "keywords": "كلمات البحث",
        "SPECIAL DISCOUNT 45%": "خصم خاص 45%",
        "FLASH SALE UP TO ": "تخفيضات كبرى حتى 300$",
        "NEW ARRIVAL 2026": "وصل حديثاً 2026",
        "On Selected<br>Laptops &<br>Desktop Or<br>Smartphone": "على أجهزة مختارة من<br>اللابتوب والكمبيوتر<br>أو الهواتف<br>الذكية",
        "Next-Gen 4K<br>Smart OLED<br>Monitors &<br>Displays": "الجيل القادم من شاشات<br>4K سمارت أوليد<br>المتطورة",
        "High-End Pro<br>Workstations &<br>Studio Gear<br>Hardware": "محطات عمل احترافية<br>ومعدات استوديو<br>فائقة الأداء",
        "Ultra Cinematic<br>4K Quadcopter<br>Drones &<br>Cameras": "طائرات درون كوادكوبتر<br>وكاميرات سينمائية<br>بدقة 4K"
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
    // 3. MULTI-LANGUAGE TRANSLATION SERVICE (I18n - EXHAUSTIVE PAGE-WIDE COVERAGE)
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

            this.translatePage(code);
            updateNavProfile();
            showToast(`Language switched to ${code.toUpperCase()}! 🌐`, 'success');
        },

        get(key) {
            const lang = this.getCurrent();
            const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.en;
            return dict[key] || I18N_DICTIONARY.en[key] || key;
        },

        translateString(str, targetLang) {
            if (!str || typeof str !== 'string') return str;
            const lang = targetLang || this.getCurrent();
            if (lang === 'en') return str;

            const dict = I18N_DICTIONARY[lang];
            if (!dict) return str;

            const trimmed = str.trim();
            if (!trimmed) return str;

            // 1. Direct dictionary lookup
            if (dict[trimmed]) {
                return str.replace(trimmed, dict[trimmed]);
            }

            // 2. Case-insensitive dictionary lookup
            const lower = trimmed.toLowerCase();
            for (const key in dict) {
                if (key.toLowerCase() === lower) {
                    return str.replace(trimmed, dict[key]);
                }
            }

            // 3. Emoji prefix handling: e.g. "📦 Order List & Purchases", "❤️ Liked Products", "⚡ 12h 45m left", "⭐ Returns & Feedback"
            const emojiMatch = trimmed.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|\uFE0F|[❤️⚡⭐🛒📦📱💻🎧📷🔍🚪⚙️📊🔥⌚])+\s*(.+)$/);
            if (emojiMatch) {
                const prefix = trimmed.substring(0, trimmed.length - emojiMatch[2].length);
                const rest = emojiMatch[2].trim();
                if (dict[rest]) {
                    return str.replace(trimmed, prefix + dict[rest]);
                }
                const parenMatch = rest.match(/^(.+?)\s*\((.+?)\)$/);
                if (parenMatch && dict[parenMatch[1].trim()]) {
                    return str.replace(trimmed, prefix + dict[parenMatch[1].trim()]);
                }
            }

            // 4. Bilingual parenthetical cleanup e.g. "Total Purchased (कुल खरीदारी)", "Status (खरीदा गया)"
            const parenMatch2 = trimmed.match(/^(.+?)\s*\((.+?)\)$/);
            if (parenMatch2 && dict[parenMatch2[1].trim()]) {
                return str.replace(trimmed, dict[parenMatch2[1].trim()]);
            }

            // 5. Dynamic regex patterns:
            // a) (110 reviews) or (1 review)
            const revMatch = trimmed.match(/^\((\d+)\s+reviews?\)$/i);
            if (revMatch) {
                const n = revMatch[1];
                const templates = {
                    hi: `(${n} समीक्षाएं)`,
                    ru: `(${n} отзывов)`,
                    ja: `(${n}件のレビュー)`,
                    es: `(${n} reseñas)`,
                    de: `(${n} Bewertungen)`,
                    ar: `(${n} تقييم)`
                };
                if (templates[lang]) return str.replace(trimmed, templates[lang]);
            }

            // b) 45% Claimed
            const claimedMatch = trimmed.match(/^(\d+)%\s+Claimed$/i);
            if (claimedMatch) {
                const n = claimedMatch[1];
                const templates = {
                    hi: `${n}% दावा किया गया`,
                    ru: `${n}% получено`,
                    ja: `${n}% 請求済み`,
                    es: `${n}% Reclamado`,
                    de: `${n}% Eingelöst`,
                    ar: `${n}% تم الحصول عليه`
                };
                if (templates[lang]) return str.replace(trimmed, templates[lang]);
            }

            // c) Only 5 left / 12 left
            const leftMatch = trimmed.match(/^(?:Only\s+)?(\d+)\s+left!?$/i);
            if (leftMatch) {
                const n = leftMatch[1];
                const templates = {
                    hi: `केवल ${n} शेष`,
                    ru: `Осталось ${n} шт.`,
                    ja: `残り${n}点`,
                    es: `¡Solo quedan ${n}!`,
                    de: `Nur noch ${n} übrig`,
                    ar: `بقي ${n} فقط`
                };
                if (templates[lang]) return str.replace(trimmed, templates[lang]);
            }

            // d) 18 Items in stock
            const stockMatch = trimmed.match(/^(\d+)\s+Items in stock$/i);
            if (stockMatch) {
                const n = stockMatch[1];
                const templates = {
                    hi: `स्टॉक में ${n} वस्तुएं`,
                    ru: `В наличии ${n} шт.`,
                    ja: `在庫 ${n} 点`,
                    es: `${n} artículos en stock`,
                    de: `${n} Artikel auf Lager`,
                    ar: `${n} عناصر متوفرة`
                };
                if (templates[lang]) return str.replace(trimmed, templates[lang]);
            }

            // e) Cart Items (2)
            const cartItemsMatch = trimmed.match(/^Cart Items\s*\((.*?)\)$/i);
            if (cartItemsMatch) {
                const n = cartItemsMatch[1];
                const templates = {
                    hi: `कार्ट वस्तुएं (${n})`,
                    ru: `Товары в корзине (${n})`,
                    ja: `カート内のアイテム (${n})`,
                    es: `Artículos del Carrito (${n})`,
                    de: `Artikel im Warenkorb (${n})`,
                    ar: `قطع السلة (${n})`
                };
                if (templates[lang]) return str.replace(trimmed, templates[lang]);
            }

            // f) Save $48.00 / SAVE $48
            const saveMatch = trimmed.match(/^Save\s+(\$[\d,]+(?:\.\d+)?)/i);
            if (saveMatch) {
                const templates = {
                    hi: `बचत ${saveMatch[1]}`,
                    ru: `Экономия ${saveMatch[1]}`,
                    ja: `${saveMatch[1]} 割引`,
                    es: `Ahorra ${saveMatch[1]}`,
                    de: `Sparen Sie ${saveMatch[1]}`,
                    ar: `وفر ${saveMatch[1]}`
                };
                if (templates[lang]) return str.replace(trimmed, templates[lang]);
            }

            return str;
        },

        translatePage(forceLang) {
            const lang = forceLang || this.getCurrent();
            document.documentElement.lang = lang;

            // Recursive DOM text walker that visits every text node
            const walk = (element) => {
                if (!element) return;
                const tag = element.tagName ? element.tagName.toLowerCase() : '';
                if (['script', 'style', 'noscript', 'code'].includes(tag)) return;

                // Don't modify currency selector option text (EUR, USD, etc.)
                if (element.classList && element.classList.contains('top-select-currency')) return;

                for (let child = element.firstChild; child; child = child.nextSibling) {
                    if (child.nodeType === 3) { // Node.TEXT_NODE
                        if (child._origVal === undefined) {
                            child._origVal = child.nodeValue;
                        }
                        if (lang === 'en') {
                            child.nodeValue = child._origVal;
                        } else {
                            child.nodeValue = this.translateString(child._origVal, lang);
                        }
                    } else if (child.nodeType === 1) { // Node.ELEMENT_NODE
                        walk(child);
                    }
                }
            };

            if (document.body) {
                walk(document.body);
            }

            // Translate placeholders
            document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(inp => {
                if (!inp.dataset.origPlaceholder) {
                    inp.dataset.origPlaceholder = inp.placeholder;
                }
                if (lang === 'en') {
                    inp.placeholder = inp.dataset.origPlaceholder;
                } else {
                    inp.placeholder = this.translateString(inp.dataset.origPlaceholder, lang);
                }
            });

            // Translate titles (excluding dropdown wrappers)
            document.querySelectorAll('[title]').forEach(el => {
                if (el.classList.contains('top-select-wrapper')) return;
                if (!el.dataset.origTitle) {
                    el.dataset.origTitle = el.title;
                }
                if (lang === 'en') {
                    el.title = el.dataset.origTitle;
                } else {
                    el.title = this.translateString(el.dataset.origTitle, lang);
                }
            });

            // Translate aria-labels
            document.querySelectorAll('[aria-label]').forEach(el => {
                if (el.classList.contains('top-select-currency') || el.classList.contains('top-select-language')) return;
                if (!el.dataset.origAria) {
                    el.dataset.origAria = el.getAttribute('aria-label');
                }
                if (lang === 'en') {
                    el.setAttribute('aria-label', el.dataset.origAria);
                } else {
                    el.setAttribute('aria-label', this.translateString(el.dataset.origAria, lang));
                }
            });

            // Sync all language dropdowns
            document.querySelectorAll('.top-select-language').forEach(sel => {
                sel.value = lang;
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
            document.querySelectorAll('.reference-expand-card, .offers-page-deal-card, .reference-catalog-item, .amazon-product-card').forEach(card => {
                const prodId = card.getAttribute('data-product-id');
                const heartBtn = card.querySelector('.reference-drawer-circle-btn[title*="Wishlist"], .offers-page-wishlist-btn, [data-wishlist-btn], .amazon-card-wishlist-btn');
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
    // 5. LIVE SEARCH & ALL CATEGORIES FILTERING ENGINE (AMAZON / FLIPKART SYNCHRONIZED GRID)
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

            // Hide normal homepage sections as requested
            document.body.classList.add('body-searching');
            resultsSection.style.display = 'block';

            // Update title and meta summary
            let titleText = I18n.get('Search Results') || 'Search Results';
            if (category && category !== 'all') {
                titleText = `${I18n.get('Category:') || 'Category:'} ${category}`;
            }
            if (query) {
                titleText = `${I18n.get('Search:') || 'Search:'} "${query}"`;
            }
            if (titleEl) titleEl.textContent = titleText;

            if (metaEl) {
                metaEl.textContent = `${matches.length} ${I18n.get('products found') || 'products found'} ${query ? `${I18n.get('matching') || 'matching'} "${query}"` : ''} ${category !== 'all' ? `${I18n.get('in') || 'in'} ${category}` : ''}`;
            }

            if (matches.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: #fafafa; border-radius: 8px;">
                        <span style="font-size: 42px; display: block; margin-bottom: 10px;">🔍</span>
                        <h3 style="font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 8px;">${I18n.get('No Products Found') || 'No Products Found'}</h3>
                        <p style="font-size: 14px; color: #64748b; max-width: 460px; margin: 0 auto 18px;">${I18n.get('No products found matching your search. Please try another query.') || 'No products found matching your search. Please try another query.'}</p>
                        <button type="button" class="btn-clear-search" onclick="Electro.Search.clearSearch()" style="background:#e58840; color:#fff; border:none; padding:8px 24px; border-radius:20px; font-weight:700; cursor:pointer;">${I18n.get('Show All Products') || 'Show All Products'}</button>
                    </div>
                `;
            } else {
                grid.innerHTML = matches.map(p => {
                    const discountPercent = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
                    return `
                    <div class="amazon-product-card search-card-item" data-product-id="${p.id}">
                        ${p.oldPrice ? `<span class="amazon-card-badge">${I18n.get('Save') || 'Save'} ${discountPercent}%</span>` : ''}
                        <button type="button" class="amazon-card-wishlist-btn ${Wishlist.isLiked(p.id) ? 'is-liked' : ''}" data-product-id="${p.id}" title="${I18n.get('Add to Wishlist') || 'Add to Wishlist'}" aria-label="${I18n.get('Add to Wishlist') || 'Add to Wishlist'}">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </button>
                        <a href="single-product.html" class="amazon-card-img-wrap" title="${p.name}">
                            <img src="${p.img}" alt="${p.name}" loading="lazy">
                        </a>
                        <div class="amazon-card-info">
                            <span class="amazon-card-cat">${p.category}</span>
                            <a href="single-product.html" class="amazon-card-title" title="${p.name}">${p.name}</a>
                            <div class="amazon-card-rating">
                                <span class="amazon-stars">★★★★★</span>
                                <span class="amazon-review-count">(${p.stock ? (p.stock * 3 + 12) : 28})</span>
                            </div>
                            <div class="amazon-card-price-row">
                                <span class="amazon-price-current" data-base-price="${p.price}">${Currency.formatPrice(p.price)}</span>
                                ${p.oldPrice ? `<span class="amazon-price-old" data-base-price="${p.oldPrice}">${Currency.formatPrice(p.oldPrice)}</span>` : ''}
                                ${p.oldPrice ? `<span class="amazon-price-discount">-${discountPercent}%</span>` : ''}
                            </div>
                            <button type="button" class="amazon-btn-add-cart" data-product-id="${p.id}">
                                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                                <span>${I18n.get('Add to Cart') || 'Add to Cart'}</span>
                            </button>
                        </div>
                    </div>
                `;
                }).join('');
            }

            // Immediately format currency prices and translate cards
            Currency.updateAllPrices();
            I18n.translatePage();

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
            const cartBtn = e.target.closest('.reference-drawer-add-cart, .reference-offers-cart-btn, [data-add-to-cart], .btn-add-to-cart, .btn-add-cart, .amazon-btn-add-cart');
            if (cartBtn) {
                e.preventDefault();
                let product = null;
                const prodId = cartBtn.getAttribute('data-product-id');

                if (prodId) {
                    product = PRODUCT_CATALOG.find(p => p.id === prodId);
                }

                if (!product) {
                    const card = cartBtn.closest('.reference-expand-card, .reference-offers-product-card, .single-product-main-card, .hero-promo-card, .amazon-product-card');
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
            const likeBtn = e.target.closest('.reference-drawer-circle-btn[title*="Wishlist"], .reference-drawer-circle-btn[aria-label*="Wishlist"], .offers-page-wishlist-btn, [data-wishlist-btn], .btn-like, .amazon-card-wishlist-btn');
            if (likeBtn) {
                e.preventDefault();
                let product = null;
                const prodId = likeBtn.getAttribute('data-product-id');

                if (prodId) {
                    product = PRODUCT_CATALOG.find(p => p.id === prodId);
                }

                if (!product) {
                    const card = likeBtn.closest('.reference-expand-card, .offers-page-deal-card, .reference-catalog-item, .amazon-product-card');
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
                const currentLang = I18n.getCurrent();
                if (heroHeading) {
                    heroHeading.innerHTML = currentLang === 'en' ? slide.heading : I18n.translateString(slide.heading, currentLang);
                }
                if (heroEyebrow) {
                    heroEyebrow.textContent = currentLang === 'en' ? slide.eyebrow : I18n.translateString(slide.eyebrow, currentLang);
                }
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
