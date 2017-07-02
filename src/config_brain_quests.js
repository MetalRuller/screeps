'use strict';

brain.checkQuestForAcceptance = function(transaction) {
  let data;
  try {
    data = JSON.parse(transaction.description);
  } catch (e) {
    console.log('Quest transaction: Can not parse');
    return false;
  }
  console.log(data);
  if (!data.type) {
    console.log('Quest transaction: No type');
    return false;
  }
  if (data.type !== 'Quest') {
    console.log('Quest transaction: Type not quest');
    return false;
  }
  if (!data.room) {
    console.log('Quest transaction: No room');
    return false;
  }
  console.log('Yeah', JSON.stringify(data));
};
