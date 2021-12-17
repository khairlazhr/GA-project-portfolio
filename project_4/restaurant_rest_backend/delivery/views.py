from rest_framework.decorators import api_view

from delivery.serializers import CartReadSerializer
from .models import Cart
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(['GET', "POST", "PATCH"])
def cart(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            cart = Cart.objects.get(user=request.user)
            serializer = CartReadSerializer(instance = cart)

            return Response(serializer.data, status=status.HTTP_200_OK)
