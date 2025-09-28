import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/Logo Hark Elec 31.png" alt="Hark Elec" />
            <span>Hark Elec</span>
          </div>
          <div className="nav-links">
            <a href="#accueil" onClick={() => scrollToSection('accueil')}>Accueil</a>
            <a href="#services" onClick={() => scrollToSection('services')}>Services</a>
            <a href="#zone" onClick={() => scrollToSection('zone')}>Zone</a>
            <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
          </div>
          <div className="nav-cta">
            <a href="tel:+33123456789" className="btn-contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Solutions électriques
              <span className="hero-highlight">pour votre quotidien</span>
            </h1>
            <p className="hero-description">
              Hark Elec vous accompagne pour l'installation et la maintenance électrique 
              dans un rayon de 50km autour d'Auribail. Service professionnel et fiable.
            </p>
            <div className="hero-actions">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('contact')}
              >
                Devis gratuit
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => scrollToSection('services')}
              >
                Nos services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2>Nos expertises</h2>
            <p>Des solutions adaptées à tous vos besoins électriques</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-content">
                <h3>Installation électrique</h3>
                <p>Mise en conformité et installation complète selon les normes en vigueur</p>
                <ul>
                  <li>Tableaux électriques</li>
                  <li>Prises et éclairage</li>
                  <li>Mise à la terre</li>
                </ul>
              </div>
            </div>

            <div className="service-card">
              <div className="service-content">
                <h3>Dépannage urgent</h3>
                <p>Intervention rapide pour tous vos problèmes électriques</p>
                <ul>
                  <li>Panne de courant</li>
                  <li>Court-circuit</li>
                  <li>Disjoncteur défaillant</li>
                </ul>
              </div>
            </div>

            <div className="service-card">
              <div className="service-content">
                <h3>Éclairage LED</h3>
                <p>Solutions d'éclairage économiques et durables</p>
                <ul>
                  <li>Spots encastrés</li>
                  <li>Éclairage extérieur</li>
                  <li>Variateurs</li>
                </ul>
              </div>
            </div>

            <div className="service-card">
              <div className="service-content">
                <h3>Rénovation</h3>
                <p>Modernisation de votre installation électrique</p>
                <ul>
                  <li>Diagnostic électrique</li>
                  <li>Mise aux normes</li>
                  <li>Optimisation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zone Section */}
      <section id="zone" className="zone-section">
        <div className="container">
          <div className="section-header">
            <h2>Zone d'intervention</h2>
            <p>Service dans un rayon de 50km autour d'Auribail</p>
          </div>
          
          <div className="zone-content">
            <div className="zone-info">
              <div className="zone-card">
                <h3>Secteur principal</h3>
                <p>Intervention prioritaire dans un rayon de 25km</p>
                <div className="zone-details">
                  <span>Délai : 30 minutes</span>
                  <span>Pas de frais de déplacement</span>
                </div>
              </div>
              
              <div className="zone-card">
                <h3>Zone étendue</h3>
                <p>Service jusqu'à 50km d'Auribail</p>
                <div className="zone-details">
                  <span>Délai : 1 heure</span>
                  <span>Devis gratuit</span>
                </div>
              </div>
            </div>
            
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102834.72!2d1.4442!3d43.6047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebb6fec7552ff%3A0x406f69c2f411030!2sToulouse%2C%20France!5e0!3m2!1sfr!2sfr!4v1635789012345!5m2!1sfr!2sfr"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Zone d'intervention Hark Elec"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Contactez-nous</h2>
            <p>Obtenez votre devis gratuit sous 8h pour votre projet d'installation</p>
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <h3>Téléphone</h3>
                <a href="tel:+33123456789">01 23 45 67 89</a>
              </div>
              
              <div className="contact-item">
                <h3>Email</h3>
                <a href="mailto:contact@harkelec.fr">contact@harkelec.fr</a>
              </div>
              
              <div className="contact-item">
                <h3>Urgence 24/7</h3>
                <a href="tel:+33987654321">09 87 65 43 21</a>
              </div>
            </div>
            
            <div className="contact-form-container">
              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" placeholder="Nom complet" required />
                  </div>
                  <div className="form-group">
                    <input type="tel" placeholder="Téléphone" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <input type="email" placeholder="Email" required />
                </div>
                
                <div className="form-group">
                  <select required>
                    <option value="">Type d'intervention</option>
                    <option value="installation">Installation électrique</option>
                    <option value="depannage">Dépannage urgent</option>
                    <option value="renovation">Rénovation</option>
                    <option value="diagnostic">Diagnostic</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <textarea rows="4" placeholder="Description du projet" required></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary btn-full">
                  Envoyer la demande
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <img src="/Logo Hark Elec 31.png" alt="Hark Elec" />
              <span>Hark Elec</span>
            </div>
            
            <div className="footer-info">
              <p>&copy; 2025 Hark Elec. Électricien certifié - Zone d'intervention : 50km autour d'Auribail</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;