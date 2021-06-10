<template>
  <label class="formItem" v-if="formItemType==='date'">
    <span class="name"><slot/></span>
    <input v-model="value2" type="date">
  </label>
  <label class="formItem" v-else-if="formItemType==='money'">
    <span class="name"><slot/></span>
    <input type="text" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
           v-model="value3"
           :placeholder="placeholder">
  </label>
  <label class="formItem" v-else>
    <span class="name"><slot/></span>
    <input v-model="value" type="text" :placeholder="placeholder">
  </label>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'FormItem',
  props: {
    placeholder: {
      type: String
    },
    data: {
      type: String
    },
    initValue: {
      type: Boolean
    },
    formItemType: {
      type: String
    }
  },
  setup(props, context) {
    const value = ref(props.data);
    const value2 = ref(props.data);
    const value3 = ref(props.data);
    watch(value, (value) => {
      context.emit('update:value', value);
    });
    watch(value2, (value) => {
      context.emit('update:value2', value);
    });
    watch(value3, (value) => {
      context.emit('update:value3', value);
    });
    watch(() => props.initValue, () => {
      value.value = '';
      value2.value = dayjs().format('YYYY-MM-DD');
      value3.value = props.placeholder;
    });
    return {value, value2, value3};
  }
});
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;

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