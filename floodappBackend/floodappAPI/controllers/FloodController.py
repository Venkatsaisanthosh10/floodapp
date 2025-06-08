from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

class FloodController:
    @staticmethod
    @api_view(['GET'])
    def get_flood_alerts(request):
        try:
            # Your logic here
            return Response({
                'message': 'Flood alerts retrieved successfully'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)