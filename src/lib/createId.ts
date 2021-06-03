let id: number = parseInt(window.localStorage.getItem('_maxId') || '0') || 0;

const createId = (): string => {
  id++;
  const string = id.toString();
  window.localStorage.setItem('_maxId', string);
  return string;
};

export default createId;