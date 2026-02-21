// WhatsApp phone number
const phoneNumber = "254112318201";

// Function to send repair request to WhatsApp
function sendRepairMessage() {
    // Get form values
    const brand = document.getElementById("deviceBrand").value;
    const clientName = document.getElementById("clientName").value.trim();
    const clientPhone = document.getElementById("clientPhone").value.trim();
    const clientLocation = document.getElementById("clientLocation").value.trim();
    const serviceTime = document.getElementById("serviceTime").value;
    const message = document.getElementById("repairMessage").value.trim();
    const successMsg = document.getElementById("aboutSuccessMsg");

    // Validate all required fields
    if (!brand || !clientName || !clientPhone || !clientLocation || !serviceTime || !message) {
        alert("Please fill in all required fields marked with *");
        return;
    }

    // Validate phone number format
    const phoneRegex = /^[0-9\s\+\-\(\)]{10,15}$/;
    if (!phoneRegex.test(clientPhone.replace(/\s/g, ''))) {
        alert("Please enter a valid phone number (10-15 digits)");
        return;
    }

    // Get selected time text
    const timeSelect = document.getElementById("serviceTime");
    const selectedTimeText = timeSelect.options[timeSelect.selectedIndex].text;

    // Create detailed WhatsApp message
    const fullMessage = `🔧 LAPTOP REPAIR REQUEST - AYORA TECH 🔧

👤 CLIENT INFORMATION:
• Name: ${clientName}
• Phone: ${clientPhone}
• Location: ${clientLocation}
• Preferred Time: ${selectedTimeText}

💻 DEVICE DETAILS:
• Laptop Brand: ${brand}

📝 PROBLEM DESCRIPTION:
${message}

⏰ SERVICE REQUEST:
• Requested on: ${new Date().toLocaleDateString('en-KE', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
})}
• Urgency: ${serviceTime === 'asap' ? 'URGENT - As Soon As Possible' : 'Standard'}

---
📞 CONTACT PREFERENCE: Please contact me via WhatsApp/Call
📍 LOCATION NOTE: ${clientLocation}
💰 QUOTE REQUEST: Please provide diagnosis fee and repair estimate

---
This repair request was submitted via AYORA TECH website.`;

    // Show success message
    successMsg.style.display = "block";
    successMsg.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing WhatsApp message...';

    // Disable button temporarily
    const sendBtn = document.getElementById("sendRepairBtn");
    const originalText = sendBtn.innerHTML;
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    sendBtn.disabled = true;

    // Delay for better UX
    setTimeout(() => {
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;
        window.open(whatsappURL, "_blank");
        
        // Update success message
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> WhatsApp opened with your repair request!';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            sendBtn.innerHTML = originalText;
            sendBtn.disabled = false;
            successMsg.style.display = "none";
            
            // Ask if user wants to clear form
            if (confirm("Repair request sent successfully! Would you like to clear the form?")) {
                clearRepairForm();
            }
        }, 3000);
    }, 1500);
}

// Function to clear repair form
function clearRepairForm() {
    document.getElementById("deviceBrand").value = "";
    document.getElementById("clientName").value = "";
    document.getElementById("clientPhone").value = "";
    document.getElementById("clientLocation").value = "";
    document.getElementById("serviceTime").value = "";
    document.getElementById("repairMessage").value = "";
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
    // Add event listener to send button
    document.getElementById('sendRepairBtn').addEventListener('click', sendRepairMessage);
    
    // Phone number formatting
    const phoneInput = document.getElementById("clientPhone");
    if (phoneInput) {
        phoneInput.addEventListener("input", function(e) {
            formatPhoneNumber(this);
        });
    }
    
    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});