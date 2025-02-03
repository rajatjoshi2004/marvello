import QRCode from 'qrcode';

const mergeImages = async (qrDataUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 800;
    canvas.height = 1000;

    if (ctx) {
      // Fill background with vibrant purple color
      ctx.fillStyle = '#4F46E5'; // Indigo/purple color that matches the design
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add the QR code
      const qrImage = new Image();
      qrImage.onload = () => {
        const qrSize = 400;
        const x = (canvas.width - qrSize) / 2;
        const y = ((canvas.height - qrSize) / 2) + 100; // Shifted down by 100px
        
        ctx.drawImage(qrImage, x, y, qrSize, qrSize);
        resolve(canvas.toDataURL('image/png'));
      };
      
      qrImage.onerror = reject;
      qrImage.src = qrDataUrl;
    } else {
      reject(new Error('Could not get canvas context'));
    }
  });
};

export const generateQRCode = async (text: string): Promise<string> => {
  try {
    // Generate QR code with transparent background
    const qrDataUrl = await QRCode.toDataURL(text, {
      width: 400,
      margin: 1,
      color: {
        dark: '#FFFFFF', // White QR code
        light: '#ffffff00' // Transparent background
      }
    });
    
    // Merge QR code with colored background
    return await mergeImages(qrDataUrl);
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
};