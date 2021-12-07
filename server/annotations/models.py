from django.db import models

# Create your models here.
class Annotation(models.Model):
    """
    Annotation model
    """

    type = models.CharField(max_length=100)
    startX = models.IntegerField()
    startY = models.IntegerField()
    endX = models.IntegerField()
    endY = models.IntegerField()


class Image(models.Model):
    file = models.ImageField(upload_to="images")
    annotations = models.ManyToManyField(Annotation)


class Project(models.Model):
    name = models.CharField(max_length=100, null=True)
    images = models.ManyToManyField(Image)
