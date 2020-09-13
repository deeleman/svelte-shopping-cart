import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Product from '../Product.svelte';

describe('Product', () => {
  const selectHandlerStub = jest.fn();
  let component: Product;

  beforeEach(() => component = render(Product, { props: { name: 'React Mug', code: 'X2G2OPZ'}}).component);

  afterEach(() => jest.resetAllMocks());

  it('should display the product name supplied', () => {
    expect(screen.getByLabelText('product-name').textContent).toEqual('React Mug'); 
  });

  it('should display the product code supplied', () => {
    expect(screen.getByLabelText('product-code').textContent).toEqual('Product code X2G2OPZ'); 
  });

  it('should display an image whose alt attribute is the short name', () => {
    expect(screen.getByRole('img').getAttribute('alt')).toEqual('React Mug'); 
  });
  
  it('should display an image depicting the product thumbnail', () => {
    expect(screen.getByRole('img').getAttribute('src')).toEqual('/img/items/mug.png'); 
  });

  it('should call the select handler when the user clicks on the product name', async () => {
    component.$on('select', selectHandlerStub);
    await fireEvent.click(screen.getByText('React Mug'));
    expect(selectHandlerStub).toHaveBeenCalled();
  });

  it('should call the select handler when the user clicks on the image thumbnail', async () => {
    component.$on('select', selectHandlerStub);
    await fireEvent.click(screen.getByRole('img'));
    expect(selectHandlerStub).toHaveBeenCalled();
  });
});
