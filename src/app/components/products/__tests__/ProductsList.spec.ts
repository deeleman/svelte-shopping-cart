import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/svelte';

import type { CatalogueItem } from 'shopping-cart/types';
import ProductsList from '../ProductsList.svelte';
import { tick } from 'svelte';

describe('ProductsList', () => {
  let component: ProductsList;
  const scanHandlerStub = jest.fn();
  const removeHandlerStub = jest.fn();
  const selectHandlerStub = jest.fn();
  const cartItemsMock: CatalogueItem[] = [
    { id: 'X7R2OPX', name: 'React T-Shirt', price: 20.00, quantity: 2 },
    { id: 'X2G2OPZ', name: 'React Coffee Mug', price: 5.00, quantity: 1 },
    { id: 'X3W2OPY', name: 'React Cap', price: 10.00, quantity: 3 },
  ];

  beforeEach(() => {
    component = render(ProductsList, { props: { items: cartItemsMock }}).component;
    component.$on('scan', scanHandlerStub);
    component.$on('remove', removeHandlerStub);
    component.$on('select', selectHandlerStub);
  });

  afterEach(() => jest.resetAllMocks());

  it('should display an itemized tabular list of products', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('should display unit price for each product item', () => {
    expect(screen.queryAllByLabelText('price')[0].textContent).toEqual('20 €');
    expect(screen.queryAllByLabelText('price')[1].textContent).toEqual('5 €');
    expect(screen.queryAllByLabelText('price')[2].textContent).toEqual('10 €');
  });

  it('should display total amount due for each product order row', () => {
    expect(screen.queryAllByLabelText('total')[0].textContent).toEqual('40 €');
    expect(screen.queryAllByLabelText('total')[1].textContent).toEqual('5 €');
    expect(screen.queryAllByLabelText('total')[2].textContent).toEqual('30 €');
  });

  it('should propagate and trigger the scan event handler after a click on a child add button', async () => {
    await fireEvent.click(screen.queryAllByLabelText('add')[0]);
    expect(scanHandlerStub).toHaveBeenCalled();
    scanHandlerStub.mockClear();

    await fireEvent.click(screen.queryAllByLabelText('add')[1]);
    expect(scanHandlerStub).toHaveBeenCalled();
    scanHandlerStub.mockClear();

    await fireEvent.click(screen.queryAllByLabelText('add')[2]);
    expect(scanHandlerStub).toHaveBeenCalled();
    scanHandlerStub.mockClear();
  });

  it('should propagate and trigger the scan event handler after a click on a child remove button', async () => {
    await fireEvent.click(screen.queryAllByLabelText('remove')[0]);
    expect(removeHandlerStub).toHaveBeenCalled();
    removeHandlerStub.mockClear();

    await fireEvent.click(screen.queryAllByLabelText('remove')[1]);
    expect(removeHandlerStub).toHaveBeenCalled();
    removeHandlerStub.mockClear();

    await fireEvent.click(screen.queryAllByLabelText('remove')[2]);
    expect(removeHandlerStub).toHaveBeenCalled();
    removeHandlerStub.mockClear();
  });

  it('should trigger the scan event handler adding units in the payload if populated manually', async () => {
    await fireEvent.change(screen.queryAllByLabelText('product-quantity')[0], { target: { value: 56 }});
    expect(scanHandlerStub).toHaveBeenCalled();
    scanHandlerStub.mockClear();

    await fireEvent.change(screen.queryAllByLabelText('product-quantity')[1], { target: { value: 12 }});
    expect(scanHandlerStub).toHaveBeenCalled();
    scanHandlerStub.mockClear();

    await fireEvent.change(screen.queryAllByLabelText('product-quantity')[2], { target: { value: 0 }});
    expect(scanHandlerStub).toHaveBeenCalled();
    scanHandlerStub.mockClear();
  });

  it('should trigger the select event handler when clicking on the product name or thumbnail', async () => {
    await fireEvent.click(screen.getByText('React Cap'));
    await tick();
    await tick();
    await tick();
    expect(selectHandlerStub).toHaveBeenCalled();
    selectHandlerStub.mockClear();

    await fireEvent.click(screen.getAllByRole('img')[1]);
    expect(selectHandlerStub).toHaveBeenCalled();
    selectHandlerStub.mockClear();
  });
});
