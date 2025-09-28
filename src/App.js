import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src="/Logo Hark Elec 31.png" alt="Hark Elec" className="logo-img" />
          </div>
          <nav className="nav">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Professional Electrical Services</h1>
            <p>Reliable, safe, and efficient electrical solutions for your home and business</p>
            <div className="hero-buttons">
              <button className="btn btn-primary">Get Quote</button>
              <button className="btn btn-secondary">Emergency Service</button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Residential Electrical</h3>
              <p>Complete electrical services for homes including wiring, outlets, lighting, and panel upgrades.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Commercial Electrical</h3>
              <p>Professional electrical solutions for businesses, offices, and commercial properties.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Electrical Repairs</h3>
              <p>Fast and reliable repair services for all types of electrical issues and emergencies.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💡</div>
              <h3>LED Lighting</h3>
              <p>Energy-efficient LED lighting installation and upgrades for homes and businesses.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔌</div>
              <h3>Panel Upgrades</h3>
              <p>Electrical panel upgrades and installations to meet modern power demands safely.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🚨</div>
              <h3>Emergency Service</h3>
              <p>24/7 emergency electrical services for urgent repairs and safety issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About Hark Elec</h2>
              <p>
                With years of experience in the electrical industry, Hark Elec has built a reputation 
                for delivering high-quality electrical services with a focus on safety, reliability, 
                and customer satisfaction.
              </p>
              <p>
                Our team of licensed electricians is committed to providing professional solutions 
                for all your electrical needs, from simple repairs to complex installations.
              </p>
              <div className="features">
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Licensed & Insured</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>24/7 Emergency Service</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Free Estimates</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✓</span>
                  <span>Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p>(555) 123-4567</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <h3>Email</h3>
                  <p>info@harkelec.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h3>Service Area</h3>
                  <p>Greater Metropolitan Area</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Your Phone" />
                </div>
                <div className="form-group">
                  <textarea placeholder="Describe your electrical needs" rows="4" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src="/Logo Hark Elec 31.png" alt="Hark Elec" className="footer-logo-img" />
            </div>
            <div className="footer-text">
              <p>&copy; 2025 Hark Elec. All rights reserved. Licensed Electrical Contractor.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;