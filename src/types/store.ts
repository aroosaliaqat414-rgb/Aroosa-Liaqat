export type ProductCategory = 
  | 'all' 
  | 'luxury-lawn' 
  | 'chikankari' 
  | 'festive-organza' 
  | 'summer-pret' 
  | 'co-ords' 
  | 'accessories';

export type StitchingType = 'unstitched' | 'stitched';

export type PieceType = 'all' | '3-piece' | '2-piece' | '1-piece';

export type Currency = 'PKR' | 'USD' | 'GBP' | 'AED';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  headline: string;
  comment: string;
  verified: boolean;
  fit: 'True to size' | 'Perfect stitching' | 'Breathable lawn fabric';
}

export interface CustomStitchingNotes {
  shirtLength?: string;
  trouserStyle?: 'Cigarette Pant' | 'Wide-Leg Culotte' | 'Tulip Shalwar' | 'Straight Pant';
  lining?: boolean;
}

export interface Product {
  id: string;
  name: string;
  urduSubtitle?: string;
  subtitle: string;
  category: 'luxury-lawn' | 'chikankari' | 'festive-organza' | 'summer-pret' | 'co-ords' | 'accessories';
  pieces: '3-piece' | '2-piece' | '1-piece';
  pricePKR: number; // Base PKR price (e.g. 14,950 PKR)
  originalPricePKR?: number;
  stitchingPricePKR: number; // e.g. 5,500 PKR if stitching is selected
  tag?: string; // e.g. 'Volume 01', 'Bahaar Edit', 'Schiffli Lawn', 'Selling Fast'
  images: string[];
  colors: ProductColor[];
  sizes: string[]; // ['Unstitched', 'XS', 'S', 'M', 'L', 'XL']
  description: string;
  unstitchedFabricDetails: string[]; // Shirt 3.25m, Dupatta 2.5m, Trouser 2.5m, Embroidered Organza Borders
  composition: string; // e.g., '80s Count Pima Lawn with Pure Chiffon Dupatta'
  craftTechnique: string; // e.g., 'Resham & Tilla Threadwork, Schiffli Cutwork'
  careInstructions: string;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  inStock: boolean;
  pairedProductIds?: string[];
}

export interface CartItem {
  id: string; // unique: `${productId}-${stitching}-${size}-${color}`
  productId: string;
  product: Product;
  stitching: StitchingType;
  selectedSize: string;
  selectedColor: ProductColor;
  customNotes?: CustomStitchingNotes;
  quantity: number;
  itemPricePKR: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string; // Karachi, Lahore, Islamabad, etc.
  province: string; // Punjab, Sindh, KPK, Balochistan, ICT, Overseas
  postalCode: string;
  country: string;
}

export interface OrderConfirmation {
  orderId: string;
  date: string;
  estimatedDelivery: string;
  trackingNumber: string;
  courier: string; // TCS Express, Leopards, DHL Express
  items: CartItem[];
  subtotalPKR: number;
  discountPKR: number;
  shippingFeePKR: number;
  totalPKR: number;
  currency: Currency;
  address: ShippingAddress;
  paymentMethod: string;
}
