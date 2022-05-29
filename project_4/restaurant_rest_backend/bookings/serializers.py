from rest_framework import serializers
from .models import Booking, TimeSlot

class TimeSlotSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    available_tables = serializers.IntegerField(source="get_available_tables")

    class Meta:
        model = TimeSlot
        fields = [
            "id",
            "date_slot",
            "time_slot",
            "available_tables"
        ]



class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            "booked_slot",
            "date_slot",
            "time_slot",
            "tables_booked"
        ]

class BookingReadSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    
    class Meta:
        model = Booking
        fields = [
            "id",
            "date_slot",
            "time_slot",
            "tables_booked"
        ]