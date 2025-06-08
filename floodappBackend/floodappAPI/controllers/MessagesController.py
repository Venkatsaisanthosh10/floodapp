from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models.models import Messages
from django.views.decorators.csrf import csrf_exempt

class MessagesController:
    @staticmethod
    @csrf_exempt
    @api_view(['POST'])
    def message_save(request):
        try:
            data = request.data
            
            # Extract required fields from request data
            UserMessage = data.get('UserMessage')
            UserSend = data.get('UserSend') 

            # Validate required fields
            if not all([UserMessage, UserSend]):
                return Response({
                    'error': 'All fields (UserMessage,UserSend) are required.'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Create and save the public alert
            messages = Messages(
                UserMessage=UserMessage,
                UserSend=UserSend
            )
            messages.save()

            return Response({
                'status': 'Success',
                'message': 'message Registered successfully',
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


    @staticmethod
    @csrf_exempt
    @api_view(['GET'])
    def get_all_messages(request):
        try:
            # Retrieve all messages from the database
            messages = Messages.objects.all()
            
            # Convert messages to list of dictionaries
            messages_list = [
                {
                    'UserMessage': message.UserMessage,
                    'UserSend': message.UserSend
                }
                for message in messages
            ]
            
            return Response({
                'status': 'Success',
                'data': messages_list
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)