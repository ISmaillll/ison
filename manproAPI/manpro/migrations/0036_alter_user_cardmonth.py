# Generated by Django 4.1.4 on 2023-09-03 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manpro', '0035_alter_rateworker_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='cardMonth',
            field=models.CharField(blank=True, max_length=4, null=True),
        ),
    ]
