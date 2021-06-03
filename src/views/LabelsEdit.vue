<template>
  <Layout>
    <div>
      <Icon name="left"/>
      <span>编辑标签</span>
    </div>
    <Notes placeholder="请输入新标签名">标签名</Notes>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import {defineComponent, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import model from '@/models/model';
import Icon from '@/components/Icon.vue';
import Notes from '@/components/money/Notes.vue';

export default defineComponent({
  name: 'LabelsEdit',
  components: {Notes, Icon, Layout},
  setup() {
    const route = useRoute();  //获取路由信息
    const router = useRouter();  //执行路由操作
    console.log(route.params.id);
    const id = route.params.id;
    const tagList = ref(model.fetch('tagsList'));
    console.log(tagList.value);
    const tag = tagList.value.filter(t => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      console.log('/404');
      // router.push('/404');
    }
  }
});
</script>

<style lang="scss" scoped>

</style>