<template>
  <Layout>
    <ol class="tags">
      <li>
        <span>衣</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>食</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>住</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>行</span>
        <Icon name="right"/>
      </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

export default {
  name: 'Labels',
  components: {Icon, Layout}
};
</script>

<style lang="scss" scoped>
.tags {
  padding: 0 16px;
  background: white;

  > li {
    font-size: 16px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
  }
}

.createTag {
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
