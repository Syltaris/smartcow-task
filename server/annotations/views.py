from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.serializers import (
    Serializer,
    ModelSerializer,
    PrimaryKeyRelatedField,
    IntegerField,
    CharField,
    SerializerMethodField,
)

from annotations.models import Annotation, Project, Image


class AnnotationSerializer(ModelSerializer):
    class Meta:
        model = Annotation
        fields = "__all__"


class ImageSerializer(Serializer):
    id = IntegerField()
    project_id = PrimaryKeyRelatedField(queryset=Project.objects.all())
    url = SerializerMethodField()
    name = CharField()
    width = IntegerField()
    height = IntegerField()
    annotations = AnnotationSerializer(many=True, read_only=True)

    class Meta:
        model = Image
        fields = ("id", "project_id", "annotations", "url", "name", "width", "height")

    def get_url(self, obj):
        return obj.file.url


class ProjectSerializer(ModelSerializer):

    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ("id", "name", "images")


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    def create(self, request, *args, **kwargs):
        project = Project.objects.get(id=request.data.get("project_id"))
        image = Image.objects.create(
            project=project,
            file=request.data.get("image"),
            name=request.data.get("name"),
            width=request.data.get("width"),
            height=request.data.get("height"),
        )
        return Response(self.serializer_class(image).data)


class AnnotationViewSet(ModelViewSet):
    queryset = Annotation.objects.all()
    serializer_class = AnnotationSerializer
