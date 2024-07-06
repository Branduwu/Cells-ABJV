import { LitElement, html, css } from 'lit';

class AppContact extends LitElement {
  static styles = css`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #d8bfd8;
      text-align: center;
      position: relative;
    }
    .contact-container {
      display: flex;
      align-items: center;
      background-color: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border: 2px solid #4b0082;
      z-index: 1; /* Asegura que el formulario esté encima del fondo */
    }
    .contact-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 400px;
      margin: auto;
    }
    .contact-form h2 {
      margin-bottom: 1rem;
      color: #4b0082;
      font-family: 'Lemon Shake Shake', cursive;
    }
    .contact-form input, .contact-form textarea {
      width: 100%;
      margin-bottom: 1rem;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .contact-form button {
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 1rem;
    }
    .contact-form button:hover {
      background-color: #0056b3;
    }
    .map-container {
      margin-left: 2rem;
    }
    .map-container iframe {
      width: 400px;
      height: 300px;
      border: 2px solid #4b0082;
      border-radius: 10px;
    }
    .footer {
      position: absolute;
      bottom: 1rem;
      width: 100%;
      text-align: center;
      font-size: 0.875rem;
      color: #666;
    }
    @media (max-width: 768px) {
      .contact-container {
        flex-direction: column;
      }
      .map-container {
        margin-left: 0;
        margin-top: 2rem;
      }
      .map-container iframe {
        width: 100%;
        height: 200px;
      }
    }
  `;

  validateName(event) {
    const name = event.target.value;
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      event.target.setCustomValidity("Por favor, introduce un nombre válido (solo letras y espacios).");
    } else {
      event.target.setCustomValidity("");
    }
  }

  validateEmail(event) {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      event.target.setCustomValidity("Por favor, introduce un correo electrónico válido.");
    } else {
      event.target.setCustomValidity("");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("Tu mensaje fue enviado");
    window.location.reload();  // Recargar la página
  }

  render() {
    return html`
      <div class="container">
        <div class="contact-container">
          <div class="contact-form">
            <h2>Contáctanos</h2>
            <form @submit="${this.handleSubmit}">
              <input type="text" placeholder="Nombre" @input="${this.validateName}" required>
              <input type="email" placeholder="Correo electrónico" @input="${this.validateEmail}" required>
              <textarea placeholder="Mensaje" rows="4" required></textarea>
              <button type="submit">Enviar</button>
            </form>
          </div>
          <div class="map-container">
            <h3>Visítanos en nuestra dirección:</h3>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.073717233721!2d-99.13734708509448!3d19.432608886884048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92ddad18c8f%3A0x6cfb7e3d26a948b0!2sCentro%20Hist%C3%B3rico%20de%20la%20Ciudad%20de%20M%C3%A9xico%2C%20Centro%2C%20Cuauht%C3%A9moc%2C%2006000%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1622603300976!5m2!1ses-419!2smx" 
              allowfullscreen="" 
              loading="lazy"></iframe>
          </div>
        </div>
        <div class="footer">
          © 2017–2023 | Creador: Abraham Jiménez Valdés
        </div>
      </div>
    `;
  }
}

customElements.define('app-contact', AppContact);
