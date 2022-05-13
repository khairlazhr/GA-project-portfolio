from rest_framework import serializers
from .models import Booking, TimeSlot

class TimeSlotSerializer(serializers.ModelSerializer):
    available_tables = serializers.IntegerField(source="get_available_tables")

    class Meta:
        model = TimeSlot
        fields = [
            "date_slot",
            "time_slot"
            "available_tables"
        ]



class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            "user",
            "booked_slot"
            "tables_booked"
        ]

        