<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag.id"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">
        <Icon :name="tag.content"/>
        <span>{{ tag.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import createId from '@/lib/createId';
import {Tag} from '@/custom';
import Icon from '@/components/Icon.vue';

export default defineComponent({
  name: 'Tags',
  components: {Icon},
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
      context.emit('update:value', Array.from(selectedTags.value));
    };
    const create = () => {
      const name = window.prompt('请输入标签名');
      if (name === '') {
        window.alert('标签名不能为空');
        return;
      }
      if (name) {
        const tags = (props.dataSource as Tag[]);
        const index = tags.filter(item => item.name === name)[0];
        if (index) {
          window.alert('标签名重复，请重新输入');
          return;
        }
        tags.push({id: createId(), name, content: 'custom'});
        context.emit('update:dataSource', tags);
        window.alert('添加成功');
      }
    };
    return {selectedTags, toggle, create};
  }
});
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.tags {
  font-size: 14px;
  padding: 16px 0 16px 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  background: white;
  overflow: auto;

  > .current {
    display: grid;
    grid-template-columns: repeat(4, 25%);

    > li {
      background: #dbd9db;
      padding: 8px;
      margin: 12px 16px 0 0;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      max-height: 80px;

      > span {
        max-width: 80%;
        overflow: hidden;
      }

      > .icon {
        width: 32px;
        height: 32px;
      }

      &.selected {
        background: $sure-button-bg;
        color: $sure-button-color;

        > .icon {
          animation: scaleIcon 250ms 2;
          @keyframes scaleIcon {
            0% {
              transform: scale(1.0);
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1.0);
            }
          }
        }
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