# Generated by Django 4.1.4 on 2023-10-01 21:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('manpro', '0044_user_offer'),
    ]

    operations = [
        migrations.RenameField(
            model_name='offers',
            old_name='Contant',
            new_name='Contact',
        ),
    ]
