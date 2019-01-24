const problemData = [
  {
    description:
      'Create a function that adds two numbers together and returns the sum of those numbers.',
    name: 'Adding Numbers',
    arguments: ['num1', 'num2'],
    input: [['2', '2'], ['4', '3']],
    outputType: 'num',
    output: ['4', '7'],
    url:
      'https://writingjavascript.org/posts/introduction-to-functions-numbers-in-javascript',
    stageId: 1
  },
  {
    description:
      'Create a function that accepts a string argument (a name, ex: "Oliver"), and returns the personalized greeting "Hi Oliver." Of a name is present.',
    name: 'Say Hi to Named Input',
    arguments: ['str'],
    input: [['Yaodi'], ['Jay'], ['Chris'], ['MJ']],
    outputType: 'str',
    output: ['Hi Yaodi', 'Hi Jay', 'Hi Chris', 'Hi MJ'],
    url: 'https://www.w3schools.com/jsref/jsref_return.asp',
    stageId: 1
  },
  {
    description:
      'Create a function that evaluates three numbers and returns the largest number out of the three. The function takes three number arguments and returns the highest number out of three.',
    name: 'Return Largest Number',
    arguments: ['num1', 'num2', 'num3'],
    input: [['8', '2', '1'], ['4', '78', '2']],
    outputType: 'num',
    output: ['8', '78'],
    url:
      'https://medium.freecodecamp.org/three-ways-to-return-largest-numbers-in-arrays-in-javascript-5d977baa80a1',
    stageId: 1
  },
  {
    description:
      'Create a function that accepts a sentence as an argument. If the last character of the sentence is a question mark, then make sure the question ends with the word "please?". If a question is already polite (meaning it already ends with "please") or the sentence is not a question, ​then return the inputted string without modification.',
    name: 'Is it a Question???',
    arguments: ['str'],
    input: [['May I borrow your pencil?'], ['I am the rat king.']],
    outputType: 'str',
    output: ['May I borrow your pencil please?', 'I am the rat king.'],
    url: 'https://www.w3schools.com/js/js_strings.asp',
    stageId: 1
  },
  {
    description:
      'Create a function that accepts two non-negative integer arguments and returns true or false if they have the same last digit. For example, the function accepts two non-negative integer values. Return true if both number arguments have the same last digit, such as 27 and 57 and false if the last two digits are not equal, such as 998 and 999.',
    name: 'Same Digit?',
    arguments: ['num1', 'num2'],
    input: [['22', '32'], ['77', '999']],
    outputType: 'bool',
    output: ['true', 'false'],
    url: 'https://www.w3schools.com/js/js_number_methods.asp',
    stageId: 1
  },
  {
    description:
      "Create a function that takes a str parameter and returns the number of vowels the string contains. For example, 'Rat King' would return 2. Do not count 'y' as a vowel.",
    name: 'Return Number of Vowels',
    arguments: ['str'],
    input: [['Yaodi'], ['Jay'], ['Chris'], ['MJ']],
    outputType: 'num',
    output: ['3', '1', '1', '0'],
    url: 'https://www.w3schools.com/js/js_array_iteration.asp',
    stageId: 1
  },
  {
    description:
      'Create a function that accepts two arguments...the string to repeat, and a number that represents how many times to repeat the string. Return a string that concatenates the number of times the string is repeated.',
    name: 'Repeat Yourself Repeat Yourself',
    arguments: ['str', 'num'],
    input: [['rat', '3'], ['quest', '6'], ['loose', '0']],
    outputType: 'str',
    output: ['ratratrat', 'questquestquestquestquestquest', ''],
    url:
      'https://medium.freecodecamp.org/three-ways-to-repeat-a-string-in-javascript-2a9053b93a2d',
    stageId: 1
  },
  {
    description:
      'Create a function that reverses a string, and returns the value of the reversed string.',
    name: 'Reversed String',
    arguments: ['str'],
    input: [['hello'], ['ratquest']],
    outputType: 'str',
    output: ['olleh', 'tseuqtar'],
    url:
      'https://medium.freecodecamp.org/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb',
    stageId: 1
  },
  {
    description:
      'Create a function that returns the factorial of the parameter.',
    name: 'Factorialize',
    arguments: ['num'],
    input: [['2'], ['6']],
    outputType: 'num',
    output: ['2', '720'],
    url:
      'https://medium.freecodecamp.org/how-to-factorialize-a-number-in-javascript-9263c89a4b38',
    stageId: 1
  },
  {
    description:
      'Create a function that accepts a string argument, and return the boolean true if the argument is a palindrome (meaning that the string is the same forward as it is backward). Otherwise, return the boolean false.',
    name: 'Palindrome!',
    arguments: ['str'],
    input: [['moon'], ['racecar']],
    outputType: 'bool',
    output: ['false', 'true'],
    url:
      'https://medium.freecodecamp.org/two-ways-to-check-for-palindromes-in-javascript-64fea8191fd7',
    stageId: 1
  }
]

module.exports = problemData
