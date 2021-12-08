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
    image = models.ForeignKey(
        "Image", related_name="annotations", on_delete=models.CASCADE, null=True
    )


class Image(models.Model):
    file = models.ImageField(upload_to="images")  # url is from file.url
    project = models.ForeignKey(
        "Project", related_name="images", on_delete=models.CASCADE, null=True
    )
    name = models.CharField(max_length=100)
    width = models.IntegerField()
    height = models.IntegerField()


class Project(models.Model):
    name = models.CharField(max_length=100, null=True)
