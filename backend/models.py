from django.db import models

# Create your models here.
class Entry(models.Model):
    title = models.CharField(max_length=120)
    body = models.TextField()
    username = models.CharField(max_length=30)

    def _str_(self):
        return self.title