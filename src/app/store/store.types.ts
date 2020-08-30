import type { DiscountItem, CatalogueItem } from 'shopping-cart/types';
import type { Writable } from 'svelte/store';

export interface CartState {
  isLoading: boolean;
  catalogueItems: CatalogueItem[];
  discountItems: DiscountItem[];
}
