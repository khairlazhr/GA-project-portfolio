# Generated by Django 4.0.4 on 2022-05-29 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_order_address_alter_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(default='sQkc3frYugL-tmV', editable=False, max_length=15, primary_key=True, serialize=False, unique=True),
        ),
    ]
