import { LitElement, html, css } from 'lit';
import './components/app-header.js';
import './components/app-home.js';
import './components/app-recipes.js';
import './components/app-contact.js';
import './components/app-profile.js';
import './components/app-forgot-password.js';
import './components/app-register.js';

class AppAbraham extends LitElement {
  static get properties() {
    return {
      page: { type: String }
    };
  }

  static styles = css`
    :host {
      display: block;
      font-family: 'Lemon Shake Shake', cursive;
      color: white;
      background-color: #d8bfd8;
      min-height: 100vh;
      margin: 0;
      padding: 0;
      text-shadow: 1px 1px 2px black;
    }
    .container {
      padding: 1rem;
      max-width: 1200px;
      margin: auto;
    }
    @media (max-width: 768px) {
      .container {
        padding: 0.5rem;
      }
    }
  `;

  constructor() {
    super();
    this.page = 'home';
  }

  navigate(e) {
    this.page = e.detail.page;
  }

  render() {
    return html`
      <app-header @navigate="${this.navigate}"></app-header>
      <div class="container">
        ${this.page === 'home' ? html`<app-home></app-home>` : ''}
        ${this.page === 'recipes' ? html`<app-recipes></app-recipes>` : ''}
        ${this.page === 'contact' ? html`<app-contact></app-contact>` : ''}
        ${this.page === 'profile' ? html`<app-profile></app-profile>` : ''}
        ${this.page === 'forgot-password' ? html`<app-forgot-password></app-forgot-password>` : ''}
        ${this.page === 'register' ? html`<app-register></app-register>` : ''}
      </div>
    `;
  }
}

customElements.define('app-abraham', AppAbraham);
