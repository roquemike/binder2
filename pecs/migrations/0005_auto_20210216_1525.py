# Generated by Django 3.1.5 on 2021-02-16 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pecs', '0004_auto_20210214_2048'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='description',
            field=models.CharField(max_length=20),
        ),
    ]
