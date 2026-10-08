# Electro 🛒

> A modern frontend e-commerce and shopping application for browsing, discovering, and purchasing electronic products.

Electro is a multi-page e-commerce web application designed around an electronics and technology shopping experience. The application provides product browsing, promotional offers, product details, customer authentication, shopping cart management, checkout, order creation, order history, profile management, and responsive user interfaces.

The project is built using **HTML5, CSS3, and Vanilla JavaScript**. Client-side application data is persisted through the browser's **localStorage** mechanism.

The current version is implemented as a **frontend/static web application**. No production backend server, external database, REST API, or real payment gateway was identified in the supplied project source.

---

## ✨ Features

Electro includes the following functionality:

- 🏠 Multi-page e-commerce storefront
- 🛍️ Electronics product browsing
- 📦 Product categories
- 🔎 Product filtering
- 🎯 Promotional offers and deals
- 💰 Product pricing and discount information
- ⭐ Product ratings/review interface
- 🖼️ Product image gallery
- 📄 Detailed product information
- 🛒 Add-to-cart functionality
- ➕ Increase product quantity
- ➖ Decrease product quantity
- 🗑️ Remove products from cart
- 🧹 Clear shopping cart
- 💳 Checkout interface
- 📦 Order creation
- 📋 Order history
- 👤 Customer registration
- 🔐 Customer login
- 📱 Login using username, email, or phone
- 🚪 Customer logout
- 👨‍💼 Customer profile/dashboard
- ✏️ Profile editing
- 📊 Customer order statistics
- 💰 Customer spending information
- 🏷️ Favorite category information
- 📝 Review/feedback interface
- 📧 Newsletter subscription interface
- 🔔 Toast-style notifications
- 🔄 Related-product navigation
- 📱 Responsive design
- 💾 Browser-based data persistence
- 🎨 Promotional banners and product sections
- 📱 Mobile-friendly layouts

---

# 📸 Screenshots

Add screenshots of the application to the repository and update the image paths below.

## Home Page

![Electro Home Page](./assets/README-home-page.png)

## Offers Page

![Electro Offers Page](./assets/README-offers-page.png)

## Product Details

![Electro Product Details](./assets/README-product-page.png)

## Shopping Cart

![Electro Shopping Cart](./assets/README-cart-page.png)

## Checkout

![Electro Checkout](./assets/README-checkout-page.png)

## Customer Profile

![Electro Customer Profile](./assets/README-profile-page.png)

> **Note:** The screenshot paths above are placeholders. Replace them with the actual screenshot filenames you want to display on GitHub.

---

# 🛠️ Technologies & Tools

## Frontend Technologies

- HTML5
- CSS3
- JavaScript
- Vanilla JavaScript
- SVG
- Browser `localStorage`

## Styling

The project uses multiple CSS files for page layouts, responsive behavior, product sections, promotional sections, and interactive components.

Main stylesheets include:

- `style.css`
- `app-styles.css`
- `offers-page.css`
- `reference-offers.css`

## Fonts

The project references Google Fonts including:

- Poppins
- Montserrat

## Frameworks

No frontend framework was identified in the provided project.

The application is implemented using:

**HTML + CSS + Vanilla JavaScript**

## External Libraries

No major JavaScript framework or application library was identified in the supplied source files.

---

# 🧩 Application Pages

Electro is organized as a multi-page frontend application.

---

## 1. Home Page

**File:** `index.html`

The home page acts as the primary storefront.

It contains:

- Promotional banners
- Product categories
- Featured products
- Bestseller products
- Product cards
- Product pricing
- Product filtering
- Add-to-cart functionality
- Promotional sections
- Newsletter interface
- Navigation to other application pages

The home page provides the main entry point for customers.

---

## 2. Authentication Page

**File:** `auth.html`

The authentication page provides customer registration and login functionality.

### Registration

Users can provide information including:

- Name
- Username
- Phone
- Email
- Favorite category
- Address
- Password

The application checks locally stored customer information before creating a new account.

### Login

Users can authenticate using:

- Username
- Email
- Phone
- Password

### Logout

Authenticated users can log out of the application.

The current authentication implementation is client-side and uses browser storage.

> **Security Notice:** The current implementation is suitable for a frontend/demo application. It should not be considered production-grade authentication because account information and passwords are handled through browser storage.

---

## 3. Shopping Cart

**File:** `cart.html`

The shopping cart provides the main shopping management functionality.

Users can:

- View products added to the cart
- Increase product quantity
- Decrease product quantity
- Remove individual products
- Clear the complete cart
- View order totals
- Continue toward checkout

Cart information is persisted using browser `localStorage`.

---

## 4. Offers Page

**File:** `offers.html`

The offers page provides a dedicated shopping interface for promotional products and deals.

It includes:

- Promotional products
- Discount information
- Product categories
- Product filtering
- Product cards
- Add-to-cart controls
- Interactive controls
- Promotional sections

---

## 5. Single Product Page

**File:** `single-product.html`

The product details page provides a detailed view of an individual product.

It includes:

- Product images
- Product image gallery
- Product name
- Product category
- Product price
- Product stock information
- Product description
- Quantity controls
- Add-to-cart functionality
- Description section
- Review section/interface
- Related products

---

## 6. Customer Profile

**File:** `profile.html`

The profile page provides the customer dashboard.

It includes:

- Customer information
- Profile/avatar information
- Total spending
- Number of orders
- Cart information
- Favorite category
- Profile editing
- Address information
- Order history
- Feedback interface
- Logout functionality

---

## 7. Contact Page

**File:** `contact.html`

The contact page provides a frontend contact form.

The form includes fields for:

- Name
- Email
- Phone
- Project
- Subject
- Message

The supplied project contains the frontend form interface.

A confirmed server-side contact-processing API was not identified.

---

# 🛒 Shopping Cart System

The cart functionality is implemented primarily through the application's JavaScript logic.

The cart supports:

- Adding products
- Removing products
- Updating product quantities
- Increasing quantities
- Decreasing quantities
- Clearing the cart
- Calculating item counts
- Calculating subtotal/order totals
- Persisting cart information

Cart information is stored in:

```text
electro_cart_items

inside browser localStorage.

Because the data is browser-based, cart persistence depends on the user's browser storage.

🔐 Authorization & Authentication

Electro includes a client-side customer authentication system.

The application supports:

Registration
Login
Logout
Current-user tracking
Customer profile access

Users can log in using:

Username
Email
Phone

The application maintains the current logged-in user through browser storage.

The relevant storage entry is:

electro_current_user

Registered users are stored under:

electro_users_db
Production Security Consideration

The current authentication implementation is designed for frontend/demo purposes.

It should not be used directly for a production application because:

Authentication is handled client-side.
User information is stored in browser storage.
Passwords are not protected by a server-side authentication system.
There is no confirmed server-side session management.
There is no confirmed token-based authentication system.

For production deployment, authentication should be moved to a secure backend.

📦 Orders & Checkout

Electro includes an order and checkout flow.

The checkout process allows users to:

Review products in the cart.
Change product quantities.
Remove unwanted products.
Review order totals.
Enter shipping information.
Select a payment method.
Create an order.
View the order later from the customer profile.

Orders are stored locally in the browser.

The relevant storage key is:

electro_user_orders

Order information can include:

Order ID
Order date
Total amount
Order status
Purchased products
Shipping address
Phone number
Recipient name
Payment method
Payment Processing

The application contains a checkout/payment-method interface.

However, no confirmed real payment gateway integration was found in the supplied source.

There is no confirmed integration for services such as:

Stripe
Razorpay
PayPal
Cashfree
PayU
Other external payment gateways

Therefore, the current checkout should be treated as a frontend/local application flow rather than a production payment system.

💾 Data Storage

Electro currently uses browser localStorage for client-side persistence.

The project defines storage entries including:

electro_users_db
electro_current_user
electro_cart_items
electro_user_orders
electro_user_wishlist
electro_user_reviews
electro_contact_messages

These storage entries are used for application state such as:

Registered users
Current logged-in user
Cart items
Orders
Wishlist-related data
Review-related data
Contact-related data

The exact complete persistence behavior of every storage key should be verified against the relevant page-specific implementation before being considered production functionality.

🗄️ Database

No external database was identified in the supplied project files.

The current application uses:

Browser localStorage

as its persistence mechanism.

No confirmed configuration was found for:

MySQL
PostgreSQL
MongoDB
SQLite
Firebase
Supabase
Other external databases
Production Database

For a production e-commerce application, a server-side database should be introduced for:

Customers
Products
Inventory
Orders
Payments
Reviews
Addresses
Wishlist data
Authentication data

Production database: [Add details]

🔌 API & Backend
Current Backend

The supplied project does not contain a dedicated backend application.

No confirmed backend implementation was found for:

Node.js / Express
Python / FastAPI
PHP
Java/Spring
REST API
GraphQL
Server-side authentication
Server-side database connection
Payment API

The application is therefore currently a client-side/static web application.

API

No external application API was identified in the provided source.

The application primarily performs its operations through frontend JavaScript and browser storage.

Future Backend

A future production architecture could introduce a backend for:

Authentication
User management
Product management
Inventory
Cart synchronization
Order management
Payment processing
Reviews
Contact forms
Customer profiles

Backend/API: [Add details when backend is implemented]

🔐 Environment Variables

No .env file or environment-variable configuration was identified in the supplied project.

Therefore, the current version does not require environment variables to run.

If a backend or third-party service is added later, environment variables should be used for sensitive configuration such as:

DATABASE_URL
API_URL
JWT_SECRET
PAYMENT_API_KEY
PAYMENT_SECRET

These variables are examples of future configuration only and are not currently required by the supplied application.

Never commit real credentials, API keys, passwords, tokens, or database credentials to GitHub.

💻 Requirements

The current project has minimal requirements because it is a static frontend application.

Required
Modern web browser
Visual Studio Code or another code editor
Recommended
Google Chrome
Visual Studio Code
VS Code Live Server extension

No Node.js installation is required based on the supplied project.

No package installation is currently required.

No package.json was identified in the provided project.

📥 Installation & Setup
1. Clone the Repository
git clone YOUR_GITHUB_REPOSITORY_URL
2. Enter the Project Directory
cd YOUR_REPOSITORY_NAME
3. Open the Project in Visual Studio Code
code .
4. Open index.html

The main application entry point is:

index.html

The application can be opened directly in a browser or served using a local development server.

▶️ Running with Visual Studio Code Live Server

Using VS Code Live Server is the recommended local development method.

Step 1

Open the Electro project folder in Visual Studio Code.

Step 2

Install the Live Server extension if it is not already installed.

Step 3

Open:

index.html
Step 4

Right-click inside the editor.

Select:

Open with Live Server
Step 5

The application will open in your browser.

The exact localhost port may vary depending on the Live Server configuration.

📜 Available Scripts / Commands

No package manager configuration was found in the supplied project.

There is no confirmed:

package.json

Therefore, the following commands are not currently part of the documented project workflow:

npm install
npm run dev
npm run build
npm start

Electro currently runs as a static HTML/CSS/JavaScript application.

🧭 Usage Guide
Browse Products

Open the home page:

index.html

Browse products, categories, promotional sections, and featured products.

Explore Offers

Open:

offers.html

Browse promotional products and available filtering options.

View Product Details

Open:

single-product.html

Review product information, images, pricing, stock, descriptions, and related products.

Create an Account

Open:

auth.html

Use the registration interface to create a local customer account.

Login

Use the authentication page to log in with:

Username
Email
Phone
Password
Add Products to Cart

Use the available:

Add to Cart

controls.

Manage Cart

Open:

cart.html

From there you can:

Increase quantities
Decrease quantities
Remove products
Clear the cart
Continue to checkout
Checkout

Complete the checkout form with the required customer/shipping information and select an available payment method.

View Orders

After logging in, open:

profile.html

The profile dashboard provides access to locally stored order information.

📁 Project Structure
Electro/
│
├── index.html
├── auth.html
├── cart.html
├── contact.html
├── offers.html
├── profile.html
├── single-product.html
│
├── electro-core.js
│
├── style.css
├── app-styles.css
├── offers-page.css
├── reference-offers.css
│
├── assets/
│   ├── banner-original.png
│   ├── banner-woman.jpg
│   ├── banner_dslr_card.png
│   ├── banner_headphone_card.png
│   ├── bestseller_cam2.png
│   ├── bestseller_laptop.png
│   ├── bestseller_lens2.png
│   ├── bestseller_polaroid.png
│   ├── bestseller_webcam.png
│   ├── camera_crop.png
│   ├── camera_lens.jpg
│   ├── cyan_phone.jpg
│   ├── dslr_camera.jpg
│   ├── final_bestsellers.png
│   ├── final_dual_banners.png
│   ├── final_fullpage.png
│   ├── floating_camera_hd.png
│   ├── floating_dslr.png
│   ├── floating_dslr_transparent.png
│   ├── floating_headphone.png
│   ├── floating_headphones_hd.png
│   ├── floating_headphone_transparent.png
│   ├── headphones_transparent.jpg
│   ├── item_bestseller_cam.png
│   ├── item_cyan_phone.png
│   ├── item_laptop.png
│   ├── item_lens.png
│   ├── item_phone_hand.png
│   ├── item_phone_hand_clean.png
│   ├── item_tablet_pen.png
│   ├── laptop_open.jpg
│   ├── monitor.png
│   ├── monitor_transparent.png
│   ├── offers_fullpage.png
│   ├── phone_hand.jpg
│   ├── preview.png
│   ├── preview_bestsellers.png
│   ├── preview_floating_promos.png
│   ├── product_camera.jpg
│   ├── product_controller.jpg
│   ├── product_drone.jpg
│   ├── product_earbuds.jpg
│   ├── product_headphones.jpg
│   ├── product_keyboard.jpg
│   ├── product_mouse.jpg
│   ├── product_powerbank.jpg
│   ├── product_smartspeaker.jpg
│   ├── product_smartwatch.jpg
│   ├── product_speaker.jpg
│   ├── product_tablet.jpg
│   ├── promo_camera.png
│   ├── promo_watch.png
│   ├── studio_headphone.jpg
│   ├── tablet_pen.jpg
│   ├── watch_crop.png
│   └── webcam_clip.jpg
│
├── index.html.bak
└── style.css.bak
🧠 Core Application Logic

The main shared JavaScript functionality is located in:

electro-core.js

The core JavaScript handles functionality including:

Authentication
User state
Cart management
Order management
Local storage
Navigation synchronization
Toast notifications
Product interactions
Promotional product behavior

Page-specific JavaScript is also present where required for individual application pages.

🧪 Testing

No dedicated automated testing framework or test suite was identified in the supplied project.

The application can be manually tested through the following user flows:

Authentication Testing
Register a new customer
Attempt duplicate registration
Log in using username
Log in using email
Log in using phone
Log out
Product Testing
Browse products
Filter products
Open product details
View product images
Change quantity
Add product to cart
Cart Testing
Add multiple products
Increase quantity
Decrease quantity
Remove product
Clear cart
Verify cart totals
Checkout Testing
Open checkout
Enter shipping information
Select payment method
Create order
Verify order information
Profile Testing
Open customer profile
Verify customer information
View order history
Check customer statistics
Edit profile information
Log out
Responsive Testing

The application should also be checked across:

Desktop
Laptop
Tablet
Mobile
🚀 Deployment

Electro is a static frontend application and can be deployed using static hosting platforms.

Vercel

The project can be deployed through Vercel.

Deployment Steps
Push the project to GitHub.
Log in to Vercel.
Select Add New Project.
Import the Electro GitHub repository.
Configure the project as a static frontend if required.
Deploy.

Because no build configuration or package.json was identified, there is currently no confirmed application build command.

GitHub Pages

The project can also be considered for static hosting through GitHub Pages because it consists of HTML, CSS, JavaScript, and static assets.

General process:

Push the project to GitHub.
Open repository settings.
Open the Pages section.
Select the appropriate branch.
Select the project root as the publishing source.
Save the configuration.

Exact deployment settings may vary depending on the GitHub repository configuration.

Other Static Hosting

The project may also be deployed using other static hosting providers.

Deployment platform: [Add details if another platform is used]

🛡️ Security Considerations

The current version is a frontend/demo application.

For production deployment, the following areas should be improved:

Move authentication to a secure backend
Never store production passwords directly in browser storage
Hash passwords server-side
Use secure authentication/session mechanisms
Validate all user input server-side
Protect APIs with authorization
Use HTTPS
Secure payment processing
Protect customer information
Implement proper database access controls
Add rate limiting where appropriate
Add server-side order validation
🔄 Browser Storage Reset

Because Electro uses browser localStorage, clearing browser storage for the application will remove locally stored application data.

This may include:

Logged-in user state
Registered users
Cart contents
Orders
Other locally stored application information

For development/testing, browser developer tools can be used to inspect or clear the application's local storage.

🔮 Future Improvements

Potential improvements for future versions include:

Backend
Build a dedicated backend API
Add REST API endpoints
Add secure authentication
Add role-based authorization
Add server-side validation
Database
Add MySQL/PostgreSQL/MongoDB or another production database
Store products server-side
Store customer accounts server-side
Store orders server-side
Store inventory server-side
E-commerce
Real-time inventory
Advanced product search
Product sorting
Product reviews
Wishlist synchronization
Coupons
Discount codes
Order tracking
Product recommendations
Customer notifications
Payments
Integrate a real payment gateway
Add payment verification
Add payment status tracking
Add transaction history
Administration
Admin dashboard
Product management
Category management
Inventory management
Order management
Customer management
Analytics
Quality
Automated unit tests
Integration tests
End-to-end tests
Error monitoring
Performance optimization
Accessibility improvements
SEO improvements
🤝 Contributing

Contributions are welcome.

Contribution Workflow
1. Fork the Repository

Create your own fork of the Electro repository.

2. Clone Your Fork
git clone YOUR_GITHUB_REPOSITORY_URL
3. Create a Feature Branch
git checkout -b feature/your-feature-name
4. Make Your Changes

Implement your feature or bug fix while maintaining the existing project structure.

5. Test the Application

Verify the relevant pages and user flows locally.

6. Stage Your Changes
git add .
7. Commit Your Changes
git commit -m "Add your feature description"
8. Push Your Branch
git push origin feature/your-feature-name
9. Open a Pull Request

Create a Pull Request from your feature branch to the main repository.

Contribution Guidelines

When contributing:

Keep the existing structure organized.
Avoid unrelated changes.
Maintain responsive layouts.
Keep HTML readable.
Keep CSS maintainable.
Keep JavaScript organized.
Test important application flows.
Do not commit sensitive information.
Do not commit API keys, passwords, or private credentials.
Keep documentation updated when functionality changes.
📄 License

No explicit software license was identified in the supplied project files.


If the project is intended to be open source, add an appropriate LICENSE file to the repository.

👨‍💻 Author

Author: [Saksham Pandey]

📊 Project Status

Project: Electro

Type: Frontend E-commerce / Shopping Application

Status: Active Development / Demo

Electro currently provides a frontend shopping experience with:

Product browsing
Offers
Product details
Authentication
Shopping cart
Checkout
Orders
Customer profile
Browser-based persistence

The current source does not include a production backend, external database, real payment gateway, or server-side authentication system.

⚠️ Disclaimer

Electro is currently implemented as a frontend/local-storage e-commerce application.

The authentication, cart, order, and customer data functionality is implemented on the client side using browser storage. It should therefore be considered a demonstration or frontend project rather than a production-ready e-commerce platform.

Do not use the current authentication or browser-storage implementation to handle real passwords, payment credentials, sensitive customer information, or production financial transactions.

For production use, the application should be connected to a secure backend, database, authentication system, and trusted payment provider.

This README documents the functionality and technologies identified from the supplied project files. Features or infrastructure that could not be confirmed from the source have not been presented as existing functionality.

⭐ Electro

Electro — Electronics Shopping Experience

Built with:

HTML5 · CSS3 · Vanilla JavaScript · LocalStorage
