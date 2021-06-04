import {RecordItem, Tag} from '@/custom.ts';
import createId from '@/lib/createId';

const model = {
  fetch(name: string): Tag[] {
    return JSON.parse(window.localStorage.getItem(name) || '[]');
  },
  fetch2(name: string): RecordItem[] {
    return JSON.parse(window.localStorage.getItem(name) || '[]');
  },
  save(name: string, data: RecordItem[] | Tag[]): void {
    window.localStorage.setItem(name, JSON.stringify(data));
  },
  clone(data: RecordItem): RecordItem {
    return JSON.parse(JSON.stringify(data));
  },
  saveTags(path: string, data: Tag[]): void {
    const name = window.prompt('请输入标签名');
    if (name === '') {
      window.alert('标签名不能为空');
      return;
    }
    if (name) {
      const index = data.filter(item => item.name === name)[0];
      if (index) {
        window.alert('标签名重复，请重新输入');
        return;
      }
      data.push({id: createId(), name: name});
      model.save(path, data);
      window.alert('添加成功');
    }
  }
};

export default model;