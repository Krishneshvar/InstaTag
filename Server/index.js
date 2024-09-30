import express from 'express';
import QRCode from 'qrcode';
import db from './server/DBConnection';
dotenv.config();

const app = express();
const port = process.env.NODE_PORT;

db.connect();
app.use(express.json());

app.get('/generate-qr', async (req, res) => {
  try {
    const data = req.query.data || 'Default QR Code Data';
    
    // Generate QR code as a base64 image
    const qrCodeImage = await QRCode.toDataURL(data);

    res.send(`
      <html>
      <body>
        <h1>Your QR Code</h1>
        <img src="${qrCodeImage}" alt="QR Code"/>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error generating QR code');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
