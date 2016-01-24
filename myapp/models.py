# -*- coding: utf-8 -*-
from django.db import models


class Document(models.Model):
    docfile = models.FileField(upload_to='documents/%Y/%m/%d')
    model = models.CharField(max_length=255, null=True, blank=True)
    make = models.CharField(max_length=255, null=True, blank=True)
    orientation = models.IntegerField(null=True)
    date = models.DateTimeField(null=True)
    width = models.IntegerField(null=True)
    height = models.IntegerField(null=True)
    longitude = models.DecimalField(max_digits=19, decimal_places=10, null=True)
    latitude = models.DecimalField(max_digits=19, decimal_places=10, null=True)
    top100 = models.TextField(null=True, blank=True)
    weather = models.TextField(null=True, blank=True)
