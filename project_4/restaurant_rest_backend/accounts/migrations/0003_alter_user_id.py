# Generated by Django 4.0 on 2022-05-14 10:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_alter_orderitem_order_alter_user_email_alter_user_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.CharField(default='iQ_vf_L-lqowLDr', editable=False, max_length=15, primary_key=True, serialize=False, unique=True),
        ),
    ]
