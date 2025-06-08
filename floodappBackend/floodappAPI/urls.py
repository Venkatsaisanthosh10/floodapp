from django.urls import path, include
from .View import views
from .controllers.FloodDataController import FloodDataController

urlpatterns = [
    path('', views.index, name='index'),
    path('alerts/',views.get_flood_alerts, name='get_flood_alerts'),
    path('flooddata/', views.get_flood_data_alerts, name='get_flood_data_alerts'),
    path('publicalert/', views.post_public_alert, name='post_public_alert'),
]
