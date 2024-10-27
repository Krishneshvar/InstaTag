import QRCode from 'qrcode';

export const generateQR = async (req, res) => {
  try {
    // Capture the value from the 'data' query parameter
    const data = req.query.data;

    if (!data) {
      return res.status(400).send('No data provided');
    }

    // Generate QR code
    const qrCodeImage = await QRCode.toDataURL(data);

    // Send the QR code image in HTML response
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
