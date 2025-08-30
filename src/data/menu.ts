
import { MenuItem } from '@/types';
import nasiTimbel from '@/assets/nasi-timbel.jpg';
import gadoGado from '@/assets/gado-gado.jpg';
import sateMaranggi from '@/assets/sate-maranggi.jpg';
import ayamBakar from '@/assets/ayam-bakar.jpg';
import karedok from '@/assets/karedok.jpg';
import pepesIkan from '@/assets/pepes-ikan.jpg';
import esCendol from '@/assets/es-cendol.jpg';
import tehPoci from '@/assets/teh-poci.jpg';
import serabi from '@/assets/serabi.jpg';
import sotoBandung from '@/assets/soto-bandung.jpg';
import nasiLiwet from '@/assets/nasi-liwet.jpg';
import empalGepuk from '@/assets/empal-gepuk.jpg';

export const mockMenuItems: MenuItem[] = [
  // Breakfast items
  {
    id: 'item-1',
    name: 'Nasi Timbel',
    description: 'Nasi putih yang dibungkus daun pisang disajikan dengan ayam goreng, ikan bakar, dan lauk tradisional Sunda',
    price: 25000,
    category: 'breakfast',
    imageUrl: nasiTimbel,
    ingredients: ['Nasi putih', 'Daun pisang', 'Ayam goreng', 'Sambal', 'Lalapan'],
    status: 'available',
    prepTime: 15,
    calories: 450,
    tags: ['popular', 'tradisional', 'khas sunda'],
    rating: 4.8,
    totalOrders: 1200
  },
  {
    id: 'item-2',
    name: 'Gado-Gado Sunda',
    description: 'Salad sayuran segar dengan bumbu kacang khas Sunda, tahu, tempe, dan kerupuk',
    price: 18000,
    category: 'breakfast',
    imageUrl: gadoGado,
    ingredients: ['Sayuran segar', 'Bumbu kacang', 'Tahu', 'Tempe', 'Kerupuk'],
    status: 'available',
    prepTime: 10,
    calories: 320,
    tags: ['sehat', 'vegetarian', 'segar'],
    rating: 4.5,
    totalOrders: 980
  },
  {
    id: 'item-3',
    name: 'Soto Bandung',
    description: 'Sup daging sapi jernih khas Bandung dengan lobak, tauge, dan bawang goreng',
    price: 22000,
    category: 'breakfast',
    imageUrl: sotoBandung,
    ingredients: ['Daging sapi', 'Lobak', 'Tauge', 'Bawang goreng', 'Kerupuk'],
    status: 'available',
    prepTime: 20,
    calories: 280,
    tags: ['hangat', 'berkuah', 'tradisional'],
    rating: 4.3,
    totalOrders: 650
  },
  
  // Lunch items
  {
    id: 'item-4',
    name: 'Nasi Liwet Sunda',
    description: 'Nasi gurih yang dimasak dengan santan dan rempah, disajikan dengan ayam, sayuran, dan sambal',
    price: 30000,
    category: 'lunch',
    imageUrl: nasiLiwet,
    ingredients: ['Beras', 'Santan', 'Ayam', 'Sayuran', 'Sambal', 'Kerupuk'],
    status: 'available',
    prepTime: 25,
    calories: 520,
    tags: ['lengkap', 'gurih', 'khas sunda'],
    rating: 4.7,
    totalOrders: 850
  },
  {
    id: 'item-5',
    name: 'Ayam Bakar Sunda',
    description: 'Ayam bakar bumbu kecap manis khas Sunda dengan sambal dan lalapan segar',
    price: 28000,
    category: 'lunch',
    imageUrl: ayamBakar,
    ingredients: ['Ayam', 'Kecap manis', 'Bumbu bakar', 'Sambal', 'Lalapan'],
    status: 'available',
    prepTime: 30,
    calories: 380,
    tags: ['bakar', 'pedas', 'popular'],
    rating: 4.6,
    totalOrders: 720
  },
  {
    id: 'item-6',
    name: 'Empal Gepuk',
    description: 'Daging sapi goreng manis khas Sunda yang empuk dengan bumbu rempah tradisional',
    price: 35000,
    category: 'lunch',
    imageUrl: empalGepuk,
    ingredients: ['Daging sapi', 'Gula merah', 'Rempah tradisional', 'Santan'],
    status: 'available',
    prepTime: 25,
    calories: 420,
    tags: ['manis', 'empuk', 'spesial'],
    rating: 4.4,
    totalOrders: 580
  },
  
  // Dinner items
  {
    id: 'item-7',
    name: 'Pepes Ikan',
    description: 'Ikan segar dibumbui rempah Sunda dan dikukus dalam daun pisang',
    price: 26000,
    category: 'dinner',
    imageUrl: pepesIkan,
    ingredients: ['Ikan segar', 'Bumbu pepes', 'Daun pisang', 'Cabai', 'Kemangi'],
    status: 'available',
    prepTime: 25,
    calories: 290,
    tags: ['sehat', 'dikukus', 'aromatik'],
    rating: 4.7,
    totalOrders: 490
  },
  {
    id: 'item-8',
    name: 'Sate Maranggi',
    description: 'Sate daging sapi khas Purwakarta dengan bumbu kecap dan sambal khas',
    price: 32000,
    category: 'dinner',
    imageUrl: sateMaranggi,
    ingredients: ['Daging sapi', 'Bumbu kecap', 'Tusuk sate', 'Sambal', 'Lontong'],
    status: 'available',
    prepTime: 40,
    calories: 450,
    tags: ['spesial', 'bakar', 'popular'],
    rating: 4.9,
    totalOrders: 1100
  },
  
  // Snacks
  {
    id: 'item-9',
    name: 'Karedok',
    description: 'Salad sayuran mentah khas Sunda dengan bumbu kacang pedas dan segar',
    price: 15000,
    category: 'snacks',
    imageUrl: karedok,
    ingredients: ['Sayuran mentah', 'Bumbu kacang', 'Cabai rawit', 'Kerupuk'],
    status: 'available',
    prepTime: 15,
    calories: 180,
    tags: ['segar', 'pedas', 'sehat'],
    rating: 4.5,
    totalOrders: 820
  },
  {
    id: 'item-10',
    name: 'Serabi',
    description: 'Kue tradisional Sunda yang lembut dengan topping gula merah dan kelapa parut',
    price: 12000,
    category: 'desserts',
    imageUrl: serabi,
    ingredients: ['Tepung beras', 'Santan', 'Gula merah', 'Kelapa parut'],
    status: 'available',
    prepTime: 5,
    calories: 220,
    tags: ['manis', 'tradisional', 'lembut'],
    rating: 4.6,
    totalOrders: 750
  },
  
  // Beverages
  {
    id: 'item-11',
    name: 'Teh Poci',
    description: 'Teh tradisional Sunda yang diseduh dalam poci tanah liat dengan gula batu',
    price: 8000,
    category: 'beverages',
    imageUrl: tehPoci,
    ingredients: ['Teh hitam', 'Gula batu', 'Air panas'],
    status: 'available',
    prepTime: 8,
    calories: 45,
    tags: ['hangat', 'tradisional', 'popular'],
    rating: 4.8,
    totalOrders: 1500
  },
  {
    id: 'item-12',
    name: 'Es Cendol',
    description: 'Minuman segar khas Indonesia dengan cendol hijau, santan, dan gula merah',
    price: 10000,
    category: 'beverages',
    imageUrl: esCendol,
    ingredients: ['Cendol hijau', 'Santan', 'Gula merah', 'Es batu'],
    status: 'available',
    prepTime: 2,
    calories: 150,
    tags: ['segar', 'manis', 'dingin'],
    rating: 4.7,
    totalOrders: 920
  }
];
