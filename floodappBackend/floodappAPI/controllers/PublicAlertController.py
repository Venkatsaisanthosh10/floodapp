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
            alert_title = data.get('alertTitle')
            alert_message = data.get('alertMessage')
            instructions = data.get('instructions')
            coordinates = data.get('coordinates')

            # Validate required fields
            if not all([alert_title, alert_message, instructions, coordinates]):
                return Response({
                    'error': 'All fields (alertTitle, alertMessage, instructions, coordinates) are required.'
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
                'alert_id': str(public_alert.id),
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