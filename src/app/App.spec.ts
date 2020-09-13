import '@testing-library/jest-dom';
import { fireEvent, render, RenderResult } from '@testing-library/svelte';
import App from './App.svelte';

jest.mock('./services/data-service');

describe('App integration tests', () => {
  let results: RenderResult;
  const settingsMock = {
    items:          'https://test.dev/api/v1/items',
    discountRules:  'https://test.dev/api/v1/discounts',
  };

  beforeEach(() => { results = render(App, { props: { settings: settingsMock }}); })
  
  it('should render product items once fetched', async () => {
    await results.findAllByLabelText('product-name');
    expect(results.getAllByLabelText('product-name')).toHaveLength(4);
  });

  xit('should increase and decrease product quantities upon clicking on the PLUS/MINUS symbol', async () => {
    const addButtons = await results.findAllByLabelText('add');
    await fireEvent.click(addButtons[0]); // T-Shirt [+] button
    await fireEvent.click(addButtons[0]);
    await fireEvent.click(addButtons[0]);

    expect(results.queryAllByLabelText('product-quantity')[0]).toHaveValue(3);
    expect(results.getByText('x3 React T-Shirt offer')).toBeInTheDocument();
    expect(results.getByText('3 Items')).toBeInTheDocument();
    expect(results.getByText('-3 €')).toBeInTheDocument();
    expect(results.getByText('57 €')).toBeInTheDocument();

    await fireEvent.click(addButtons[1]); // Mug [+] button
    await fireEvent.click(addButtons[1]);
    await fireEvent.click(addButtons[1]);
    await fireEvent.click(addButtons[1]);
    await fireEvent.click(results.getAllByLabelText('remove')[1]);

    expect(results.queryAllByLabelText('product-quantity')[1]).toHaveValue(3);
    expect(results.getByText('2x1 React Coffee Mug offer')).toBeInTheDocument();
    expect(results.getByText('6 Items')).toBeInTheDocument();
    expect(results.getByText('-5 €')).toBeInTheDocument();
    expect(results.getByText('67 €')).toBeInTheDocument();
  });

  xit('should update product quantities upon changing input manually', async () => {
    await results.findAllByLabelText('product-name');
    const mugQuantityInput = results.queryAllByLabelText('product-quantity')[1];
    await fireEvent.change(mugQuantityInput, { target: { value: 11 }}); // Mug qty input
    expect(mugQuantityInput).toHaveValue(11);
  });

  xit('should enable the product modal upon clicking on the product item', async () => {
    const thumbs = await results.findAllByRole('img');
    expect(results.queryByRole('dialog')).toBeNull();

    await fireEvent.click(thumbs[1]);
    expect(results.queryByRole('dialog')).not.toBeNull();
  });
});
