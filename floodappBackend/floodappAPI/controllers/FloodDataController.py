from django.http import JsonResponse
from ..models.models import FloodData
import json
from django.db import connections
from pymongo.errors import ServerSelectionTimeoutError

class FloodDataController:
    @staticmethod
    def get_all_flood_data(request):
        try:
            # MongoDB query using MongoEngine
            connections['default'].ensure_connection()
            flood_data = FloodData.objects.all().to_json()
            data = json.loads(flood_data)
            return JsonResponse({
                'status': 'success',
                'data': data
            })
        except ServerSelectionTimeoutError as se:
            return JsonResponse({
                'status': 'error',
                'message': 'Unable to connect to the MongoDB server. Please check if the server is running.',
                'error': str(se)
            }, status=503)
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=500)