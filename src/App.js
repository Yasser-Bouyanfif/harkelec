import React, { useEffect, useState } from "react";
import "./App.css";

const services = [
  {
    title: "Installations complètes",
    description:
      "Création ou rénovation de vos réseaux électriques résidentiels et tertiaires conformément à la norme NF C 15-100.",
    items: [
      "Tableaux dernière génération",
      "Câblage structurel",
      "Solutions domotiques",
    ],
    icon: "⚡️",
  },
  {
    title: "Dépannage express 7j/7",
    description:
      "Localisation de pannes, remise en service sécurisée et remplacement des protections défectueuses dans l'heure sur le secteur d'Auribail.",
    items: [
      "Recherche de défauts",
      "Mise en sécurité",
      "Rapport d’intervention",
    ],
    icon: "🛠️",
  },
  {
    title: "Éclairage & confort",
    description:
      "Études lumineuses, installation de solutions LED basse consommation et pilotage intelligent de vos éclairages intérieurs et extérieurs.",
    items: [
      "Éclairage architectural",
      "Gestion crépusculaire",
      "Variateurs connectés",
    ],
    icon: "💡",
  },
  {
    title: "Sécurité & bornes IRVE",
    description:
      "Installation de systèmes de protection, de vidéosurveillance et bornes de recharge pour véhicules électriques labellisées ADVENIR.",
    items: [
      "Alarmes & interphones",
      "Parafoudre & surtension",
      "Bornes 7kW à 22kW",
    ],
    icon: "🔒",
  },
];

const commitments = [
  {
    title: "Interventions certifiées",
    description:
      "Entreprise Qualifelec, assurances décennale et responsabilité civile à jour.",
  },
  {
    title: "Conseil sur mesure",
    description:
      "Une étude technique détaillée et des devis clairs sous 24h ouvrées.",
  },
  {
    title: "Traçabilité complète",
    description:
      "Compte rendu digitalisé, photos avant/après et garantie pièces & main d’œuvre.",
  },
];

const process = [
  {
    title: "Prise de contact",
    description:
      "Un expert vous rappelle en moins de 2h ouvrées pour qualifier vos besoins et planifier un rendez-vous.",
  },
  {
    title: "Audit & devis",
    description:
      "Visite sur site à Auribail et alentours, relevé des existants et remise d’un devis détaillé sous 24h.",
  },
  {
    title: "Réalisation & suivi",
    description:
      "Travaux réalisés dans le respect des normes, contrôle qualité final et maintenance préventive optionnelle.",
  },
];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      scrollToSection("accueil");
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="App">
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div
            className="nav-logo"
            onClick={() => scrollToSection("accueil")}
            onKeyDown={handleLogoKeyDown}
            role="button"
            tabIndex={0}
          >
            <img src="/Logo Hark Elec 31.png" alt="Hark Elec" />
            <span>Hark Elec</span>
          </div>
          <div className="nav-links">
            <button type="button" onClick={() => scrollToSection("services")}>
              Services
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("engagements")}
            >
              Engagements
            </button>
            <button type="button" onClick={() => scrollToSection("process")}>
              Méthode
            </button>
            <button type="button" onClick={() => scrollToSection("zone")}>
              Zone
            </button>
            <button type="button" onClick={() => scrollToSection("contact")}>
              Contact
            </button>
          </div>
          <div className="nav-cta">
            <a href="tel:+33512345678" className="btn btn-primary">
              05 12 34 56 78
            </a>
          </div>
        </div>
      </nav>

      <section id="accueil" className="hero">
        <div className="hero-overlay" />
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-text">
              <span className="hero-eyebrow">
                Électricien professionnel à Auribail (31190)
              </span>
              <h1>
                Conception, rénovation et maintenance
                <span className="hero-highlight">électriques clé en main</span>
              </h1>
              <p className="hero-description">
                Hark Elec accompagne les particuliers, copropriétés et
                professionnels de la Haute-Garonne. Interventions rapides,
                garanties et conformes aux normes NF C 15-100.
              </p>
              <div className="hero-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => scrollToSection("contact")}
                >
                  Demander un devis sous 24h
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => scrollToSection("services")}
                >
                  Découvrir nos services
                </button>
              </div>
              <ul className="hero-badges">
                <li>⚡ Mise en sécurité immédiate</li>
                <li>📍 Basé à Auribail</li>
                <li>🔒 Assurance décennale</li>
              </ul>
            </div>
            <div className="hero-card">
              <div className="hero-card-header">
                <span>Urgence & projets</span>
                <strong>05 12 34 56 78</strong>
              </div>
              <div className="hero-card-body">
                <p>Des experts à votre écoute pour vos projets électriques.</p>
                <div className="hero-card-list">
                  <span>• Diagnostic complet sur site</span>
                  <span>• Matériel certifié NF & CE</span>
                  <span>• Planning maîtrisé</span>
                </div>
                <button
                  className="btn btn-outline"
                  onClick={() => scrollToSection("process")}
                >
                  Comprendre notre méthode
                </button>
              </div>
            </div>
          </div>

          <div className="stats-bar">
            <div className="stat-item">
              <strong>15 ans</strong>
              <span>d’expérience terrain</span>
            </div>
            <div className="stat-item">
              <strong>98%</strong>
              <span>de clients satisfaits</span>
            </div>
            <div className="stat-item">
              <strong>50 km</strong>
              <span>autour d’Auribail couverts</span>
            </div>
            <div className="stat-item">
              <strong>24h</strong>
              <span>pour un devis détaillé</span>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="section-header">
          <span className="section-eyebrow">Nos expertises</span>
          <h2>Des solutions électriques haut de gamme</h2>
          <p>
            Nous prenons en charge l’ensemble de vos installations électriques,
            de la conception à la maintenance. Chaque projet est livré avec
            dossier technique et garanties.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-icon">{service.icon}</div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="engagements" className="commitments">
        <div className="section-header">
          <span className="section-eyebrow">Nos engagements</span>
          <h2>Un partenaire technique fiable</h2>
          <p>
            Transparence, sécurité et accompagnement durable sont au cœur de
            chaque intervention.
          </p>
        </div>
        <div className="commitments-grid">
          {commitments.map((item) => (
            <div className="commitment-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="process" className="process">
        <div className="section-header">
          <span className="section-eyebrow">Notre méthodologie</span>
          <h2>Un déroulé précis de votre projet</h2>
          <p>
            Une conduite de travaux structurée pour sécuriser vos installations
            et respecter vos délais.
          </p>
        </div>
        <div className="process-grid">
          {process.map((step, index) => (
            <div className="process-step" key={step.title}>
              <div className="process-index">0{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="zone" className="zone-section">
        <div className="section-header">
          <span className="section-eyebrow">Zone d’intervention</span>
          <h2>Basés à Auribail, mobiles sur tout le sud toulousain</h2>
          <p>
            Nous intervenons rapidement sur Auribail et dans un rayon de 50 km :
            Cintegabelle, Auterive, Muret, Carbonne, Nailloux, ainsi que
            l’ensemble de la Haute-Garonne sud.
          </p>
        </div>
        <div className="zone-content">
          <div className="zone-cards">
            <div className="zone-card">
              <h3>Secteur prioritaire</h3>
              <p>
                Interventions en moins de 2h sur Auribail et les communes
                limitrophes.
              </p>
              <div className="zone-details">
                <span>Déplacement offert</span>
                <span>Technicien dédié</span>
                <span>Disponibilité 7j/7</span>
              </div>
            </div>
            <div className="zone-card">
              <h3>Zone étendue</h3>
              <p>
                Prise en charge des chantiers jusqu’à 50 km (Toulouse sud,
                Ariège, Lauragais).
              </p>
              <div className="zone-details">
                <span>Pré-visite numérique</span>
                <span>Devis sous 24h</span>
                <span>Planification prioritaire</span>
              </div>
            </div>
          </div>
          <div className="map-container">
            <iframe
              src="https://maps.google.com/maps?q=31190%20Auribail&t=&z=12&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation d'Auribail"
            ></iframe>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-grid">
          <div className="contact-intro">
            <span className="section-eyebrow">Contact</span>
            <h2>Discutons de votre projet électrique</h2>
            <p>
              Décrivez vos besoins via le formulaire ou appelez-nous
              directement. Nous revenons vers vous avec une proposition claire
              et budgétisée sous 24h ouvrées.
            </p>
            <div className="contact-cards">
              <div className="contact-card">
                <h3>☎ Téléphone</h3>
                <a href="tel:+33512345678">05 12 34 56 78</a>
                <span>Urgences et rendez-vous</span>
              </div>
              <div className="contact-card">
                <h3>✉ Email</h3>
                <a href="mailto:contact@harkelec.fr">contact@harkelec.fr</a>
                <span>Réponse garantie sous 24h</span>
              </div>
            </div>
          </div>
          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group required">
                  <label htmlFor="nom">Nom complet</label>
                  <input
                    id="nom"
                    type="text"
                    placeholder="Votre nom et prénom"
                    required
                  />
                </div>
                <div className="form-group required">
                  <label htmlFor="telephone">Téléphone</label>
                  <input
                    id="telephone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Adresse email</label>
                <input id="email" type="email" placeholder="votre@email.fr" />
              </div>
              <div className="form-group required">
                <label htmlFor="service">Nature du besoin</label>
                <select id="service" required>
                  <option value="">Sélectionnez un service</option>
                  <option value="installation">
                    Installation électrique complète
                  </option>
                  <option value="depannage">
                    Dépannage / Mise en sécurité
                  </option>
                  <option value="renovation">
                    Rénovation / Mise aux normes
                  </option>
                  <option value="irve">
                    Borne de recharge véhicule électrique
                  </option>
                  <option value="autre">Autre demande</option>
                </select>
              </div>
              <div className="form-group required">
                <label htmlFor="description">Votre message</label>
                <textarea
                  id="description"
                  rows="4"
                  placeholder="Décrivez vos travaux : type de bien, contraintes, délais souhaités..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                📧 Envoyer ma demande de devis
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/Logo Hark Elec 31.png" alt="Hark Elec" />
            <div>
              <strong>Hark Elec</strong>
              <span>Électricien artisanal - Auribail & Haute-Garonne</span>
            </div>
          </div>
          <div className="footer-links">
            <span>SIRET 123 456 789 00012</span>
            <span>Qualifelec & IRVE</span>
            <span>
              &copy; {new Date().getFullYear()} Hark Elec. Tous droits réservés.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
