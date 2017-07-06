'use strict';

/*
 * quester checks if quests are solved
 */

roles.quester = {};
roles.quester.settings = {
  layoutString: 'M',
  maxLayoutAmount: 1,
};

roles.quester.action = function(creep) {
  this.log('I\'m alive');
};
