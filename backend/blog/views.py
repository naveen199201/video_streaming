from rest_framework import viewsets
# from django.contrib.auth.models import User
from rest_framework import permissions,status
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Video
from .serializers import VideoSerializer

class VideoViewSet(viewsets.ModelViewSet):
    serializer_class = VideoSerializer  
    # queryset=Video.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    

    def get_queryset(self):
        user = self.request.user
        query = self.request.query_params.get('q', None)  # Get the search query parameter
        privacy = self.request.query_params.get('privacy', None)

        # If the user is authenticated, perform the search
        if user.is_authenticated:
            videos = Video.objects.all()  # Default queryset
            if query:
                videos = videos.filter(title__icontains=query)  # Filter by title containing the search query
            if privacy:
                if privacy == 'public':
                    videos = videos.filter(uploader=user,privacy='public')
                elif privacy == 'private':
                    videos = videos.filter(uploader=user, privacy='private')
        else:
            # If user is not authenticated, return an empty queryset
            videos = Video.objects.none()

        return videos

    def perform_create(self, serializer):
        serializer.save(uploader=self.request.user)
    
    def retrieve(self,request, *args, **kwargs):
        instance = self.get_object()
        user = self.request.user
        print(user)
        print(instance)
        
        if instance.privacy == 'public':
                serializer = self.get_serializer(instance)
                return Response(serializer.data)
        
        if user.is_authenticated:
            if instance.privacy == 'private' and instance.uploader == user:
                serializer = self.get_serializer(instance)
                return Response(serializer.data)
        return Response({'detail': 'You do not have permission to access this video.'}, status=403)
       
class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate token for the user
        token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {
                'email': user.email,
                'username':user.username,
                'token': token.key,
            },
            status=status.HTTP_201_CREATED
        )

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'username':user.username,
        })
