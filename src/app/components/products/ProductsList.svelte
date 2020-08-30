<style lang="scss" src="./ProductsList.scss"></style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { CatalogueItem } from 'shopping-cart/types';
  import Product from './Product.svelte';
  import ProductQuantity from './ProductQuantity.svelte';

  const dispatch = createEventDispatcher();

  export let items: CatalogueItem[] = [];
</script>

<template>
  <ul class="products-list" role="list">
    {#each items as item}
    <li class="product row" role="listitem">
      <div class="col-product">
        <Product
          name={item.name}
          code={item.id}
          on:select={() => dispatch('select', item)}
        />
      </div>
      <div class="col-quantity">
        <ProductQuantity
          quantity={item.quantity}
          on:add={() => dispatch('scan', { id: item.id })}
          on:remove={() => dispatch('remove', item.id )}
          on:edit={(e) => dispatch('scan', { id: item.id, quantity: e.detail })}
        />
      </div>
      <div class="col-price" aria-label="price">
        <span class="product-price">{item.price}</span>
        <span class="product-currency currency">€</span>
      </div>
      <div class="col-total" aria-label="total">
        <span class="product-price">{item.price * item.quantity}</span>
        <span class="product-currency currency">€</span>
      </div>
    </li>
    {/each}
  </ul>
</template>