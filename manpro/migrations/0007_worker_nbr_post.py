# Generated by Django 4.1.4 on 2023-03-13 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manpro', '0006_remove_user_expiration_user_cardmonth_user_cardyear'),
    ]

    operations = [
        migrations.AddField(
            model_name='worker',
            name='Nbr_Post',
            field=models.IntegerField(default=0),
        ),
    ]
