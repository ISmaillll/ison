# Generated by Django 4.1.4 on 2023-04-08 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manpro', '0018_jobs_date_jobs_description_worker_avalble'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apply_for',
            name='Date_Apply',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='apply_for',
            name='Date_Work',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='Date',
            field=models.DateTimeField(default='2000-01-01'),
        ),
        migrations.AlterField(
            model_name='project',
            name='Date',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='Date_Start',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='project',
            name='Duration',
            field=models.DateTimeField(),
        ),
    ]