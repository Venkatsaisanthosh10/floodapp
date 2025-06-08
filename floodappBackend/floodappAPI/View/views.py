from django.http import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from datetime import datetime
from ..controllers.FloodController import FloodController
from ..controllers.FloodDataController import FloodDataController
from ..controllers.PublicAlertController import PublicAlertController
from ..controllers.MessagesController import MessagesController
def index(request):
    return HttpResponse("Welcome to the Flood App")
def get_flood_alerts(request):
    return FloodController.get_flood_alerts(request)
def get_flood_data_alerts(request):
    return FloodDataController.get_all_flood_data(request)
def post_public_alert(request):
    return PublicAlertController.public_alert(request)
def post_message(request):
    return MessagesController.message_save(request)
def get_messgaes(request):
    return MessagesController.get_all_messages(request)
    