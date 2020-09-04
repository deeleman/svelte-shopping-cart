import type { CatalogueItem } from './cart-item';
import type { DiscountItem } from './discounts';

export interface CartState {
  isLoading: boolean;
  catalogueItems: CatalogueItem[];
  discountItems: DiscountItem[];
  cartItemsAmount: number;
  cartSubtotal: number;
  cartTotal: number;
}
