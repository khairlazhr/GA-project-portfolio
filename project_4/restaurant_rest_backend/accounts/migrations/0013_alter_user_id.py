# Generated by Django 4.0.4 on 2022-06-22 07:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_alter_user_id_alter_user_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(default='MB4fYbdAdnFHbO8', editable=False, max_length=15, primary_key=True, serialize=False, unique=True),
        ),
    ]
