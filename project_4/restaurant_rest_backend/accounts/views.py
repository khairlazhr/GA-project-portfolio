from django.http.response import JsonResponse
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from delivery.models import Cart
from .models import DeliveryAddress, User, Order
from datetime import datetime
from django.contrib.auth.hashers import check_password

from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, DeliveryAddressSerializer, OrderReadSerializer

# Create your views here.
@api_view(["POST"])
def signup(request):
    if request.data["password"] == request.data["confirm_password"]:
        serializer = UserSerializer(data= {
            "email": request.data["email"],
            "password": request.data["password"],
            "first_name": request.data["first_name"],
            "last_name": request.data["last_name"],
            "mobile_number": request.data["mobile_number"],
        })
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(email=request.data["email"])
            DeliveryAddress.objects.create(user=user, address= request.data["address"], postal_code = request.data["postal_code"], unit_no = request.data["unit_no"])

            return Response(data={ 'user': serializer.data["email"] }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        raise ValidationError("Both passwords must match")


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
            "first_name": current_user.first_name,
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
            if (profile_id == request.user.id):
                serializer = UserSerializer(instance=user)

                return Response(serializer.data, status=status.HTTP_200_OK)
            else: 
                return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'PATCH':
        if request.user.is_authenticated:
            serializer = UserSerializer(instance=user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()

                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
def forgot_pw(request):
    user = User.objects.filter(email=request.data["email"])
    if user:
        current_password = request.data["old_password"]
        check_password(current_password, user.password)
        if check_password:
            if request.data["password"] == request.data["confirm_password"]:
                serializer = UserSerializer(instance=user, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()

                return Response(data= {"message": "Password has been changed successfully"}, status=status.HTTP_200_OK)
            else:
                raise ValidationError("Both passwords must match")
        else:
            raise ValidationError("You have entered an invalid username/password")
    else:
        raise ValidationError("You have entered an invalid username/password")

@api_view(["PATCH"])
def change_pw(request):
    if request.user.is_authenticated:
        user = User.objects.get(pk=request.user.id)
        current_password = request.data["old_password"]
        check_password(current_password, user.password)
        if check_password:
            if request.data["password"] == request.data["confirm_password"]:
                serializer = UserSerializer(instance=user, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()

                return Response(data= {"message": "Password has been changed successfully"}, status=status.HTTP_200_OK)
            else:
                raise ValidationError("Both passwords must match")
        else:
            raise ValidationError("You have entered an invalid password")

@api_view(["GET", "PATCH"])
def address_list(request, profile_id):
    delivery_address = DeliveryAddress.objects.get(user_id=profile_id)
    if request.method == 'GET':
        if request.user.is_authenticated:
            if (profile_id == request.user.id):
                serializer = DeliveryAddressSerializer(instance=delivery_address)

                return Response(serializer.data, status=status.HTTP_200_OK)
            else: 
                return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'PATCH':
        if request.user.is_authenticated:
            if (profile_id == request.user.id):
                serializer = UserSerializer(instance=delivery_address, data=request.data, partial=True)

                if serializer.is_valid():
                    serializer.save()

                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else: 
                return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(["GET"])
def order_list(request, profile_id):
    orders = Order.objects.filter(user_id=profile_id)
    if request.user.is_authenticated:
        if (profile_id == request.user.id):
            serializer = OrderReadSerializer(instance=orders, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else: 
            return Response(status=status.HTTP_403_FORBIDDEN)