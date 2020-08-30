import type { PricingSettings } from './app';

// Main settings - edit endpoints below at your convenience 
//                 to point to an REST API of your choice:
const items         = '/api/fixtures/product-items.json';
const discountRules = '/api/fixtures/product-discounts.json';

// Do not edit anything below this line
export default { items, discountRules } as PricingSettings;
