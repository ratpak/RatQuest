const problemData = [
  {
    description: 'Create a function that adds two numbers together and returns the sum of those numbers.',
    arguments: ['num1', 'num2'],
    funcName: 'addNums',
    inputs: [['1', '2'], ['3', '5'], ['10', '20']],
    outputs: ['3', '8', '30'],
    outputType: 'number',
    url:
      'https://writingjavascript.org/posts/introduction-to-functions-numbers-in-javascript',
    stageId: 1
  },
  {
    description:
      'Create a function that accepts a string argument (a name, ex: "Oliver"), and returns the personalized greeting "Hi Oliver." Of a name is present.',
    funcName: 'sayHi',
    arguments: ['str'],
    inputs: [['Yaodi'], ['Jay'], ['Chris'], ['MJ']],
    outputs: ['Hi Yaodi', 'Hi Jay', 'Hi Chris', 'Hi MJ'],
    outputType: 'string',
    url:
      'https://writingjavascript.org/posts/introduction-to-functions-numbers-in-javascript',
    stageId: 1
  },
  {
    description:
      'Create a function that evaluates three numbers and returns the largest number out of the three. The function takes three number arguments and returns the highest number out of three.',
    funcName: 'Return Largest Number',
    arguments: ['num1', 'num2', 'num3'],
    inputs: [['8', '2', '1'], ['4', '78', '2']],
    outputs: ['8', '78'],
    outputType: 'number',
    url:
      'https://writingjavascript.org/posts/introduction-to-functions-numbers-in-javascript',
    stageId: 1
  },
  {
    description: 'Concat arrays',
    funcName: 'concatArr',
    arguments: ['arr1', 'arr2'],
    inputs: [['1', '2'], ['hello', 'world'], ['1, 2', '3, 4']],
    outputs: ['1, 2', 'hello, world', '1, 2, 3, 4'],
    outputType: 'array',
    url:
      'https://writingjavascript.org/posts/introduction-to-functions-numbers-in-javascript',
    stageId: 1
  },
]

module.exports = problemData
