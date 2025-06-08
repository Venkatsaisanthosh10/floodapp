from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models.models import PublicAlert
from django.views.decorators.csrf import csrf_exempt
class PublicAlertController:
    @staticmethod
    @csrf_exempt
    @api_view(['POST'])
    def public_alert(request):
        try:
            data = request.data
            
            # Extract required fields from request data
            alert_title = data.get('title')
            alert_message = data.get('message')
            instructions = data.get('instructions')
            location = data.get('location')

            # Validate required fields
            if not all([alert_title, alert_message, instructions, location]):
                return Response({
                    'error': 'All fields (title, message, instructions, location) are required.'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Convert location array to required coordinate format
            if isinstance(location, list) and len(location) == 2:
                coordinates = {
                    'lat': location[0],
                    'lng': location[1]
                }
            else:
                return Response({
                    'error': 'Location must be an array with [latitude, longitude]'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Create and save the public alert
            public_alert = PublicAlert(
                alertTitle=alert_title,
                alertMessage=alert_message,
                instructions=instructions,
                coordinates=coordinates
            )
            public_alert.save()

            return Response({
                'status': 'Success',
                'message': 'Alert created successfully',
                'data': {
                    'alertTitle': alert_title,
                    'alertMessage': alert_message,
                    'instructions': instructions,
                    'coordinates': coordinates,
                    'timestamp': public_alert.timestamp
                }
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)