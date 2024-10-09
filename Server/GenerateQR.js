import QRCode from 'qrcode';

app.get('/generate-qr', async (req, res) => {
    try {
      const data = req.query.data || 'Default QR Code Data';

      const qrCodeImage = await QRCode.toDataURL(data);
  
      res.send(
        <html>
        <body>
          <h1>Your QR Code</h1>
          <img src="${qrCodeImage}" alt="QR Code"/>
        </body>
        </html>
      );
    } catch (err) {
      res.status(500).send('Error generating QR code');
    }
});
