<style lang="scss" src="./ProductModal.scss"></style>

<script lang="ts">
  import type { Item } from 'shopping-cart/types';
  import { createEventDispatcher } from 'svelte';

  export let item: Item;

  const sanitizeName = (name: string) => `/img/items/${name.split(' ').pop()?.replace('-', '').toLowerCase()}Large.png`;  
  const dispatch = createEventDispatcher();
  const scanItemHandler = () => {
    dispatch('scan', { id: item.id });
    dispatch('close');
  };
</script>

<template>
  {#if item }
  <div class="modal" role="dialog">
    <figure
      role="img"
      class="modal__image"
      style="background-image: url('{sanitizeName(item.name)}')"
    >
    </figure>
    <aside class="modal__description">
      <h3 class="modal__description-name-price">
        <span>{item.name}</span>
        <span>{item.price} €</span>
      </h3>
      <p class="modal__description-abstract">
        Surprise your friends and family with this fantastic <strong>{item.name}</strong> branded
        with your favorite JavaScript library. This {item.name.toLowerCase()} has been manufactured
        with the best quality materials and it is designed to endure long time and regular washing.
      </p>
      <h4 class="modal__description-code">Product code {item.id}</h4>
      <div>
        <button role="button" type="submit" on:click={() => scanItemHandler()}>Add to cart</button>
      </div>
    </aside>
    <button class="modal__close" on:click={() => dispatch('close')} aria-label="close" />
  </div>
  {/if}
</template>
