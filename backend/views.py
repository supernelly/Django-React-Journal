from django.shortcuts import render, get_list_or_404, get_object_or_404
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

class EntryView(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def list(self, request):
        # GET - Show list with given username
        queryset = Entry.objects.all()
        j_list = get_list_or_404(queryset, username=request.META.get("HTTP_USERNAME"))
        serializer = EntrySerializer(j_list, many=True)
        return Response(serializer.data)

    def create(self, request):
        # POST - Add new list item
        if "id" in request.data:
            # Update
            d_list = Entry.objects.filter(id = request.data["id"])
            d_list.update(
                    title = request.data["title"],
                    body =  request.data["body"],
                    username = request.data["username"]
                )
            queryset = Entry.objects.all()
            d_list = get_object_or_404(queryset,pk=request.data["id"])
        else:
            # Create
            d_list = Entry(
                        title = request.data["title"],
                        body =  request.data["body"],
                        username = request.data["username"]
                    )
            d_list.save()

        serializer = EntrySerializer(d_list)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        # GET - Show <lix> list
        queryset = Entry.objects.all()
        d_list = get_list_or_404(queryset, id=pk)
        serializer = EntrySerializer(d_list, many=True)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        # DELETE - Delete list item
        d_list = Entry.objects.filter(id = pk)
        d_list.delete()
        return Response()