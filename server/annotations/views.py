from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from rest_framework.response import Response

from annotations.models import Annotation, Project, Image


class AnnotationSerializer(ModelSerializer):
    class Meta:
        model = Annotation


class ProjectSerializer(ModelSerializer):

    images = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ("id", "name", "images")


class ImageSerializer(ModelSerializer):
    annotations = PrimaryKeyRelatedField(queryset=Annotation.objects.all(), many=True)

    class Meta:
        model = Image
        fields = ("id", "project_id" "annotations", "url")

    def to_url(self, obj):
        return obj.image.url


# Create your views here.
class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


# Create your views here.
class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
