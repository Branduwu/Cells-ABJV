import { LitElement, html, css } from 'lit';

class AppHeader extends LitElement {
  static styles = css`
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #4b0082;
      padding: 1rem;
      position: relative;
      z-index: 10; /* Asegura que el menú esté siempre encima */
    }
    .menu-items {
      display: flex;
      justify-content: center;
      flex-grow: 1;
    }
    nav a {
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
      font-family: 'Lemon Shake Shake', cursive;
      text-shadow: 1px 1px 2px black;
      margin: 0 1rem;
    }
    nav a:hover {
      text-decoration: underline;
    }
    .menu-btn {
      display: none;
      background-color: transparent;
      border: none;
      color: white;
      font-size: 2rem;
      cursor: pointer;
    }
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: 250px;
      height: 100%;
      background-color: #4b0082;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 3rem;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }
    .sidebar.active {
      transform: translateX(0);
    }
    .sidebar a {
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
      font-family: 'Lemon Shake Shake', cursive;
      text-shadow: 1px 1px 2px black;
      margin: 1rem 0;
    }
    .sidebar a:hover {
      text-decoration: underline;
    }
    @media (max-width: 768px) {
      .menu-btn {
        display: block;
      }
      .menu-items {
        display: none;
      }
    }
  `;

  constructor() {
    super();
    this.menuOpen = false;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.requestUpdate();
  }

  navigate(page) {
    this.dispatchEvent(new CustomEvent('navigate', { detail: { page }, bubbles: true, composed: true }));
    if (this.menuOpen) {
      this.toggleMenu();
    }
  }

  render() {
    return html`
      <nav>
        <button class="menu-btn" @click="${this.toggleMenu}">☰</button>
        <div class="menu-items">
          <a href="#" @click="${() => this.navigate('home')}">Inicio</a>
          <a href="#" @click="${() => this.navigate('recipes')}">Mis Recetas</a>
          <a href="#" @click="${() => this.navigate('contact')}">Contáctanos</a>
          <a href="#" @click="${() => this.navigate('profile')}">Mi Perfil</a>
        </div>
        <div class="sidebar ${this.menuOpen ? 'active' : ''}">
          <a href="#" @click="${() => this.navigate('home')}">Inicio</a>
          <a href="#" @click="${() => this.navigate('recipes')}">Mis Recetas</a>
          <a href="#" @click="${() => this.navigate('contact')}">Contáctanos</a>
          <a href="#" @click="${() => this.navigate('profile')}">Mi Perfil</a>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-header', AppHeader);
