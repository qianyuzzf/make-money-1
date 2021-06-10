<template>
  <button class="button">
    <slot/>
  </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Button'
});
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.button {
  border: none;
  background: $sure-button-bg;
  color: #fff;
  border-radius: 8px;
  padding: 8px 16px;

  &-wrapper {
    text-align: center;
    padding-top: 32px;
  }
}
</style>