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

  const services = [
    {
      title: "Tableaux & installations complètes",
      description: "Conception, mise en conformité et extensions de votre réseau électrique.",
      points: ['Tableaux résidentiels et tertiaires', 'Mises aux normes NFC 15-100', 'Analyse des charges et équilibrage'],
      icon: '🛠️',
    },
    {
      title: 'Dépannage et maintenance urgente',
      description: "Interventions rapides 7j/7 pour rétablir votre sécurité et votre confort.",
      points: ['Recherche de panne', 'Remplacement de disjoncteurs', 'Sécurisation provisoire'],
      icon: '⚡',
    },
    {
      title: 'Solutions d\'éclairage & ambiance',
      description: "Éclairages LED, extérieurs et scénographies lumineuses sur-mesure.",
      points: ['Relamping LED', 'Éclairage extérieur sécurisé', 'Pilotage intelligent'],
      icon: '💡',
    },
    {
      title: 'Bornes de recharge & économies d\'énergie',
      description: "Installation IRVE, programmations et optimisation de votre consommation.",
      points: ['Bornes monophasées & triphasées', 'Subventions & primes CEE', 'Suivi énergétique'],
      icon: '🚗',
    },
    {
      title: 'Rénovation électrique complète',
      description: 'Audit, conception et réalisation pour l\'habitat et le petit tertiaire.',
      points: ['Diagnostic complet', 'Respect des délais', 'Coordination chantier'],
      icon: '🏠',
    },
    {
      title: 'Sécurité & domotique',
      description: 'Protections différentielles, alarmes et pilotage connecté de votre installation.',
      points: ['Protection surtension', 'Alarme incendie & intrusion', 'Scénarios domotiques'],
      icon: '🔒',
    },
  ];

  const stats = [
    { value: '15 ans', label: "d'expérience en électricité générale" },
    { value: '450+', label: 'interventions réalisées chaque année' },
    { value: '4.9/5', label: 'note moyenne de satisfaction clients' },
  ];

  const commitments = [
    {
      title: 'Qualité garantie',
      description:
        'Matériel certifié, conformité assurée et garantie décennale sur nos réalisations.',
      items: ['Respect strict des normes', 'Contrôles en fin de chantier', 'Documentation complète'],
    },
    {
      title: 'Transparence & conseil',
      description:
        'Visite technique sous 48h, devis détaillé et accompagnement pour vos démarches administratives.',
      items: ['Devis gratuit et clair', 'Planning partagé', 'Interlocuteur unique'],
    },
    {
      title: 'Respect des délais',
      description:
        'Organisation rigoureuse, interventions ponctuelles et reporting après chaque passage.',
      items: ['Urgence sous 2h en zone prioritaire', 'Protection du chantier', 'Suivi après travaux'],
    },
  ];

  return (
    <div className="App">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/Logo Hark Elec 31.png" alt="Hark Elec" />
            <div className="nav-branding">
              <span className="brand-name">Hark Elec</span>
              <span className="brand-tagline">Électricien certifié à Auribail</span>
            </div>
          </div>
          <div className="nav-links">
            <a href="#accueil" onClick={() => document.getElementById('accueil')?.scrollIntoView({ behavior: 'smooth' })}>
              Accueil
            </a>
            <a href="#services" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              Services
            </a>
            <a href="#zone" onClick={() => document.getElementById('zone')?.scrollIntoView({ behavior: 'smooth' })}>
              Zone
            </a>
            <a href="#contact" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact
            </a>
          </div>
          <div className="nav-cta">
            <a href="tel:+33612345678" className="btn-contact">
              06 12 34 56 78
            </a>
          </div>
        </div>
      </nav>

      <section id="accueil" className="hero">
        <div className="container hero-grid">
          <div className="hero-main">
            <span className="hero-eyebrow">Votre partenaire électrique dans le Sud Toulousain</span>
            <h1>
              La maîtrise électrique pour vos projets résidentiels, agricoles et professionnels.
            </h1>
            <p className="hero-description">
              Hark Elec accompagne les particuliers et entreprises autour d\'Auribail (31190) pour des installations
              fiables, sécurisées et pérennes : rénovation, dépannage express, bornes de recharge et domotique.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="tel:+33612345678">
                ☎️ Intervention urgente
              </a>
              <button className="btn btn-secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Demander un devis détaillé
              </button>
            </div>
            <div className="hero-trust">
              <p>Certifications & garanties :</p>
              <ul>
                <li>Qualifelec & IRVE</li>
                <li>Assurance décennale</li>
                <li>Déplacement offert dans un rayon de 25 km</li>
              </ul>
            </div>
          </div>

          <div className="hero-side-card">
            <div className="side-card-header">
              <span className="side-card-title">Service Premium</span>
              <span className="side-card-subtitle">Auribail & communes voisines</span>
            </div>
            <div className="side-card-body">
              <div className="side-card-highlight">
                <strong>Temps moyen d\'intervention</strong>
                <span>Moins de 2h en urgence</span>
              </div>
              <ul className="side-card-list">
                <li>Diagnostic électrique complet</li>
                <li>Rapport photo après intervention</li>
                <li>Suivi annuel sur demande</li>
              </ul>
            </div>
            <div className="side-card-footer">
              <span className="side-card-note">Disponibilité 7j/7</span>
              <a href="mailto:contact@harkelec.fr">contact@harkelec.fr</a>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <div className="section-intro">
            <span className="section-eyebrow">Nos expertises</span>
            <h2>Des solutions électriques complètes et sur-mesure</h2>
            <p>
              De la mise en sécurité à la modernisation énergétique, nous pilotons l\'ensemble de vos travaux avec un haut
              niveau d\'exigence et un accompagnement personnalisé.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.title} className="service-card">
                <span className="service-icon" aria-hidden="true">
                  {service.icon}
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="commitments">
        <div className="container">
          <div className="section-intro">
            <span className="section-eyebrow">Notre promesse</span>
            <h2>La signature Hark Elec</h2>
            <p>
              Nous mettons la sécurité, la transparence et la durabilité au centre de chaque intervention pour garantir
              des installations fiables sur le long terme.
            </p>
          </div>
          <div className="commitments-grid">
            {commitments.map((item) => (
              <div key={item.title} className="commitment-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="badge-list">
                  {item.items.map((detail) => (
                    <span key={detail} className="badge">
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="zone" className="zone-section">
        <div className="container zone-layout">
          <div className="zone-panel">
            <span className="section-eyebrow">Autour d\'Auribail</span>
            <h2>Zone d\'intervention prioritaire</h2>
            <p>
              Basés à Auribail (31190), nous couvrons l\'ensemble du Sud Toulousain : Lézat-sur-Lèze, Caujac, Saint-
              Sulpice-sur-Lèze, Rieux-Volvestre, Carbonne, et toutes les communes situées dans un rayon de 50 km.
            </p>
            <div className="zone-highlights">
              <div className="zone-highlight">
                <strong>Zone premium (0-25 km)</strong>
                <span>Déplacement offert & intervention sous 2h</span>
              </div>
              <div className="zone-highlight">
                <strong>Zone étendue (25-50 km)</strong>
                <span>Planification sous 24h avec devis gratuit</span>
              </div>
            </div>
          </div>
          <div className="zone-map">
            <iframe
              title="Carte des interventions Hark Elec"
              src="https://maps.google.com/maps?q=Auribail%2031190&t=&z=11&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="container cta-strip-content">
          <div className="cta-text">
            <h2>Un projet électrique ? Parlons-en.</h2>
            <p>
              Nous analysons vos besoins, réalisons un diagnostic précis et vous proposons des solutions adaptées à votre
              budget.
            </p>
          </div>
          <a className="btn btn-primary" href="mailto:contact@harkelec.fr">
            Écrire à un technicien
          </a>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="section-intro">
            <span className="section-eyebrow">Contact</span>
            <h2>Votre devis sur-mesure sous 24h</h2>
            <p>
              Expliquez-nous votre projet et recevez une proposition claire, accompagnée de conseils pour optimiser votre
              installation électrique.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-method">
                <h3>Téléphone</h3>
                <a href="tel:+33612345678">06 12 34 56 78</a>
                <span>Urgences & interventions planifiées</span>
              </div>
              <div className="contact-method">
                <h3>Email</h3>
                <a href="mailto:contact@harkelec.fr">contact@harkelec.fr</a>
                <span>Plans, photos et demandes de devis</span>
              </div>
              <div className="contact-method">
                <h3>Adresse</h3>
                <p>31190 Auribail</p>
                <span>Déplacements dans tout le Sud Toulousain</span>
              </div>
            </div>
            <div className="contact-form-container">
              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group required">
                    <label htmlFor="nom">Nom complet</label>
                    <input type="text" id="nom" name="nom" placeholder="Votre nom et prénom" required />
                  </div>
                  <div className="form-group required">
                    <label htmlFor="telephone">Téléphone</label>
                    <input type="tel" id="telephone" name="telephone" placeholder="06 12 34 56 78" required />
                  </div>
                </div>
                <div className="form-group required">
                  <label htmlFor="email">Adresse email</label>
                  <input type="email" id="email" name="email" placeholder="votre@email.fr" required />
                </div>
                <div className="form-group required">
                  <label htmlFor="service">Type d'intervention</label>
                  <select id="service" name="service" required>
                    <option value="">Sélectionnez un besoin</option>
                    <option value="installation">Installation complète</option>
                    <option value="depannage">Dépannage urgent</option>
                    <option value="renovation">Rénovation</option>
                    <option value="irve">Borne de recharge</option>
                    <option value="domotique">Domotique & sécurité</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>
                <div className="form-group required">
                  <label htmlFor="description">Description du projet</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Décrivez votre besoin, vos délais et les éléments techniques importants."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  📧 Envoyer ma demande de devis
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <img src="/Logo Hark Elec 31.png" alt="Hark Elec" />
            <div>
              <span className="brand-name">Hark Elec</span>
              <p>Électricien certifié - Auribail et Sud Toulousain</p>
            </div>
          </div>
          <div className="footer-info">
            <p>&copy; {new Date().getFullYear()} Hark Elec. Tous droits réservés.</p>
            <p>SIRET & assurance décennale disponibles sur demande.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
