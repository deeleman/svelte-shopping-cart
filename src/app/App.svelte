<style lang="scss" src="./App.scss"></style>

<script lang="typescript" type="ts" >
  import { onMount } from 'svelte';
  import AppLayout from './AppLayout.svelte';
  import {
    ProductModal, Products, ProductsList, 
    Summary, SummaryDiscounts, SummaryItems, SummaryTotal
  } from './components';
  import { Checkout } from './services';
  import type { CartState, Item, PricingSettings } from './types';

  export let settings: PricingSettings;

  let cartState: CartState = {
    catalogueItems: [],
    discountItems: [],
    isLoading: true,
  };

  let cartItemsAmount = 0;
  let cartSubtotal = 0;
  let cartTotal = 0;

  let selectedItem: Item;
  const toggleModal = (event: CustomEvent<Item>) => selectedItem = event.detail;

  let catalogue: Checkout;

  onMount(() => {
    catalogue = new Checkout(settings);
    catalogue.cart.subscribe((_cartState) => { 
      cartState = _cartState;

      // TODO: Expose from _cartState
      cartItemsAmount = _cartState.catalogueItems.reduce((items, item) => items + item.quantity, 0);
      cartSubtotal = _cartState.catalogueItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      cartTotal = cartSubtotal - _cartState.discountItems.reduce((total, item) => total + item.subTotal, 0);
    });
  });
</script>

<template>
  <AppLayout />
  <main class="App">
    <Products isLoading={cartState.isLoading}>
      <ProductsList items={cartState.catalogueItems} on:scan={(e) => catalogue.addItem(e.detail)} on:remove={(e) => catalogue.removeItem(e.detail)} on:select={toggleModal} />
      </Products>
      <Summary>
        <SummaryItems quantity={cartItemsAmount} subTotal={cartSubtotal} />
        <SummaryDiscounts items={cartState.discountItems} />
        <SummaryTotal isLoading={cartState.isLoading} total={cartTotal} />
      </Summary>
    </main>
    <ProductModal item={selectedItem} on:scan={(e) => catalogue.addItem(e.detail)} on:close={toggleModal} />
</template>
