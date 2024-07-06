import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/app-profile.js';

describe('AppProfile', () => {
  it('debería renderizar correctamente', async () => {
    const el = await fixture(html`<app-profile></app-profile>`);
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('debería permitir cambiar la foto de perfil', async () => {
    const el = await fixture(html`<app-profile></app-profile>`);
    const input = el.shadowRoot.querySelector('input[type="file"]');
    const file = new Blob(['foo'], { type: 'text/plain' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    input.files = dataTransfer.files;
    input.dispatchEvent(new Event('change'));

    expect(localStorage.getItem('profileImage')).to.not.be.null;
  });

  it('debería permitir editar los campos de texto', async () => {
    const el = await fixture(html`<app-profile></app-profile>`);
    const nameButton = el.shadowRoot.querySelector('.edit-button');
    nameButton.click();

    const nameInput = el.shadowRoot.querySelector('input[name="name"]');
    nameInput.value = 'Nuevo Nombre';
    nameInput.dispatchEvent(new Event('input'));

    expect(localStorage.getItem('name')).to.equal('Nuevo Nombre');
  });
});
