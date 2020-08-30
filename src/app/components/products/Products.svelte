<style lang="scss" src="Products.scss"></style>

<script lang="ts">
  import ProductsLoader from './ProductsLoader.svelte';

  export let isLoading: boolean;
</script>

<template>
  <section class="products">
  {#if isLoading }
    <h1 role="main" class="main">Loading shopping cart, please wait...</h1>
    <ProductsLoader />
  {:else}
    <h1 role="main" class="main">React Swag Catalogue</h1>
    <ul role="heading" class="products-list tableHead">
      <li class="products-list-title row">
        <div class="col-product">Product details</div>
        <div class="col-quantity">Quantity</div>
        <div class="col-price">Price</div>
        <div class="col-total">Total</div>
      </li>
    </ul>
    <slot><!-- products table --></slot>
  {/if}
  </section>
</template>
