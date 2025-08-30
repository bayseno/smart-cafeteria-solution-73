import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Github, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-800 text-white py-12">
      <div className="cafeteria-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Warung Sunda</h3>
            <p className="text-gray-300 text-sm">
              Sistem warung digital inovatif yang menyajikan pengalaman kuliner Sunda yang tak terlupakan
              dengan kemudahan transaksi digital dan manajemen pesanan yang cerdas.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-turmeric-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-turmeric-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-turmeric-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-turmeric-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Link Cepat</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-turmeric-400 transition-colors">Beranda</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-turmeric-400 transition-colors">Menu</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-turmeric-400 transition-colors">Pesanan Saya</Link>
              </li>
              <li>
                <Link to="/wallet" className="hover:text-turmeric-400 transition-colors">Dompet</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-turmeric-400 transition-colors">Tentang Kami</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Jam Buka</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between">
                <span>Senin - Jumat</span>
                <span>08:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sabtu</span>
                <span>09:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Minggu</span>
                <span>10:00 - 16:00</span>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>Jl. Raya Bandung No. 123, Kota Bandung, Jawa Barat 40132</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <span>+62 822-1234-5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <span>kontak@warungsunda.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Warung Sunda. Hak cipta dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  );
};
