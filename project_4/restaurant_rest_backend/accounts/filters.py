from django_filters import rest_framework as filters
from .models import Order


class OrderDateTimeRangeFilter(filters.FilterSet):
    created_on = filters.DateTimeFromToRangeFilter()

    class Meta:
        model = Order
        fields = ['created_on']
