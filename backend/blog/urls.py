from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  UserRegistrationView,CustomAuthToken
from rest_framework.authtoken import views
from .views import VideoViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'videos', VideoViewSet, basename="videos")

urlpatterns = [
    path('', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls')),    
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('api-auth/', CustomAuthToken.as_view()),     
]
if settings.DEBUG is True:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
