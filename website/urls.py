from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('sports/<int:sport_id>', views.sport, name='sport')
]
