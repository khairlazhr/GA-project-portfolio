from django.urls import path
from bookings import views


urlpatterns = [
    path('reserve', views.reserve, name='reserve'),
]