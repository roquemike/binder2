from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    pass

class Tag(models.Model):
    category = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.category}"

class Image(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="image")
    name = models.ImageField(upload_to='uploads/')
    description = models.CharField(max_length=20)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name="image")

    class Meta:
        ordering = ['description']

    def __str__(self):
        return f"{self.id} : {self.name} {self.description}"

class Favorite(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='favorite')
    pecs = models.ManyToManyField(Image, related_name='favorite')

