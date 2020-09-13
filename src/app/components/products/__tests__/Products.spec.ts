import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import { tick } from 'svelte';

import Products from '../Products.svelte';

describe('Products', () => {
  let component: Products;

  beforeEach(() => component = render(Products, { props: { isLoading: true }}).component);

  it('should display a products loader when the component is loading', () => {
    expect(screen.getByRole('main').textContent).toContain('Loading'); 
  });

  it('should display the products header when the component is not loading', async () => {
    component.$set({ isLoading: false });
    await tick();
    expect(screen.getByRole('main').textContent).toContain('React Swag Catalogue'); 
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should NOT render projected children elements if onloading', async () => {
    component.$set({ isLoading: false });
    await tick();
    expect(screen.queryByText('Mock children element')).not.toBeInTheDocument();
  });
});
