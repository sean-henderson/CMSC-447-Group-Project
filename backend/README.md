# Back end database & API

## Database
Playing around in python3 CLI (serious README coming soon):
```
from db import *
app.app_context().push()
db.create_all()
player1 = Player(name='Ursuul')
player2 = Player(name='Billy')
db.session.add(player1)

player1score1 = Score1(ppk=player1.pk, time=1200)
db.session.add(player1score1)

player1score2 = Score2(ppk=player1.pk, time=1800)
db.session.add(player1score2)

player1score3 = Score3(ppk=player1.pk, time=2100)
db.session.add(player1score3)

db.session.commit()

player1 = Player.query.first()
player2 = Player.query.all()[1]
score1  = Score1.query.first()
updatePlayer(player1)
updateScore(player2, 900, 1)
```