from django.urls import path
from bookings import views


urlpatterns = [
    path('reserve', views.reserve, name='reserve'),
    path('booking/<int:booking_id>', views.booking_detail, name='booking_detail'),
]