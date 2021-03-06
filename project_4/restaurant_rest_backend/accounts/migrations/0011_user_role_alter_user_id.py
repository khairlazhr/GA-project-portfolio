# Generated by Django 4.0.4 on 2022-06-20 08:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_alter_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Admin'), (2, 'Customer')], default=2, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(default='v7K9WolvkY8Pi7L', editable=False, max_length=15, primary_key=True, serialize=False, unique=True),
        ),
    ]
