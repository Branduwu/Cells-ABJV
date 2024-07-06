import { LitElement, html, css } from 'lit';

class AppRecipes extends LitElement {
  static styles = css`
    .container {
      text-align: center;
      margin-top: 2rem;
      padding: 0 1rem;
    }
    .container img {
      width: 100%;
      max-width: 300px;
      height: auto;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1rem;
      background-color: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      max-width: 400px;
      margin: auto;
    }
    form input, form textarea {
      width: 100%;
      margin-bottom: 1rem;
      padding: 0.5rem;
      font-size: 1rem;
      border: 2px solid #d8bfd8;
      border-radius: 5px;
    }
    form button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      background-color: #d8bfd8;
      color: white;
      border: 2px solid #4b0082;
      border-radius: 5px;
      cursor: pointer;
      margin: 0.5rem 0;
    }
    form button:hover {
      background-color: #c0b0c0;
    }
    .recipe-list {
      margin-top: 2rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
    .recipe-item {
      background-color: #e6e6fa;
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border: 2px solid #4b0082;
      max-width: 300px;
      width: 100%;
      position: relative;
    }
    .recipe-item h2, .recipe-item p {
      margin: 0.5rem 0;
    }
    .recipe-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    }
    .recipe-buttons button {
      background-color: red;
      color: white;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      border-radius: 5px;
    }
    .recipe-buttons button:hover {
      background-color: darkred;
    }
    .edit-button {
      background-color: blue;
    }
    .edit-button:hover {
      background-color: darkblue;
    }
    @media (max-width: 768px) {
      .container {
        padding: 0 0.5rem;
      }
      form {
        max-width: 100%;
      }
      .recipe-item {
        max-width: 100%;
      }
    }
  `;

  static get properties() {
    return {
      recipes: { type: Array },
      editingRecipe: { type: Object }
    };
  }

  constructor() {
    super();
    this.recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    this.editingRecipe = null;
  }

  addRecipe(e) {
    e.preventDefault();
    const form = e.target;
    const newRecipe = {
      id: Date.now(),
      name: form.name.value,
      ingredients: form.ingredients.value,
      description: form.description.value,
      notes: form.notes.value,
    };
    this.recipes = [...this.recipes, newRecipe];
    this.updateLocalStorage();
    form.reset();
  }

  deleteRecipe(id) {
    this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    this.updateLocalStorage();
  }

  editRecipe(recipe) {
    this.editingRecipe = recipe;
    this.requestUpdate();
  }

  saveRecipe(e) {
    e.preventDefault();
    const form = e.target;
    const updatedRecipe = {
      ...this.editingRecipe,
      name: form.name.value,
      ingredients: form.ingredients.value,
      description: form.description.value,
      notes: form.notes.value,
    };
    this.recipes = this.recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe);
    this.updateLocalStorage();
    this.editingRecipe = null;
  }

  updateLocalStorage() {
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }

  render() {
    return html`
      <div class="container">
        <h1>Hola, estas son tus recetas</h1>
        <img src="../images/pastel2.jpg" alt="Pastel">
        <form @submit="${this.editingRecipe ? this.saveRecipe : this.addRecipe}">
          <input name="name" type="text" placeholder="Nombre de la receta" .value="${this.editingRecipe ? this.editingRecipe.name : ''}" required>
          <textarea name="ingredients" placeholder="Ingredientes" required .value="${this.editingRecipe ? this.editingRecipe.ingredients : ''}"></textarea>
          <textarea name="description" placeholder="Descripción" required .value="${this.editingRecipe ? this.editingRecipe.description : ''}"></textarea>
          <textarea name="notes" placeholder="Notas" .value="${this.editingRecipe ? this.editingRecipe.notes : ''}"></textarea>
          <button type="submit">${this.editingRecipe ? 'Guardar' : 'Agregar'}</button>
        </form>
        <div class="recipe-list">
          ${this.recipes.map(recipe => html`
            <div class="recipe-item">
              <h2>${recipe.name}</h2>
              <p><strong>Ingredientes:</strong> ${recipe.ingredients}</p>
              <p><strong>Descripción:</strong> ${recipe.description}</p>
              <p><strong>Notas:</strong> ${recipe.notes}</p>
              <div class="recipe-buttons">
                <button class="edit-button" @click="${() => this.editRecipe(recipe)}">Editar</button>
                <button @click="${() => this.deleteRecipe(recipe.id)}">Borrar</button>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('app-recipes', AppRecipes);
