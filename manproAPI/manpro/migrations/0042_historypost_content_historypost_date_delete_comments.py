# Generated by Django 4.1.4 on 2023-09-29 20:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manpro', '0041_alter_historypost_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='historypost',
            name='Content',
            field=models.CharField(blank=True, default='', max_length=500),
        ),
        migrations.AddField(
            model_name='historypost',
            name='date',
            field=models.DateTimeField(null=True),
        ),
        migrations.DeleteModel(
            name='Comments',
        ),
    ]
