<style lang="scss">
  @import 'toolkit';
  .summary-items {
    @include tabularList;
    &-price {
      font-size: 16px;
      font-weight: bold;
    }
  }
</style>

<script lang="ts">
  export let quantity = 0;
  export let subTotal = 0;
</script>

<template>
  <ul class="summary-items wrapper border">
    <li>
      <span class="summary-items-number">{quantity} Items</span>
      <span class="summary-items-price" data-testid="price">
        {subTotal}<span class="currency">€</span>
      </span>
    </li>
  </ul>
</template>
