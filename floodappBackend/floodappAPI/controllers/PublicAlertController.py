from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

class PublicAlertController:
    @staticmethod
    @api_view(['POST'])
    def public_alert(request):
        try:
            data = request.data  # Get POST body data
            message = data.get('message')

            if not message:
                return Response({
                    'error': 'Message field is required.'
                }, status=status.HTTP_400_BAD_REQUEST)

            # You can process or store the message here
            return Response({
                'status': 'Success',
                'received_message': message
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)