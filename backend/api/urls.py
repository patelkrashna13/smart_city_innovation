from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('', views.api_root, name='api-root'),
]

urlpatterns = format_suffix_patterns(urlpatterns)