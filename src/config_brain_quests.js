'use strict';

brain.handleQuests = function(transaction) {
  Memory.quests = Memory.quests || {};
  for (let id in Memory.quests) {
    let quest = Memory.quests[id];
    console.log(JSON.stringify(quest), quest.end - Game.time);

    if (!quest.checked && quest.check < Game.time) {
      Memory.quests[id].checked = true;
      Game.rooms[quest.origin].checkRoleToSpawn('quester', 1, undefined, quest.room, quest.id, quest.origin);
    }

    if (quest.end < Game.time) {
      console.log('Quest is over: ' + JSON.stringify(quest));
      delete Memory.quests[id];
    }
  }
};

brain.getQuestBuildcs = function(data) {
  let quest = {};
  quest.room = data.room;
  quest.quest = 'buildcs';
  quest.end = Game.time + 100;
  quest.check = Game.time + 10;
  return quest;
};

brain.getQuest = function(transaction, data) {
  let info = {};
  info.id = data.id;
  info.player = {
    name: transaction.sender.username,
    room: transaction.from
  };
  info.origin = transaction.to;

  let quest = brain.getQuestBuildcs(data);

  info.room = quest.room;
  info.quest = quest.quest;
  info.end = quest.end;
  info.check = quest.check;
  return info;
};

brain.checkQuestForAcceptance = function(transaction) {
  Memory.quests = Memory.quests || {};
  let data;
  try {
    data = JSON.parse(transaction.description);
  } catch (e) {
    console.log('Quest transaction: Can not parse');
    return false;
  }
  if (data === null) {
    console.log('Quest transaction: No type');
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
  if (!data.id) {
    console.log('Quest transaction: No id');
    return false;
  }
  console.log('Yeah', JSON.stringify(data), JSON.stringify(transaction));
  let quest = brain.getQuest(transaction, data);

  Memory.quests[data.id] = quest;

  let response = {
    type: 'Accept',
    id: quest.id,
    room: quest.room,
    quest: quest.quest,
    end: quest.end
  };
  let room = Game.rooms[transaction.to];
  room.terminal.send(RESOURCE_ENERGY, 100, transaction.from, JSON.stringify(response));

};
