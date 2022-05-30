from rest_framework import serializers
from bookings.serializers import BookingReadSerializer
from restaurant.serializers import MenuItemSerializer
from .models import OrderItem, Order, DeliveryAddress, User
import re
from datetime import date, timedelta

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

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'first_name', 
            'email',
            'mobile_number'
        ]

class DeliveryAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = DeliveryAddress
        fields = [
            "id",
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
    id = serializers.IntegerField(required=False)
    
    class Meta:
        model = Order
        fields = [
            'id',
            'order_status',
            'created_on',
            'order_items',
            'address',
            'total'
        ]

    def update(self, instance, validated_data):
        order_items = validated_data.pop("order_items")

        instance.total = validated_data.get("total", instance.total)
        instance.save()

        for order_item in order_items:
            OrderItem.objects.create(order=instance, item_id=order_item["item"]["id"], quantity=order_item["quantity"])

        return instance



class ProfileReadSerializer(serializers.ModelSerializer):
    outstanding_orders = serializers.SerializerMethodField()
    active_booking = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'first_name', 
            'email',
            'mobile_number',
            'outstanding_orders',
            'active_booking'
        ]

    def get_outstanding_orders(self, instance):
        outstanding_orders= instance.orders.filter(order_status="Booked")
        return OrderReadSerializer(outstanding_orders, many=True).data

    def get_active_booking(self, instance):
        start_date= date.today()
        end_date = start_date + timedelta(days=7)
        active_booking = instance.bookings.filter(date_slot__range=[start_date, end_date])
        return BookingReadSerializer(active_booking, many=True).data
