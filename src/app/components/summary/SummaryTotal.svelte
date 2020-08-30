<style lang="scss" src="./SummaryTotal.scss"></style>

<script lang="ts">
  export let total = 0;
  export let isLoading: boolean;
</script>

<template>
  <div class="summary-total wrapper">
    <ul>
      <li>
        <span class="summary-total-cost">Total cost</span>
        <span class="summary-total-price">{total} €</span>
      </li>
    </ul>
    <button role="button" type="submit" disabled={isLoading}>Checkout</button>
  </div>
</template>
