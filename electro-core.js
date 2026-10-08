/**
 * ==============================================================================
 * ELECTRO E-COMMERCE - CORE JAVASCRIPT SYSTEM
 * 100% Plain Vanilla JavaScript - No external libraries
 * Works out-of-the-box with Chrome LocalStorage & Vercel Zero-Config Deployment
 * ==============================================================================
 */

(function () {
    'use strict';

    // LocalStorage Keys
    const STORAGE_KEYS = {
        USERS: 'electro_users_db',
        CURRENT_USER: 'electro_current_user',
        CART: 'electro_cart_items',
        ORDERS: 'electro_user_orders',
        WISHLIST: 'electro_user_wishlist',
        REVIEWS: 'electro_user_reviews',
        MESSAGES: 'electro_contact_messages'
    };

    // Default Seed Products (Used for lookups and quick cart additions)
    const PRODUCT_CATALOG = [
        { id: 'cam-1', name: 'Smart Camera', category: 'Electronics', price: 335.00, oldPrice: 380.00, img: 'assets/bestseller_cam2.png', rating: 5, stock: 20 },
        { id: 'lens-1', name: 'Professional Camera Lens', category: 'Photography', price: 299.00, oldPrice: 350.00, img: 'assets/bestseller_lens2.png', rating: 5, stock: 15 },
        { id: 'pol-1', name: 'Smart Polaroid Instant Camera', category: 'Photography', price: 99.00, oldPrice: 149.00, img: 'assets/bestseller_polaroid.png', rating: 5, stock: 25 },
        { id: 'lap-1', name: 'Apple iPad Mini G2356', category: 'SmartPhone', price: 1050.00, oldPrice: 1250.00, img: 'assets/item_laptop.png', rating: 5, stock: 12 },
        { id: 'phone-1', name: 'Samsung Galaxy Cyan Smartphone', category: 'SmartPhone', price: 850.00, oldPrice: 990.00, img: 'assets/item_cyan_phone.png', rating: 5, stock: 18 },
        { id: 'tab-1', name: 'Digital Tablet with Precision Pen', category: 'Electronics', price: 720.00, oldPrice: 850.00, img: 'assets/item_tablet_pen.png', rating: 5, stock: 14 },
        { id: 'head-1', name: 'Wireless Studio Headphones', category: 'Audio', price: 189.00, oldPrice: 270.00, img: 'assets/floating_headphones_hd.png', rating: 5, stock: 30 },
        { id: 'web-1', name: 'HD Webcam Clip Pro', category: 'Accessories', price: 59.00, oldPrice: 89.00, img: 'assets/bestseller_webcam.png', rating: 5, stock: 40 },
        { id: 'phone-hand', name: 'SmartPhone Touch OLED Edition', category: 'SmartPhone', price: 1050.00, oldPrice: 1250.00, img: 'assets/item_phone_hand_clean.png', rating: 5, stock: 22 }
    ];

    // ==========================================================================
    // 1. DATA ACCESS HELPERS (LocalStorage)
    // ==========================================================================
    function getStoredData(key, fallback) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (e) {
            console.error('LocalStorage read error for key ' + key, e);
            return fallback;
        }
    }

    function setStoredData(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('LocalStorage write error for key ' + key, e);
        }
    }

    // Initialize Default User if empty
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
                favoriteCategory: 'Laptops & Computers',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
                registeredAt: new Date().toLocaleDateString(),
                password: 'password123'
            };
            setStoredData(STORAGE_KEYS.USERS, [defaultUser]);
            setStoredData(STORAGE_KEYS.CURRENT_USER, defaultUser);
        }

        // Initialize default sample orders if none exist
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
                        { id: 'lap-1', name: 'Apple iPad Mini G2356', price: 1050.00, qty: 1, img: 'assets/item_laptop.png' }
                    ],
                    shippingAddress: '123 Tech Avenue, Suite 402, New York, NY, USA'
                },
                {
                    orderId: 'ORD-88104',
                    date: '2026-09-15',
                    total: 189.00,
                    status: 'Purchased & Delivered',
                    isPurchased: true,
                    items: [
                        { id: 'head-1', name: 'Wireless Studio Headphones', price: 189.00, qty: 1, img: 'assets/floating_headphones_hd.png' }
                    ],
                    shippingAddress: '123 Tech Avenue, Suite 402, New York, NY, USA'
                }
            ];
            setStoredData(STORAGE_KEYS.ORDERS, sampleOrders);
        }
    }

    // ==========================================================================
    // 2. AUTHENTICATION SERVICE
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
            // Check if phone or email already exists
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
    // 3. CART SERVICE (LocalStorage Synchronized)
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
                    isPurchased: false, // In cart = not purchased yet
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
    // 4. ORDER SERVICE (Order Now / Checkout Flow)
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
            orders.unshift(newOrder); // Most recent first
            setStoredData(STORAGE_KEYS.ORDERS, orders);

            // If checked out from cart, clear cart
            if (!singleItem) {
                Cart.clear();
            } else {
                // If ordered a single item from cart, remove just that item
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
    // 5. TOAST NOTIFICATION SYSTEM
    // ==========================================================================
    function showToast(message, type = 'success') {
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

        // Auto remove
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
    // 6. UI SYNCHRONIZATION (Header Cart, Profile, Nav Links)
    // ==========================================================================
    function updateNavCartBadge() {
        const count = Cart.getCount();
        const subtotal = Cart.getSubtotal();

        // Update any badge with class .header-cart-badge or [data-cart-count]
        document.querySelectorAll('.header-cart-badge, [data-cart-count]').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'inline-flex' : 'none';
        });

        // Update any price with [data-cart-total]
        document.querySelectorAll('[data-cart-total], .cart-total-display').forEach(el => {
            el.textContent = `$${subtotal.toFixed(2)}`;
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
    // 7. GLOBAL EVENT DELEGATION FOR ALL "ADD TO CART" & INTERACTIVE BUTTONS
    // ==========================================================================
    function setupGlobalListeners() {
        document.addEventListener('click', function (e) {
            // Check for Add to Cart click
            const cartBtn = e.target.closest('.reference-drawer-add-cart, .reference-offers-cart-btn, [data-add-to-cart], .btn-add-to-cart');
            if (cartBtn) {
                e.preventDefault();
                
                // Try to deduce product details from card or data attributes
                let product = null;
                const prodId = cartBtn.getAttribute('data-product-id');

                if (prodId) {
                    product = PRODUCT_CATALOG.find(p => p.id === prodId);
                }

                if (!product) {
                    // Extract from card DOM
                    const card = cartBtn.closest('.reference-expand-card, .reference-offers-product-card, .single-product-main-card');
                    if (card) {
                        const titleEl = card.querySelector('.reference-card-prod-title, .reference-offers-card-name, .single-prod-title, h1, h2, h3');
                        const priceEl = card.querySelector('.reference-price-sale, .reference-offers-price-current, .single-prod-price');
                        const imgEl = card.querySelector('img');
                        const catEl = card.querySelector('.reference-card-cat-name, .reference-offers-card-category');

                        const title = titleEl ? titleEl.textContent.trim() : 'Electro Product';
                        const priceText = priceEl ? priceEl.textContent.replace(/[^0-9.]/g, '') : '99.00';
                        const price = parseFloat(priceText) || 99.00;
                        const img = imgEl ? imgEl.getAttribute('src') : 'assets/item_laptop.png';
                        const category = catEl ? catEl.textContent.trim() : 'Electronics';

                        product = {
                            id: 'prod-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20),
                            name: title,
                            price: price,
                            img: img,
                            category: category
                        };
                    }
                }

                if (!product) {
                    // Default fallback
                    product = PRODUCT_CATALOG[0];
                }

                // Check if page has a custom quantity input
                const qtyInput = document.getElementById('single-product-qty');
                const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;

                Cart.addItem(product, qty);
            }

            // Quick View Overlay click
            const qvBtn = e.target.closest('.reference-quick-view-overlay');
            if (qvBtn) {
                // If on single product page, switch smoothly; else navigate to single-product.html
                if (!window.location.pathname.endsWith('single-product.html')) {
                    // Allow normal link to single-product.html
                }
            }
        });
    }

    // ==========================================================================
    // 8. DYNAMIC PRODUCT ROTATION, 3D SWINGING & INTERACTIVE ARROWS
    // ==========================================================================
    function initDynamicProductRotators() {
        // Observe dual promotional banners to trigger slide-in on load/scroll
        const cameraCard = document.querySelector('.reference-banner-camera-card');
        const headphoneCard = document.querySelector('.reference-banner-headphone-card');

        if (cameraCard && headphoneCard) {
            cameraCard.classList.add('electro-slide-left');
            headphoneCard.classList.add('electro-slide-right');
        }

        // --- 8A. Top Promo Banners Rotation (Camera & Watch) ---
        const promoCards = document.querySelectorAll('.reference-offers-promo-card');
        if (promoCards.length >= 2) {
            const leftCard = promoCards[0];
            const rightCard = promoCards[1];

            const cameraItems = [
                { title: 'Smart Camera', sub: 'Find The Best Camera for You!', pct: '40%', img: 'assets/promo_camera.png' },
                { title: '4K Pro Drone', sub: 'Aerial Photography Master!', pct: '35%', img: 'assets/product_drone.jpg' },
                { title: 'DSLR 90D Kit', sub: 'Ultimate Cinematic Sensor!', pct: '45%', img: 'assets/dslr_camera.jpg' },
                { title: 'Action Camera', sub: 'Waterproof 60FPS Adventure!', pct: '50%', img: 'assets/product_camera.jpg' }
            ];

            const watchItems = [
                { title: 'Smart Whatch', sub: 'Find The Best Watches for You!', pct: '20%', img: 'assets/promo_watch.png' },
                { title: 'Active Tracker', sub: 'Heart Rate & GPS Fitness!', pct: '30%', img: 'assets/product_smartwatch.jpg' },
                { title: 'Titanium Watch', sub: 'Ultra Luxury Sapphire Glass!', pct: '25%', img: 'assets/watch_crop.png' },
                { title: 'Studio Earbuds', sub: 'Pure Bass Wireless Audio!', pct: '40%', img: 'assets/product_earbuds.jpg' }
            ];

            let camIndex = 0;
            let watchIndex = 0;

            function rotateTopPromos() {
                camIndex = (camIndex + 1) % cameraItems.length;
                watchIndex = (watchIndex + 1) % watchItems.length;

                const c = cameraItems[camIndex];
                const w = watchItems[watchIndex];

                const leftTitle = leftCard.querySelector('.reference-offers-promo-title');
                const leftSub = leftCard.querySelector('.reference-offers-promo-subtitle');
                const leftPct = leftCard.querySelector('.reference-offers-discount-pct');
                const leftImg = leftCard.querySelector('.reference-offers-promo-img');

                if (leftTitle) leftTitle.textContent = c.title;
                if (leftSub) leftSub.textContent = c.sub;
                if (leftPct) leftPct.textContent = c.pct;
                if (leftImg) {
                    leftImg.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                    leftImg.style.opacity = '0';
                    leftImg.style.transform = 'scale(0.85) rotate(-6deg)';
                    setTimeout(() => {
                        leftImg.src = c.img;
                        leftImg.style.opacity = '1';
                        leftImg.style.transform = 'scale(1) rotate(0deg)';
                    }, 320);
                }

                const rightTitle = rightCard.querySelector('.reference-offers-promo-title');
                const rightSub = rightCard.querySelector('.reference-offers-promo-subtitle');
                const rightPct = rightCard.querySelector('.reference-offers-discount-pct');
                const rightImg = rightCard.querySelector('.reference-offers-promo-img');

                if (rightTitle) rightTitle.textContent = w.title;
                if (rightSub) rightSub.textContent = w.sub;
                if (rightPct) rightPct.textContent = w.pct;
                if (rightImg) {
                    rightImg.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                    rightImg.style.opacity = '0';
                    rightImg.style.transform = 'scale(0.85) rotate(6deg)';
                    setTimeout(() => {
                        rightImg.src = w.img;
                        rightImg.style.opacity = '1';
                        rightImg.style.transform = 'scale(1) rotate(0deg)';
                    }, 320);
                }
            }

            setInterval(rotateTopPromos, 5000);
            leftCard.addEventListener('click', rotateTopPromos);
            rightCard.addEventListener('click', rotateTopPromos);
        }

        // --- 8B. Lower Dual Floating Banners Rotation (Camera & Headphones) ---
        const dualCameraCard = document.querySelector('.reference-banner-camera-card');
        const dualHeadphoneCard = document.querySelector('.reference-banner-headphone-card');

        if (dualCameraCard && dualHeadphoneCard) {
            const dualCamItems = [
                { title: 'EOS Rebel<br>T7i Kit', price: '$899.99', img: 'assets/floating_camera_hd.png' },
                { title: 'Cinema 4K<br>Rig Master', price: '$1,299.00', img: 'assets/dslr_camera.jpg' },
                { title: 'Sony Alpha<br>Mirrorless Pro', price: '$1,099.00', img: 'assets/camera_lens.jpg' }
            ];

            const dualHeadItems = [
                { sub: 'Get UP To 50% Off', sale: 'SALE', img: 'assets/floating_headphones_hd.png' },
                { sub: 'ANC Wireless Pro', sale: 'HOT DEAL', img: 'assets/studio_headphone.jpg' },
                { sub: 'Spatial Surround 7.1', sale: 'LIMITED', img: 'assets/product_headphones.jpg' }
            ];

            let dualCamIdx = 0;
            let dualHeadIdx = 0;

            function rotateDualPromos() {
                dualCamIdx = (dualCamIdx + 1) % dualCamItems.length;
                dualHeadIdx = (dualHeadIdx + 1) % dualHeadItems.length;

                const c = dualCamItems[dualCamIdx];
                const h = dualHeadItems[dualHeadIdx];

                const cTitle = dualCameraCard.querySelector('.reference-banner-camera-title');
                const cPrice = dualCameraCard.querySelector('.reference-banner-camera-price');
                const cImg = dualCameraCard.querySelector('.reference-floating-camera-img');

                if (cTitle) cTitle.innerHTML = c.title;
                if (cPrice) cPrice.textContent = c.price;
                if (cImg) {
                    cImg.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                    cImg.style.opacity = '0';
                    cImg.style.transform = 'scale(0.8) rotate(-8deg)';
                    setTimeout(() => {
                        cImg.src = c.img;
                        cImg.style.opacity = '1';
                        cImg.style.transform = 'scale(1) rotate(0deg)';
                    }, 320);
                }

                const hSale = dualHeadphoneCard.querySelector('.reference-banner-headphone-sale');
                const hSub = dualHeadphoneCard.querySelector('.reference-banner-headphone-sub');
                const hImg = dualHeadphoneCard.querySelector('.reference-floating-headphone-img');

                if (hSale) hSale.textContent = h.sale;
                if (hSub) hSub.textContent = h.sub;
                if (hImg) {
                    hImg.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                    hImg.style.opacity = '0';
                    hImg.style.transform = 'scale(0.8) rotate(8deg)';
                    setTimeout(() => {
                        hImg.src = h.img;
                        hImg.style.opacity = '1';
                        hImg.style.transform = 'scale(1) rotate(0deg)';
                    }, 320);
                }
            }

            setInterval(rotateDualPromos, 6000);
            dualCameraCard.addEventListener('click', rotateDualPromos);
            dualHeadphoneCard.addEventListener('click', rotateDualPromos);
        }

        // --- 8C. Hero Showcase Interactive Arrows ---
        const heroSection = document.querySelector('.hero-showcase');
        if (heroSection) {
            const heroPrev = heroSection.querySelector('.hero-arrows .arrow-btn:first-child');
            const heroNext = heroSection.querySelector('.hero-arrows .arrow-btn:last-child');
            const heroHeading = heroSection.querySelector('.hero-heading');
            const heroEyebrow = heroSection.querySelector('.hero-eyebrow');
            const heroImg = heroSection.querySelector('.monitor-img');

            const heroSlides = [
                {
                    eyebrow: 'SAVE UP TO A $200',
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
                    img: 'assets/tablet_pen.jpg'
                }
            ];

            let heroIdx = 0;

            function setHeroSlide(idx) {
                heroIdx = (idx + heroSlides.length) % heroSlides.length;
                const slide = heroSlides[heroIdx];
                if (heroHeading) heroHeading.innerHTML = slide.heading;
                if (heroEyebrow) heroEyebrow.textContent = slide.eyebrow;
                if (heroImg) {
                    heroImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    heroImg.style.opacity = '0';
                    heroImg.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        heroImg.src = slide.img;
                        heroImg.style.opacity = '1';
                        heroImg.style.transform = 'scale(1)';
                    }, 280);
                }
            }

            if (heroPrev) {
                heroPrev.addEventListener('click', (e) => {
                    e.preventDefault();
                    setHeroSlide(heroIdx - 1);
                });
            }
            if (heroNext) {
                heroNext.addEventListener('click', (e) => {
                    e.preventDefault();
                    setHeroSlide(heroIdx + 1);
                });
            }
        }

        // --- 8D. All Product Items Carousel Slider Buttons ---
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
    // 9. PUBLIC API & DOM READY INITIALIZATION
    // ==========================================================================
    window.Electro = {
        STORAGE_KEYS,
        PRODUCT_CATALOG,
        Auth,
        Cart,
        Orders,
        showToast,
        updateNavCartBadge,
        updateNavProfile
    };

    document.addEventListener('DOMContentLoaded', function () {
        initSeedData();
        setupGlobalListeners();
        updateNavCartBadge();
        updateNavProfile();
        initDynamicProductRotators();
    });

})();

