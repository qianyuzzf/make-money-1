<template>
  <ul class="types">
    <li :class="{selected:value==='-'}" @click="selectType('-')">支出</li>
    <li :class="{selected:value==='+'}" @click="selectType('+')">收入</li>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Types',
  props: {
    value: {
      type: String,
      default: '-'
    }
  },
  setup(props, context) {
    const selectType = (data: string) => {
      if (data !== props.value) {
        context.emit('update:value', data);
      }
    };
    return {selectType};
  }
});
</script>

<style lang="scss" scoped>
.types {
  display: flex;
  background: #c4c4c4;
  font-size: 24px;
  text-align: center;

  > li {
    width: 50%;
    padding: 14px 0;
    position: relative;

    &.selected {
      &::after {
        content: '';
        width: 100%;
        height: 4px;
        bottom: 0;
        left: 0;
        background: #333333;
        position: absolute;
      }
    }
  }
}
</style>