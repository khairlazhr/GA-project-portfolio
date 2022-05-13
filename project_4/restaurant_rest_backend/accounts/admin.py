from django.contrib import admin

from .models import DeliveryAddress, Order, OrderItem, User

# Register your models here.
admin.site.register(User)
admin.site.register(DeliveryAddress)
admin.site.register(Order)
admin.site.register(OrderItem)