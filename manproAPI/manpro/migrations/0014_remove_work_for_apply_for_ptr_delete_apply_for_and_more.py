# Generated by Django 4.1.4 on 2023-04-01 13:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('manpro', '0013_apply_for_work_for'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='work_for',
            name='apply_for_ptr',
        ),
        migrations.DeleteModel(
            name='Apply_For',
        ),
        migrations.DeleteModel(
            name='Work_For',
        ),
    ]
