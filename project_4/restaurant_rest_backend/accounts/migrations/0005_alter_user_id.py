# Generated by Django 4.0 on 2022-05-16 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_alter_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(default='dED0Iqw-P4L4bHW', editable=False, max_length=15, primary_key=True, serialize=False, unique=True),
        ),
    ]
