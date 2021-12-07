from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.serializers import Serializer, PrimaryKeyRelatedField
from rest_framework.response import Response

from annotations.models import Annotation, Project, Image


class AnnotationSerializer(Serializer):
    class Meta:
        model = Annotation


class ProjectSerializer(Serializer):

    images = PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ("id", "images")


class ImageSerializer(Serializer):
    annotations = PrimaryKeyRelatedField(queryset=Image.objects.all(), many=True)

    class Meta:
        model = Image
        fields = ("annotations", "url")

    def to_url(self, obj):
        return obj.image.url


# Create your views here.
class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()

    def list(self, request):
        serializer = ProjectSerializer(self.queryset, many=True)
        return Response(serializer.data)


# Create your views here.
class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()

    def list(self, request):
        serializer = ImageSerializer(self.queryset, many=True)
        return Response(serializer.data)
