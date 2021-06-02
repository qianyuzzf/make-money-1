<template>
  <label class="notes">
    <span class="name">备注</span>
    <input v-model="value" type="text" placeholder="请输入备注信息">
  </label>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'Notes',
  setup() {
    const value = ref('');
    return {value};
  }
});
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  padding-left: 16px;
  background: #f5f5f5;
  display: flex;
  align-items: center;

  > .name {
    padding-right: 16px;
  }

  > input {
    padding: 16px 16px 16px 0;
    border: none;
    flex-grow: 1;
    background: transparent;
  }
}
</style>