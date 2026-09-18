# Shopping Cart Integration Guide

This guide will help you integrate the headless shopping cart system into your Vite + React 19 SPA.

## Files Created

1. **`context/CartContext.tsx`** - Global cart state management with localStorage persistence
2. **`components/CheckoutModal.tsx`** - Checkout modal with fulfillment options and postcode validation
3. **`components/ProductGrid.tsx`** - Responsive product grid with animations and cart integration
4. **`components/ShopSection.tsx`** - Shop section for integration into existing single-page sites
5. **`components/ShopPage.tsx`** - Complete standalone shop page with cart sidebar and checkout
6. **`components/CartExample.tsx`** - Example component demonstrating cart usage
7. **`api/create-toyyibpay-bill.ts`** - Vercel serverless function for ToyyibPay integration
8. **`services/toyyibPayService.ts`** - Frontend service for ToyyibPay API calls
9. **`types.ts`** - Updated with cart-related TypeScript interfaces
10. **`constants.tsx`** - Added MOCK_PRODUCTS data
11. **`vercel.json`** - Vercel configuration for serverless functions
12. **`translations.ts`** - Added shop navigation translations for EN/ZH/MS

## Setup Instructions

### 1. Install Dependencies

```bash
npm install @vercel/node
```

### 2. Configure Environment Variables

Add the following to your Vercel environment variables (in Vercel dashboard) or local `.env` file:

```env
TOYYIBPAY_SECRET_KEY=your_toyyibpay_secret_key_here
TOYYIBPAY_CATEGORY_CODE=your_toyyibpay_category_code_here
```

**Important:** Never expose these keys in client-side code. The serverless function handles them securely.

**Production Setup:**
- The API now uses the production ToyyibPay endpoint: `https://toyyibpay.com/index.php/api/createBill`
- Your production category is: `https://toyyibpay.com/Cctv-Access-Controllers`
- Ensure your `TOYYIBPAY_CATEGORY_CODE` matches your production category code
- Amount formatting uses exact decimal (e.g., "460.00") to prevent FPX rounding errors

### 3. Update Your App Root

Wrap your application with the `CartProvider`:

```tsx
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        {/* Your existing app components */}
      </CartProvider>
    </LanguageProvider>
  );
}
```

### 4. Use the Cart in Your Components

```tsx
import { useCart } from './context/CartContext';

function MyComponent() {
  const { cart, addToCart, removeFromCart, updateQuantity, getCartSubtotal } = useCart();
  
  // Add item to cart
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    });
  };
  
  // ... rest of your component
}
```

### 5. Add Checkout Modal

```tsx
import { CheckoutModal } from './components/CheckoutModal';
import { useState } from 'react';

function MyComponent() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const handleCheckout = async (data) => {
    console.log('Checkout data:', data);
    // Additional processing if needed
  };
  
  return (
    <>
      {/* Your existing UI */}
      <button onClick={() => setIsCheckoutOpen(true)}>
        Checkout
      </button>
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onCheckout={handleCheckout}
      />
    </>
  );
}
```

## Features

### ProductGrid
- **Responsive Design**: Grid layout adapts from 1 to 4 columns based on screen size
- **Motion Animations**: Smooth fade-in with staggered delays using `motion/react`
- **Hover Effects**: Cards lift up and enhance shadows on hover
- **Image Handling**: Graceful fallback for missing product images
- **Cart Integration**: Direct "Add to Cart" button with smooth animations
- **Modern UI**: Clean design with gradients, shadows, and proper spacing

### ShopPage
- **Complete Shopping Experience**: Product grid with cart sidebar
- **Sticky Header**: Navigation with cart indicator showing item count
- **Cart Sidebar**: Slide-out cart panel with item management
- **Real-time Updates**: Cart updates immediately reflect in UI
- **Mobile Responsive**: Full cart functionality on all devices

### CartContext
- `addToCart(item)` - Add item to cart (auto-increments quantity if exists)
- `removeFromCart(itemId)` - Remove item from cart
- `updateQuantity(itemId, quantity)` - Update item quantity (0 removes item)
- `clearCart()` - Clear all items from cart
- `getCartSubtotal()` - Get cart subtotal
- `getCartTotal()` - Get cart total (same as subtotal for now)
- `getCartItemCount()` - Get total number of items in cart
- Automatic localStorage persistence
- React 19 compatible

### CheckoutModal
- **Fulfillment Options:**
  - Standard Courier Shipping (RM15.00)
  - Self-Pickup (FREE)
  - Direct Installer Delivery (RM30.00)
- **Postcode Validation:**
  - Direct Installer Delivery only available for postcodes: 14100, 14000, 11900, 13600
  - Automatic validation with inline error messages
- **Form Fields:**
  - Full Name, Email, Phone, Address
  - Postcode (required for Direct Installer Delivery)
- **Automatic ToyyibPay Integration**
- Real-time order summary with dynamic pricing

### ToyyibPay Integration
- Secure serverless function protects API keys
- Automatic bill creation and redirect
- Supports payment callbacks and success pages
- Format-compliant with ToyyibPay API requirements

## Testing

### For Single-Page Integration (Recommended)

Use the `ShopSection` component to integrate into your existing layout:

```tsx
import { CartProvider } from './context/CartContext';
import { ShopSection } from './components/ShopSection';

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Hero />
          {/* Your existing sections */}
          <section id="shop" className="py-16 bg-gray-50">
            <ShopSection />
          </section>
          <Footer />
          {/* Your other components */}
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}
```

### For Standalone Shop Page

Use the `ShopPage` component for a dedicated shop page:

```tsx
import { ShopPage } from './components/ShopPage';

function App() {
  return (
    <CartProvider>
      <ShopPage />
    </CartProvider>
  );
}
```

### For Basic Testing

Use the `CartExample` component for basic testing:

```tsx
import { CartExample } from './components/CartExample';

function App() {
  return (
    <CartProvider>
      <CartExample />
    </CartProvider>
  );
}
```

## Product Grid Component

The `ProductGrid` component provides a modern, responsive catalog with:

- **Responsive Grid**: 1 column on mobile, 2 on tablet, 3-4 on desktop
- **Motion Animations**: Smooth fade-in on load with staggered delays
- **Hover Effects**: Cards lift up and enhance shadows on hover
- **Cart Integration**: Direct "Add to Cart" functionality
- **Image Handling**: Graceful fallback for missing images
- **Modern Design**: Clean cards with gradients and shadows

### Customizing Product Data

Edit `MOCK_PRODUCTS` in `constants.tsx`:

```tsx
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'unique-id',
    name: 'Product Name',
    price: 99.00,
    description: 'Product description',
    image: '/path/to/image.jpg'
  },
  // Add more products...
];
```

## Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `TOYYIBPAY_SECRET_KEY`
   - `TOYYIBPAY_CATEGORY_CODE`
4. Deploy

The serverless function will automatically be deployed as `/api/create-toyyibpay-bill`

## Customization

### Modify Fulfillment Options
Edit `FULFILLMENT_OPTIONS` in `CheckoutModal.tsx`:

```tsx
const FULFILLMENT_OPTIONS = [
  {
    id: 'standard_courier' as FulfillmentMethod,
    name: 'Standard Courier Shipping',
    description: 'Nationwide delivery',
    price: 15.00,
  },
  // Add more options...
];
```

### Modify Postcode Validation
Edit `DIRECT_INSTALLER_POSTCODES` in `CheckoutModal.tsx`:

```tsx
const DIRECT_INSTALLER_POSTCODES = ['14100', '14000', '11900', '13600'];
```

### Add Custom Cart Item Fields
Update the `CartItem` interface in `types.ts` and ensure your cart items include the required fields.

## Security Notes

- ToyyibPay API keys are stored in environment variables
- Serverless function prevents client-side exposure
- All sensitive operations happen server-side
- Never commit `.env` files to version control

## Troubleshooting

### Cart not persisting
- Check browser localStorage settings
- Ensure no browser extensions are blocking localStorage

### ToyyibPay integration failing
- Verify environment variables are set in Vercel
- Check API key and category code are correct
- Review serverless function logs in Vercel dashboard

### Postcode validation not working
- Ensure postcode is exactly 5 digits
- Check against the `DIRECT_INSTALLER_POSTCODES` array
- Verify validation logic in `CheckoutModal.tsx`

## Support

For issues or questions, refer to:
- ToyyibPay API documentation: https://toyyibpay.com/api/
- Vercel serverless functions: https://vercel.com/docs/functions