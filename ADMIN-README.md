# AYORA TECH Admin Dashboard Guide

## Overview

This admin dashboard allows you to manage your AYORA TECH website **without any backend database**. All data is stored in the browser's LocalStorage.

---

## Accessing the Admin Dashboard

1. Navigate to `admin-login.html` on your website
2. Default login credentials:
   - **Username:** `admin`
   - **Password:** `ayora2025`
3. Click "Login" to access the dashboard

**⚠️ Important:** Change the default credentials after your first login in the Settings page!

---

## Dashboard Features

### 1. Dashboard Overview (`admin-dashboard.html`)

The main dashboard shows:
- **Total Products** - Number of products in your inventory
- **Active Products** - Products currently visible on the website
- **Total Messages** - Customer inquiries received
- **Today's Inquiries** - Messages received today

You can also see:
- Recent products added
- Recent customer messages
- Quick action buttons

---

### 2. Products Management (`admin-products.html`)

Manage your laptop and accessory inventory:

#### Add a New Product
1. Click "Add Product" button
2. Fill in the product details:
   - **Product Image:** Enter the filename (e.g., `laptop 1.jpg`)
   - **Product Name:** e.g., "HP EliteBook i7"
   - **Category:** Laptop or Accessory
   - **Price:** e.g., "KSH 28,000"
   - **Specifications:** e.g., "8GB RAM • 256GB SSD"
   - **Active:** Check to make visible on website
3. Click "Save Product"

#### Edit a Product
1. Find the product in the grid
2. Click the "Edit" button
3. Modify the details
4. Click "Save Product"

#### Delete a Product
1. Find the product in the grid
2. Click the "Delete" button
3. Confirm the deletion

#### Search & Filter
- Use the search box to find products by name or specs
- Use category filter to show only Laptops or Accessories
- Use status filter to show Active or Inactive products

---

### 3. Messages (`admin-messages.html`)

View and manage customer inquiries:

#### View Messages
- All messages from the contact form appear here
- Unread messages are highlighted with a red border
- Click on any message to view full details

#### Reply to Customers
1. Click on a message to open details
2. Click "Reply on WhatsApp" button
3. This opens WhatsApp with the customer's number

#### Mark as Read
- Click the "Mark Read" button on any message
- Or simply click on the message to open it

#### Delete Messages
- Click the trash icon to delete individual messages
- Use "Clear All" button to delete all messages

#### Statistics
- Total Messages
- Unread count
- Today's messages
- This week's messages

---

### 4. Settings (`admin-settings.html`)

#### Business Information
Update your business details:
- Business Name
- WhatsApp Phone Number
- Email Address
- Business Address
- Default WhatsApp Message

#### Admin Credentials
Change your login details:
1. Enter current password
2. Enter new username (optional)
3. Enter new password (optional)
4. Confirm new password
5. Click "Update Credentials"

#### Data Management

**Export Data**
- Download all your products and messages as a JSON file
- Use this for backups
- Recommended: Export regularly!

**Import Data**
- Restore from a previously exported JSON file
- Useful when moving to a new browser or device

**Reset Products**
- Resets all products to the default list
- Warning: This will remove any custom products you've added

**Clear All Data**
- Deletes everything (products, messages, settings)
- Warning: This cannot be undone!

---

## How It Works (No Backend!)

### LocalStorage Technology

The admin dashboard uses **LocalStorage** - a feature built into all modern web browsers that allows websites to store data locally on the user's computer.

#### What is stored:
- `ayoraProducts` - All your products
- `ayoraMessages` - Customer inquiries
- `ayoraSettings` - Business information
- `adminCredentials` - Login username and password

#### Important Notes:

1. **Data is stored in the browser** - If you clear browser data, the admin data will be lost
2. **Data is device-specific** - Products added on your laptop won't appear on your phone automatically
3. **Regular backups recommended** - Use the Export feature to save backups

---

## How Customer Messages Work

1. Customer fills the contact form on your website
2. When they click "Send Message":
   - The message is saved to LocalStorage
   - WhatsApp opens with your number
3. You can view the message in the Admin Dashboard
4. Reply directly via WhatsApp

---

## File Structure

```
/
├── index.html              # Homepage
├── products.html           # Products page (loads from LocalStorage)
├── about.html              # About page
├── contact.html            # Contact page
├── admin-login.html        # Admin login
├── admin-dashboard.html    # Main dashboard
├── admin-products.html     # Product management
├── admin-messages.html     # Message viewer
├── admin-settings.html     # Settings page
├── style.css               # Main stylesheet
├── script.js               # Homepage scripts
├── products-script.js      # Products page scripts (updated)
├── contact-script.js       # Contact form scripts (updated)
└── [image files]           # Product images
```

---

## Tips & Best Practices

### 1. Regular Backups
- Export your data at least once a week
- Keep backup files in a safe location
- Name backups with dates (e.g., `ayora-backup-2025-02-22.json`)

### 2. Product Images
- Place all product images in the same folder as your HTML files
- Use descriptive filenames (e.g., `laptop-hp-elitebook.jpg`)
- Recommended image size: 400x300 pixels

### 3. Managing Inventory
- Set products as "Inactive" instead of deleting them
- This allows you to reactivate them later
- Use the status filter to manage visibility

### 4. Responding to Customers
- Check the Messages page daily
- Respond promptly for better customer satisfaction
- Use the WhatsApp reply button for quick responses

---

## Troubleshooting

### Can't Login?
- Make sure you're using the correct username and password
- If you forgot credentials, clear LocalStorage and reload the page
- Default credentials will be restored: `admin` / `ayora2025`

### Products Not Showing?
- Check if products are set to "Active"
- Verify the image filenames are correct
- Try refreshing the page

### Messages Not Appearing?
- Make sure customers are clicking the send button
- Check that LocalStorage is enabled in the browser
- Messages are stored per-browser (not shared across devices)

### Data Lost?
- If you cleared browser data, the data is gone
- Restore from a backup using the Import feature
- Always keep regular backups!

---

## Security Notes

1. **Change default password immediately** after first login
2. **Don't share your admin credentials** with untrusted users
3. **Data is stored locally** - anyone with access to your computer can see it
4. **No encryption** - passwords are stored in plain text in LocalStorage

---

## Browser Compatibility

The admin dashboard works on all modern browsers:
- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari
- Opera

**Requirements:**
- JavaScript must be enabled
- LocalStorage must be enabled
- Cookies should be allowed

---

## Need Help?

For technical support or questions about the admin dashboard:
1. Check the Troubleshooting section above
2. Review the browser console for error messages
3. Make sure all files are uploaded correctly to your server

---

**Created by AYORA BRIAN | © 2025 AYORA TECH**
