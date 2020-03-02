export const shapes = [
  {
    name: 'cross',
    coords: '21,3 15,3 15,15 3,15 3,21 15,21 15,33 21,33 21,21 33,21 33,15 21,15',
    numbers: [5, 9, 13, 17, 20, 28],
  },
  {
    name: 'x',
    coords: '29,3 18,14 7,3 3,7 14,18 3,29 7,33 18,22 29,33 33,29 22,18 33,7',
    numbers: [10, 14, 18, 22, 26, 30],
  },
  {
    name: 'square',
    coords: '32,4 4,4 4,32 32,32',
    numbers: [4, 9, 16, 25],
  },
  {
    name: 'diamond',
    coords: '18,3 3,18 18,33 33,18',
    numbers: [2, 8, 18],
  },
  {
    name: 'heart',
    coords: '32,8 28,4 24,4 18,10 12,4 8,4 4,8 4,16 18,30 32,16',
    numbers: [6, 10, 22, 24],
  },
  {
    name: 'octagon',
    coords: '23,3 13,3 3,13 3,23 13,33 23,33 33,23 33,13',
    numbers: [7, 28],
  },
];

export const possibleNums = [...new Set(shapes.map((shape) => [...shape.numbers]).flat())];
possibleNums.sort((a, b) => a - b);

export const collageDimensions = {
  'cross-5': [3, 3],
  'cross-9': [5, 5],
  'cross-13': [7, 7],
  'cross-17': [9, 9],
  'cross-20': [6, 6],
  'cross-28': [8, 8],
  'x-10': [4, 4],
  'x-14': [6, 6],
  'x-18': [6, 6],
  'x-22': [8, 8],
  'x-26': [8, 8],
  'x-30': [10, 10],
  'square-4': [2, 2],
  'square-9': [3, 3],
  'square-16': [4, 4],
  'square-25': [5, 5],
  'diamond-2': [2, 2],
  'diamond-8': [5, 5],
  'diamond-18': [6, 6],
  'heart-6': [4, 3],
  'heart-10': [4, 4],
  'heart-22': [6, 6],
  'heart-24': [8, 6],
  'octagon-7': [3, 3],
  'octagon-28': [6, 6],
};
