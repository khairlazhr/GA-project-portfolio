from django.http.response import JsonResponse
from django.shortcuts import redirect, render
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed, NotAuthenticated, ValidationError
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from delivery.models import Cart
from .models import DeliveryAddress, User, Order
from django.contrib.auth.hashers import check_password
from .filters import OrderDateTimeRangeFilter


from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import ProfileReadSerializer, UserSerializer, UserUpdateSerializer, DeliveryAddressSerializer, OrderReadSerializer

# Create your views here.
@api_view(["POST"])
def signup(request):
    serializer = UserSerializer(data= {
        "email": request.data["email"],
        "password": request.data["password"],
        "first_name": request.data["name"],
        "mobile_number": request.data["mobile_number"],
    })

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        user = User.objects.get(email=request.data["email"])
        DeliveryAddress.objects.create(user=user, address= request.data["address"], postal_code = request.data["postal_code"], unit_no = request.data["unit_no"])

        return Response(data={ 'user': serializer.data["email"] }, status=status.HTTP_201_CREATED)



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
            Cart.objects.create(user=current_user)
        
        return JsonResponse({
            "name": current_user.first_name,
            "user_id": current_user.id,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })
    else:
        raise AuthenticationFailed('The email/password entered is invalid.')

@api_view(["POST"])
def logout(request):
    if request.user.is_authenticated:
        Cart.objects.get(user=request.user).delete()
        return Response(status=status.HTTP_200_OK)
    else: 
        return NotAuthenticated('You have to be logged in first')

@api_view(["GET", "PATCH"])
def profile_detail(request, profile_id):
    user = User.objects.get(pk=profile_id)
    if request.method == 'GET':
        if request.user.is_authenticated:
            if (profile_id == request.user.id):
                serializer = ProfileReadSerializer(instance=user)

                return Response(serializer.data, status=status.HTTP_200_OK)
            else: 
                return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
                
    elif request.method == 'PATCH':
        if request.user.is_authenticated:
            serializer = UserUpdateSerializer(instance=user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()

                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

# @api_view(["PATCH"])
# def forgot_pw(request):
#     if request.user.is_authenticated:
#         user = User.objects.filter(email=request.data["email"])
#         if user:
#             serializer = UserSerializer(instance=user, data=request.data, partial=True)
                
#             if serializer.is_valid(raise_exception=True):
#                 serializer.save()

#             return Response(data= {"message": "Password has been changed successfully"}, status=status.HTTP_200_OK)

@api_view(["PATCH"])
def change_pw(request):
    if request.user.is_authenticated:
        user = User.objects.get(pk=request.user.id)
        current_password = request.data["old_password"]
        check_password(current_password, user.password)
        if check_password:
            serializer = UserSerializer(instance=user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()

                return Response(data= {"message": "Password has been changed successfully"}, status=status.HTTP_200_OK)
            else:
                raise ValidationError("Your new password does not meet the requirements.")
        else:
            raise ValidationError("You have entered an invalid password")

@api_view(["GET", "POST", "PATCH"])
def address_detail(request, profile_id):
    delivery_addresses = DeliveryAddress.objects.filter(user_id=profile_id)
    if request.method == 'GET':
        if request.user.is_authenticated:
            if (profile_id == request.user.id):
                serializer = DeliveryAddressSerializer(delivery_addresses, many=True)

                return Response(serializer.data, status=status.HTTP_200_OK)
            else: 
                return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    elif request.method == "POST":
        if request.user.is_authenticated:
            if (profile_id == request.user.id):
                delivery_address = DeliveryAddress.objects.create(user=request.user)
                serializer = DeliveryAddressSerializer(instance=delivery_address, data=request.data)

                if serializer.is_valid(raise_exception=True):
                    serializer.save()

                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            else: 
                return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    elif request.method == 'PATCH':
        if request.user.is_authenticated:
            if (profile_id == request.user.id):
                delivery_address = DeliveryAddress.objects.get(pk=request.data["id"])    
                serializer = DeliveryAddressSerializer(instance=delivery_address, data=request.data, partial=True)

                if serializer.is_valid(raise_exception=True):
                    serializer.save()

                    return Response(serializer.data, status=status.HTTP_200_OK)
            else: 
                return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

# @api_view(["GET"])
# def order_list(request):
#     if request.user.is_authenticated:
#         if request.user.role == 'Admin':
#             queryset = Order.objects.all()
#             filterset = OrderDateTimeRangeFilter(request.GET, queryset=queryset)
#             if filterset.is_valid():
#                 queryset = filterset.qs
#             serializer = OrderReadSerializer(instance=queryset, many=True)

#             return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def order_detail(request, profile_id):
    orders = Order.objects.filter(user_id=profile_id)
    if request.user.is_authenticated:
        if (profile_id == request.user.id):
            serializer = OrderReadSerializer(instance=orders, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else: 
            return Response(status=status.HTTP_403_FORBIDDEN)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
