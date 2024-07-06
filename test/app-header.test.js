import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/app-header.js';

describe('AppHeader', () => {
  it('debería renderizar correctamente', async () => {
    const el = await fixture(html`<app-header></app-header>`);
    expect(el.shadowRoot).to.be.accessible();
  });

  it('debería navegar a la página correcta al hacer clic en los enlaces', async () => {
    const el = await fixture(html`<app-header></app-header>`);
    const navigateEvent = new Promise(resolve => {
      el.addEventListener('navigate', e => resolve(e.detail.page));
    });

    const links = el.shadowRoot.querySelectorAll('a');
    links[1].click(); // Clic en "Mis Recetas"
    
    const page = await navigateEvent;
    expect(page).to.equal('recipes');
  });
});
