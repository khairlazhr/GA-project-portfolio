from rest_framework import serializers
from delivery.models import CartItem, Cart
from restaurant.serializers import MenuItemSerializer

class CartItemSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    item = MenuItemSerializer()
    price = serializers.DecimalField(8,2, source="get_item_price")

    class Meta:
        model = CartItem
        fields = [
            "id",
            "item",
            "quantity",
            "price"
        ]


class CartReadSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True)
    total = serializers.DecimalField(8, 2, source="get_cart_total")

    class Meta:
        model = Cart
        fields = [
            'id',
            'cart_items',
            "total"
        ]

    def update(self, instance, validated_data):
        cart_items_data = validated_data.pop("cart_items")

        for item in cart_items_data:
            cart_item = CartItem.objects.get(pk=item["id"])
            cart_item.quantity = item.get("quantity", cart_item.quantity)
            cart_item.save()

        instance.total = instance.get_cart_total
        instance.save()

        return instance
        
