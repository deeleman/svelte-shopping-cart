<style lang="scss" src="./Product.scss"></style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let name = '';
  export let code = '';

  const dispatch = createEventDispatcher();

  const sanitizeName = (name: string) => `/img/items/${name.split(' ').pop()?.replace('-', '').toLowerCase()}.png`;
</script>

<template>
  <figure class="product-image">
    <a on:click={() => dispatch('select')} href="#">
      <img role="img" src={sanitizeName(name)} alt={name} />
    </a>
    <div class="product-description">
      <h3 class="product-name" aria-label="product-name">
        <a on:click={() => dispatch('select')} href="#">{name}</a>
      </h3>
      <p aria-label="product-code" class="product-code"><span>Product code</span> {code}</p>
    </div>
  </figure>
</template>
