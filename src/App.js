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
        <div className="hero-shape" aria-hidden="true"></div>
        <div className="container hero-grid">
          <div className="hero-text">
            <span className="hero-badge">Électricien certifié – Auribail & environs</span>
            <h1>
              L'expertise électrique
              <span className="hero-highlight">qui sécurise votre habitat</span>
            </h1>
            <p className="hero-description">
              Depuis plus de 15 ans, Hark Elec installe, dépanne et modernise vos réseaux
              électriques dans tout le Sud-Toulousain. Intervention rapide, conformité NF C
              15-100 et finitions irréprochables pour les particuliers comme les professionnels.
            </p>
            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => scrollToSection('contact')}
              >
                Obtenir un devis prioritaire
              </button>
              <button
                className="btn btn-outline"
                onClick={() => scrollToSection('services')}
              >
                Découvrir nos solutions
              </button>
            </div>
            <div className="hero-trust">
              <div className="trust-item">
                <span className="trust-icon">⚡</span>
                <span>Astreinte dépannage 7j/7</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">✅</span>
                <span>Assurance décennale & Qualifelec</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">📍</span>
                <span>Basé à Auribail (31190)</span>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-panel-header">
              <h2>Assistance immédiate</h2>
              <p>Réponse sous 2 heures ouvrées</p>
            </div>
            <div className="hero-panel-body">
              <a className="hero-contact" href="tel:+33123456789">
                <span className="hero-contact-label">Téléphone</span>
                <span className="hero-contact-value">01 23 45 67 89</span>
                <span className="hero-contact-help">Appel local — devis gratuit</span>
              </a>
              <div className="hero-panel-separator"></div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="hero-stat-value">1500+</span>
                  <span className="hero-stat-label">Interventions réalisées</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">4.9/5</span>
                  <span className="hero-stat-label">Avis clients vérifiés</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">48h</span>
                  <span className="hero-stat-label">Délais moyens de chantier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Services sur-mesure</span>
            <h2>Des solutions électriques complètes et maîtrisées</h2>
            <p>Nous intervenons de l'étude à la réception de vos installations, avec un interlocuteur unique et des finitions soignées.</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <div className="service-content">
                <h3>Installation & rénovation</h3>
                <p>Tableaux, circuits, domotique et protections différentielles conformes à la norme NF C 15-100.</p>
                <ul>
                  <li>Reprise complète d'installations</li>
                  <li>Extensions & combles aménagés</li>
                  <li>Optimisation des consommations</li>
                </ul>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">🚨</div>
              <div className="service-content">
                <h3>Dépannage haute priorité</h3>
                <p>Diagnostic précis et remise en service sécurisée, même le week-end et jours fériés.</p>
                <ul>
                  <li>Pannes générales et partielles</li>
                  <li>Désembouage de tableaux surchargés</li>
                  <li>Recherche de défauts d'isolement</li>
                </ul>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">💡</div>
              <div className="service-content">
                <h3>Éclairage d'ambiance & extérieur</h3>
                <p>Étude photométrique et installation LED basse consommation pour valoriser vos espaces.</p>
                <ul>
                  <li>Conception sur plans 3D</li>
                  <li>Pilotage connecté (Philips Hue, Legrand)</li>
                  <li>Éclairage architectural & sécurité</li>
                </ul>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">🔌</div>
              <div className="service-content">
                <h3>Mobilité & bornes IRVE</h3>
                <p>Installation de bornes de recharge domestiques et tertiaires avec gestion de charge intelligente.</p>
                <ul>
                  <li>Audit électrique préalable</li>
                  <li>Wallbox, Schneider, Hager</li>
                  <li>Aides & primes Advenir</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="container">
          <div className="values-grid">
            <div className="value-card">
              <h3>Diagnostic précis</h3>
              <p>Chaque projet débute par une étude complète de votre installation afin de garantir la sécurité et la performance énergétique.</p>
            </div>
            <div className="value-card">
              <h3>Matériaux premium</h3>
              <p>Nous sélectionnons des équipements professionnels Legrand, Hager et Schneider pour une durabilité maximale.</p>
            </div>
            <div className="value-card">
              <h3>Suivi transparent</h3>
              <p>Compte-rendu photo, réception sur site et maintenance planifiée : vous gardez le contrôle sur chaque étape.</p>
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
                src="https://www.google.com/maps?q=31190%20Auribail&output=embed"
                width="100%"
                height="420"
                style={{ border: 0, borderRadius: '20px' }}
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
                  <div className="form-group required">
                    <label htmlFor="nom">Nom complet</label>
                    <input type="text" id="nom" placeholder="Votre nom et prénom" required />
                  </div>
                  <div className="form-group required">
                    <label htmlFor="telephone">Téléphone</label>
                    <input type="tel" id="telephone" placeholder="06 12 34 56 78" required />
                  </div>
                </div>
                
                <div className="form-group required">
                  <label htmlFor="email">Adresse email</label>
                  <input type="email" id="email" placeholder="votre@email.fr" required />
                </div>
                
                <div className="form-group required">
                  <label htmlFor="service">Type d'intervention</label>
                  <select id="service" required>
                    <option value="">Type d'intervention</option>
                    <option value="installation">Installation électrique</option>
                    <option value="depannage">Dépannage urgent</option>
                    <option value="renovation">Rénovation</option>
                    <option value="diagnostic">Diagnostic</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                
                <div className="form-group required">
                  <label htmlFor="description">Description du projet</label>
                  <textarea id="description" rows="4" placeholder="Décrivez votre projet en détail : type de travaux, surface, délais souhaités..." required></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary btn-full">
                  📧 Envoyer ma demande de devis
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