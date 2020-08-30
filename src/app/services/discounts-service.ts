import { DiscountItem, DiscountRule, DiscountType, CatalogueItem } from './../types';


const getDiscountItemByRule = (cartItem: CatalogueItem, discountRule: DiscountRule): DiscountItem => {
  switch (discountRule.type) {
    case DiscountType['2x1']: {
      const subTotal = Math.floor(cartItem.quantity / 2) * cartItem.price;
      return composeDiscountItem(discountRule, cartItem, subTotal);
    }

    case DiscountType.Bulk: {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const subTotal = Math.round(cartItem.quantity * cartItem.price * discountRule.discount! * 100) / 100;
      return composeDiscountItem(discountRule, cartItem, subTotal);
    }

    case DiscountType.PromoCode:
    default: {
      return composeDiscountItem(discountRule, cartItem);
    }
  }
};

const composeDiscountItem = (discountRule: DiscountRule, catalogueItem: CatalogueItem, subTotal = 0): DiscountItem => {
  const name = discountRule.type === DiscountType['2x1'] ? 
    `2x1 ${catalogueItem.name} offer` :
    `x${discountRule.minimumItems} ${catalogueItem.name} offer`;

  return {
    type: discountRule.type,
    name,
    subTotal,
  };
};

/**
 * Fetches applicable discounts for an entire shopping cart
 * @param catalogueItems cart items to compute discounts applicable
 * @param discountRule discount rules as retrieved from store
 */
export const getDiscounts = (catalogueItems: CatalogueItem[], discountRules: DiscountRule[]): DiscountItem[] => {
  return catalogueItems.reduce((discountItems, catalogueItem) =>
    [...discountItems, ...getDiscountsByCartItem(catalogueItem, discountRules)],
    [] as DiscountItem[]);
};

/**
* Fetches applicable discounts for a given cart item
* @param catalogueItem cart item to compute discounts applicable
* @param discountRule discount rules as retrieved from store
*/
export const getDiscountsByCartItem = (catalogueItem: CatalogueItem, discountRules: DiscountRule[]): DiscountItem[] => {
 const discountItems: DiscountItem[] = [];

 discountRules.forEach((discountRule) => {
   const minimumItems = discountRule.type === DiscountType['2x1'] ? 2 : discountRule.minimumItems || 0;
   if (discountRule.eligibleItems.indexOf(catalogueItem.id) >= 0 && catalogueItem.quantity >= minimumItems) {
     const discountItem = getDiscountItemByRule(catalogueItem, discountRule);
     if (discountItem.subTotal > 0) {
       discountItems.push(discountItem);
     }
   }
 });

 return discountItems;
};
