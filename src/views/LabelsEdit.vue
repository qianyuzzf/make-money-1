<template>
  <Layout>
    <div>
      LabelsEdit
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import {defineComponent, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import model from '@/models/model';

export default defineComponent({
  name: 'LabelsEdit',
  components: {Layout},
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
      router.push('/404');
    }
  }
});
</script>

<style lang="scss" scoped>

</style>