from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EntrySerializer, RegisterSerializer, UserSerializer
from .models import Entry

from django.contrib.auth import login
from rest_framework import generics, permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from knox.auth import TokenAuthentication
from rest_framework.authentication import BasicAuthentication

class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginView, self).post(request, format=None)

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        })

class ExampleView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        content = {
            'foo': 'bar'
        }
        return Response(content)

class EntryView(viewsets.ModelViewSet):
    serializer_class = EntrySerializer
    queryset = Entry.objects.all()