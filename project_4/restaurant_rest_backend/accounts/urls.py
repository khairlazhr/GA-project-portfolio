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
    path('profile/changepw', views.change_pw, name='change_pw'),
    path('profile/<int_user>', views.profile_detail, name='profile_detail'),
    path('profile/addressbook/<int_user>', views.address_list, name='address_detail'),
    path('profile/orderhistory/<int_user>', views.profile_detail, name='profile_detail'),
]
