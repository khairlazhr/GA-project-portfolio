from django.db import models
from django.db.models.aggregates import Min
from accounts.models import User

# Create your models here.
class TimeSlot(models.Model):
    date_slot = models.DateField(null=True, blank=True)
    time_slot = models.TimeField(null=True, blank=True)
    maximum_tables = models.IntegerField(default=10)

    def __str__(self):
        return str(self.date_slot) + " - " + str(self.time_slot)

    @property
    def get_booked_tables_total(self):
        bookings = self.bookings.all()
        total = sum([booking.tables_booked for booking in bookings])

        return total
    
    @property
    def get_available_tables(self):
        return (self.maximum_tables - self.get_booked_tables_total)

class Booking(models.Model):
    user = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        related_name= "bookings"
    )
    booked_slot = models.ForeignKey(
        to = TimeSlot,
        on_delete=models.CASCADE,
        related_name="bookings"
    )
    date_slot = models.DateField(null=True, blank=True)
    time_slot = models.TimeField(null=True, blank=True)
    tables_booked = models.IntegerField(default=1) # 1 table can seat up to 4 people

