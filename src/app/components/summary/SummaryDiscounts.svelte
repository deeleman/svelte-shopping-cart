<style lang="scss" src="./SummaryDiscounts.scss"></style>

<script lang="ts">
  import type { DiscountItem } from 'shopping-cart/types';

  export let items: DiscountItem[] = [];
</script>

<template>
  <div class="summary-discounts wrapper-half border">
    <h2>Discounts</h2>
    <ul role="list">
      {#if items.length > 0 }
        {#each items as item}
          <li role="listitem">
            <span>{item.name}</span>
            <span>-{item.subTotal} €</span>
          </li>
        {/each}
      {:else }
        <li role="listitem"><span>No discounts applicable</span></li>
      {/if}
    </ul>
  </div>
</template>
