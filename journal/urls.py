"""journal URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers
from backend import views
from knox import views as knox_views

router = routers.DefaultRouter()
router.register(r'entries', views.EntryView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register', views.RegisterView.as_view()),
    url('api/login/', views.LoginView.as_view()),
    url('api/logout/', knox_views.LogoutView.as_view()),
    url('api/logoutall/', knox_views.LogoutAllView.as_view()),
]
