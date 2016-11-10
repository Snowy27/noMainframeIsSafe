matchmaking

1. API request to find opponent
  - /api/v1/game/find
    * this will place into matchmaking db obj by rank
    * will return the path in the db to listen for.
    * will update users game status (for if they disconnect or refresh)

2. Services will be listening to changes in matchmaking obj

```
{
    availablePlayers: [
        {
            playerId: '1234567',
            rank: 1000,
            claimed: false
        }
    ],

    players: {
         '1234567': {
            name: 'Test',
            avatar: 'https://api.adorable.io/avatars/96/nelokr',
            status: {
                game: null,
                matchmaking: true
            }
         }
    },

    games: {
        '982938ksdjf238': {
            players: [
                '1234567'
            ],
            createdAt: '2016-11-04T22:33:19.800Z',
            gameStatedAt: '2016-11-04T22:31:19.800Z',
            status: 'waiting', // inprogress, expired, complete
        }
    }
}
```

game communication

- connect to server
  - kick connection if no game join command is received within 10 seconds
- user: 'join' game
  - this will verify game is valid
- server: notify any other connected and authenticated users that a user is connecting
- server: request authentication from user
- user: reply with authentication token
- server: verify token
- server: mark user as joined
- server: notify user they are authenticated, broadcast to all users connected to game
- server: wait till all playing users are connected and authenticated

- server: once playing users are connected, mark game as started ... set expiration date to be 20 mins from this point in time. (no game should last more than 20 mins?)
- server: send command to display deck selection, include count of seconds to choose (30 secs?)
- server: send available deck information to each user

- server: broadcast every 5 secs of time remaining until it runs out
- user: send deck selection
- server: validate deck selection
- server: notify game room that user has selected a deck and is ready

if user doesn't select a deck, a random one will be chosen.

- server: send command to display position selection
- server: determine who goes first and broadcast result, mark user as primary and set turns equal to 0
- server: shuffle cards for each user, assign game_card_id's to each card, and record order with game_card_ids
- server: send first 4 cards from each user's decks to each user, respectively.

Once game begins, any playing user can forfeit, ending the game.

- server: send command to begin first user's turn, also inform time remaining
- server: send all player status info
- primary user: acknowledge start of turn
- server: broadcast every 5 secs of time remaining until turn is over

Primary User Actions:
- play card, needs game_card_id
  * marks card in deck as played
- attack card, needs attacker's game_card_id and target's game_card_id
- end turn

Server response actions:
* in playing a card
  - validate that game_card_id is in the user's hand
  - if card is an immediate/buff use card, respond with effects to all users
  - if card is to be played in the field, respond with card in the field to all users
    - if card is to be marked as sleeping till next turn, mark as such
* in attaching a card
  - validate that game_card_id is in the field and isn't sleeping








card settings
- immediate_use: Boolean
- sleep_on_play: Boolean
