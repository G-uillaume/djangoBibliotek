from rest_framework import serializers
from .models import Book, Order, Ordering
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    order_set = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {
            'write_only': True,
            'required': True,
        }}
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class OrderingSerializer(serializers.HyperlinkedModelSerializer):
    book_id = serializers.StringRelatedField(source='book.id')
    book_title = serializers.StringRelatedField(source='book.title')
    class Meta:
        model = Ordering
        fields = [ 'book_id', 'book_title', 'number']


class OrderSerializer(serializers.ModelSerializer):
    books = OrderingSerializer(source="ordering_set", many=True, read_only=True)
    user = serializers.StringRelatedField(many=False, read_only=True)
    # books = serializers.StringRelatedField(many=True)
    created_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    updated_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    class Meta:
        model = Order
        fields = '__all__'

    # def create(self, request):
    #     user = User.objects.get(username=request.user)
    #     books = request.books
    #     order = user.orders_set.create()
    #     for book in books:
    #         order.books.add(book.title, through_defaults={'books_in_order': book.quantity})
