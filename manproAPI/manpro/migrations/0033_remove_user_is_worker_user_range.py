# Generated by Django 4.1.4 on 2023-09-01 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manpro', '0032_alter_user_cvv_alter_user_cartholder_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='Is_Worker',
        ),
        migrations.AddField(
            model_name='user',
            name='range',
            field=models.IntegerField(default=1),
        ),
    ]
