from rest_framework.decorators import api_view
from accounts import serializers

from bookings.models import Booking, TimeSlot
from bookings.serializers import BookingCreateSerializer, TimeSlotSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(['GET', "POST"])
def reserve(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            serializer = TimeSlotSerializer()

            return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.post == "POST":
        if request.user.is_authenticated:
            time_slot = TimeSlot.objects.get(pk=request.data["slot_id"])
            serializer = BookingCreateSerializer(data={
                "user": request.user,
                "booked_slot": request.data["slot_id"],
                "tables_booked": request.data["tables_booked"]
            })
            if serializer.is_valid:
                serializer.save()
            serializer2 = TimeSlotSerializer(instance=time_slot, data={ "available_tables": request.data["available_tables"]}, partial=True)
            if serializer2.is_valid():
                serializer2.save()

            return Response(status=status.HTTP_200_CREATED)