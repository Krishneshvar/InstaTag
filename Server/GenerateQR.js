import QRCode from 'qrcode';
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv'
dotenv.config()


const secretKey = process.env.SECRET_KEY; // Use a secure, unique key

export const generateQR = async (req, res) => {
  try {
    const data = req.query.data;

    if (!data) {
      return res.status(400).send('No data provided');
    }

    // Encrypt the data
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();

    // Generate QR code with encrypted data
    const qrCodeImage = await QRCode.toDataURL(encryptedData);

    res.send(`
      <html>
        <body>
          <h1>Your QR Code</h1>
          <img src="${qrCodeImage}" alt="QR Code" />
        </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating QR code');
  }
};
