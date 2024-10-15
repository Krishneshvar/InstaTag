import QRCode from 'qrcode';

app.get('/generate-qr', async (req, res) => {
  try {
    const dataArray = req.query.data || ['vno', 'eno', 'cno'];

    // Encode array as JSON
    const jsonData = JSON.stringify(dataArray);

    const qrCodeImage = await QRCode.toDataURL(jsonData);

    res.send(`
      <html>
        <body>
          <h1>Your QR Code</h1>
          <img src="${qrCodeImage}" alt="QR Code" />
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error generating QR code');
  }
});
