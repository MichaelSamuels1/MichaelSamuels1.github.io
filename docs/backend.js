/**
 * Backend Business Logic for QuantumHomelab
 * Handles products, cart, checkout, and order management
 * Uses localStorage for persistent data storage
 */

// ===== PRODUCT CATALOG =====
const PRODUCTS = {
    'vault': {
        id: 'vault',
        name: 'The Vault',
        type: 'TIER 1',
        tagline: 'Personal Cloud Storage',
        price: 5,
        yearlyPrice: 48,
        description: 'Perfect for individuals who need secure cloud storage and privacy.',
        features: [
            '100GB Nextcloud Storage',
            'WireGuard Private VPN Access',
            '2TB Monthly Bandwidth',
            'Basic Email Support',
            'GDPR Compliant',
            'No Tracking or Logs'
        ],
        specs: {
            storage: '100GB SSD',
            vpn: 'WireGuard Protocol',
            bandwidth: '2TB/month',
            support: '24-48 hour email response'
        },
        image: '🔒',
        color: 'red'
    },
    'compute': {
        id: 'compute',
        name: 'The Compute Node',
        type: 'TIER 2',
        tagline: 'Application & Container Hosting',
        price: 15,
        yearlyPrice: 144,
        description: 'Developer-focused tier with Docker support and custom application hosting.',
        features: [
            '500GB SSD Storage',
            '2 Docker Container Slots',
            'Dedicated Reverse Proxy',
            'Uptime Monitoring (99.9%)',
            'Priority Email & Chat Support',
            'API Access',
            'Monthly Backup Snapshots',
            'Free SSL/TLS Certificates'
        ],
        specs: {
            storage: '500GB RAID-1 SSD',
            containers: '2 slots (2GB RAM each)',
            proxy: 'Dedicated with auto-scaling',
            support: '4-hour email, 2-hour chat response',
            uptime: '99.9% SLA'
        },
        image: '⚙️',
        color: 'white',
        popular: true
    },
    'core': {
        id: 'core',
        name: 'The Core',
        type: 'TIER 3',
        tagline: 'Enterprise Infrastructure',
        price: 35,
        yearlyPrice: 336,
        description: 'Enterprise-grade hosting with guaranteed uptime, full control, and dedicated support.',
        features: [
            '1TB Storage (RAID-10)',
            'Dedicated VPN Endpoint',
            'Full Reverse Proxy Control',
            '4 Docker Container Slots',
            'Priority 24/7 Phone Support',
            'Dedicated Server Manager',
            'Daily Backup & DR Plan',
            'Custom Compliance Setup',
            'Guaranteed 99.95% SLA'
        ],
        specs: {
            storage: '1TB RAID-10 Enterprise SSD',
            containers: '4 slots (4GB RAM each)',
            vpn: 'Private dedicated endpoint',
            support: '1-hour all channels, 24/7 phone',
            uptime: '99.95% SLA with compensation'
        },
        image: '🏢',
        color: 'red'
    }
};

// ===== CART MANAGEMENT =====
class CartManager {
    constructor() {
        this.loadCart();
    }

    loadCart() {
        const stored = localStorage.getItem('qhl_cart');
        this.items = stored ? JSON.parse(stored) : [];
    }

    saveCart() {
        localStorage.setItem('qhl_cart', JSON.stringify(this.items));
        this.notifyCartUpdated();
    }

    addItem(productId, billing = 'monthly', quantity = 1) {
        const product = PRODUCTS[productId];
        if (!product) return false;

        const existingItem = this.items.find(item => item.id === productId && item.billing === billing);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: productId,
                name: product.name,
                price: billing === 'monthly' ? product.price : product.yearlyPrice,
                billing: billing,
                quantity: quantity
            });
        }

        this.saveCart();
        return true;
    }

    removeItem(productId, billing) {
        this.items = this.items.filter(item => !(item.id === productId && item.billing === billing));
        this.saveCart();
    }

    updateQuantity(productId, billing, quantity) {
        const item = this.items.find(item => item.id === productId && item.billing === billing);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeItem(productId, billing);
            } else {
                this.saveCart();
            }
        }
    }

    getCart() {
        return this.items;
    }

    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getTax() {
        return this.getSubtotal() * 0.08; // 8% tax
    }

    getTotal() {
        return this.getSubtotal() + this.getTax();
    }

    clearCart() {
        this.items = [];
        this.saveCart();
    }

    notifyCartUpdated() {
        const event = new CustomEvent('cartUpdated', { detail: this.getCart() });
        window.dispatchEvent(event);
    }
}

// ===== ORDER MANAGEMENT =====
class OrderManager {
    constructor() {
        this.loadOrders();
    }

    loadOrders() {
        const stored = localStorage.getItem('qhl_orders');
        this.orders = stored ? JSON.parse(stored) : [];
    }

    saveOrders() {
        localStorage.setItem('qhl_orders', JSON.stringify(this.orders));
    }

    createOrder(cart, customerInfo) {
        const order = {
            id: this.generateOrderId(),
            timestamp: new Date().toISOString(),
            customer: customerInfo,
            items: JSON.parse(JSON.stringify(cart)),
            subtotal: cartManager.getSubtotal(),
            tax: cartManager.getTax(),
            total: cartManager.getTotal(),
            status: 'pending',
            paymentMethod: 'card',
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        };

        this.orders.push(order);
        this.saveOrders();
        return order;
    }

    getOrder(orderId) {
        return this.orders.find(order => order.id === orderId);
    }

    getCustomerOrders(email) {
        return this.orders.filter(order => order.customer.email === email);
    }

    updateOrderStatus(orderId, status) {
        const order = this.getOrder(orderId);
        if (order) {
            order.status = status;
            this.saveOrders();
        }
        return order;
    }

    confirmPayment(orderId) {
        return this.updateOrderStatus(orderId, 'confirmed');
    }

    generateOrderId() {
        return 'QHL-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    }

    getAllOrders() {
        return this.orders;
    }
}

// ===== USER AUTHENTICATION (Simple) =====
class UserManager {
    constructor() {
        this.loadUser();
    }

    loadUser() {
        const stored = localStorage.getItem('qhl_user');
        this.user = stored ? JSON.parse(stored) : null;
    }

    saveUser() {
        if (this.user) {
            localStorage.setItem('qhl_user', JSON.stringify(this.user));
        }
    }

    register(email, password, name) {
        if (this.getUser(email)) {
            return { success: false, message: 'Email already registered' };
        }

        this.user = {
            email: email,
            password: this.hashPassword(password),
            name: name,
            createdAt: new Date().toISOString()
        };

        this.saveUser();
        return { success: true, user: this.user };
    }

    login(email, password) {
        const stored = localStorage.getItem('qhl_user');
        const user = stored ? JSON.parse(stored) : null;

        if (!user || user.email !== email || user.password !== this.hashPassword(password)) {
            return { success: false, message: 'Invalid credentials' };
        }

        this.user = user;
        return { success: true, user: this.user };
    }

    logout() {
        this.user = null;
        localStorage.removeItem('qhl_user');
    }

    isLoggedIn() {
        return this.user !== null;
    }

    getCurrentUser() {
        return this.user;
    }

    getUser(email) {
        const stored = localStorage.getItem('qhl_user');
        const user = stored ? JSON.parse(stored) : null;
        return user && user.email === email ? user : null;
    }

    hashPassword(password) {
        // Simple hash (in production, use proper hashing on backend)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return 'hashed_' + Math.abs(hash).toString(16);
    }
}

// ===== UTILITY FUNCTIONS =====

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
}

function getProductById(productId) {
    return PRODUCTS[productId] || null;
}

function getAllProducts() {
    return Object.values(PRODUCTS);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateCheckoutForm(formData) {
    const errors = [];

    if (!formData.fullName || formData.fullName.trim().length < 2) {
        errors.push('Please enter your full name');
    }
    if (!validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    if (!formData.address || formData.address.trim().length < 5) {
        errors.push('Please enter your address');
    }
    if (!formData.city || formData.city.trim().length < 2) {
        errors.push('Please enter your city');
    }
    if (!formData.zip || !/^\d{5}(-\d{4})?$/.test(formData.zip)) {
        errors.push('Please enter a valid ZIP code');
    }
    if (!formData.cardNumber || !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        errors.push('Please enter a valid 16-digit card number');
    }
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        errors.push('Please enter expiry date in MM/YY format');
    }
    if (!formData.cvv || !/^\d{3}$/.test(formData.cvv)) {
        errors.push('Please enter a valid 3-digit CVV');
    }

    return errors;
}

// ===== GLOBAL INSTANCES =====
const cartManager = new CartManager();
const orderManager = new OrderManager();
const userManager = new UserManager();

// ===== EXPORT FOR USE =====
window.QuantumBackend = {
    PRODUCTS,
    CartManager,
    OrderManager,
    UserManager,
    cartManager,
    orderManager,
    userManager,
    getProductById,
    getAllProducts,
    formatCurrency,
    validateEmail,
    validateCheckoutForm
};

// Notify UI of initial cart state
document.addEventListener('DOMContentLoaded', () => {
    cartManager.notifyCartUpdated();
});
