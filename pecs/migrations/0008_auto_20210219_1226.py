# Generated by Django 3.1.5 on 2021-02-19 17:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pecs', '0007_auto_20210218_1636'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='tag',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='image', to='pecs.tag'),
        ),
    ]