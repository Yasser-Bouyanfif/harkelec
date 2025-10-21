import React, { useEffect, useState } from "react";
import "./App.css";

const services = [
  {
    title: "Électricité générale",
    description:
      "Installation complète, rénovation et mise en conformité électrique pour l'habitat et le tertiaire.",
    items: [
      "Création d'installations neuves",
      "Rénovation et mise aux normes",
      "Dépannages et sécurisation",
      "Pose de tableaux, prises et éclairages",
    ],
    icon: "⚡️",
  },
  {
    title: "Domotique & automatismes",
    description:
      "Solutions connectées pour piloter votre éclairage, chauffage et motorisations depuis un smartphone ou des scénarios personnalisés.",
    items: [
      "Gestion intelligente de l'éclairage",
      "Thermostats et chauffage connectés",
      "Motorisation de portails et garages",
      "Volets et stores automatisés",
    ],
    icon: "🏠",
  },
  {
    title: "Réseaux & fibre optique",
    description:
      "Conception de réseaux performants, câblage RJ45 et tirage de fibre optique du point de branchement jusqu'à vos équipements.",
    items: [
      "Câblage LAN résidentiel et pro",
      "Installation de prises RJ45 et TV",
      "Maintenance et optimisation de vos réseaux",
      "Mise en service des box et routeurs",
    ],
    icon: "📶",
  },
  {
    title: "Énergies & mobilité électrique",
    description:
      "Installation de bornes de recharge et accompagnement sur les solutions d'efficacité énergétique.",
    items: [
      "Études techniques et personnalisés",
      "Optimisation de la consommation",
    ],
    icon: "🔋",
  },
];

const commitments = [
  {
    title: "Accompagnement global",
    description:
      "Un interlocuteur unique qui suit votre projet de l'étude technique à la mise en service et la prise en main des équipements.",
  },
  {
    title: "Qualité de proximité",
    description:
      "Interventions pour particuliers, entreprises et collectivités avec des matériels professionnels et durables.",
  },
  {
    title: "Expertise reconnue",
    description:
      "Un savoir-faire validé par des années d'expérience et une veille permanente sur les meilleures pratiques du secteur.",
  },
];

const process = [
  {
    title: "Diagnostic & conseils",
    description:
      "Analyse de l'existant, qualification des besoins et recommandations personnalisées pour sécuriser votre installation.",
  },
  {
    title: "Étude & réalisation",
    description:
      "Dimensionnement, fourniture du matériel et travaux dans le respect des meilleures pratiques métier.",
  },
  {
    title: "Mise en service & suivi",
    description:
      "Tests, programmation des automatismes et accompagnement à la prise en main avec options de maintenance.",
  },
];

const initialContactForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

const contactServices = [
  "Installation ou rénovation électrique",
  "Dépannage / Mise en sécurité",
  "Domotique & automatismes",
  "Réseaux informatiques / Fibre optique",
  "Borne de recharge véhicule électrique",
  "Autre demande",
];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState(initialContactForm);
  const [formStatus, setFormStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: "pending", message: "Envoi en cours..." });

    try {
      const response = await fetch(
        process.env.REACT_APP_CONTACT_ENDPOINT || "/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          payload.error ||
            "Impossible d'envoyer votre message pour le moment. Merci de réessayer dans quelques instants."
        );
      }

      setFormStatus({
        type: "success",
        message:
          "Merci ! Votre demande a bien été envoyée. Nous vous recontacterons sous 48h ouvrées.",
      });
      setFormData(initialContactForm);
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          error?.message ||
          "Une erreur inattendue est survenue pendant l'envoi. Veuillez réessayer plus tard.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <img src="/logo.png" alt="Hark-Elec 31" />
            <span>Hark-Elec 31</span>
          </div>
          <div className="nav-links">
            <button type="button" onClick={() => scrollToSection("services")}>
              Services
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
            <a href="tel:+33673262371" className="btn btn-primary">
              06 73 26 23 71
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
                Électricien généraliste pour particuliers & professionnels
              </span>
              <h1>
                Des installations
                <span className="hero-highlight">
                  électriques et connectées sur-mesure
                </span>
              </h1>
              <p className="hero-description">
                Hark-Elec 31, dirigée par Patrice Fonteneau, prend en charge
                l'intégralité de vos projets : installation, rénovation,
                dépannage, domotique, réseaux et bornes de recharge.
              </p>
              <div className="hero-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => scrollToSection("contact")}
                >
                  Demander un devis sous 48h
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => scrollToSection("services")}
                >
                  Découvrir nos services
                </button>
              </div>
              <ul className="hero-badges">
                <li>✅ Expertise certifiée</li>
                <li>🏢 Particuliers, pros & collectivités</li>
                <li>🛠️ Dépannages et projets clés en main</li>
              </ul>
            </div>
            <div className="hero-visual">
              <img
                src="/ampoule.png"
                alt="Illustration d'une ampoule lumineuse"
              />
            </div>
          </div>

          <div className="hero-commitments">
            {commitments.map((item) => (
              <div className="commitment-card" key={`${item.title}-hero`}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="section-header">
          <span className="section-eyebrow">Nos expertises</span>
          <h2>Des services électriques complets et évolutifs</h2>
          <p>
            Installation générale, domotique, réseau et mobilité électrique :
            nous couvrons tous vos besoins avec des solutions fiables,
            performantes et évolutives pour votre habitat ou votre entreprise.
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

      <section id="process" className="process">
        <div className="section-header">
          <span className="section-eyebrow">Notre méthodologie</span>
          <h2>Un accompagnement transparent à chaque étape</h2>
          <p>
            De l'audit initial à la prise en main des équipements, nous
            sécurisons votre projet électrique et digital.
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
          <h2>Un artisan mobile sur votre département et les alentours</h2>
          <p>
            Nous assurons les interventions sur site pour les habitations,
            commerces et collectivités. Dépannages urgents, chantiers
            planifiés ou projets connectés : nous nous adaptons à votre
            planning et à vos contraintes.
          </p>
        </div>
        <div className="zone-content">
          <div className="zone-cards">
            <div className="zone-card">
              <h3>Zone prioritaire</h3>
              <p>
                Dépannages rapides et chantiers planifiés dans la commune de
                rattachement de Hark-Elec 31 et les villes voisines.
              </p>
              <div className="zone-details">
                <span>Intervention urgente</span>
                <span>Technicien dédié</span>
                <span>Disponibilité 7j/7</span>
              </div>
            </div>
            <div className="zone-card">
              <h3>Zone étendue</h3>
              <p>
                Prise en charge de vos projets électriques, domotiques et
                réseaux sur l'ensemble du département et limitrophes.
              </p>
              <div className="zone-details">
                <span>Pré-visite numérique</span>
                <span>Devis sous 48h</span>
                <span>Coordination multi-sites</span>
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
              Installation, mise en conformité, domotique, réseau ou borne de
              recharge : expliquez-nous vos attentes. Nous vous apportons une
              réponse claire et budgétisée sous 48h ouvrées.
            </p>
            <div className="contact-cards">
              <div className="contact-card">
                <h3>☎ Téléphone</h3>
                <a href="tel:+33673262371">06 73 26 23 71</a>
              </div>
              <div className="contact-card">
                <h3>✉ Email</h3>
                <a href="mailto:contact@hark-elec31.fr">contact@hark-elec31.fr</a>
              </div>
            </div>
          </div>
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <div className="form-group required">
                  <label htmlFor="nom">Nom complet</label>
                  <input
                    id="nom"
                    type="text"
                    placeholder="Votre nom et prénom"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group required">
                  <label htmlFor="telephone">Téléphone</label>
                  <input
                    id="telephone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Adresse email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="votre@email.fr"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group required">
                <label htmlFor="service">Nature du besoin</label>
                <select
                  id="service"
                  required
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionnez un service</option>
                  {contactServices.map((serviceOption) => (
                    <option key={serviceOption} value={serviceOption}>
                      {serviceOption}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group required">
                <label htmlFor="description">Votre message</label>
                <textarea
                  id="description"
                  rows="4"
                  placeholder="Décrivez vos travaux : type de bien, contraintes, délais souhaités..."
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours..." : "📧 Envoyer ma demande de devis"}
              </button>
              {formStatus.type !== "idle" && (
                <div className={`form-status ${formStatus.type}`}>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/logo.png" alt="Hark-Elec 31" />
            <div>
              <strong>Hark-Elec 31</strong>
              <span>Patrice Fonteneau - Électricien généraliste</span>
            </div>
          </div>
          <div className="footer-links">
            <span>SIRET 123 456 789 00012</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
