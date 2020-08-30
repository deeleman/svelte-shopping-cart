<style lang="scss" src="./App.scss"></style>

<script type="ts">
  import { onMount, getContext, setContext } from 'svelte';
  import { CatalogueStore } from './store';
  import type { CartState } from './store';
  import type { CatalogueItem, Item, PricingSettings } from './types';
  import AppLayout from './AppLayout.svelte';
  import {
    Products, ProductsList, ProductModal,
    Summary, SummaryItems, SummaryDiscounts, SummaryTotal,
  } from './components';

  export let settings: PricingSettings;

  let cartState: CartState;
  let cartItemsAmount = 0;
  let cartSubtotal = 0;
  let cartTotal = 0;

  let selectedItem: Item;
  const toggleModal = (event: CustomEvent<Item>) => selectedItem = event.detail;

  let catalogue: CatalogueStore;

  onMount(() => {
    catalogue = new CatalogueStore(settings);
    catalogue.cart.subscribe((_cartState) => { 
      cartState = _cartState;

      cartItemsAmount = _cartState.catalogueItems.reduce((items, item) => items + item.quantity, 0);
      cartSubtotal = _cartState.catalogueItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      cartTotal = cartSubtotal - _cartState.discountItems.reduce((total, item) => total + item.subTotal, 0);
    });
  });
</script>

<template>
  <AppLayout />
  <main class="App">
    <Products isLoading={cartState?.isLoading}>
      <ProductsList items={cartState?.catalogueItems} on:scan={(e) => catalogue.addItem(e.detail)} on:remove={(e) => catalogue.removeItem(e.detail)} on:select={toggleModal} />
      <ProductModal item={selectedItem} on:scan={(e) => catalogue.addItem(e.detail)} on:close={toggleModal} />
    </Products>
    <Summary>
      <SummaryItems quantity={cartItemsAmount} subTotal={cartSubtotal} />
      <SummaryDiscounts items={cartState?.discountItems} />
      <SummaryTotal isLoading={cartState?.isLoading} total={cartTotal} />
    </Summary>
  </main>
</template>
