import { LitElement, html, css } from 'lit';

class AppRegister extends LitElement {
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
      max-width: 1200px;
      margin: auto;
      padding: 1rem;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    input {
      margin: 0.5rem 0;
      padding: 0.5rem;
      font-size: 1rem;
    }
    button {
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      background-color: #8a2be2;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #551a8b;
    }
    @media (max-width: 768px) {
      .container {
        padding: 0.5rem;
      }
      button {
        font-size: 1rem;
        padding: 0.4rem 0.8rem;
      }
    }
  `;

  render() {
    return html`
      <div class="container">
        <h1>Registro</h1>
        <form @submit="${this._register}">
          <input type="text" name="firstName" placeholder="Nombre" required>
          <input type="text" name="lastName" placeholder="Apellidos" required>
          <input type="number" name="age" placeholder="Edad" required>
          <input type="email" name="email" placeholder="Correo electrónico" required>
          <input type="tel" name="phone" placeholder="Teléfono" required>
          <input type="password" name="password" placeholder="Contraseña" required>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    `;
  }

  _register(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Aquí puedes añadir la lógica de registro
    console.log('Registro con', data);
  }
}

customElements.define('app-register', AppRegister);
