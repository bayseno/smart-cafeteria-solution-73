
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { QrCode, Copy } from 'lucide-react';

interface QrisButtonProps {
  amount: number;
  customerName?: string;
  customerEmail?: string;
  onSuccess: (paymentId: string) => void;
}

export const QrisButton: React.FC<QrisButtonProps> = ({
  amount,
  customerName,
  customerEmail,
  onSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showQris, setShowQris] = useState(false);
  const { toast } = useToast();
  
  const handlePayment = () => {
    setIsLoading(true);
    setShowQris(true);
    
    // Simulate QRIS payment process
    setTimeout(() => {
      // Simulate successful payment after 3 seconds
      const mockPaymentId = `qris_${Date.now()}`;
      onSuccess(mockPaymentId);
      toast({
        title: "Pembayaran Berhasil",
        description: `ID Pembayaran: ${mockPaymentId}`,
      });
      setIsLoading(false);
      setShowQris(false);
    }, 3000);
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const copyToClipboard = () => {
    const qrisData = `Warung Sunda\nJumlah: ${formatRupiah(amount)}\nQRIS ID: QR${Date.now()}`;
    navigator.clipboard.writeText(qrisData);
    toast({
      title: "Disalin ke Clipboard",
      description: "Data QRIS telah disalin",
    });
  };
  
  if (showQris) {
    return (
      <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg bg-white">
        <QrCode className="h-32 w-32 text-primary" />
        <div className="text-center">
          <h3 className="font-semibold">Scan QRIS untuk Bayar</h3>
          <p className="text-lg font-bold text-primary">{formatRupiah(amount)}</p>
          <p className="text-sm text-muted-foreground">
            Scan QR code dengan aplikasi e-wallet atau mobile banking
          </p>
        </div>
        <Button variant="outline" onClick={copyToClipboard} className="flex items-center gap-2">
          <Copy className="h-4 w-4" />
          Salin Data QRIS
        </Button>
        <div className="text-xs text-center text-muted-foreground">
          Menunggu pembayaran... {isLoading && '⏳'}
        </div>
      </div>
    );
  }
  
  return (
    <Button 
      onClick={handlePayment} 
      disabled={isLoading}
      className="w-full bg-turmeric-500 hover:bg-turmeric-600 flex items-center gap-2"
    >
      <QrCode className="h-4 w-4" />
      {isLoading ? 'Memproses...' : 'Bayar dengan QRIS'}
    </Button>
  );
};
