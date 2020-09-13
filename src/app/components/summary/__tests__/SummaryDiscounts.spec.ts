import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';

import { DiscountType } from 'shopping-cart/types';
import SummaryDiscounts from '../SummaryDiscounts.svelte';

describe('SummaryDiscounts', () => {
  const mugDiscountMock = { type: DiscountType['2x1'], name: '2x1 Mug offer', subTotal: 10 };
  const bulkShirtDiscountMock = { type: DiscountType.Bulk, name: 'x3 Shirt offer', subTotal: 4 };

  it('should display a "No discounts..." fallback text if no items are provided', () => {
    const { getByRole } = render(SummaryDiscounts);
    expect(getByRole('listitem').textContent).toContain('No discounts applicable');
  });

  it('should display a "No discounts..." fallback text if discounts provided are empty', () => {
    const { getByRole } = render(SummaryDiscounts, { props: { items: [] }});
    expect(getByRole('listitem').textContent).toContain('No discounts applicable');
  });

  it('should display an itemized list matching discounts provided', () => {
    const discountItemsMock = [mugDiscountMock, bulkShirtDiscountMock];
    const { getAllByRole } = render(SummaryDiscounts, { props: { items: discountItemsMock }});

    expect(getAllByRole('listitem')).toHaveLength(2);
    expect(getAllByRole('listitem')[0].textContent).toContain('-10 €');
    expect(getAllByRole('listitem')[1].textContent).toContain('-4 €');
  });
});
