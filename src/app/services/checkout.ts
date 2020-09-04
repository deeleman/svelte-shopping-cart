import { writable, Writable } from 'svelte/store';
import type { CartState, PricingSettings, PricingRules, CatalogueItem, DiscountItem } from 'shopping-cart/types';
import { dataService, getDiscounts } from 'shopping-cart/services';

const initialPricingRules: PricingRules = {
  items: [],
  discountRules: [],
};

export const initialCartState: CartState = {
  isLoading: true,
  catalogueItems: [],
  discountItems: [],
  cartItemsAmount: 0,
  cartSubtotal: 0,
  cartTotal: 0,
};

export class Checkout {
  cart: Writable<CartState> = writable(initialCartState);

  private pricingRules: PricingRules = initialPricingRules;

  constructor(private readonly settings: PricingSettings) {
    this.fetchItems();
  }

  addItem(detail: { id: string, quantity?: number }): void { 
    const {id, quantity} = detail;
    this.cart.update(({ catalogueItems }) => {
      const catalogueItem = catalogueItems.find((item) => item.id === id);

      if (catalogueItem) {
        catalogueItem.quantity = quantity !== undefined ? quantity : catalogueItem.quantity + 1;
      } else {
        const item = this.pricingRules.items.find((item) => item.id === id);
        catalogueItems.push({ ...item, quantity: quantity || 1 });
      }

      return this.composeStateSnapshot(catalogueItems);
    });
  }

  removeItem(id: string): void {
    this.cart.update(({ catalogueItems }) => {
      const catalogueItem = catalogueItems.find((item) => item.id === id);

      if (catalogueItem && catalogueItem.quantity > 0) {
        catalogueItem.quantity =  catalogueItem.quantity - 1; 
      } else {
        const item = this.pricingRules.items.find((item) => item.id === id);
        catalogueItems.push({ ...item, quantity: 0 });
      }

      return this.composeStateSnapshot(catalogueItems);
    });
  }

  private composeStateSnapshot(catalogueItems: CatalogueItem[]): CartState {
    const discountItems = getDiscounts(catalogueItems, this.pricingRules.discountRules);
    const cartItemsAmount = catalogueItems.reduce((items, item) => items + item.quantity, 0);
    const cartSubtotal = catalogueItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartTotal = cartSubtotal - discountItems.reduce((total, item) => total + item.subTotal, 0);

    return { catalogueItems, discountItems, cartItemsAmount, cartSubtotal, cartTotal, isLoading: false };
  }

  private async fetchItems(): Promise<void> {
    this.pricingRules = await dataService<PricingRules>(this.settings);
    this.cart.set({
      ...initialCartState,
      catalogueItems: this.pricingRules.items.map((item) => ({ ...item, quantity: 0 })),
      isLoading: false
    });
  }
}