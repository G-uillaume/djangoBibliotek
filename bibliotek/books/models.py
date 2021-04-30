from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255, default='Unknown') 
    genre = models.CharField(max_length=255, null=True)
    height = models.IntegerField(null=True)
    description = models.TextField(null=True)
    publisher = models.CharField(max_length=255, default="Unknown")
    quantity = models.IntegerField(null=True)
    ratings = models.IntegerField(null=True)

    def __str__(self):
        return self.title

class Order(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    books = models.ManyToManyField(Book, through='Ordering', related_name='orders')

    def __str__(self):
        return '%s : %s' % (self.user, list(self.books.all()))

class Ordering(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    number = models.IntegerField()

    # def __str__(self):
    #     return f"{self.number}"
