from rest_framework import serializers
from restaurant.models import MenuItem

class MenuItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MenuItem
        fields = [
            "id",
            "food_name",
            "category",
            "description",
            "availability",
            "price",
            "imageURL"
        ]

    def create(self, validated_data):
        return MenuItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.food_name = validated_data.get('food_name', instance.food_name)
        instance.category = validated_data.get('category', instance.category)
        instance.description = validated_data.get('description', instance.description)
        instance.availability = validated_data.get('availability', instance.availability)
        instance.price = validated_data.get('price', instance.price)
        instance.imageURL = validated_data.get('imageURL', instance.imageURL)
        return instance