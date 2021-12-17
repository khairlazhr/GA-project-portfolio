from django.db import models
from accounts.models import User
from restaurant.models import MenuItem

# Create your models here.
class Cart(models.Model):
    user = models.OneToOneField(
        to=User,
        on_delete=models.CASCADE
    )
    created_on = models.DateTimeField()


class CartItem(models.Model):
    cart = models.ForeignKey(
        to=Cart,
        on_delete=models.CASCADE,
        related_name="cart_items"
    )
    item = models.ForeignKey(
        to=MenuItem,
        on_delete=models.CASCADE
    )
    quantity = models.IntegerField(default=1)
    
    def get_item_price(self):
        return self.item.price * self.quantity