# Quests (Planing Phase)

To be able to interact and group up with other AIs on the server, there should
be a way to gain reputation to define the level of cooperation.

To gain reputation quests can be solved, which increase the reputation on
successful solving these or decrease on failing.

A `Quester` creep attaches the Quest start at controllers in vacant rooms, like:

    {"type": "Quest", "id": 0.3451, "origin": "W1N7", info: "http://tooangel.github.io/screeps/doc/Quests.html"}

To apply for the Quest, remove the message from the controller and send a message
via Terminal transfer to the `origin` room.

   {"type": "Quest", "id": 0.3451, "room": "W2N7"}

 - `room` quest location

If the application is accepted a response is send back

   {"type": "Quest", "id": 0.3451, "room": "W3N8", "quest": "buildcs", "end": 12345653}

  - `room` the room where the Quest needs to be solved
  - `type` the type of the Quest
  - `end` the end time where the request needs to be solved

Quests can be:
 - `buildcs` Build all construction sites in the given room
 - **tbd** Write your (or my) name with roads (or walls) in a specific room
 - **tbd** Defend specific room for some time
 - **tbd** Defend your room
 - **tbd** Attack my (or someone else) room
 - ...

If necessary the `Quester` creep will watch the progress and needs to stay alive.

Next level:
To introduce the bidirectional collaboration a Quest will be given, to give
a Quest back to our AI. After that both sides are able to send Quests to each other.

To avoid misuse, requesting Quests will cost reputation. Some quests can only
by requested if the reputation is high enough.
