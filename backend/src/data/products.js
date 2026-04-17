const products = [
  // Electronics
  {
    name: 'Samsung Galaxy S23 Ultra',
    image: 'https://images.unsplash.com/photo-1678286742832-26543bb49959?q=80&w=2000&auto=format&fit=crop',
    description: 'Experience the ultimate performance with the latest flagship smartphone featuring a 200MP camera and Snapdragon 8 Gen 2 processor.',
    category: 'Electronics',
    price: 124999,
    countInStock: 25,
  },
  {
    name: 'Apple MacBook Air M2',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2000&auto=format&fit=crop',
    description: 'Supercharged by M2 chip. Thin, light, and powerful laptop with amazing battery life, perfect for professionals out of India.',
    category: 'Electronics',
    price: 114900,
    countInStock: 15,
  },
  {
    name: 'Boat Rockerz 450 Wireless Headphone',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=2000&auto=format&fit=crop',
    description: 'On-ear wireless headphones with massive battery backup, premium padding, and punchy bass custom-tuned for Indian music.',
    category: 'Electronics',
    price: 1499,
    countInStock: 40,
  },
  {
    name: 'Noise ColorFit Pro 4 Smartwatch',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2000&auto=format&fit=crop',
    description: 'Advanced BT calling smartwatch with 1.72" display, 60Hz refresh rate, and comprehensive health tracking.',
    category: 'Electronics',
    price: 2999,
    countInStock: 30,
  },

  // Fashion
  {
    name: 'Manyavar Men\'s Cotton Kurta Set',
    image: 'https://images.unsplash.com/photo-1596783049102-390f7a02c525?q=80&w=2000&auto=format&fit=crop',
    description: 'Elegant maroon cotton blend kurta and churidar set, perfect for Indian weddings, pujas, and festivals.',
    category: 'Fashion',
    price: 3500,
    countInStock: 12,
  },
  {
    name: 'FabIndia Women\'s Silk Saree',
    image: 'https://images.unsplash.com/photo-1610189013038-f91cb10fba0d?q=80&w=2000&auto=format&fit=crop',
    description: 'Authentic handwoven Banarasi silk saree with a traditional gold zari border. Graceful and elegant.',
    category: 'Fashion',
    price: 8500,
    countInStock: 5,
  },
  {
    name: 'Puma Men\'s Running Shoes',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=2000&auto=format&fit=crop',
    description: 'Lightweight and comfortable sports sneakers designed with absolute traction for daily Indian commutes.',
    category: 'Fashion',
    price: 2499,
    countInStock: 50,
  },

  // Home & Kitchen
  {
    name: 'Prestige 5L Pressure Cooker',
    image: 'https://images.unsplash.com/photo-1621319232961-460eb4d7d3c0?q=80&w=2000&auto=format&fit=crop',
    description: 'Hard anodized aluminium pressure cooker with induction base. An absolute essential for every Indian kitchen.',
    category: 'Home & Kitchen',
    price: 1850,
    countInStock: 22,
  },
  {
    name: 'Bajaj Rex 500W Mixer Grinder',
    image: 'https://images.unsplash.com/photo-1626200234771-463de949db2d?q=80&w=2000&auto=format&fit=crop',
    description: 'Powerful 500W motor with 3 stainless steel jars. Perfect for grinding spices natively.',
    category: 'Home & Kitchen',
    price: 2200,
    countInStock: 18,
  },
  {
    name: 'Bombay Dyeing Cotton Bedsheet',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2000&auto=format&fit=crop',
    description: 'Premium pure cotton double bedsheet with 2 pillow covers. Features a striking floral pattern.',
    category: 'Home & Kitchen',
    price: 1299,
    countInStock: 35,
  },
  {
    name: 'Kent RO Water Purifier',
    image: 'https://images.unsplash.com/photo-1616499805494-b29598282361?q=80&w=2000&auto=format&fit=crop',
    description: 'Next-gen RO+UV+UF water purifier utilizing TDS control. Best for Indian tap water purification.',
    category: 'Home & Kitchen',
    price: 15500,
    countInStock: 8,
  },

  // Books
  {
    name: 'The God of Small Things by Arundhati Roy',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2000&auto=format&fit=crop',
    description: 'Winner of the Booker Prize. A profound narrative depicting Indian familial strife and societal boundaries.',
    category: 'Books',
    price: 399,
    countInStock: 60,
  },
  {
    name: 'Indian Polity - M. Laxmikanth',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop',
    description: 'A comprehensive, legendary textbook strictly catered to Indian civil service aspirants and law students.',
    category: 'Books',
    price: 749,
    countInStock: 45,
  },
  {
    name: 'Atomic Habits by James Clear',
    image: 'https://images.unsplash.com/photo-1589998059171-987d88720d3e?q=80&w=2000&auto=format&fit=crop',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving every day.',
    category: 'Books',
    price: 499,
    countInStock: 100,
  },

  // Beauty & Personal Care
  {
    name: 'Himalaya Purifying Neem Face Wash',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2000&auto=format&fit=crop',
    description: 'Clinically proven ayurvedic formulation combining Neem and Turmeric to cleanse and prevent pimples.',
    category: 'Beauty & Care',
    price: 250,
    countInStock: 150,
  },
  {
    name: 'Philips Beard Trimmer',
    image: 'https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?q=80&w=2000&auto=format&fit=crop',
    description: 'Skin-friendly, cordless beard trimmer with self-sharpening stainless steel blades.',
    category: 'Beauty & Care',
    price: 1199,
    countInStock: 25,
  },
  {
    name: 'Parachute Advanced Coconut Hair Oil',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2000&auto=format&fit=crop',
    description: '100% pure coconut oil ensuring deep nourishment for incredibly strong hair roots.',
    category: 'Beauty & Care',
    price: 199,
    countInStock: 80,
  }
];

module.exports = products;
