// seed.js
const mongoose = require("mongoose");
const Bag = require("./models/bag"); // make sure your Bag model is correct

const MONGO_URI = "mongodb+srv://tanu_1212:V9KTQZexRxiTC8kG@cluster0.1vziv6c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.log(err));

const bagData = [
  // HANDBAGS (20 items)
  {
    name: "Classic Leather Handbag",
    description: "Elegant leather handbag perfect for everyday use with spacious interior",
    price: 89.99,
    brand: "StyleCraft",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    stock: 15,
    cloudinary_id: "handbag_001"
  },
  {
    name: "Premium Suede Handbag",
    description: "Luxurious suede handbag with gold-tone hardware and adjustable strap",
    price: 129.50,
    brand: "LuxeBags",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop",
    stock: 8,
    cloudinary_id: "handbag_002"
  },
  {
    name: "Vintage Style Handbag",
    description: "Retro-inspired handbag with brass clasps and vintage charm",
    price: 75.00,
    brand: "RetroChic",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1506629905747-f4345752a36e?w=500&h=500&fit=crop",
    stock: 12,
    cloudinary_id: "handbag_003"
  },
  {
    name: "Modern Minimalist Handbag",
    description: "Clean lines and minimalist design for the contemporary woman",
    price: 95.25,
    brand: "ModernEdge",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop",
    stock: 20,
    cloudinary_id: "handbag_004"
  },
  {
    name: "Quilted Chain Handbag",
    description: "Elegant quilted pattern with chain strap, inspired by classic designs",
    price: 159.99,
    brand: "ChainLink",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=500&fit=crop",
    stock: 6,
    cloudinary_id: "handbag_005"
  },
  {
    name: "Structured Top Handle Bag",
    description: "Professional structured handbag with top handle and shoulder strap",
    price: 110.00,
    brand: "Professional",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    stock: 14,
    cloudinary_id: "handbag_006"
  },
  {
    name: "Bohemian Fringe Handbag",
    description: "Free-spirited boho handbag with fringe details and ethnic patterns",
    price: 68.75,
    brand: "BohoVibes",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop",
    stock: 9,
    cloudinary_id: "handbag_007"
  },
  {
    name: "Patent Leather Handbag",
    description: "Glossy patent leather handbag that makes a bold fashion statement",
    price: 142.50,
    brand: "GlossyStyle",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=500&fit=crop",
    stock: 7,
    cloudinary_id: "handbag_008"
  },
  {
    name: "Embossed Crocodile Handbag",
    description: "Sophisticated handbag with crocodile embossed pattern",
    price: 185.00,
    brand: "LuxeCroc",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500&h=500&fit=crop",
    stock: 5,
    cloudinary_id: "handbag_009"
  },
  {
    name: "Canvas Casual Handbag",
    description: "Durable canvas handbag perfect for casual outings and travel",
    price: 45.99,
    brand: "CasualWear",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop",
    stock: 25,
    cloudinary_id: "handbag_010"
  },
  {
    name: "Metallic Evening Handbag",
    description: "Glamorous metallic handbag perfect for evening events",
    price: 78.50,
    brand: "EveningGlow",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1620327968098-c022be5bf521?w=500&h=500&fit=crop",
    stock: 11,
    cloudinary_id: "handbag_011"
  },
  {
    name: "Textured Leather Satchel",
    description: "Classic satchel style with textured leather and buckle closure",
    price: 125.75,
    brand: "ClassicLeather",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=500&h=500&fit=crop",
    stock: 10,
    cloudinary_id: "handbag_012"
  },
  {
    name: "Floral Print Handbag",
    description: "Cheerful floral print handbag perfect for spring and summer",
    price: 62.00,
    brand: "FloralFashion",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1591348811750-5b50c15dce09?w=500&h=500&fit=crop",
    stock: 25,
    cloudinary_id: "crossbody_016"
  },
  {
    name: "Structured Mini Crossbody",
    description: "Petite structured crossbody for minimalist style",
    price: 76.50,
    brand: "MiniStyle",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    stock: 20,
    cloudinary_id: "crossbody_017"
  },
  {
    name: "Drawstring Crossbody",
    description: "Casual drawstring crossbody with adjustable closure",
    price: 44.99,
    brand: "DrawString",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=500&h=500&fit=crop",
    stock: 30,
    cloudinary_id: "crossbody_018"
  },
  {
    name: "Quilted Leather Crossbody",
    description: "Premium quilted leather crossbody with classic appeal",
    price: 118.75,
    brand: "QuiltedLux",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=500&fit=crop",
    stock: 11,
    cloudinary_id: "crossbody_019"
  },
  {
    name: "Multi-Pocket Crossbody",
    description: "Organized crossbody with multiple pockets and compartments",
    price: 62.50,
    brand: "Organized",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1553225989-432073d5c4b1?w=500&h=500&fit=crop",
    stock: 22,
    cloudinary_id: "crossbody_020"
  },

  // CLUTCHES (20 items)
  {
    name: "Beaded Evening Clutch",
    description: "Elegant beaded clutch perfect for formal occasions",
    price: 89.99,
    brand: "EveningGlam",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1620327968098-c022be5bf521?w=500&h=500&fit=crop",
    stock: 12,
    cloudinary_id: "clutch_001"
  },
  {
    name: "Satin Envelope Clutch",
    description: "Sleek satin clutch in classic envelope style",
    price: 45.50,
    brand: "SatinStyle",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=500&fit=crop",
    stock: 18,
    cloudinary_id: "clutch_002"
  },
  {
    name: "Sequined Party Clutch",
    description: "Dazzling sequined clutch that sparkles under lights",
    price: 67.75,
    brand: "PartyGlitter",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1620327968098-c022be5bf521?w=500&h=500&fit=crop",
    stock: 15,
    cloudinary_id: "clutch_003"
  },
  {
    name: "Leather Box Clutch",
    description: "Structured leather clutch with vintage-inspired clasp",
    price: 125.00,
    brand: "VintageBox",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    stock: 8,
    cloudinary_id: "clutch_004"
  },
  {
    name: "Metallic Chain Clutch",
    description: "Glamorous metallic clutch with removable chain strap",
    price: 78.25,
    brand: "MetallicChain",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1620327968098-c022be5bf521?w=500&h=500&fit=crop",
    stock: 14,
    cloudinary_id: "clutch_005"
  },
  {
    name: "Velvet Opera Clutch",
    description: "Luxurious velvet clutch perfect for opera and theater",
    price: 95.50,
    brand: "OperaLux",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=500&fit=crop",
    stock: 10,
    cloudinary_id: "clutch_006"
  },
  {
    name: "Pearl Embellished Clutch",
    description: "Sophisticated clutch with pearl embellishments",
    price: 112.99,
    brand: "PearlElegance",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1620327968098-c022be5bf521?w=500&h=500&fit=crop",
    stock: 9,
    cloudinary_id: "clutch_007"
  },
  {
    name: "Geometric Acrylic Clutch",
    description: "Modern acrylic clutch with geometric design",
    price: 156.00,
    brand: "ModernAcrylic",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop",
    stock: 6,
    cloudinary_id: "clutch_008"
  },
  {
    name: "Feather Trim Clutch",
    description: "Exotic clutch with delicate feather trim details",
    price: 134.75,
    brand: "FeatherLux",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=500&fit=crop",
    stock: 7,
    cloudinary_id: "clutch_009"
  },
  {
    name: "Embroidered Silk Clutch",
    description: "Hand-embroidered silk clutch with intricate patterns",
    price: 145.50,
    brand: "SilkArt",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1591348811750-5b50c15dce09?w=500&h=500&fit=crop",
    stock: 5,
    cloudinary_id: "clutch_010"
  },
  {
    name: "Crystal Minaudière Clutch",
    description: "Dazzling crystal-encrusted minaudière clutch",
    price: 189.99,
    brand: "CrystalGlam",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1620327968098-c022be5bf521?w=500&h=500&fit=crop",
    stock: 4,
    cloudinary_id: "clutch_011"
  },
  {
    name: "Vintage Beaded Pouch",
    description: "Antique-style beaded pouch with drawstring closure",
    price: 73.25,
    brand: "AntiqueStyle",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1506629905747-f4345752a36e?w=500&h=500&fit=crop",
    stock: 11,
    cloudinary_id: "clutch_012"
  },
  {
    name: "Suede Envelope Clutch",
    description: "Soft suede clutch in timeless envelope silhouette",
    price: 89.50,
    brand: "SuedeClassic",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop",
    stock: 13,
    cloudinary_id: "clutch_013"
  },
  {
    name: "Woven Rattan Clutch",
    description: "Natural rattan clutch perfect for summer occasions",
    price: 56.75,
    brand: "NaturalStyle",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
    stock: 16,
    cloudinary_id: "clutch_014"
  },
  {
    name: "Art Deco Inspired Clutch",
    description: "Glamorous clutch with Art Deco patterns and gold accents",
    price: 167.99,
    brand: "ArtDecoGlam",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1620327968098-c022be5bf521?w=500&h=500&fit=crop",
    stock: 6,
    cloudinary_id: "clutch_015"
  },
  {
    name: "Convertible Wristlet Clutch",
    description: "Versatile clutch with detachable wrist strap",
    price: 65.25,
    brand: "Convertible",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    stock: 20,
    cloudinary_id: "clutch_016"
  },
  {
    name: "Holographic Party Clutch",
    description: "Futuristic holographic clutch that changes color in light",
    price: 78.50,
    brand: "FuturisticStyle",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1620327968098-c022be5bf521?w=500&h=500&fit=crop",
    stock: 12,
    cloudinary_id: "clutch_017"
  },
  {
    name: "Bamboo Handle Clutch",
    description: "Eco-friendly clutch with natural bamboo handles",
    price: 92.75,
    brand: "EcoBamboo",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop",
    stock: 9,
    cloudinary_id: "clutch_018"
  },
  {
    name: "Vintage Coin Purse Clutch",
    description: "Retro-style coin purse clutch with kiss-lock closure",
    price: 48.99,
    brand: "RetroStyle",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1506629905747-f4345752a36e?w=500&h=500&fit=crop",
    stock: 22,
    cloudinary_id: "clutch_019"
  },
  {
    name: "Designer Inspired Evening Clutch",
    description: "Affordable clutch inspired by luxury designer styles",
    price: 124.50,
    brand: "LuxeInspired",
    category: "clutches",
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=500&fit=crop",
    stock: 8,
    cloudinary_id: "clutch_020"
  },

  // BACKPACKS (20 items)
  {
    name: "Leather Laptop Backpack",
    description: "Professional leather backpack with padded laptop compartment",
    price: 159.99,
    brand: "TechProfessional",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    stock: 15,
    cloudinary_id: "backpack_001"
  },
  {
    name: "Canvas School Backpack",
    description: "Durable canvas backpack perfect for students and daily use",
    price: 49.75,
    brand: "SchoolReady",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    stock: 35,
    cloudinary_id: "backpack_002"
  },
  {
    name: "Mini Fashion Backpack",
    description: "Trendy mini backpack for fashion-forward individuals",
    price: 67.50,
    brand: "MiniTrend",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    stock: 28,
    cloudinary_id: "backpack_003"
  },
  {
    name: "Hiking Trail Backpack",
    description: "Outdoor backpack with multiple compartments for hiking adventures",
    price: 89.25,
    brand: "TrailBlazer",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    stock: 18,
    cloudinary_id: "backpack_004"
  },
  {
    name: "Vintage Rucksack Backpack",
    description: "Classic rucksack style backpack with leather trim",
    price: 125.99,
    brand: "VintageStyle",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1506629905747-f4345752a36e?w=500&h=500&fit=crop",
    stock: 12,
    cloudinary_id: "backpack_005"
  },
  {
    name: "Anti-Theft Travel Backpack",
    description: "Security-focused backpack with hidden zippers and RFID protection",
    price: 134.50,
    brand: "SecureTravel",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1553225989-432073d5c4b1?w=500&h=500&fit=crop",
    stock: 20,
    cloudinary_id: "backpack_006"
  },
  {
    name: "Convertible Tote Backpack",
    description: "Versatile bag that converts from backpack to tote",
    price: 78.75,
    brand: "FlexiBag",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop",
    stock: 22,
    cloudinary_id: "backpack_007"
  },
  {
    name: "Floral Print Backpack",
    description: "Feminine backpack with beautiful floral patterns",
    price: 56.99,
    brand: "FloralFashion",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1591348811750-5b50c15dce09?w=500&h=500&fit=crop",
    stock: 25,
    cloudinary_id: "backpack_008"
  },
  {
    name: "Waterproof Sports Backpack",
    description: "Water-resistant backpack perfect for sports and outdoor activities",
    price: 73.25,
    brand: "SportActive",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
    stock: 30,
    cloudinary_id: "backpack_009"
  },
  {
    name: "Quilted Designer Backpack",
    description: "Luxury quilted backpack with chain straps",
    price: 189.50,
    brand: "LuxeDesign",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=500&fit=crop",
    stock: 8,
    cloudinary_id: "backpack_010"
  },
  {
    name: "Eco-Friendly Hemp Backpack",
    description: "Sustainable hemp backpack with organic cotton lining",
    price: 65.75,
    brand: "EcoHemp",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop",
    stock: 19,
    cloudinary_id: "backpack_011"
  },
  {
    name: "Gaming RGB Backpack",
    description: "High-tech backpack with LED RGB lighting for gamers",
    price: 145.99,
    brand: "GamerTech",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    stock: 14,
    cloudinary_id: "backpack_012"
  },
  {
    name: "Roll-Top Urban Backpack",
    description: "Modern roll-top backpack perfect for urban commuting",
    price: 92.50,
    brand: "UrbanCommuter",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1553225989-432073d5c4b1?w=500&h=500&fit=crop",
    stock: 17,
    cloudinary_id: "backpack_013"
  },
  {
    name: "Bohemian Tapestry Backpack",
    description: "Artistic backpack with bohemian tapestry patterns",
    price: 68.25,
    brand: "BohoArt",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop",
    stock: 21,
    cloudinary_id: "backpack_014"
  },
  {
    name: "Clear Stadium Backpack",
    description: "Transparent backpack compliant with stadium security requirements",
    price: 34.99,
    brand: "StadiumClear",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
    stock: 40,
    cloudinary_id: "backpack_015"
  },
  {
    name: "Drawstring Gym Backpack",
    description: "Lightweight drawstring backpack perfect for gym sessions",
    price: 24.50,
    brand: "GymEssentials",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
    stock: 50,
    cloudinary_id: "backpack_016"
  },
  {
    name: "Solar Panel Backpack",
    description: "Innovative backpack with built-in solar panel for device charging",
    price: 178.75,
    brand: "SolarTech",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1553225989-432073d5c4b1?w=500&h=500&fit=crop",
    stock: 10,
    cloudinary_id: "backpack_017"
  },
  {
    name: "Foldable Day Pack",
    description: "Ultra-lightweight packable backpack that folds into its own pocket",
    price: 39.99,
    brand: "UltraLight",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop",
    stock: 32,
    cloudinary_id: "backpack_018"
  },
  {
    name: "Insulated Cooler Backpack",
    description: "Backpack with insulated compartment for food and beverages",
    price: 67.50,
    brand: "CoolPack",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1553225989-432073d5c4b1?w=500&h=500&fit=crop",
    stock: 26,
    cloudinary_id: "backpack_019"
  },
  {
    name: "Professional Business Backpack",
    description: "Sleek business backpack with organizational compartments",
    price: 119.99,
    brand: "BusinessPro",
    category: "backpack",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    stock: 16,
    cloudinary_id: "backpack_020"
  },
  {
    name: "Studded Rock Handbag",
    description: "Edgy handbag with metal studs for a rock and roll vibe",
    price: 98.25,
    brand: "RockStyle",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
    stock: 8,
    cloudinary_id: "handbag_001"
  },
  {
    name: "Bamboo Handle Handbag",
    description: "Unique handbag with natural bamboo handles and eco-friendly materials",
    price: 87.50,
    brand: "EcoChic",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop",
    stock: 13,
    cloudinary_id: "handbag_002"
  },
  {
    name: "Convertible Day-to-Night Handbag",
    description: "Versatile handbag that transforms from day to evening wear",
    price: 134.99,
    brand: "Versatile",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    stock: 9,
    cloudinary_id: "handbag_003"
  },
  {
    name: "Woven Straw Handbag",
    description: "Natural woven straw handbag perfect for summer beach days",
    price: 54.75,
    brand: "BeachVibes",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
    stock: 22,
    cloudinary_id: "handbag_004"
  },
  {
    name: "Geometric Pattern Handbag",
    description: "Modern handbag with bold geometric patterns and contemporary design",
    price: 76.00,
    brand: "GeometricStyle",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=500&fit=crop",
    stock: 16,
    cloudinary_id: "handbag_005"
  },
  {
    name: "Vintage Chain Mail Handbag",
    description: "Retro chain mail handbag reminiscent of 1920s glamour",
    price: 156.50,
    brand: "VintageGlam",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1620327968098-c022be5bf521?w=500&h=500&fit=crop",
    stock: 4,
    cloudinary_id: "handbag_006"
  },
  {
    name: "Designer Inspired Handbag",
    description: "Affordable handbag inspired by high-end designer styles",
    price: 92.99,
    brand: "DesignInspired",
    category: "handbag",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop",
    stock: 17,
    cloudinary_id: "handbag_007"
  },

  // TOTE BAGS (20 items)
  {
    name: "Large Canvas Tote",
    description: "Spacious canvas tote bag perfect for shopping and everyday use",
    price: 35.99,
    brand: "EverydayCarry",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    stock: 30,
    cloudinary_id: "tote_002"
  },
  {
    name: "Leather Work Tote",
    description: "Professional leather tote with laptop compartment and organizer pockets",
    price: 145.00,
    brand: "WorkStyle",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1553225989-432073d5c4b1?w=500&h=500&fit=crop",
    stock: 12,
    cloudinary_id: "tote_003"
  },
  {
    name: "Beach Mesh Tote",
    description: "Breathable mesh tote bag perfect for beach trips and pool days",
    price: 28.50,
    brand: "BeachBound",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
    stock: 35,
    cloudinary_id: "tote_004"
  },
  {
    name: "Reversible Tote Bag",
    description: "Two bags in one - reversible design with different colors on each side",
    price: 67.75,
    brand: "TwoInOne",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop",
    stock: 18,
    cloudinary_id: "tote_004"
  },
  {
    name: "Structured Saffiano Tote",
    description: "Elegant structured tote in durable Saffiano leather",
    price: 189.99,
    brand: "LuxeTote",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    stock: 8,
    cloudinary_id: "tote_005"
  },
  {
    name: "Eco-Friendly Jute Tote",
    description: "Sustainable jute tote bag with reinforced handles",
    price: 24.99,
    brand: "EcoFriendly",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop",
    stock: 40,
    cloudinary_id: "tote_006"
  },
  {
    name: "Quilted Nylon Tote",
    description: "Lightweight quilted nylon tote perfect for travel",
    price: 56.25,
    brand: "TravelLight",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=500&fit=crop",
    stock: 25,
    cloudinary_id: "tote_007"
  },
  {
    name: "Monogram Canvas Tote",
    description: "Personalized monogram tote bag in premium canvas",
    price: 78.00,
    brand: "Personal",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=500&h=500&fit=crop",
    stock: 15,
    cloudinary_id: "tote_008"
  },
  {
    name: "Transparent PVC Tote",
    description: "Clear PVC tote bag perfect for stadium events and security checks",
    price: 19.99,
    brand: "ClearView",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
    stock: 50,
    cloudinary_id: "tote_009"
  },
  {
    name: "Rope Handle Tote",
    description: "Nautical-inspired tote with rope handles and canvas body",
    price: 42.50,
    brand: "Nautical",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
    stock: 20,
    cloudinary_id: "tote_010"
  },
  {
    name: "Foldable Travel Tote",
    description: "Collapsible tote bag that folds into a compact pouch",
    price: 33.75,
    brand: "CompactTravel",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop",
    stock: 28,
    cloudinary_id: "tote_011"
  },
  {
    name: "Striped Canvas Tote",
    description: "Classic striped canvas tote with leather trim",
    price: 48.99,
    brand: "ClassicStripes",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1591348811750-5b50c15dce09?w=500&h=500&fit=crop",
    stock: 22,
    cloudinary_id: "tote_012"
  },
  {
    name: "Insulated Cooler Tote",
    description: "Insulated tote bag perfect for picnics and grocery shopping",
    price: 39.50,
    brand: "CoolCarry",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1553225989-432073d5c4b1?w=500&h=500&fit=crop",
    stock: 26,
    cloudinary_id: "tote_013"
  },
  {
    name: "Metallic Finish Tote",
    description: "Glamorous metallic tote bag that catches the light beautifully",
    price: 65.00,
    brand: "Metallic",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1620327968098-c022be5bf521?w=500&h=500&fit=crop",
    stock: 14,
    cloudinary_id: "tote_014"
  },
  {
    name: "Vintage Leather Tote",
    description: "Distressed leather tote with vintage character and patina",
    price: 125.75,
    brand: "VintageLeather",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1506629905747-f4345752a36e?w=500&h=500&fit=crop",
    stock: 10,
    cloudinary_id: "tote_015"
  },
  {
    name: "Neoprene Sport Tote",
    description: "Durable neoprene tote perfect for gym and sports activities",
    price: 52.25,
    brand: "SportActive",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
    stock: 19,
    cloudinary_id: "tote_016"
  },
  {
    name: "Embroidered Boho Tote",
    description: "Bohemian tote with intricate embroidery and tassel details",
    price: 71.50,
    brand: "BohoChic",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop",
    stock: 16,
    cloudinary_id: "tote_017"
  },
  {
    name: "Waxed Canvas Tote",
    description: "Water-resistant waxed canvas tote with leather accents",
    price: 89.99,
    brand: "Waterproof",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=500&h=500&fit=crop",
    stock: 13,
    cloudinary_id: "tote_018"
  },
  {
    name: "Convertible Tote Backpack",
    description: "Versatile bag that converts from tote to backpack",
    price: 95.50,
    brand: "Convertible",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop",
    stock: 11,
    cloudinary_id: "tote_019"
  },
  {
    name: "Minimalist Leather Tote",
    description: "Clean, minimal leather tote for the modern professional",
    price: 156.00,
    brand: "Minimal",
    category: "tote bag",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    stock: 9,
    cloudinary_id: "tote_020"
  },

  // CROSSBODY BAGS (20 items)
  {
    name: "Small Leather Crossbody",
    description: "Compact leather crossbody bag perfect for hands-free convenience",
    price: 59.99,
    brand: "HandsFree",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    stock: 24,
    cloudinary_id: "crossbody_001"
  },
  {
    name: "Camera Style Crossbody",
    description: "Vintage-inspired camera bag crossbody with multiple compartments",
    price: 73.50,
    brand: "VintageCamera",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1506629905747-f4345752a36e?w=500&h=500&fit=crop",
    stock: 17,
    cloudinary_id: "crossbody_002"
  },
  {
    name: "Chain Strap Crossbody",
    description: "Elegant crossbody with chain strap and quilted pattern",
    price: 86.75,
    brand: "ChainStyle",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=500&fit=crop",
    stock: 15,
    cloudinary_id: "crossbody_003"
  },
  {
    name: "Canvas Messenger Crossbody",
    description: "Casual canvas crossbody in messenger bag style",
    price: 41.99,
    brand: "CasualMessenger",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop",
    stock: 32,
    cloudinary_id: "crossbody_004"
  },
  {
    name: "Bucket Style Crossbody",
    description: "Trendy bucket bag with adjustable crossbody strap",
    price: 67.25,
    brand: "BucketTrend",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop",
    stock: 21,
    cloudinary_id: "crossbody_005"
  },
  {
    name: "Studded Rock Crossbody",
    description: "Edgy crossbody with metal studs and punk rock attitude",
    price: 78.00,
    brand: "RockEdge",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
    stock: 12,
    cloudinary_id: "crossbody_006"
  },
  {
    name: "Fringe Boho Crossbody",
    description: "Bohemian crossbody with fringe details and suede finish",
    price: 54.50,
    brand: "BohoFringe",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop",
    stock: 19,
    cloudinary_id: "crossbody_007"
  },
  {
    name: "Phone Holder Crossbody",
    description: "Compact crossbody designed to hold phone and essentials",
    price: 29.99,
    brand: "PhoneCarry",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop",
    stock: 45,
    cloudinary_id: "crossbody_008"
  },
  {
    name: "Convertible Belt Bag",
    description: "Versatile bag that works as crossbody or belt bag",
    price: 48.75,
    brand: "TwoWay",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    stock: 27,
    cloudinary_id: "crossbody_009"
  },
  {
    name: "Embossed Snake Crossbody",
    description: "Sophisticated crossbody with embossed snake pattern",
    price: 92.50,
    brand: "SnakeStyle",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500&h=500&fit=crop",
    stock: 14,
    cloudinary_id: "crossbody_010"
  },
  {
    name: "Nylon Sport Crossbody",
    description: "Lightweight nylon crossbody perfect for active lifestyles",
    price: 36.25,
    brand: "ActiveWear",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop",
    stock: 33,
    cloudinary_id: "crossbody_011"
  },
  {
    name: "Velvet Evening Crossbody",
    description: "Luxurious velvet crossbody perfect for evening occasions",
    price: 65.99,
    brand: "EveningLux",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1620327968098-c022be5bf521?w=500&h=500&fit=crop",
    stock: 16,
    cloudinary_id: "crossbody_012"
  },
  {
    name: "Geometric Print Crossbody",
    description: "Modern crossbody with bold geometric patterns",
    price: 52.75,
    brand: "ModernGeo",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=500&fit=crop",
    stock: 23,
    cloudinary_id: "crossbody_013"
  },
  {
    name: "Woven Straw Crossbody",
    description: "Natural straw crossbody perfect for summer festivals",
    price: 43.50,
    brand: "SummerVibes",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
    stock: 28,
    cloudinary_id: "crossbody_014"
  },
  {
    name: "Metallic Finish Crossbody",
    description: "Eye-catching metallic crossbody that shines in any light",
    price: 69.25,
    brand: "ShineStyle",
    category: "crossbody bag",
    imageUrl: "https://images.unsplash.com/photo-1620327968098-c022be5bf521?w=500&h=500&fit=crop",
    stock: 18,
    cloudinary_id: "crossbody_015"
  },
]


const seedDB = async () => {
  try {
    await Bag.deleteMany({});
    console.log("Old data cleared");
    await Bag.insertMany(bagData);
    console.log("New bag data inserted");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();

