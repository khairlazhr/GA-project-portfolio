from django.db import models
from django.db.models.aggregates import Min
from accounts.models import User
import datetime 

# Create your models here.
class TimeSlot(models.Model):
    date_time_slot = models.DateTimeField(default=datetime.datetime.now())
    available_tables = models.IntegerField()

class Booking(models.Model):
    user = models.OneToOneField(
        to=User,
        on_delete=models.CASCADE,
        related_name= "booking"
    )
    booked_slot = models.ForeignKey(
        to = TimeSlot,
        on_delete=models.CASCADE,
        related_name="bookings"
    )
    tables_booked = models.IntegerField(default=1) # 1 table can seat up to 4 people

