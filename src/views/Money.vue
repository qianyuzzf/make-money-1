<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateMoney"/>
    <Types v-model:value="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags v-model:data-source="tags" @update:value="onUpdateTags"/>
    {{ record }}
  </Layout>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue';
import Layout from '@/components/Layout.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';

type Record = {
  money: number,
  type: string,
  notes: string,
  tags: string[]
}

export default defineComponent({
  name: 'Money',
  components: {
    Layout,
    Tags,
    Notes,
    Types,
    NumberPad
  },
  setup() {
    const tags = ref<string[]>(['衣', '食', '住', '行']);
    const record = ref<Record>({
      money: 0,
      type: '-',
      notes: '',
      tags: []
    });
    const onUpdateTags = (data: string[]) => {
      // record.value.tags = JSON.parse(JSON.stringify(data));
      record.value.tags = data;
    };
    const onUpdateMoney = (data: string) => {
      record.value.money = parseFloat(data);
    };
    const onUpdateNotes = (data: string) => {
      record.value.notes = data;
    };
    return {
      tags,
      onUpdateTags,
      onUpdateMoney,
      onUpdateNotes,
      record
    };
  }
});
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
