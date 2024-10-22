import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to a server)
    setFormSubmitted(true);
  };

  return (
    <div className="contact-page">
      <div className="contact-header text-center py-5">
        <h1>Contact Us</h1>
        <p className="lead">Have any questions or need help? Get in touch with us below.</p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2>Send Us a Message</h2>
            {formSubmitted ? (
              <div className="alert alert-success">
                Thank you for reaching out to us! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            )}
          </div>

          <div className="col-md-6">
            <h2>Customer Support</h2>
            <ul className="list-unstyled">
              <li>
                <strong>Phone:</strong> +91-1234567890
              </li>
              <li>
                <strong>Email:</strong> support@instatag.com
              </li>
              <li>
                <strong>Address:</strong> 123 FastTag Lane, Coimbatore, Tamil Nadu, India
              </li>
              <li>
                <strong>Business Hours:</strong> 9:00 AM - 6:00 PM (Mon-Fri)
              </li>
            </ul>

            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.png" alt="Facebook" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/twitter.png" alt="Twitter" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.png" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
