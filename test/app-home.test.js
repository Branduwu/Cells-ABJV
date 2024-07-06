import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/app-home.js';

describe('AppHome', () => {
  it('debería renderizar correctamente', async () => {
    const el = await fixture(html`<app-home></app-home>`);
    expect(el.shadowRoot).to.be.accessible();
  });

  it('debería navegar a la página de registro al hacer clic en "Registrarse"', async () => {
    const el = await fixture(html`<app-home></app-home>`);
    const navigateEvent = new Promise(resolve => {
      el.addEventListener('navigate', e => resolve(e.detail.page));
    });

    const registerLink = el.shadowRoot.querySelector('a[href="#register"]');
    registerLink.click();
    
    const page = await navigateEvent;
    expect(page).to.equal('register');
  });

  it('debería validar el correo electrónico', async () => {
    const el = await fixture(html`<app-home></app-home>`);
    const emailInput = el.shadowRoot.querySelector('input[type="email"]');
    
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));

    expect(emailInput.checkValidity()).to.be.false;
  });
});
