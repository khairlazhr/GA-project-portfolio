# Generated by Django 4.0 on 2021-12-17 03:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_order_order_status_alter_deliveryaddress_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='salutation',
        ),
        migrations.AddField(
            model_name='deliveryaddress',
            name='unit_no',
            field=models.CharField(default='hi', max_length=50),
        ),
    ]