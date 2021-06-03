import {RecordItem} from '@/custom.ts';

const model = {
  fetch(name: string): string[] {
    return JSON.parse(window.localStorage.getItem(name) || '[]');
  },
  fetch2(name: string): RecordItem[] {
    return JSON.parse(window.localStorage.getItem(name) || '[]');
  },
  save(name: string, data: RecordItem[] | string[]): void {
    window.localStorage.setItem(name, JSON.stringify(data));
  },
  clone(data: RecordItem): RecordItem {
    return JSON.parse(JSON.stringify(data));
  }
};

export default model;