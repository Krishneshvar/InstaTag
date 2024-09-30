const QRCode = require('qrcode');

// Function to generate QR code
const generateQRCode = async (data) => {
  try {
    const qrCodeImage = await QRCode.toDataURL(data);
    console.log(qrCodeImage); // This will output the base64 string of the QR code image
  } catch (err) {
    console.error(err);
  }
};

// Example usage
generateQRCode('This is my data for QR Code!');
