const problemData = [
  {
    description: 'Add two numbers',
    arguments: ['num1', 'num2'],
    funcName: 'add',
    inputs: [['1', '2'], ['3', '5'], ['10', '20']],
    outputs: ['3', '8', '30'],
    dataType: ['number', 'number']
  },
  {
    description: 'Concat two arrays',
    arguments: ['arr1', 'arr2'],
    funcName: 'concat',
    inputs: [['1', '2'], ['hello', 'world'], ['1, 2', '3, 4']],
    outputs: ['1, 2', 'hello, world', '1, 2, 3, 4'],
    dataType: ['array', 'array']
  }
]

module.exports = problemData
