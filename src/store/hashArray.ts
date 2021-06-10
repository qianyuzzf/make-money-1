import createId from '@/lib/createId';

const hashArray = [
  {id: createId(), name: '饮食', content: 'diet'},
  {id: createId(), name: '衣服', content: 'clothes'},
  {id: createId(), name: '日用', content: 'dayUse'},
  {id: createId(), name: '教育', content: 'education'},
  {id: createId(), name: '医疗', content: 'medical'}
];

export default hashArray;
