from django.urls import path
from restaurant import views


urlpatterns = [
    path('menu', views.menu_list, name='menu_list'),
    path('menu/<int:menu_id>', views.menu_detail, name='menu_detail')
]
