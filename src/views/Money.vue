<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateMoney" @submit="saveRecord"/>
    <Types v-model:value="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags v-model:data-source="tagsList" @update:value="onUpdateTags"/>
    {{ recordsList }}
  </Layout>
</template>

<script lang="ts">
import {ref, defineComponent, watch} from 'vue';
import Layout from '@/components/Layout.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';
import {RecordItem} from '@/custom.ts';
import model from '@/models/model';

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
    const tagsList = ref<string[]>(model.fetch('tagsList'));
    const record = ref<RecordItem>({
      money: 0,
      type: '-',
      notes: '',
      tags: []
    });
    const recordsList = ref<RecordItem[]>(model.fetch2('recordsList'));
    const onUpdateTags = (data: string[]) => {
      record.value.tags = data;
    };
    const onUpdateMoney = (data: string) => {
      record.value.money = parseFloat(data);
    };
    const onUpdateNotes = (data: string) => {
      record.value.notes = data;
    };
    const saveRecord = () => {
      record.value.time = new Date();
      recordsList.value.push(model.clone(record.value));
    };
    watch(recordsList.value, () => {
      model.save('recordsList', recordsList.value);
    });
    return {
      tagsList,
      onUpdateTags,
      onUpdateMoney,
      onUpdateNotes,
      record,
      saveRecord,
      recordsList
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
