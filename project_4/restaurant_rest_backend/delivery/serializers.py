from rest_framework import serializers
from delivery.models import CartItem, Cart
from restaurant.serializers import MenuItemSerializer

class CartCreateSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = [
            'total'
        ]


class CartItemSerializer(serializers.ModelSerializer):
    item = MenuItemSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = [
            "item",
            "quantity"
        ]


class CartReadSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True, read_only=True)
 
    class Meta:
        model = Cart
        fields = [
            'id',
            'created_on',
            'cart_items',
        ]
        
