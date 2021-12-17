from django.db import models

# Create your models here.
class Restaurant(models.Model):
    name = models.CharField(max_length = 100)
    address = models.CharField(max_length = 200)


class MenuItem(models.Model):
    food_name = models.CharField(max_length = 255)
    category = models.CharField(max_length = 100)
    description = models.TextField()
    availability = models.BooleanField(default=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    imageURL = models.CharField(max_length=200)
