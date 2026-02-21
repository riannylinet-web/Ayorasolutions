// WhatsApp phone number
const phoneNumber = "254112318201";

// Initialize products in LocalStorage if not exists
function initializeProducts() {
    if (!localStorage.getItem('ayoraProducts')) {
        const defaultProducts = [
            { id: 1, name: "HP EliteBook folio i7", specs: "8GB RAM • 256GB SSD", price: "KSH 28,000", category: "laptop", image: "laptop 14.jpg", active: true },
            { id: 2, name: "HP EliteBook 840 g5 i5", specs: "8GB RAM • 256GB SSD", price: "KSH 26,000", category: "laptop", image: "laptop 2.jpeg", active: true },
            { id: 3, name: "Dell latitude 3400", specs: "8GB RAM • 256GB SSD", price: "KSH 28,000", category: "laptop", image: "laptop 12.jpg", active: true },
            { id: 4, name: "Dell latitude 6320 intel i5", specs: "4GB RAM • 500GB HDD", price: "KSH 25,000", category: "laptop", image: "laptop 11.jpg", active: true },
            { id: 5, name: "Dell inspiron 13 7390", specs: "8GB RAM • 256GB SSD TOUCHSCREEN", price: "KSH 29,000", category: "laptop", image: "laptop 13.jpg", active: true },
            { id: 6, name: "Dell Latitude i7", specs: "16GB RAM • 512GB SSD", price: "KSH 28,000", category: "laptop", image: "laptop 3.jpg", active: true },
            { id: 7, name: "Dell Latitude i5", specs: "8GB RAM • 256GB SSD", price: "KSH 22,000", category: "laptop", image: "laptop 4.jpg", active: true },
            { id: 8, name: "Lenovo ThinkPad i7", specs: "16GB RAM • 512GB SSD", price: "KSH 30,000", category: "laptop", image: "laptop 5.jpg", active: true },
            { id: 9, name: "Lenovo ThinkPad i5", specs: "8GB RAM • 256GB SSD", price: "KSH 23,000", category: "laptop", image: "laptop 6.jpg", active: true },
            { id: 10, name: "Acer Aspire i5", specs: "8GB RAM • 512GB SSD", price: "KSH 32,000", category: "laptop", image: "laptop 7.jpg", active: true },
            { id: 11, name: "HP Pavilion i5", specs: "12GB RAM • 512GB SSD", price: "KSH 35,000", category: "laptop", image: "laptop 8.jpg", active: true },
            { id: 12, name: "MacBook Air 2017", specs: "8GB RAM • 256GB SSD", price: "KSH 45,000", category: "laptop", image: "laptop 9.jpg", active: true },
            { id: 13, name: "MacBook Pro 2016", specs: "16GB RAM • 512GB SSD", price: "KSH 55,000", category: "laptop", image: "laptop 10.jpg", active: true },
            { id: 14, name: "Laptop Charger", specs: "Universal charger", price: "KSH 1,800", category: "accessory", image: "charger.jpg", active: true },
            { id: 15, name: "Laptop Bag", specs: "Waterproof & durable", price: "KSH 2,000", category: "accessory", image: "bag.jpg", active: true },
            { id: 16, name: "Wireless Mouse", specs: "Rechargeable", price: "KSH 800", category: "accessory", image: "mouse.jpg", active: true },
            { id: 17, name: "Epson Ecotank l3211", specs: "ALL-IN-ONE TANK PRINTER", price: "KSH 29,000", category: "accessory", image: "printer 2.jpg", active: true },
            { id: 18, name: "Epson Ecotank l3250", specs: "ALL-IN-ONE TANK PRINTER", price: "KSH 31,000", category: "accessory", image: "printer 1.jpg", active: true },
            { id: 19, name: "USB Keyboard", specs: "Comfort typing", price: "KSH 900", category: "accessory", image: "keyboard.jpg", active: true },
            { id: 20, name: "Cooling Pad", specs: "Dual fan", price: "KSH 1,500", category: "accessory", image: "cooling.jpg", active: true },
            { id: 21, name: "External HDD 1TB", specs: "USB 3.0", price: "KSH 6,500", category: "accessory", image: "harddisk.jpg", active: true },
            { id: 22, name: "Flash Disk 64GB", specs: "High speed", price: "KSH 700", category: "accessory", image: "flash.jpg", active: true },
            { id: 23, name: "HDMI Cable", specs: "4K support", price: "KSH 600", category: "accessory", image: "hdmi.jpg", active: true }
        ];
        localStorage.setItem('ayoraProducts', JSON.stringify(defaultProducts));
    }
}

// Get products from LocalStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('ayoraProducts')) || [];
}

// Render products to the page
function renderProducts() {
    const products = getProducts().filter(p => p.active);
    const productGrid = document.querySelector('.product-grid');

    if (!productGrid) return;

    if (products.length === 0) {
        productGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-box-open" style="font-size: 4rem; color: #ddd; margin-bottom: 20px;"></i>
                <h3>No products available</h3>
                <p>Please check back later or contact us for more information.</p>
            </div>
        `;
        return;
    }

    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}" data-name="${product.name}" data-price="${product.price}">
            <img src="${product.image}" alt="${product.name}" 
                 onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';">
            <h3>${product.name}</h3>
            <p>${product.specs}</p>
            <span class="product-price">${product.price}</span>
            <button class="whatsapp-btn" data-product-id="${product.id}">Buy via WhatsApp</button>
        </div>
    `).join('');

    // Re-initialize search after rendering
    initializeSearch();
}

// ========== SEARCH FUNCTIONALITY ========== //
function initializeSearch() {
    const searchInput = document.getElementById('productSearch');
    const clearBtn = document.getElementById('clearSearch');
    const productCards = document.querySelectorAll('.product-card');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (!searchInput) return;

    // Clear search button
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
            performSearch('');
        });
    }

    // Real-time search
    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 200);
    });

    // Perform the actual search
    function performSearch(searchTerm = '') {
        searchTerm = searchTerm.toLowerCase().trim();
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        let visibleCount = 0;

        productCards.forEach(card => {
            const productName = card.dataset.name.toLowerCase();
            const productCategory = card.dataset.category;
            const productText = card.textContent.toLowerCase();

            // Check if card passes the active filter
            const passesFilter = activeFilter === 'all' || productCategory === activeFilter;

            // Check if card matches search term
            let matchesSearch = true;
            if (searchTerm) {
                matchesSearch = productName.includes(searchTerm) ||
                              productText.includes(searchTerm) ||
                              productCategory.includes(searchTerm);
            }

            // Show/hide card
            const shouldShow = passesFilter && matchesSearch;
            card.style.display = shouldShow ? 'flex' : 'none';

            if (shouldShow) {
                visibleCount++;

                // Highlight matching text (optional)
                if (searchTerm) {
                    highlightText(card, searchTerm);
                } else {
                    removeHighlights(card);
                }
            } else {
                removeHighlights(card);
            }
        });

        // Update search results info
        updateSearchInfo(searchTerm, visibleCount, activeFilter);
    }

    // Highlight matching text
    function highlightText(element, searchTerm) {
        removeHighlights(element);
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        const nodes = [];
        let node;

        while (node = walker.nextNode()) {
            if (node.textContent.match(regex)) {
                nodes.push(node);
            }
        }

        nodes.forEach(node => {
            const span = document.createElement('span');
            span.className = 'search-match';
            span.innerHTML = node.textContent.replace(regex, '<mark>$1</mark>');
            node.parentNode.replaceChild(span, node);
        });
    }

    // Remove highlights
    function removeHighlights(element) {
        const matches = element.querySelectorAll('.search-match');
        matches.forEach(match => {
            const text = document.createTextNode(match.textContent);
            match.parentNode.replaceChild(text, match);
        });
    }

    // Update search results information
    function updateSearchInfo(searchTerm, visibleCount, activeFilter) {
        if (!searchResultsInfo) return;

        let message = '';

        if (searchTerm) {
            message = `Found ${visibleCount} product${visibleCount !== 1 ? 's' : ''} for "${searchTerm}"`;
            if (activeFilter !== 'all') {
                message += ` in ${activeFilter === 'laptop' ? 'Laptops' : 'Accessories'}`;
            }
            searchResultsInfo.style.display = 'block';
        } else if (activeFilter !== 'all') {
            message = `Showing ${visibleCount} ${activeFilter === 'laptop' ? 'laptop' : 'accessory'} product${visibleCount !== 1 ? 's' : ''}`;
            searchResultsInfo.style.display = 'block';
        } else {
            searchResultsInfo.style.display = 'none';
            return;
        }

        searchResultsInfo.textContent = message;
    }

    // Sync search with filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const searchTerm = searchInput.value;
            performSearch(searchTerm);
        });
    });

    // Initial search state
    performSearch('');
}

// ========== WHATSAPP FUNCTION WITH DASHBOARD TRACKING ========== //
function sendToWhatsApp(button) {
    const productCard = button.closest('.product-card');
    const productName = productCard.dataset.name;
    const productPrice = productCard.dataset.price;
    const productCategory = productCard.dataset.category;
    const productDescription = productCard.querySelector('p').textContent;

    // 🆕 SAVE TO DASHBOARD - Track this product inquiry
    saveProductInquiry(productName, productPrice, productCategory, productDescription);

    // Create WhatsApp message
    const message = `Hello AYORA TECH,

I'm interested in this product:

📦 Product: ${productName}
💰 Price: ${productPrice}
📝 Description: ${productDescription}

Please send me more details.`;

    // Open WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');

    // Show notification
    showNotification('Opening WhatsApp with product details...', 'success');
}

// 🆕 NEW FUNCTION: Save product inquiry to dashboard
function saveProductInquiry(productName, productPrice, category, description) {
    try {
        console.log('Saving product inquiry to dashboard...');

        // Get existing messages or initialize
        let messages = JSON.parse(localStorage.getItem('ayoraMessages')) || [];

        // Create inquiry message
        const inquiry = {
            id: Date.now(),
            name: 'Product Inquiry',
            phone: 'Via Website',
            message: `📦 PRODUCT INTEREST: ${productName}\n💰 ${productPrice}\n📂 Category: ${category}\n📝 ${description}\n\nCustomer clicked "Buy via WhatsApp" button`,
            date: new Date().toISOString(),
            read: false,
            type: 'product_inquiry',
            product: productName,
            price: productPrice
        };

        messages.push(inquiry);
        localStorage.setItem('ayoraMessages', JSON.stringify(messages));

        console.log('✅ Product inquiry saved! Total messages:', messages.length);

        // Notify other tabs
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'ayoraMessages',
            newValue: JSON.stringify(messages)
        }));

    } catch (error) {
        console.error('Error saving inquiry:', error);
    }
}

// 🆕 NEW FUNCTION: Show notification
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.ayora-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `ayora-notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: ${type === 'success' ? '#25D366' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideInRight 0.3s ease;
        font-family: 'Segoe UI', sans-serif;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== MAIN INITIALIZATION ========== //
document.addEventListener('DOMContentLoaded', function() {
    // Initialize products in LocalStorage
    initializeProducts();

    // Render products from LocalStorage
    renderProducts();

    // Add WhatsApp button event listeners (for dynamically rendered products)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('whatsapp-btn') || e.target.closest('.whatsapp-btn')) {
            const button = e.target.classList.contains('whatsapp-btn') ? e.target : e.target.closest('.whatsapp-btn');
            sendToWhatsApp(button);
        }
    });

    // Product filtering functionality
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            const productCards = document.querySelectorAll('.product-card');

            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(100px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100px); }
        }
    `;
    document.head.appendChild(style);
});