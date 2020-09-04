<style lang="scss" src="./App.scss"></style>

<script lang="typescript" type="ts" >
  import { onDestroy, onMount } from 'svelte';
  import AppLayout from './AppLayout.svelte';
  import {
    ProductModal, Products, ProductsList, 
    Summary, SummaryDiscounts, SummaryItems, SummaryTotal
  } from './components';
  import { Checkout, initialCartState } from './services';
  import type { CartState, Item, PricingSettings } from './types';

  export let settings: PricingSettings;
    
  let catalogue: Checkout;
  let catalogueUnsubscribe: () => void;
  let cartState = initialCartState;

  let selectedItem: Item;
  const toggleModal = (event: CustomEvent<Item>) => selectedItem = event.detail;

  onMount(() => {
    catalogue = new Checkout(settings);
    catalogueUnsubscribe = catalogue.cart.subscribe((_cartState) => cartState = _cartState);
  });

  onDestroy(catalogueUnsubscribe);
</script>

<template>
  <AppLayout />
  <main class="App">
    <Products isLoading={cartState.isLoading}>
      <ProductsList items={cartState.catalogueItems} on:scan={(e) => catalogue.addItem(e.detail)} on:remove={(e) => catalogue.removeItem(e.detail)} on:select={toggleModal} />
      </Products>
      <Summary>
        <SummaryItems quantity={cartState.cartItemsAmount} subTotal={cartState.cartSubtotal} />
        <SummaryDiscounts items={cartState.discountItems} />
        <SummaryTotal isLoading={cartState.isLoading} total={cartState.cartTotal} />
      </Summary>
    </main>
    <ProductModal item={selectedItem} on:scan={(e) => catalogue.addItem(e.detail)} on:close={toggleModal} />
</template>
