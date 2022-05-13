from rest_framework import serializers
from .models import DeliveryAddress, User
from restaurant.serializers import MenuItemSerializer
from .models import OrderItem, Order
import re

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'first_name', 
            'email',
            'mobile_number',
            'password'
        ]

        # Ensure that password is not returned after creating the user
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("The password must be at least 8 characters long.")
        reg = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d\@$!%*#?&]{8,}$"
        match = re.fullmatch(reg, value)
        if not match:
            raise serializers.ValidationError("The password doesn't meet the requirements.")
        else:
            return value

    # Used to hash the password
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data["password"])
        user.save()

        return user

    def update(self, instance, validated_data):
        instance.set_password(validated_data["password"])
        instance.save()
        return instance

class DeliveryAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = [
            "address",
            "postal_code",
            "unit_no"
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    item = MenuItemSerializer()

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "item",
            "quantity"
        ]

class OrderReadSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
 
    class Meta:
        model = Order
        fields = [
            'order_status',
            'created_on',
            'order_items',
            'total'
        ]

    def update(self, instance, validated_data):
        order_items = validated_data.pop("order_items")

        instance.total = validated_data.get("total", instance.total)
        instance.save()

        for order_item in order_items:
            OrderItem.objects.create(order=instance, item_id=order_item["item"]["id"], quantity=order_item["quantity"])

        return instance



        
