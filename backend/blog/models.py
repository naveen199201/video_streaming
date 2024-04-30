from django.db import models
from django.contrib.auth.models import User

class Video(models.Model):
    PRIVACY_CHOICES = [
        ('public', 'Public'),
        ('private', 'Private'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    file = models.FileField(upload_to='videos/')
    thumbnail = models.ImageField(upload_to='thumbnails/')  # Add thumbnail field
    privacy = models.CharField(max_length=10, choices=PRIVACY_CHOICES)
    uploader = models.ForeignKey(User, on_delete=models.CASCADE)
    views_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
