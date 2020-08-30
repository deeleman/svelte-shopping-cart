<style lang="scss" src="ProductQuantity.scss"></style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let quantity = 0;

  const dispatch = createEventDispatcher();

</script>

<template>
  <button aria-label="remove" class="count" on:click={() => dispatch('remove')}>-</button>
    <input aria-label="product-quantity"
      type="number"
      class="product-quantity"
      value={quantity}
      on:change={(e) => dispatch('edit', parseInt(e.target.value, 10))}
    />
    <button aria-label="add" class="count" on:click={() => dispatch('add')}>+</button>
</template>
