from rest_framework import serializers
from .models import DeliveryAddress, User
from restaurant.serializers import MenuItemSerializer
from .models import OrderItem, Order

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            'salutation',
            'first_name', 
            'last_name', 
            'email',
            'mobile_number'
            'password'
        ]

        # Ensure that password is not returned after creating the user
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    # Used to hash the password
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data["password"])
        user.save()

        return user

    def update(self, instance, validated_data):
        instance.set_password(validated_data["password"])

        return instance

class DeliveryAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = [
            "address",
            "postal_code"
        ]

class OrderItemSerializer(serializers.ModelSerializer):
    item = MenuItemSerializer()
    class Meta:
        model = OrderItem
        fields = [
            "item",
            "quantity"
        ]

class OrderReadSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)
 
    class Meta:
        model = Order
        fields = [
            'id',
            'ordered_on',
            'order_items',
        ]






        
