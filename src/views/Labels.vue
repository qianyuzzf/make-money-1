<template>
  <Layout>
    {{ tagsList }}
    <div class="tags">
      <router-link :to="`/labels/edit/${tag.id}`" v-for="tag in tagsList" :key="tag.name">
        <span>{{ tag.name }}</span>
        <Icon class="rightIcon" name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import model from '@/models/model';
import {defineComponent, ref} from 'vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import {Tag} from '@/custom.ts';
import Button from '@/components/Button.vue';

export default defineComponent({
  name: 'Labels',
  components: {Button, Icon, Layout},
  setup() {
    const tagsList = ref<Tag[]>(model.fetch('tagsList'));
    const createTag = () => {
      const name = window.prompt('请输入标签名');
      if (name) {
        const index = tagsList.value.filter(item => item.name === name)[0];
        if (index) {
          window.alert('标签名重复，请重新输入');
          return;
        }
        tagsList.value.push({id: name, name: name});
        model.save('tagsList', tagsList.value);
        window.alert('添加成功');
      }
    };
    return {tagsList, createTag};
  }
});
</script>

<style lang="scss" scoped>
.tags {
  padding: 0 16px;
  background: white;

  > a {
    font-size: 16px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    > .rightIcon {
      width: 20px;
      height: 20px;
    }
  }
}

.createTag-wrapper {
  text-align: center;
  padding-top: 32px;
}
</style>
