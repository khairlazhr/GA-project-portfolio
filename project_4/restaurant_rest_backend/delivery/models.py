from django.db import models
from accounts.models import User
from restaurant.models import MenuItem
from nanoid import generate


# Create your models here.
class Cart(models.Model):
    user = models.OneToOneField(
        to=User,
        on_delete=models.CASCADE
    )
    created_on = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)

    @property
    def get_cart_total(self):
        cart_items = self.cart_items.all()
        total = sum([cart_item.get_item_price for cart_item in cart_items])

        return total

    def __str__(self):
        return self.user.email 


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
    
    @property
    def get_item_price(self):
        return self.item.price * self.quantity

    def __str__(self):
        return self.item.food_name + " - " + self.cart.user.email