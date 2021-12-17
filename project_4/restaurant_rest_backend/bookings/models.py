from django.db import models
from django.db.models.aggregates import Min
from accounts.models import User

# Create your models here.
class TimeSlot(models.Model):
    date = models.DateField()
    time_slot = models.TimeField()
    available_tables = models.IntegerField()

class Booking(models.Model):
    user = models.OneToOneField(
        to=User,
        on_delete=models.CASCADE,
        related_name= "booking"
    )
    time_slot = models.ForeignKey(
        to = TimeSlot,
        on_delete=models.CASCADE,
        related_name="bookings"
    )
    booked_date = models.DateField()
    tables_booked = models.IntegerField(default=1) # 1 table can seat up to 4 people

