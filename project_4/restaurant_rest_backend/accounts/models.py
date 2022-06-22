from django.db import models
from django.contrib.auth.models import AbstractUser
from nanoid import generate
from .managers import CustomUserManager
from restaurant.models import MenuItem

# Create your models here
class User(AbstractUser):
    username = None
    id = models.CharField(max_length=15, default=generate(size=15), editable=False, unique=True, primary_key=True)
    email = models.EmailField(max_length=255, unique=True, error_messages={'unique':"This email has already been registered."})
    mobile_number = models.CharField(max_length=50, unique=True, error_messages={'unique':"This mobile number has already been registered."})

    ADMIN =  'Admin'
    CUSTOMER = 'Customer'
    
    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (CUSTOMER, 'Customer')
    )
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default= CUSTOMER,blank=True, null=True)

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

    def __str__(self):
        return self.user.email
    

class Order(models.Model):
    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name="orders"
    )
    order_status = models.CharField(max_length=50, default='Booked')
    address = models.CharField(max_length=255, null=True, blank=True)
    total = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.email

class OrderItem(models.Model):
    order = models.ForeignKey(
        to=Order,
        on_delete=models.CASCADE,
        related_name="order_items"
    )
    item = models.ForeignKey(
        to=MenuItem,
        on_delete=models.CASCADE
    )
    quantity = models.IntegerField(default=1)

