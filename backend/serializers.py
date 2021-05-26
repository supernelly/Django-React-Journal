from rest_framework import serializers
from .models import Entry
from django.contrib.auth.models import User

User._meta.get_field('username')._unique = True

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            "",
            validated_data['password']
        )
        return user

class EntrySerializer(serializers.ModelSerializer):
  class Meta:
    model = Entry
    fields = ('id', 'title', 'body', 'username')
