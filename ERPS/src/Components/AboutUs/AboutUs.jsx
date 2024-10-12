import React from 'react';
import './AboutUs.css'; 

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1 className="page-title">About Us</h1>

      <section className="about-content">
        <h2>Our Story</h2>
        <p>
          Welcome to the Electronic Road Passing System, a cutting-edge solution developed by
          <strong> Ratheesh Kumar</strong> and <strong>Krishneshvar</strong>. Our goal was to create a seamless,
          efficient, and secure system for managing road passes electronically. With a strong background in software
          development and a passion for solving real-world problems, we worked collaboratively to build a robust
          system using the React framework.
        </p>
      </section>

      <section className="developers">
        <h2>Meet the Developers</h2>
          <div className="devs">
            <div className="developer-card">
              <img src="./ratheesh.jpg" alt="Ratheesh Kumar" className="developer-photo" />
              <h3>Ratheesh Kumar</h3>
              <p>
                A skilled software developer currently pursuing his M.Sc. in Software Systems. He brings
                a wealth of experience in front-end and back-end technologies, excelling in building intuitive and dynamic
                user interfaces. Ratheesh led the project’s design and development, ensuring the system’s efficiency and
                performance.
              </p>
              <p className="socials">
                <img src="/socials/github.png" alt="GitHub Logo" className="social-icon github" href="" />
                <img src="/socials/linkedin.png" alt="LinkedIn Logo" className="social-icon linkedin" href="" />
              </p>
            </div>

            <div className="developer-card">
              <img src="./krishneshvar.jpg" alt="Krishneshvar" className="developer-photo" />
              <h3>Krishneshvar</h3>
              <p>
                A passionate developer focused on problem-solving and back-end architecture. He specializes
                in ensuring that the system's server-side operations run smoothly, integrating the necessary APIs and
                database solutions. Krishneshvar was instrumental in making the system secure and scalable.
              </p>
              <p className="socials">
                <img src="/socials/github.png" alt="GitHub Logo" className="social-icon github" href="https://github.com/Krishneshvar" />
                <img src="/socials/linkedin.png" alt="LinkedIn Logo" className="social-icon linkedin"  href="https://www.linkedin.com/in/krishneshvar-j" />
              </p>
            </div>
          </div>
      </section>

      <section className="tech-used">
        <h2>Technologies Used</h2>
        <p>
          Our Electronic Road Passing System was developed using the following technologies:
        </p>

        <div className='tech-logos'>
          <div className="tech-card">
            <img src="/tech-used/react.png" alt="React JS Logo" className='tech' />
          </div>
          <div className="tech-card">
            <img src="/tech-used/node.png" alt="Node JS Logo" className='tech' />
          </div>
          <div className="tech-card">
            <img src="/tech-used/express-js.png" alt="Express JS Logo" className='tech' />
          </div>
          <div className="tech-card">
            <img src="/tech-used/postgre.png" alt="PostgreSQL Logo" className='tech' />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
