from bookings.serializers import BookingReadSerializer, TimeSlotSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import TimeSlot, Booking
from datetime import date, timedelta


# Create your views here.
@api_view(['GET', "POST"])
def reserve(request):
    start_date= date.today() + timedelta(days=1)
    end_date = start_date + timedelta(days=6)
    if request.method == 'GET':
        if request.user.is_authenticated:
            date_range = TimeSlot.objects.filter(date_slot__range=[start_date, end_date])
            serializer = TimeSlotSerializer(date_range, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    elif request.method == "POST":
        if request.user.is_authenticated:
            booking = Booking.objects.filter(user=request.user, date_slot__range=[start_date, end_date])
            if not booking:
                time_slot_id = TimeSlot.objects.get(pk=request.data["id"])
                Booking.objects.create(user=request.user,
                booked_slot=time_slot_id, 
                date_slot=request.data["date_slot"],
                time_slot= request.data["time_slot"],
                tables_booked= request.data["tables_booked"])
            
                return Response(status=status.HTTP_201_CREATED)
            else: 
                return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)



@api_view(["DELETE"])
def booking_detail(request, booking_id):
    if request.user.is_authenticated:
        booking = Booking.objects.get(pk=booking_id)
        booking.delete()

        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)