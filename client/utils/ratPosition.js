const positions = {
  '00': {x: '25px', y: '250px', opacity: 0},
  '01': {x: '110px', y: '250px', opacity: 100},
  '02': {x: '190px', y: '275px', opacity: 100},
  '03': {x: '290px', y: '300px', opacity: 100},
  // '03':  {x: '190px', y: '275px', opacity: 100},
  '04': {x: '190px', y: '275px', opacity: 100},
  '05': {x: '190px', y: '275px', opacity: 100},
  '06': {x: '190px', y: '275px', opacity: 100},
  '07': {x: '190px', y: '275px', opacity: 100},
  '08': {x: '190px', y: '275px', opacity: 100},
  '09': {x: '190px', y: '275px', opacity: 100},
  '10': {x: '190px', y: '275px', opacity: 100},
  '11': {x: '190px', y: '275px', opacity: 100},
  '12': {x: '190px', y: '275px', opacity: 100},
  '13': {x: '190px', y: '275px', opacity: 100},
  '14': {x: '190px', y: '275px', opacity: 100},
  '15': {x: '190px', y: '275px', opacity: 100}
}

const ratPositionFunc = function(boardPositionStr) {
  return positions[boardPositionStr]
}

export default ratPositionFunc
