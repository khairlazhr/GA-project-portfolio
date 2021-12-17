from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET', "POST", "PATCH"])
def reserve(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return ("hello")