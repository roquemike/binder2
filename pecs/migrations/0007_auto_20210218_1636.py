# Generated by Django 3.1.5 on 2021-02-18 21:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pecs', '0006_auto_20210218_0755'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='tag',
        ),
        migrations.AddField(
            model_name='image',
            name='tag',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='image', to='pecs.tag'),
        ),
    ]