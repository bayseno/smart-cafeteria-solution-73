import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { CartItem } from '@/components/CartItem';
import { QrisButton } from '@/components/QrisButton';
import { useApp } from '@/context/AppContext';

const AnonymousCart = () => {
  const { cart, placeAnonymousOrder, isLoading } = useApp();
  const navigate = useNavigate();
  
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + tax;
  
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  const handlePaymentSuccess = async () => {
    if (!customerName.trim()) {
      return;
    }
    
    const order = await placeAnonymousOrder(customerName, customerEmail, 'qris');
    if (order) {
      navigate(`/orders/${order.id}`);
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow py-10">
          <div className="cafeteria-container text-center">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold mb-2">Keranjang Kosong</h2>
            <p className="text-gray-500 mb-6">Silakan pilih menu favorit Anda</p>
            <Button onClick={() => navigate('/menu')}>
              Lihat Menu
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow py-10">
        <div className="cafeteria-container max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout Pesanan</h1>
          
          <div className="space-y-6">
            {/* Cart Items */}
            <Card>
              <CardHeader>
                <CardTitle>Pesanan Anda ({cart.length} item)</CardTitle>
              </CardHeader>
              <CardContent>
                {cart.map(item => (
                  <CartItem 
                    key={item.itemId}
                    id={item.itemId}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    total={item.total}
                    imageUrl={item.imageUrl}
                    specialInstructions={item.specialInstructions}
                  />
                ))}
              </CardContent>
            </Card>
            
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Pemesan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email (opsional)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="email@contoh.com"
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan & Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pajak (5%)</span>
                    <span>{formatRupiah(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>{formatRupiah(grandTotal)}</span>
                  </div>
                </div>
                
                <QrisButton
                  amount={grandTotal}
                  customerName={customerName}
                  customerEmail={customerEmail}
                  onSuccess={handlePaymentSuccess}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnonymousCart;