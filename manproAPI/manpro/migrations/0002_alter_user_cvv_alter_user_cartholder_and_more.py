# Generated by Django 4.1.4 on 2023-03-10 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manpro', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='CVV',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='CartHolder',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='Criditcart',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='Expiration',
            field=models.DateField(null=True),
        ),
    ]
