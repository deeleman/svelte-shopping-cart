import '@testing-library/jest-dom';
import { tick } from 'svelte';
import { render, fireEvent, screen } from '@testing-library/svelte';

import ProductQuantity from '../ProductQuantity.svelte';

describe('ProductQuantity', () => {
  const addHandlerStub = jest.fn();
  const removeHandlerStub = jest.fn();
  const editHandlerStub = jest.fn();
  let component: ProductQuantity;

  beforeEach(() => { component = render(ProductQuantity, { props: { quantity: undefined }}).component });
  
  afterEach(() => jest.resetAllMocks());

  it('should display 0 items by default when no quantity is supplied', () => {
    expect((screen.getByLabelText('product-quantity') as HTMLInputElement).value).toEqual('0');
  });

  it('should display the amount of items in the quantity input field', async () => {
    component.$set({ quantity: 52 })
    await tick();
    expect((screen.getByLabelText('product-quantity') as HTMLInputElement).value).toEqual('52')
  });

  it('should call the add handler when the "+" button is clicked', async () => {
    component.$on('add', addHandlerStub);
    await fireEvent.click(screen.getByLabelText('add'));
    expect(addHandlerStub).toHaveBeenCalled();
  });

  it('should call the remove handler when the "-" button is clicked', async () => {
    component.$on('remove', removeHandlerStub);
    await fireEvent.click(screen.getByLabelText('remove'));
    expect(removeHandlerStub).toHaveBeenCalled();
  });

  it('should call the edit handler when a value is entered by hand', async () => {
    component.$on('edit', editHandlerStub);
    await fireEvent.change(screen.getByLabelText('product-quantity'), { value: 56 });
    expect(editHandlerStub).toHaveBeenCalled();
  });
});
