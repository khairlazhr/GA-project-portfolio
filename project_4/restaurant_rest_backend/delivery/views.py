from functools import partial
from rest_framework.decorators import api_view
from accounts.serializers import OrderReadSerializer
from accounts.models import Order
from delivery.serializers import CartReadSerializer
from .models import Cart, CartItem
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

# Create your views here.
@api_view(['GET', "PUT", "DELETE"])
def cart(request):
    cart = Cart.objects.get(user=request.user.id)
    if request.method == 'GET':
        if request.user.is_authenticated:
            serializer = CartReadSerializer(instance=cart)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else: 
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    elif request.method == 'PUT':
        if request.user.is_authenticated:
            serializer = CartReadSerializer(instance=cart, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
        
                return Response(serializer.data, status=status.HTTP_200_OK)
        else: 
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    elif request.method == 'DELETE':
        if request.user.is_authenticated:
            cart_item = CartItem.objects.get(id=request.data["item_id"])
            cart_item.delete()

            return Response(status=status.HTTP_200_OK)

        else: 
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)

@api_view(["POST"])
def checkout(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            cart = Cart.objects.get(user=request.user.id)
            order = Order.objects.create(user=request.user)
            serializer = OrderReadSerializer(instance=order, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()

                CartItem.objects.filter(cart=cart).delete()
                cart.delete()
                Cart.objects.create(user=request.user)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(status=status.HTTP_401_UNAUTHORIZED)