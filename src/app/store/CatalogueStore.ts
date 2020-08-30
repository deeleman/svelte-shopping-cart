import { writable, Writable } from 'svelte/store';
import type { PricingSettings, PricingRules } from 'shopping-cart/types';
import { dataService, getDiscounts } from 'shopping-cart/services';
import type { CartState } from './store.types';

const initialPricingRules: PricingRules = {
  items: [],
  discountRules: [],
};

const initialCartState: CartState = {
  isLoading: true,
  catalogueItems: [],
  discountItems: [],
};

export class CatalogueStore {
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

      const discountItems = getDiscounts(catalogueItems, this.pricingRules.discountRules);

      return { catalogueItems, discountItems, isLoading: false };
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

      const discountItems = getDiscounts(catalogueItems, this.pricingRules.discountRules);
      
      return { catalogueItems, discountItems, isLoading: false };
    });
  }

  private async fetchItems(): Promise<void> {
    this.pricingRules = await dataService<PricingRules>(this.settings);
    this.cart.set({
      catalogueItems: this.pricingRules.items.map((item) => ({ ...item, quantity: 0 })),
      discountItems: [],
      isLoading: false
    });
  }
}