const createCustomerSupportQuery = async (req, res) => {
    const { name, email, message } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO customer_support (name, email, message) VALUES ($1, $2, $3) RETURNING *',
        [name, email, message]
      );
  
      res.status(201).json({
        message: 'Customer query submitted successfully',
        data: result.rows[0],
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Something went wrong while submitting the query' });
    }
  };
   
  export {createCustomerSupportQuery};