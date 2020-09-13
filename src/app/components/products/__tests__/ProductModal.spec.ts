import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/svelte';
import type { Item } from 'shopping-cart/types';
import { tick } from 'svelte';
import ProductModal from '../ProductModal.svelte';

describe('ProductModal', () => {
  const scanHandlerStub = jest.fn();
  const closeHandlerStub = jest.fn();
  const cartItemMock: Item = { id: 'X7R2OPX', name: 'React T-Shirt', price: 20.00 };
  let component: ProductModal;

  beforeEach(() => {
    component = render(ProductModal, { item: cartItemMock }).component;
    component.$on('scan', scanHandlerStub);
    component.$on('close', closeHandlerStub);
  });

  afterEach(() => jest.resetAllMocks());

  it('should display the product name', () => {
    expect(screen.getAllByText('React T-Shirt').length).toBeGreaterThanOrEqual(1);
  });

  it('should display the product price', () => {
    expect(screen.getByText('20 €')).toBeInTheDocument();
  });

  it('should display the product code', () => {
    expect(screen.getByText('Product code X7R2OPX')).toBeInTheDocument();
  });

  it('should display the product image in large format', () => {
    expect(screen.getByRole('img').getAttribute('style')).toContain('tshirtLarge.png'); 
  });

  it('should call the scan handler upon clicking on the add to cart button and then trigger the close event', async () => {
    await fireEvent.click(screen.getAllByRole('button')[0]);
    expect(scanHandlerStub).toHaveBeenCalled();
    expect(closeHandlerStub).toHaveBeenCalled();
  });
  
  it('should trigger the close event upon clicking on the X icon', async () => {
    await fireEvent.click(screen.getAllByRole('button')[1]);
    expect(scanHandlerStub).not.toHaveBeenCalled();
    expect(closeHandlerStub).toHaveBeenCalled();
  });

  it('should not display the product modal if the input item is not set', async () => {
    component.$set({ item: undefined });
    await tick();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

});
