// WhatsApp phone number
const phoneNumber = "254112318201";

// Function to send quick message via WhatsApp
function sendQuickMessage() {
    const name = document.getElementById('quickName').value.trim();
    const phone = document.getElementById('quickPhone').value.trim();
    const message = document.getElementById('quickMessage').value.trim();

    // Validate inputs
    if (!name || !phone) {
        alert('Please enter your name and phone number');
        return;
    }

    // Validate phone number
    const phoneRegex = /^[0-9\s\+\-\(\)]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('Please enter a valid phone number (10-15 digits)');
        return;
    }

    // Save message to LocalStorage for admin dashboard
    saveMessageToLocalStorage(name, phone, message);

    // Create WhatsApp message
    const whatsappMessage = `📞 CONTACT MESSAGE - AYORA TECH 📞

👤 Sender Details:
• Name: ${name}
• Phone: ${phone}

💬 Message:
${message || 'No message provided'}

---
📅 Sent on: ${new Date().toLocaleDateString('en-KE', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
})}

📍 From AYORA TECH Contact Page
📞 Please contact me back via WhatsApp/Call`;

    // Open WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');

    // Clear form
    document.getElementById('quickName').value = '';
    document.getElementById('quickPhone').value = '';
    document.getElementById('quickMessage').value = '';

    // Show success notification
    showNotification('Message sent! Opening WhatsApp...', 'success');
}

// Save message to LocalStorage for admin dashboard
function saveMessageToLocalStorage(name, phone, message) {
    try {
        console.log('Saving message to LocalStorage...');

        // Get existing messages or initialize empty array
        let messages = [];
        const stored = localStorage.getItem('ayoraMessages');
        if (stored) {
            messages = JSON.parse(stored);
        }

        // Create new message object
        const newMessage = {
            id: Date.now(),
            name: name,
            phone: phone,
            message: message || 'No message provided',
            date: new Date().toISOString(),
            read: false
        };

        // Add to messages array
        messages.push(newMessage);

        // Save back to LocalStorage
        localStorage.setItem('ayoraMessages', JSON.stringify(messages));

        console.log('Message saved! Total messages:', messages.length);

        // Dispatch custom event to notify other tabs/pages
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'ayoraMessages',
            newValue: JSON.stringify(messages)
        }));

    } catch (error) {
        console.error('Error saving message:', error);
        alert('Warning: Message could not be saved to dashboard, but WhatsApp will still open.');
    }
}

// Function to show notification
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existing = document.querySelector('.ayora-notification');
    if (existing) existing.remove();

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `ayora-notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
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
        font-family: 'Segoe UI', sans-serif;
        animation: slideInRight 0.3s ease;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Function to format phone number
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 6) {
            value = value.slice(0, 3) + ' ' + value.slice(3);
        } else if (value.length <= 9) {
            value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
        } else {
            value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 9) + ' ' + value.slice(9, 12);
        }
    }
    input.value = value;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page loaded - Initializing...');

    // Initialize messages array in LocalStorage if not exists
    if (!localStorage.getItem('ayoraMessages')) {
        localStorage.setItem('ayoraMessages', JSON.stringify([]));
        console.log('Initialized empty messages array');
    }

    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Phone number formatting
    const phoneInput = document.getElementById('quickPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }

    // CRITICAL FIX: Add click event to send message button
    const sendBtn = document.getElementById('sendMessageBtn') || document.querySelector('.send-message-btn');
    if (sendBtn) {
        // Remove any existing onclick to prevent double firing
        sendBtn.onclick = null;
        sendBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            sendQuickMessage();
        });
        console.log('Send button event listener attached');
    } else {
        console.error('Send button not found!');
    }

    // Make all phone numbers clickable
    document.querySelectorAll('.phone-number').forEach(phoneElement => {
        phoneElement.style.cursor = 'pointer';
        phoneElement.title = 'Click to call';
        phoneElement.addEventListener('click', function() {
            const phoneNumber = this.textContent.trim();
            window.open(`tel:${phoneNumber}`);
        });
    });

    // Add Enter key support for form
    document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey && this.id !== 'quickMessage') {
                e.preventDefault();
                sendQuickMessage();
            }
        });
    });

    // Add animation for contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });

    console.log('Contact page initialization complete');
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