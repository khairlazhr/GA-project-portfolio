from rest_framework.decorators import api_view
from accounts import serializers
from accounts.models import Order, OrderItem
from accounts.serializers import OrderReadSerializer

from delivery.serializers import CartReadSerializer, CartItemSerializer
from .models import Cart, CartItem
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

# Create your views here.
@api_view(['GET', "PATCH"])
def cart(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            cart = Cart.objects.get(user=request.user)
            serializer = CartReadSerializer(instance = cart)

            return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'GET':
        if request.user.is_authenticated:
            cart = Cart.objects.get(user=request.user)
            serializer = CartReadSerializer(instance = cart)

            return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', "POST", "PATCH", "DELETE"])
def checkout(request):
    cart = Cart.objects.get(user=request.user)
    if request.method == 'GET':
        if request.user.is_authenticated:
            serializer = CartReadSerializer(instance = cart)

            return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PATCH':
        if request.user.is_authenticated:
            serializer = CartItemSerializer(instance=cart, data=request.data, partial=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        if request.user.is_authenticated:
            cart_item = CartItem.objects.get(cart=cart, item_id=request.data["item_id"])
            cart_item.delete()
            return Response(status=status.HTTP_200_OK)
    elif request.method == 'POST':
        if request.user.is_authenticated:
            serializer = OrderReadSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save
            CartItem.objects.filter(cart=cart).delete()
            cart.delete()
            Cart.objects.create(user=request.user, created_on=datetime.now())