# Generated by Django 4.1.4 on 2023-03-12 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manpro', '0005_rename_workermetrise_workermaitrise_worker_bio'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='Expiration',
        ),
        migrations.AddField(
            model_name='user',
            name='cardMonth',
            field=models.CharField(max_length=2, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='cardYear',
            field=models.CharField(max_length=4, null=True),
        ),
    ]
