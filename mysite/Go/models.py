from django.db import models


# Create your models here.
class Game(models.Model):
	pass
	
class Player(models.Model):
	game = models.ForeignKey(Game, on_delete=models.CASCADE)
	
class Board(models.Model):
	width = models.IntegerField()
	height = models.IntegerField()
	game = models.OneToOneField(Game, on_delete=models.CASCADE, primary_key = True)

class Coordinate(models.Model):
	board = models.ForeignKey(Board, on_delete=models.CASCADE)
	stone = models.OneToOneField(stone, on_delete=models.CASCADE)
	
class Stone(models.Model):
	player = models.ForeignKey(Player, on_delete=models.CASCADE)