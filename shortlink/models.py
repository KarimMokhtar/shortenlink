from django.db import models

# Create your models here.


class Code(models.Model):
    code = models.CharField(max_length=6, unique=True, null=False, blank=False)
    longUrl = models.CharField(max_length=250, null=False, blank=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
