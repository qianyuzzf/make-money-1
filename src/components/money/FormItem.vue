<template>
  <label class="notes">
    <span class="name"><slot/></span>
    <input v-model="value" type="text" :placeholder="placeholder">
  </label>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';

export default defineComponent({
  name: 'Notes',
  props: {
    placeholder: {
      type: String
    }
  },
  setup(props, context) {
    const value = ref('');
    watch(value, (value) => {
      context.emit('update:value', value);
    });
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