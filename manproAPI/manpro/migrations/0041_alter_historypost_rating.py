# Generated by Django 4.1.4 on 2023-09-28 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manpro', '0040_comments_date_historypost_save_post_ageauto_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historypost',
            name='Rating',
            field=models.FloatField(default=0),
        ),
    ]