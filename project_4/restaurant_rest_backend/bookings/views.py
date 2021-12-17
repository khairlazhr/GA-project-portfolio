from rest_framework.decorators import api_view

from bookings.models import TimeSlot
from .serializers import TimeSlotSerializer

# Create your views here.
@api_view(['GET', "POST", "PATCH"])
def reserve(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            serializer = TimeSlotSerializer