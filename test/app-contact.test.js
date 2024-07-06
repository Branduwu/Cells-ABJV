import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/app-contact.js';

describe('AppContact', () => {
  it('debería renderizar correctamente', async () => {
    const el = await fixture(html`<app-contact></app-contact>`);
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('debería validar el campo de nombre', async () => {
    const el = await fixture(html`<app-contact></app-contact>`);
    const nameInput = el.shadowRoot.querySelector('input[type="text"]');
    
    nameInput.value = '12345';
    nameInput.dispatchEvent(new Event('input'));

    expect(nameInput.checkValidity()).to.be.false;
  });

  it('debería mostrar una alerta al enviar el formulario', async () => {
    const el = await fixture(html`<app-contact></app-contact>`);
    const form = el.shadowRoot.querySelector('form');

    window.alert = (message) => {
      expect(message).to.equal('Tu mensaje fue enviado');
    };

    form.dispatchEvent(new Event('submit'));
  });
});
