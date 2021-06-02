<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'Tags',
  props: {
    dataSource: {
      type: Array
    }
  },
  setup(props, context) {
    const selectedTags = ref<string[]>([]);
    const toggle = (tag: string) => {
      const index = selectedTags.value.indexOf(tag);
      if (index >= 0) {
        selectedTags.value.splice(index, 1);
      } else {
        selectedTags.value.push(tag);
      }
    };
    const create = () => {
      const name = window.prompt('请输入标签名:');
      if (name === '') {
        window.alert('标签名不能为空');
      } else if (props.dataSource) {
        context.emit('update:dataSource', [...props.dataSource, name]);
      }
    };
    return {selectedTags, toggle, create};
  }
});
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      $h: 24px;
      $bg: #dbd9db;
      background: $bg;
      height: $h;
      padding: 0 16px;
      margin: 4px 12px 0 0;
      border-radius: $h/2;
      display: flex;
      justify-content: center;
      align-items: center;

      &.selected {
        background: darken($bg, 50%);
        color: #dbd9db;
      }
    }
  }

  > .new {
    padding-top: 16px;

    > button {
      background: transparent;
      border: none;
      color: #999999;
      padding: 0 4px;
      border-bottom: 1px solid;
    }
  }
}
</style>