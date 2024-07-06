import { LitElement, html, css } from 'lit';

class AppProfile extends LitElement {
  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background-color: #d8bfd8;
      text-align: center;
      min-height: 100vh;
    }
    .profile-card {
      background-color: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border: 2px solid #4b0082;
      max-width: 500px;
      width: 100%;
      text-align: center;
      position: relative;
    }
    .profile-card img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 2px solid #4b0082;
      margin-bottom: 1rem;
    }
    .profile-card input[type="file"] {
      display: none;
    }
    .profile-card label, .edit-button {
      background-color: #8a2be2;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      margin-bottom: 1rem;
      border: 2px solid #4b0082;
      text-decoration: none;
      font-size: 1rem;
    }
    .profile-card input {
      width: 100%;
      margin-bottom: 1rem;
      padding: 0.5rem;
      font-size: 1rem;
      border: 2px solid #ccc;
      border-radius: 5px;
    }
    .edit-button {
      background-color: #8a2be2;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 5px;
      border: 2px solid #4b0082;
      font-size: 0.875rem;
    }
    .edit-button:hover, label:hover {
      background-color: #5e5a8d;
    }
    .recipes {
      margin-top: 2rem;
      width: 100%;
    }
    .recipes h2 {
      margin-bottom: 1rem;
      color: #4b0082;
      font-family: 'Lemon Shake Shake', cursive;
    }
    .recipe-item {
      background-color: #e6e6fa;
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border: 2px solid #4b0082;
      margin-bottom: 1rem;
      text-align: left;
      position: relative;
      transition: background-color 0.3s ease;
    }
    .recipe-item:hover {
      background-color: #dcdcdc;
    }
    .navigate-button {
      background-color: #8a2be2;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: 2px solid #4b0082;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 1rem;
      text-decoration: none;
    }
    .navigate-button:hover {
      background-color: #5e5a8d;
    }
  `;

  static get properties() {
    return {
      profileImage: { type: String },
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      recipes: { type: Array },
      editingField: { type: String }
    };
  }

  constructor() {
    super();
    this.profileImage = localStorage.getItem('profileImage') || '../images/default-profile.png';
    this.name = localStorage.getItem('name') || 'Nombre Completo';
    this.email = localStorage.getItem('email') || 'correo@ejemplo.com';
    this.phone = localStorage.getItem('phone') || '1234567890';
    this.recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    this.editingField = '';
  }

  handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImage = reader.result;
      localStorage.setItem('profileImage', this.profileImage);
    };
    reader.readAsDataURL(file);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this[name] = value;
    localStorage.setItem(name, value);
  }

  toggleEditField(field) {
    this.editingField = this.editingField === field ? '' : field;
  }

  navigateToRecipes(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'recipes' }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="container">
        <h1>Mi perfil</h1>
        <div class="profile-card">
          <img src="${this.profileImage}" alt="Profile Picture">
          <input type="file" id="profileImageInput" @change="${this.handleImageChange}">
          <label for="profileImageInput">Cambiar foto de perfil</label>
          ${this.editingField === 'name' ? html`
            <input type="text" name="name" .value="${this.name}" @input="${this.handleInputChange}" placeholder="Nombre Completo">
          ` : html`
            <p>${this.name}</p>
          `}
          <button class="edit-button" @click="${() => this.toggleEditField('name')}">Cambiar</button>
          ${this.editingField === 'email' ? html`
            <input type="email" name="email" .value="${this.email}" @input="${this.handleInputChange}" placeholder="Correo Electrónico">
          ` : html`
            <p>${this.email}</p>
          `}
          <button class="edit-button" @click="${() => this.toggleEditField('email')}">Cambiar</button>
          ${this.editingField === 'phone' ? html`
            <input type="tel" name="phone" .value="${this.phone}" @input="${this.handleInputChange}" placeholder="Teléfono">
          ` : html`
            <p>${this.phone}</p>
          `}
          <button class="edit-button" @click="${() => this.toggleEditField('phone')}">Cambiar</button>
        </div>
        <div class="recipes">
          <h2>Tus Recetas</h2>
          ${this.recipes.map(recipe => html`
            <div class="recipe-item">
              <h3>${recipe.name}</h3>
              <p><strong>Ingredientes:</strong> ${recipe.ingredients}</p>
              <p><strong>Descripción:</strong> ${recipe.description}</p>
              <p><strong>Notas:</strong> ${recipe.notes}</p>
            </div>
          `)}
          <button class="navigate-button" @click="${this.navigateToRecipes}">Ir a Mis Recetas</button>
        </div>
      </div>
    `;
  }
}

customElements.define('app-profile', AppProfile);
