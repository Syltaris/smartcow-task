from django.db import models

# Create your models here.
class Annotation(models.Model):
    """
    Annotation model
    """

    type = models.CharField(max_length=100)
    startX = models.FloatField()
    startY = models.FloatField()
    endX = models.FloatField()
    endY = models.FloatField()
    image = models.ForeignKey(
        "Image", related_name="annotations", on_delete=models.CASCADE, null=True
    )


class Image(models.Model):
    file = models.ImageField(upload_to="images")  # url is from file.url
    project = models.ForeignKey(
        "Project", related_name="images", on_delete=models.CASCADE, null=True
    )
    name = models.CharField(max_length=100)
    width = models.FloatField()
    height = models.FloatField()


class Project(models.Model):
    name = models.CharField(max_length=100, null=True)
