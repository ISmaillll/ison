# Generated by Django 4.1.4 on 2023-03-31 22:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('manpro', '0011_apply_for_remove_project_is_finished_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='work_for',
            name='Job',
        ),
        migrations.RemoveField(
            model_name='work_for',
            name='Worker',
        ),
        migrations.DeleteModel(
            name='Apply_For',
        ),
        migrations.DeleteModel(
            name='Work_For',
        ),
    ]