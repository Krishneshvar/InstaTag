import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import appDB from '../db/appDB.js';

const pool = appDB;

// Employee login controller
const empLoginController = async (req, res) => {
    const { empid, password } = req.body;
  
    try {
      const result = await pool.query('SELECT * FROM employees WHERE empid = $1', [empid]);
  
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Employee ID not found' });
      }
  
      const employee = result.rows[0];
  
      // Use bcrypt to compare hashed password
    //   const isPasswordValid = await bcrypt.compare(password, employee.password);
         const isPasswordValid = (password == employee.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      // Generate and return the token
      const token = jwt.sign({ empid: employee.empid }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
  
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  const getEmployeeDetails = async (req, res) => {
    const { empid } = req.params; // Get empid from request parameters

    try {
        // Query to get employee details based on the provided empid
        const result = await pool.query('SELECT * FROM employees WHERE empid = $1', [empid]);
        const employee = result.rows[0];

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        // Return the employee details including the name
        return res.json({
            empid: employee.empid,
            name: employee.name, // Include employee name
            // Add other fields as needed, for example:
            // email: employee.email,
            // position: employee.position,
            // etc.
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};


  

export { empLoginController , getEmployeeDetails};
