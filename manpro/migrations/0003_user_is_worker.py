# Generated by Django 4.1.4 on 2023-03-10 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manpro', '0002_alter_user_cvv_alter_user_cartholder_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='Is_Worker',
            field=models.BooleanField(default=False),
        ),
    ]