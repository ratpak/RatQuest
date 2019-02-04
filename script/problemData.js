const problemData = [
  {
    description:
      'Create a function that adds two numbers together and returns the sum of those numbers.',
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
      'Create a function that accepts a string argument (a name, ex: "Oliver"), and returns the personalized greeting "Hi Oliver" Of a name is present.',
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
    funcName: 'returnLargestNumber',
    arguments: ['num1', 'num2', 'num3'],
    inputs: [['8', '2', '1'], ['4', '78', '2']],
    outputs: ['8', '78'],
    outputType: 'number',
    url:
      'https://medium.freecodecamp.org/three-ways-to-repeat-a-string-in-javascript-2a9053b93a2d',
    stageId: 1
  },
  {
    description:
      'Create a function that accepts a sentence as an argument. If the last character of the sentence is a question mark, then make sure the question ends with the word "please?". If a question is already polite (meaning it already ends with "please") or the sentence is not a question, ​then return the inputted string without modification.',
    funcName: 'isQuestion',
    arguments: ['str'],
    inputs: [['May I borrow your pencil?'], ['I am the rat king.']],
    outputs: ['May I borrow your pencil please?', 'I am the rat king.'],
    outputType: 'string',
    url:
      'https://medium.freecodecamp.org/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb',
    stageId: 1
  },
  {
    description:
      'Create a function that accepts two non-negative integer arguments and returns true or false if they have the same last digit. For example, the function accepts two non-negative integer values. Return true if both number arguments have the same last digit, such as 27 and 57 and false if the last two digits are not equal, such as 998 and 999.',
    funcName: 'sameDigit',
    arguments: ['num1', 'num2'],
    inputs: [['22', '32'], ['77', '999']],
    outputs: ['true', 'false'],
    outputType: 'boolean',
    url:
      'https://medium.freecodecamp.org/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb',
    stageId: 1
  },
  {
    description:
      'Create a function that takes a str parameter and returns the number of vowels the string contains. For example, "Rat King" would return 2. Do not count "y" as a vowel.',
    funcName: 'numberOfVowels',
    arguments: ['str'],
    inputs: [['Yaodi'], ['Jay'], ['Chris'], ['MJ']],
    outputs: ['3', '1', '1', '0'],
    outputType: 'number',
    url:
      'https://medium.freecodecamp.org/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb',
    stageId: 2
  },

  {
    description: 'Concat arrays. Merge arr2 into arr1.',
    funcName: 'concatArr',
    arguments: ['arr1', 'arr2'],
    inputs: [['1', '2'], ['hello', 'world'], ['1, 2', '3, 4']],
    outputs: ['1, 2', 'hello, world', '1, 2, 3, 4'],
    outputType: 'array',
    url:
      'https://medium.freecodecamp.org/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb',
    stageId: 2
  },
  {
    description:
      'Create a function that returns the factorial of the parameter.',
    funcName: 'factorialize',
    arguments: ['num'],
    inputs: [['2'], ['6']],
    outputType: 'number',
    outputs: ['2', '720'],
    url:
      'https://medium.freecodecamp.org/how-to-factorialize-a-number-in-javascript-9263c89a4b38',
    stageId: 2
  },
  {
    description:
      'Create a function that accepts two arguments...the string to repeat, and a number that represents how many times to repeat the string. Return a string that concatenates the number of times the string is repeated.',
    funcName: 'repeatYourself',
    arguments: ['str', 'num'],
    inputs: [['rat', '3'], ['quest', '6'], ['loose', '0']],
    outputType: 'string',
    outputs: ['ratratrat', 'questquestquestquestquestquest', ''],
    url:
      'https://medium.freecodecamp.org/how-to-factorialize-a-number-in-javascript-9263c89a4b38',
    stageId: 2
  },
  {
    description:
      'Create a function that accepts a string argument, and return the boolean true if the argument is a palindrome (meaning that the string is the same forward as it is backward). Otherwise, return the boolean false.',
    funcName: 'isPalindrome',
    arguments: ['str'],
    inputs: [['moon'], ['racecar']],
    outputType: 'boolean',
    outputs: ['false', 'true'],
    url:
      'https://medium.freecodecamp.org/two-ways-to-check-for-palindromes-in-javascript-64fea8191fd7',
    stageId: 2
  },
  {
    description:
      'Create a function that accepts a string argument, and return the boolean true if the argument is a palindrome (meaning that the string is the same forward as it is backward). Otherwise, return the boolean false.',
    funcName: 'revseredString',
    arguments: ['str'],
    inputs: [['hello'], ['ratquest'], ['abcba']],
    outputType: 'boolean',
    outputs: ['false', 'false', 'true'],
    url:
      'https://medium.freecodecamp.org/two-ways-to-check-for-palindromes-in-javascript-64fea8191fd7',
    stageId: 3
  },
  {
    description:
      'Is it a number. Check to see if the parameter is a type number.',
    funcName: 'isItNumber',
    arguments: ['num'],
    inputs: [[4], ['firetruck']],
    outputType: 'boolean',
    outputs: ['true', 'false'],
    url:
      'https://medium.freecodecamp.org/two-ways-to-check-for-palindromes-in-javascript-64fea8191fd7',
    stageId: 3
  },
  {
    description:
      'My friend wants a new band name for her band. She likes bands that use the formula: "The" + a noun with the first letter capitalized, for example: "dolphin" -> "The Dolphin" However, when a noun STARTS and ENDS with the same letter, she likes to repeat the noun twice and connect them together with the first and last letter, combined into one word (WITHOUT "The" in front), like this: "alaska" -> "Alaskalaska" Complete the function that takes a noun as a string, and returns her preferred band name written as a string.',
    funcName: 'bandNameGenerator',
    arguments: ['str'],
    inputs: [['camel'], ['eagle']],
    outputType: 'string',
    outputs: ['The Camel', 'Eagleagle'],
    url:
      'https://medium.freecodecamp.org/two-ways-to-check-for-palindromes-in-javascript-64fea8191fd7',
    stageId: 3
  },
  {
    description:
      'Create a function that takes in an array and a number that performs array rotation to the left n number of times',
    funcName: 'leftRotation',
    arguments: ['arr, num'],
    inputs: [['80, 77, 54, 91', '1']],
    outputType: 'array',
    outputs: [['77, 54, 91, 80']],
    url:
      'https://medium.freecodecamp.org/two-ways-to-check-for-palindromes-in-javascript-64fea8191fd7',
    stageId: 3
  },
  {
    description:
      'Create a function that reverses the uppercase/lowercase for each letter in a string. Any numbers are unaffected.',
    funcName: 'alternateCase',
    arguments: ['str'],
    inputs: [['NumBeR'], ['l3ETter']],
    outputType: 'string',
    outputs: ['nUMbEr', 'L3etTER'],
    url:
      'https://medium.freecodecamp.org/two-ways-to-check-for-palindromes-in-javascript-64fea8191fd7',
    stageId: 3
  }
]

module.exports = problemData
