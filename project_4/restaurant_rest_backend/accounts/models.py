from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import CustomUserManager
from restaurant.models import MenuItem

# Create your models here
class User(AbstractUser):
    username = None
    email = models.EmailField(max_length=255, unique=True)
    mobile_number = models.CharField(max_length=50)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()

class DeliveryAddress(models.Model):
    user = models.ForeignKey(
        to = User,
        on_delete=models.CASCADE,
        related_name="delivery_addresses"
    )
    address = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=50)
    unit_no = models.CharField(max_length=50)

class Order(models.Model):
    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name="orders"
    )
    ordered_on = models.DateTimeField()
    order_status = models.CharField(max_length=50, default='Booked')
    total = models.DecimalField(max_digits=8, decimal_places=2)

class OrderItem(models.Model):
    order = models.ForeignKey(
        to=Order,
        on_delete=models.CASCADE,
    )
    item = models.ForeignKey(
        to=MenuItem,
        on_delete=models.CASCADE
    )
    quantity = models.IntegerField(default=1)

