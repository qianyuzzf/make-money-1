<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateMoney" @submit="saveRecord"/>
    <Types v-model:value="record.type"/>
    <FormItem @update:value="onUpdateNotes" placeholder="请输入备注信息">备注</FormItem>
    <Tags :data-source="tagsList"
          @update:data-source="saveTags"
          @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import {ref, defineComponent, watch} from 'vue';
import Layout from '@/components/Layout.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import FormItem from '@/components/money/FormItem.vue';
import Tags from '@/components/money/Tags.vue';
import {RecordItem, Tag} from '@/custom.ts';
import model from '@/models/model';

export default defineComponent({
  name: 'Money',
  components: {
    Layout,
    Tags,
    FormItem,
    Types,
    NumberPad
  },
  setup() {
    const tagsList = ref<Tag[]>(model.fetch('tagsList'));
    const record = ref<RecordItem>({
      money: 0,
      type: '-',
      notes: '',
      tags: []
    });
    const recordsList = ref<RecordItem[]>(model.fetch2('recordsList'));
    const onUpdateTags = (data: Tag[]) => {
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
    const saveTags = (data: Tag[]) => {
      tagsList.value = data;
      model.save('tagsList', tagsList.value);
    };
    watch(recordsList.value, () => {
      console.log(2);
      model.save('recordsList', recordsList.value);
    });
    return {
      tagsList,
      onUpdateTags,
      onUpdateMoney,
      onUpdateNotes,
      record,
      saveRecord,
      recordsList,
      saveTags
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
