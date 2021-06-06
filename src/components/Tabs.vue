<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value"
        @click="select(item.value)"
        :class="{selected:item.value===value,
        [classPrefix+'-tabs-item']:classPrefix}">
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Tabs',
  props: {
    value: {
      type: String
    },
    classPrefix: {
      type: String
    },
    dataSource: {
      type: Array
    }
  },
  setup(props, context) {
    const select = (data: string) => {
      if (data !== props.value) {
        context.emit('update:value', data);
      }
    };
    return {select};
  }
});
</script>

<style lang="scss" scoped>
.tabs {
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