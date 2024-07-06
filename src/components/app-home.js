import { LitElement, html, css } from 'lit';

class AppHome extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: 'Lemon Shake Shake', cursive;
      color: white;
      background-color: #d8bfd8;
      min-height: 100vh;
      text-shadow: 1px 1px 2px black;
    }
    .container {
      max-width: 400px;
      margin: auto;
      padding: 2rem;
      border: 2px solid #8a2be2;
      border-radius: 10px;
      background-color: #ffffff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      color: #333;
      text-align: center;
    }
    h1 {
      margin-bottom: 1rem;
      color: #8a2be2;
      font-size: 1.5rem;
    }
    .link-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    a, button {
      color: white;
      text-decoration: none;
      font-size: 1rem;
      padding: 0.4rem 1rem;
      background-color: #8a2be2;
      border: 2px solid #8a2be2;
      border-radius: 5px;
      transition: background-color 0.3s, transform 0.3s;
      cursor: pointer;
      display: inline-block;
      margin: 0.5rem 0;
      width: 100%;
      box-sizing: border-box;
    }
    a:hover, button:hover {
      background-color: #551a8b;
      transform: scale(1.05);
    }
    .image-container {
      text-align: center;
      margin-bottom: 1rem;
    }
    .image-container img {
      max-width: 60%;
      height: auto;
      border-radius: 10px;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1rem;
    }
    input {
      margin: 0.5rem 0;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: calc(100% - 1rem);
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    input:focus {
      border-color: #8a2be2;
      box-shadow: 0 0 5px rgba(138, 43, 226, 0.5);
      outline: none;
    }
    .footer {
      margin-top: 2rem;
      font-size: 0.8rem;
      color: #888;
      text-align: center;
    }
    @media (max-width: 768px) {
      .container {
        padding: 0.5rem;
      }
      h1 {
        font-size: 1.2rem;
      }
      a, button {
        font-size: 1rem;
        padding: 0.4rem 0.8rem;
        width: calc(100% - 1rem);
      }
      input {
        width: calc(100% - 1rem);
      }
      .image-container img {
        max-width: 70%;
      }
    }
  `;

  render() {
    return html`
      <div class="container">
        <h1>Iniciar sesión</h1>
        <div class="image-container">
          <img src="/images/pastel1.jpg" alt="Pastel">
        </div>
        <form @submit="${this._login}">
          <input type="email" name="email" placeholder="Correo electrónico" required>
          <input type="password" name="password" placeholder="Contraseña" required>
          <button type="submit">Iniciar sesión</button>
          <a href="#forgot-password" @click="${this._navigate}">¿Olvidaste tu contraseña?</a>
        </form>
        <div class="link-container">
          <a href="#register" @click="${this._navigate}">Registrarse</a>
        </div>
      </div>
      <div class="footer">
        © 2017–2023 | Creador: Abraham Jiménez Valdés
      </div>
    `;
  }

  _login(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // Lógica de autenticación (simplemente mostrar en consola por ahora)
    if (this._isValidEmail(email) && password) {
      console.log('Iniciar sesión con', email, password);
      alert('Inicio de sesión exitoso');
    } else {
      alert('Por favor, ingrese credenciales válidas');
    }
  }

  _isValidEmail(email) {
    // Validación básica de correo electrónico
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  _navigate(event) {
    event.preventDefault();
    const target = event.target.getAttribute('href').substring(1);
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { page: target },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('app-home', AppHome);
