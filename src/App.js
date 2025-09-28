import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

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
            <a href="#zone" onClick={() => scrollToSection('zone')}>Zone d'intervention</a>
            <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
          </div>
          <div className="nav-cta">
            <a href="tel:+33123456789" className="btn-emergency">Urgence 24/7</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <span className="hero-subtitle">Électricien professionnel</span>
              <span className="hero-title">Solutions électriques</span>
              <span className="hero-highlight">modernes & fiables</span>
            </h1>
            <p className="hero-description">
              Intervention rapide dans un rayon de 50km autour d'Auribail. 
              Expertise technique, matériel de qualité, service client exceptionnel.
            </p>
            <div className="hero-actions">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('contact')}
              >
                Demander un devis
              </button>
              <a href="tel:+33123456789" className="btn btn-outline">
                <span className="btn-icon">📞</span>
                Appeler maintenant
              </a>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Interventions</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Disponibilité</span>
            </div>
            <div className="stat">
              <span className="stat-number">50km</span>
              <span className="stat-label">Zone d'action</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2>Nos expertises</h2>
            <p>Des solutions électriques complètes pour tous vos besoins</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card featured">
              <div className="service-icon">⚡</div>
              <h3>Installation électrique</h3>
              <p>Mise en conformité, rénovation complète, installation neuve selon les normes NF C 15-100</p>
              <ul>
                <li>Tableaux électriques</li>
                <li>Prises et éclairage</li>
                <li>Mise à la terre</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Dépannage urgent</h3>
              <p>Intervention rapide 24h/24 pour tous vos problèmes électriques</p>
              <ul>
                <li>Panne de courant</li>
                <li>Court-circuit</li>
                <li>Disjoncteur défaillant</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">💡</div>
              <h3>Éclairage LED</h3>
              <p>Solutions d'éclairage économiques et durables</p>
              <ul>
                <li>Spots encastrés</li>
                <li>Éclairage extérieur</li>
                <li>Domotique</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Rénovation</h3>
              <p>Modernisation de votre installation électrique</p>
              <ul>
                <li>Diagnostic électrique</li>
                <li>Mise aux normes</li>
                <li>Optimisation énergétique</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🔌</div>
              <h3>Prises spécialisées</h3>
              <p>Installation de prises adaptées à vos équipements</p>
              <ul>
                <li>Borne de recharge VE</li>
                <li>Prises 32A</li>
                <li>Prises étanches</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🛡️</div>
              <h3>Sécurité</h3>
              <p>Protection de votre installation et de votre famille</p>
              <ul>
                <li>Parafoudre</li>
                <li>Détecteurs de fumée</li>
                <li>Alarmes techniques</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Zone d'intervention */}
      <section id="zone" className="zone-section">
        <div className="container">
          <div className="section-header">
            <h2>Zone d'intervention</h2>
            <p>Service dans un rayon de 50km autour d'Auribail</p>
          </div>
          
          <div className="zone-content">
            <div className="zone-info">
              <div className="zone-card">
                <h3>🎯 Secteur principal</h3>
                <p>Intervention prioritaire dans un rayon de 25km</p>
                <ul>
                  <li>Délai d'intervention : 30 minutes</li>
                  <li>Pas de frais de déplacement</li>
                  <li>Service d'urgence 24/7</li>
                </ul>
              </div>
              
              <div className="zone-card">
                <h3>📍 Zone étendue</h3>
                <p>Service jusqu'à 50km d'Auribail</p>
                <ul>
                  <li>Délai d'intervention : 1 heure</li>
                  <li>Frais de déplacement selon distance</li>
                  <li>Devis gratuit sur demande</li>
                </ul>
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
            <p>Devis gratuit et intervention rapide</p>
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h3>Téléphone</h3>
                <p><a href="tel:+33123456789">01 23 45 67 89</a></p>
                <span className="contact-note">Disponible 24h/24</span>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <h3>Email</h3>
                <p><a href="mailto:contact@harkelec.fr">contact@harkelec.fr</a></p>
                <span className="contact-note">Réponse sous 2h</span>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">⚡</div>
                <h3>Urgence</h3>
                <p><a href="tel:+33987654321">09 87 65 43 21</a></p>
                <span className="contact-note">Ligne directe urgence</span>
              </div>
            </div>
            
            <div className="contact-form-container">
              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Nom complet</label>
                    <input type="text" required />
                  </div>
                  <div className="form-group">
                    <label>Téléphone</label>
                    <input type="tel" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" required />
                </div>
                
                <div className="form-group">
                  <label>Type d'intervention</label>
                  <select required>
                    <option value="">Sélectionnez...</option>
                    <option value="installation">Installation électrique</option>
                    <option value="depannage">Dépannage urgent</option>
                    <option value="renovation">Rénovation</option>
                    <option value="diagnostic">Diagnostic</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Description du projet</label>
                  <textarea rows="4" placeholder="Décrivez votre besoin..." required></textarea>
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
              <h3>Hark Elec</h3>
              <p>Votre électricien de confiance</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4>Services</h4>
                <ul>
                  <li><a href="#services">Installation</a></li>
                  <li><a href="#services">Dépannage</a></li>
                  <li><a href="#services">Rénovation</a></li>
                  <li><a href="#services">Éclairage LED</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4>Contact</h4>
                <ul>
                  <li><a href="tel:+33123456789">01 23 45 67 89</a></li>
                  <li><a href="mailto:contact@harkelec.fr">contact@harkelec.fr</a></li>
                  <li>Zone : 50km autour d'Auribail</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 Hark Elec. Tous droits réservés. | Électricien certifié</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;