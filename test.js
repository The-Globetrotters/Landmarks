//const googleapi = require('./googleapi');

// function check(entry, list) {
//   var repeated = 0
//   for (i=0; i<list.length;i++){
//     if (entry == list[i]){
//       repeated += 1;
//     }
//   }
//   return repeated
//

function check(entry, list) {
  if (list == null) {
    return true
  } else {
      for (i=0; i<list.length;i++){
        if (entry == list[i]) {
          return true
        }
      }
      return false
    };
}

describe('Tests', () => {
  test('Test 1', () => {
    expect(check()).toBeTruthy()
  })

  test('Test 2', () => {
    expect(check('entry', '[]')).toBeFalsy()
  })

  test('Test 3', () => {
    expect(check('yes', ['no','yes'])).toBeTruthy()
  })

  test('Test 4', () => {
    expect(check('1', [1,3,2])).toBeTruthy()
  })
});
