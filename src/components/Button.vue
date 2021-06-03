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
.button {
  border: none;
  background: #767676;
  color: white;
  border-radius: 4px;
  padding: 10px 16px;

  &-wrapper {
    text-align: center;
    padding-top: 32px;
  }
}
</style>