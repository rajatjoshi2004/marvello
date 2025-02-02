import QRCode from 'qrcode';

const mergeImages = async (qrDataUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const bgImage = new Image();
    const qrImage = new Image();

    // Set canvas size to match template
    canvas.width = 800;
    canvas.height = 1000;

    bgImage.onload = () => {
      ctx?.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      
      qrImage.onload = () => {
        // Position QR code in the center of the template
        const qrSize = 400;
        const x = (canvas.width - qrSize) / 2;
        const y = (canvas.height - qrSize) / 2;
        
        ctx?.drawImage(qrImage, x, y, qrSize, qrSize);
        resolve(canvas.toDataURL('image/png'));
      };
      
      qrImage.src = qrDataUrl;
    };

    bgImage.onerror = reject;
    qrImage.onerror = reject;
    
    bgImage.src = '/lovable-uploads/0a1cb1a9-fd2d-41dc-9c55-9ee1f7e8b343.png';
  });
};

export const generateQRCode = async (text: string): Promise<string> => {
  try {
    // Generate QR code with transparent background
    const qrDataUrl = await QRCode.toDataURL(text, {
      width: 400,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff00' // Transparent background
      }
    });
    
    // Merge QR code with template background
    return await mergeImages(qrDataUrl);
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
};