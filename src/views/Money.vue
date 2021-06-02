<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateMoney" @submit="saveRecord"/>
    <Types v-model:value="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags v-model:data-source="tags" @update:value="onUpdateTags"/>
    {{ recordList }}
  </Layout>
</template>

<script lang="ts">
import {ref, defineComponent, watch} from 'vue';
import Layout from '@/components/Layout.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';

type Record = {
  money: number,
  type: string,
  notes: string,
  tags: string[],
  time?: Date
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
    const recordList = ref<Record[]>(
        window.localStorage.getItem('record') ?
            JSON.parse(window.localStorage.getItem('record') as string) :
            []
    );
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
      recordList.value.push(JSON.parse(JSON.stringify(record.value)));
    };
    watch(recordList.value, () => {
      window.localStorage.setItem('record', JSON.stringify(recordList.value));
    });
    return {
      tags,
      onUpdateTags,
      onUpdateMoney,
      onUpdateNotes,
      record,
      saveRecord,
      recordList
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
