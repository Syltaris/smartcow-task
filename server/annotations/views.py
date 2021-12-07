from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.serializers import (
    Serializer,
    ModelSerializer,
    PrimaryKeyRelatedField,
    IntegerField,
    SerializerMethodField,
)

from annotations.models import Annotation, Project, Image


class AnnotationSerializer(ModelSerializer):
    class Meta:
        model = Annotation


class ImageSerializer(Serializer):
    project_id = PrimaryKeyRelatedField(queryset=Project.objects.all())
    annotations = PrimaryKeyRelatedField(queryset=Annotation.objects.all(), many=True)
    url = SerializerMethodField()

    class Meta:
        model = Image
        fields = ("id", "project_id", "annotations", "url")

    def get_url(self, obj):
        return obj.file.url

    # def create(self, validated_data):
    #     project = Project.objects.get(id=validated_data.get("project_id"))
    #     image = Image(project_id=project.id, file=validated_data["image"])
    #     print(image)
    #     image.save()
    #     print("creating?")
    #     return image


class ProjectSerializer(ModelSerializer):

    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ("id", "name", "images")


# Create your views here.
class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


# Create your views here.
class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    def create(self, request, *args, **kwargs):
        project = Project.objects.get(id=request.data.get("project_id"))
        image = Image.objects.create(project=project, file=request.data.get("image"))
        return Response(self.serializer_class(image).data)
