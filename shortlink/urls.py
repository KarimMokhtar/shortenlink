from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('url/<str>', views.createUrl, name='createUrl'),
    path('url/', views.createUrl, name='createUrl'),
]
