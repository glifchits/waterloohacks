# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-24 06:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('docfile', models.FileField(upload_to=b'documents/%Y/%m/%d')),
                ('model', models.CharField(blank=True, max_length=255)),
                ('make', models.CharField(blank=True, max_length=255)),
                ('orientation', models.IntegerField(null=True)),
                ('date', models.DateTimeField(null=True)),
                ('width', models.IntegerField(null=True)),
                ('height', models.IntegerField(null=True)),
                ('longitude', models.DecimalField(decimal_places=10, max_digits=19, null=True)),
                ('latitude', models.DecimalField(decimal_places=10, max_digits=19, null=True)),
                ('top100', models.TextField(blank=True)),
                ('weather', models.TextField(blank=True)),
            ],
        ),
    ]