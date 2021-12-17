from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from delivery.models import Cart, CartItem
from delivery.serializers import CartItemSerializer

from restaurant.models import MenuItem
from restaurant.serializers import MenuItemSerializer

# Create your views here.
@api_view(['GET'])
def menu_list(request):
    menu_items = MenuItem.objects.all()
    if request.method == 'GET':
        serializer = MenuItemSerializer(instance=menu_items, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def menu_detail(request, menu_id):
    menu_item = MenuItem.objects.get(pk=menu_id)

    if request.method == 'GET':
        if request.user.is_authenticated:
            serializer = MenuItemSerializer(instance=menu_item)

            return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST': #Add to Cart 
        if request.user.is_authenticated:
            cart = Cart.objects.get(user=request.user)
            check_cart_item = CartItem.objects.filter(cart=cart, item_id=request.data["item_id"])
            if check_cart_item.exists():
                cart_item = check_cart_item.first()
                cart_item.quantity += int(request.data['quantity'])
                cart_item.save()
            else:
                CartItem.objects.create(cart=cart, item_id=request.data["item_id"], quantity=request.data["quantity"])
            return Response(status=status.HTTP_200_OK)
