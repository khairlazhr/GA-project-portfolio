from rest_framework import serializers
from restaurant.models import MenuItem

class MenuItemSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField()
    
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