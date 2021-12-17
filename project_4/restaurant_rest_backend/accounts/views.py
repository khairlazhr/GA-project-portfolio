from django.http.response import JsonResponse
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from delivery.models import Cart
from .models import User
from datetime import datetime

from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer

# Create your views here.
@api_view(["POST"])
def signup(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    
    return Response(data=serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
def login(request):
    email = request.data['email']
    password = request.data['password']

    user = authenticate(request, username=email, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        current_user = User.objects.get(email=email)
        cart_exists = Cart.objects.filter(user=current_user)
        if not cart_exists:
            Cart.objects.create(user=current_user, created_on=datetime.now())
        return JsonResponse({
            "user": email,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })
    else:
        raise AuthenticationFailed('The email/password entered is invalid.')

@api_view(["GET"])
def logout(request):
    if request.user.is_authenticated:
        Cart.objects.get(user=request.user).delete()
        return JsonResponse({"message": "You have logged out successfully."})
    else: 
        return redirect("/login")

@api_view(["GET", "PATCH"])
def profile_detail(request, profile_id):
    user = User.objects.get(pk=profile_id)
    if request.method == 'GET':
        if request.user.is_authenticated:
            serializer = UserSerializer(instance=user)

            return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PATCH':
        if request.user.is_authenticated:
            serializer = UserSerializer(instance=user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()

                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
