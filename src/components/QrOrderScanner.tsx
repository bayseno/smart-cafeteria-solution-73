import React, { useState, useEffect } from 'react';
import { QrCode, Smartphone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import QRCode from 'qrcode';

interface QrOrderScannerProps {
  orderUrl?: string;
}

export const QrOrderScanner: React.FC<QrOrderScannerProps> = ({ 
  orderUrl = 'https://id-preview--1d73d408-eb93-428e-8539-c3c868f1302a.lovable.app/menu' 
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateQR = async () => {
      try {
        setIsLoading(true);
        const qrDataURL = await QRCode.toDataURL(orderUrl, {
          width: 256,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'M'
        });
        setQrCodeUrl(qrDataURL);
      } catch (error) {
        console.error('Error generating QR code:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generateQR();
  }, [orderUrl]);

  const copyUrl = () => {
    navigator.clipboard.writeText(orderUrl);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <QrCode className="h-6 w-6 text-primary" />
          Scan & Order
        </CardTitle>
        <Badge variant="secondary" className="mx-auto">
          Pesan Tanpa Antri
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          {isLoading ? (
            <div className="w-64 h-64 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
              <QrCode className="h-16 w-16 text-gray-400" />
            </div>
          ) : (
            <img 
              src={qrCodeUrl} 
              alt="QR Code untuk memesan" 
              className="w-64 h-64 border rounded-lg shadow-sm"
            />
          )}
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-lg">Cara Memesan:</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" />
              <span>1. Scan QR code dengan kamera HP</span>
            </div>
            <div className="flex items-center gap-2">
              <QrCode className="h-4 w-4 text-primary" />
              <span>2. Pilih menu favorit Anda</span>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-primary" />
              <span>3. Checkout dan bayar dengan QRIS</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={copyUrl}
          >
            Salin Link Menu
          </Button>
          <Button 
            className="w-full bg-turmeric-500 hover:bg-turmeric-600"
            onClick={() => window.open(orderUrl, '_blank')}
          >
            Buka Menu Online
          </Button>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          <p>💡 Tip: Simpan link ini untuk memesan kapan saja!</p>
        </div>
      </CardContent>
    </Card>
  );
};