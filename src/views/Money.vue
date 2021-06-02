<template>
  <Layout class-prefix="layout">
    <NumberPad/>
    <Types/>
    <Nodes/>
    <Tags v-model:data-source="tags"/>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import Nodes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';
import {ref, defineComponent} from 'vue';

export default defineComponent({
  name: 'Money',
  components: {Layout, Tags, Nodes, Types, NumberPad},
  setup() {
    const tags = ref<string[]>(['衣', '食', '住', '行']);
    return {tags};
  }
});
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
