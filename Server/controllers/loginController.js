import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import appDB from '../db/appDB.js';

const pool = appDB;

const loginUser = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ user_id: user.user_id }, 'secretkey');
    return res.json({ token, user_id: user.user_id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const loginEmployee = async (req, res) => {
  const { empid, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM employees WHERE empid = $1', [empid]);
    const employee = result.rows[0];

    if (!employee) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ empid: employee.empid }, 'secretkey'); // Use .env for secrets
    return res.json({ token, empid: employee.empid });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { loginUser, loginEmployee };
