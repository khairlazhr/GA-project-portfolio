from django.urls import path
from accounts import views
from rest_framework_simplejwt.views import (
    token_refresh,
)

urlpatterns = [
    path('signup', views.signup, name="signup"),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('token/refresh', token_refresh, name='token_refresh'),
    # path('orders', views.order_list, name='order_list'),
    path('profile/<str:profile_id>', views.profile_detail, name='profile_detail'),
    path('profile/<str:profile_id>/changepw', views.change_pw, name='change_pw'),
    path('profile/<str:profile_id>/addresses', views.address_detail, name='address_detail'),
    path('profile/<str:profile_id>/orders', views.order_detail, name='order_detail'),
]
