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
@import "~@/assets/styles/helper.scss";

.tabs {
  display: flex;
  font-size: 20px;
  padding: 12px 64px;
  text-align: center;

  > li {
    width: 50%;
    padding: 4px 0;
    position: relative;
    border-radius: 8px;
    background: #dbd9db;

    &.selected {
      background: $sure-button-bg;
      color: $sure-button-color;
    }
  }
}
</style>