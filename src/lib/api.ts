import type { Product } from "./types";

const SELLERS = [
  "TechVault India", "StyleHive", "HomeNest", "FitGear", "GreenMarket",
  "UrbanTrend", "GadgetZone", "Craftoria", "DesiFinds", "LuxeLife"
];

export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80";

const LOCAL_PRODUCTS: Product[] = [
  // Electronics (8)
  { id: 1, title: "boAt Rockerz 450 Bluetooth Headphones", price: 1499, description: "Immersive HD sound with 40mm drivers, 15-hour battery life, padded ear cushions, and foldable design. Perfect for daily commute and workouts.", category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.3, count: 12450 }, seller: "TechVault India", arEnabled: true },

  { id: 2, title: "Samsung Galaxy M34 5G (128GB, 6GB RAM)", price: 16999, description: "6.5-inch Super AMOLED display, Exynos 1280 processor, 50MP triple camera, 6000mAh battery with 25W fast charging.", category: "electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.4, count: 8920 }, seller: "GadgetZone", arEnabled: false },

  { id: 3, title: "Fire-Boltt Phoenix Smart Watch", price: 1799, description: "1.3-inch HD display, SpO2, heart rate & sleep monitor, IP68 waterproof, 120+ sports modes, 7-day battery life.", category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.1, count: 34200 }, seller: "TechVault India", arEnabled: true },

  { id: 4, title: "JBL Flip 6 Portable Bluetooth Speaker", price: 11999, description: "Powerful JBL Original Pro Sound, IP67 waterproof and dustproof, 12 hours of playtime, PartyBoost enabled.", category: "electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.6, count: 5640 }, seller: "GadgetZone", arEnabled: false },

  { id: 5, title: "Noise ColorFit Pro 4 Smartwatch", price: 3499, description: "1.72-inch TruView display, Bluetooth calling, 100+ watch faces, productivity suite, 7-day battery.", category: "electronics",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.2, count: 19800 }, seller: "TechVault India", arEnabled: true },

  { id: 6, title: "Redmi Pad SE 128GB Wi-Fi Tablet", price: 13999, description: "11-inch FHD+ display, Snapdragon 680, quad speakers with Dolby Atmos, 8000mAh battery, metal body.", category: "electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.3, count: 7650 }, seller: "GadgetZone", arEnabled: false },

  { id: 7, title: "Sony WH-1000XM4 Noise Cancelling Headphones", price: 22990, description: "Industry-leading noise cancellation, 30-hour battery, touch sensor controls, speak-to-chat, multipoint connection.", category: "electronics",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.7, count: 15300 }, seller: "TechVault India", arEnabled: true },

  { id: 8, title: "Ambrane 20000mAh Power Bank", price: 1299, description: "20W fast charging, dual USB output, Type-C input, LED indicator, compact design, BIS certified.", category: "electronics",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.0, count: 28400 }, seller: "GadgetZone", arEnabled: false },

  // Men's Clothing (6)
  { id: 9, title: "Allen Solly Men's Slim Fit Formal Shirt", price: 1299, description: "Premium cotton blend, wrinkle-resistant, classic collar, perfect for office and formal occasions.", category: "men's clothing",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.3, count: 6780 }, seller: "StyleHive", arEnabled: false },

  { id: 10, title: "Levi's Men's 511 Slim Fit Jeans", price: 2499, description: "Classic slim fit, premium stretch denim, sits below waist, slim through hip and thigh.", category: "men's clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.5, count: 11200 }, seller: "StyleHive", arEnabled: true },

  { id: 11, title: "U.S. Polo Assn. Men's Polo T-Shirt", price: 899, description: "100% cotton pique, classic fit, signature logo, ribbed collar and cuffs. Available in 12 colors.", category: "men's clothing",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.2, count: 18900 }, seller: "UrbanTrend", arEnabled: false },

  { id: 12, title: "Wildcraft Men's Trekking Jacket", price: 3299, description: "Water-resistant, windproof, breathable fabric, multiple pockets, detachable hood. Ideal for Himalayan treks.", category: "men's clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.4, count: 3450 }, seller: "FitGear", arEnabled: true },

  { id: 13, title: "Peter England Men's Chinos", price: 1599, description: "Slim fit, premium stretch fabric, wrinkle-free, ideal for smart casual wear. Available in 8 shades.", category: "men's clothing",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.1, count: 9870 }, seller: "StyleHive", arEnabled: false },

  { id: 14, title: "Roadster Men's Casual Hoodie", price: 1199, description: "Fleece-lined, kangaroo pocket, drawstring hood, ribbed cuffs. Perfect for winters.", category: "men's clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.3, count: 14500 }, seller: "UrbanTrend", arEnabled: false },

  // Women's Clothing (6)
  { id: 15, title: "Libas Women's Anarkali Kurta Set", price: 1899, description: "Floral printed rayon kurta with palazzo pants and dupatta. Ideal for festive occasions and daily wear.", category: "women's clothing",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.5, count: 22300 }, seller: "DesiFinds", arEnabled: true },

  { id: 16, title: "W Women's Cotton Straight Kurta", price: 999, description: "Premium cotton, mandarin collar, 3/4 sleeves, side slits. A wardrobe essential for Indian women.", category: "women's clothing",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.3, count: 16700 }, seller: "DesiFinds", arEnabled: false },

  { id: 17, title: "BIBA Women's Embroidered Palazzo Set", price: 2799, description: "Chanderi silk kurta with intricate embroidery, palazzo pants, and matching dupatta.", category: "women's clothing",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.6, count: 8900 }, seller: "Craftoria", arEnabled: true },

  { id: 18, title: "Global Desi Women's Maxi Dress", price: 2199, description: "Printed crepe fabric, V-neck, flared silhouette, perfect for brunch dates and casual outings.", category: "women's clothing",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.2, count: 5430 }, seller: "StyleHive", arEnabled: false },

  { id: 19, title: "FabIndia Women's Block Print Saree", price: 3499, description: "Handblock printed cotton saree with contrasting blouse piece. Artisan-crafted in Jaipur.", category: "women's clothing",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.7, count: 4200 }, seller: "Craftoria", arEnabled: false },

  { id: 20, title: "Zara Women's Crop Top", price: 1499, description: "Ribbed knit, square neck, puff sleeves. Trendy western wear for parties and casual hangouts.", category: "women's clothing",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a0a?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.1, count: 7800 }, seller: "LuxeLife", arEnabled: false },

  // Jewellery (6)
  { id: 21, title: "Tanishq 22K Gold Stud Earrings", price: 18500, description: "Delicate floral design, lightweight, hallmarked 22K gold. Comes with certificate of authenticity.", category: "jewelery",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.8, count: 3200 }, seller: "LuxeLife", arEnabled: true },

  { id: 22, title: "Malabar Gold Diamond Pendant", price: 32999, description: "0.15 carat solitaire diamond pendant in 18K white gold with adjustable chain. IGI certified.", category: "jewelery",
    image: "https://images.unsplash.com/photo-1515562141589-67f0d962e749?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.7, count: 1890 }, seller: "LuxeLife", arEnabled: true },

  { id: 23, title: "Zaveri Pearls Kundan Necklace Set", price: 1299, description: "Antique gold finish kundan necklace with matching jhumka earrings. Perfect for weddings.", category: "jewelery",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.3, count: 14500 }, seller: "Craftoria", arEnabled: false },

  { id: 24, title: "Voylla Silver Oxidized Bangles Set", price: 699, description: "Set of 6 oxidized silver bangles with intricate Rajasthani design. Adjustable fit.", category: "jewelery",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.1, count: 21300 }, seller: "DesiFinds", arEnabled: false },

  { id: 25, title: "PC Jeweller Men's Gold Chain (22K)", price: 45999, description: "22K hallmarked gold, 20-inch length, 8g weight, classic link design.", category: "jewelery",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.6, count: 2100 }, seller: "LuxeLife", arEnabled: true },

  { id: 26, title: "Priyaasi Artificial Temple Jewellery Set", price: 899, description: "South Indian temple design choker with jhumka earrings. Gold-plated brass, anti-tarnish.", category: "jewelery",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.2, count: 18700 }, seller: "Craftoria", arEnabled: false },

  // Home & Living (6)
  { id: 27, title: "Bombay Dyeing Cotton Bedsheet Set", price: 1299, description: "King size, 144 TC, 100% cotton, 1 bedsheet + 2 pillow covers. Floral print, easy wash.", category: "home",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.2, count: 16500 }, seller: "HomeNest", arEnabled: true },

  { id: 28, title: "Prestige Iris 750W Mixer Grinder", price: 3499, description: "3 stainless steel jars, 750W motor, 3-speed control with pulse, 2-year warranty.", category: "home",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.4, count: 24500 }, seller: "HomeNest", arEnabled: false },

  { id: 29, title: "Urban Ladder Sheesham Wood Coffee Table", price: 8999, description: "Solid sheesham wood, honey finish, compact design, perfect for living rooms.", category: "home",
    image: "https://images.unsplash.com/photo-1532372320978-5d5f39de4210?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.5, count: 3400 }, seller: "HomeNest", arEnabled: true },

  { id: 30, title: "Pigeon by Stovekraft 12L OTG", price: 4299, description: "1200W, rotisserie, convection, auto-shutoff timer, includes baking tray and grill rack.", category: "home",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.1, count: 11200 }, seller: "HomeNest", arEnabled: false },

  { id: 31, title: "Solimo Microfiber Reversible Comforter", price: 1599, description: "Double bed, 200 GSM fill, hypoallergenic, machine washable. Available in multiple colors.", category: "home",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.3, count: 19800 }, seller: "GreenMarket", arEnabled: false },

  { id: 32, title: "Milton Thermosteel Flask 1L", price: 799, description: "24-hour hot & cold, food-grade stainless steel, leak-proof, ideal for travel.", category: "home",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.4, count: 32100 }, seller: "GreenMarket", arEnabled: false },

  // Sports & Fitness (6)
  { id: 33, title: "Nivia Storm Football (Size 5)", price: 699, description: "32-panel machine stitched, PVC material, ideal for training and recreational play.", category: "sports",
    image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.3, count: 8900 }, seller: "FitGear", arEnabled: true },

  { id: 34, title: "Boldfit Yoga Mat 6mm Anti-Skid", price: 499, description: "NBR foam, anti-slip texture, carrying strap included, sweat-resistant. 183cm x 61cm.", category: "sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.2, count: 27600 }, seller: "FitGear", arEnabled: false },

  { id: 35, title: "Decathlon Domyos 10kg Dumbbell Set", price: 2999, description: "Adjustable weight plates, chrome handle, non-slip grip. Ideal for home workouts.", category: "sports",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.5, count: 5430 }, seller: "FitGear", arEnabled: true },

  { id: 36, title: "Yonex NANORAY Light 18i Badminton Racquet", price: 1890, description: "Isometric head shape, built-in T-joint, 5U weight, ideal for intermediate players.", category: "sports",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.4, count: 6700 }, seller: "FitGear", arEnabled: false },

  { id: 37, title: "Puma Men's Running Shoes (Softride)", price: 3999, description: "SoftFoam+ sockliner, rubber outsole, mesh upper, lightweight and breathable.", category: "sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.3, count: 12300 }, seller: "UrbanTrend", arEnabled: false },

  { id: 38, title: "Lifelong LLM99 Adjustable Resistance Band Set", price: 599, description: "5 resistance levels, door anchor, ankle straps, carrying bag. Full body workout at home.", category: "sports",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=400&q=80",
    rating: { rate: 4.0, count: 15400 }, seller: "FitGear", arEnabled: false },
];

export async function fetchProducts(): Promise<Product[]> {
  return LOCAL_PRODUCTS;
}

export async function fetchProduct(id: number): Promise<Product> {
  const product = LOCAL_PRODUCTS.find((p) => p.id === id);
  if (!product) throw new Error("Product not found");
  return product;
}

export const CATEGORIES = [
  { label: "All", value: "all", emoji: "🛒" },
  { label: "Electronics", value: "electronics", emoji: "📱" },
  { label: "Men's Clothing", value: "men's clothing", emoji: "👔" },
  { label: "Women's Clothing", value: "women's clothing", emoji: "👗" },
  { label: "Jewellery", value: "jewelery", emoji: "💍" },
  { label: "Home & Living", value: "home", emoji: "🏠" },
  { label: "Sports", value: "sports", emoji: "🏏" },
];

export function formatPrice(price: number): string {
  return "₹" + price.toLocaleString("en-IN");
}
