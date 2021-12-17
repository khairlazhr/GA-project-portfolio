from rest_framework import serializers
from delivery.models import CartItem, Cart
from restaurant.serializers import MenuItemSerializer

class CartItemSerializer(serializers.ModelSerializer):
    item = MenuItemSerializer()
    class Meta:
        model = CartItem
        fields = [
            "item",
            "quantity"
        ]


class CartReadSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True)
 
    class Meta:
        model = Cart
        fields = [
            'id',
            'created_on',
            'cart_items',
        ]

        
