from .models import Book, Order, Ordering
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.db import transaction, IntegrityError
# from django.core.exceptions import DoesNotExist
from .serializers import BookSerializer, OrderSerializer, UserSerializer
from rest_framework import viewsets, status, mixins, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework import permissions
from django.http import HttpResponseRedirect

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(request.user)
        if request.user.is_staff:
            return self.list(request)
        else:
            self.queryset = User.objects.filter(pk=request.user.id)
            return self.list(request)


class UserDetail(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def get(self, request, pk):
        try:
            if request.user.id == pk or request.user.is_staff:
                return self.retrieve(request, pk=pk)
            else:
                raise AssertionError
        except AssertionError:
            return Response("Permission denied, you must be admin", status=status.HTTP_403_FORBIDDEN)
            
    def put(self, request, pk):
        try:
            if request.user.id == pk:
                return self.update(request, pk=pk)
            else:
                raise AssertionError
        except AssertionError:
            return Response("Permission denied", status.HTTP_403_FORBIDDEN)


class BookList(generics.ListAPIView):


    queryset = Book.objects.all()
    
    serializer_class = BookSerializer

    def get(self, request):
        return self.list(request)


class BookDetails(generics.RetrieveUpdateAPIView):
    
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = (TokenAuthentication,)

    def get(self, request, pk):
        return self.retrieve(request, pk=pk)

    def put(self, request, pk):
        try:
            if request.user.is_staff:
                return self.update(request, pk=pk)
            else:
                raise AssertionError
        except AssertionError:
            return Response("Permission denied", status=status.HTTP_403_FORBIDDEN)


class OrderList(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def get(self, request):
        user = request.user
        if user.is_staff:
            return self.list(request)
        else:
            self.queryset = Order.objects.filter(user=user)
            return self.list(request)

    def post(self, request):
        try:
            with transaction.atomic():
                user = User.objects.get(pk=request.user.id)
                order = user.order_set.create()
                books = request.data['books']
                query = Book.objects.exclude(quantity = 0)
                for book in books:
                    bookObjects = get_object_or_404(query, pk=book['book'])
                    if bookObjects.quantity < book['number']:
                        order.delete()
                        return Response("Error, there are not enough " + bookObjects.title + " in stock", status=status.HTTP_400_BAD_REQUEST)
                    bookObjects.quantity -= book['number']
                    bookObjects.save()
                    order.books.add(bookObjects, through_defaults={'number': book['number']})
                serializer = OrderSerializer(order).data
                return Response(serializer, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response("Integrity Error", status=status.HTTP_400_BAD_REQUEST)
        # except DoesNotExist:
        #     return Response("You have to be authenticated", status=status.HTTP_403_FORBIDDEN)


class OrderDetails(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        order = Order.objects.get(pk=pk)
        try:
            if request.user.is_staff or request.user.id == order.user.id:
                return self.retrieve(request, pk=pk)
            else:
                raise PermissionError
        except PermissionError:
            return Response('Permission denied', status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk):
        order = Order.objects.get(pk=pk)
        books_in_order = request.data['books']
        all_books = Book.objects.all()
        try:
            if request.user.is_staff or request.user.id == order.user.id:
                for book in books_in_order:
                    # bookObject = self.queryset.get(pk=book['book'])
                    bookObjects = get_object_or_404(all_books, pk=book['book'])
                    bookObjects.quantity += book['number']
                    bookObjects.save()
                    
                return self.destroy(request, pk=pk)
            else:
                raise PermissionError
        except PermissionError:
            return Response('Permission denied', status=status.HTTP_403_FORBIDDEN)

    def put(self, request, pk):
        try:
            with transaction.atomic():
                order = Order.objects.get(pk=pk)
                ordering_set = Ordering.objects.filter(order_id=pk)
                books_in_old_order = order.books.all()
                books_in_request = request.data['books']
                all_books = Book.objects.all()
                # all_books_available = Book.objects.exclude(quantity = 0)
                request_set = set()
                old_request_set = set()
                if request.user.is_staff or request.user.id == order.user.id:
                    for book in books_in_request:
                        request_set.add(book['book'])
                    for book in books_in_old_order:
                        old_request_set.add(book.id)
                    books_removed_from_request = old_request_set - request_set
                    new_books_in_request = request_set - old_request_set

                # if the book is new in the order
                    for book_id in new_books_in_request:
                        # bookObject = get_object_or_404(all_books_available, pk=book_id)
                        bookObject = Book.objects.get(pk=book_id)
                        for book in books_in_request:
                            if book['book'] == bookObject.id:
                                if bookObject.quantity >= book['number']:
                                    bookObject.quantity -= book['number']
                                    bookObject.save()
                                    order.books.add(bookObject, through_defaults={'number': book['number']})
                                else:
                                    raise Exception

                # if a book has been removed from the order
                    for book_id in books_removed_from_request:
                        # bookObject = get_object_or_404(all_books, pk=book_id)
                        bookObject = Book.objects.get(pk=book_id)
                        for book in ordering_set:
                            if book.book_id == bookObject.id:
                                bookObject.quantity += book.number
                                bookObject.save()
                                order.books.remove(bookObject)

                # if the book is the same but the quantity has changed
                    for book in books_in_request:
                        bookObject = get_object_or_404(all_books, pk=book['book'])
                        for book_in_ordering in ordering_set:
                            if bookObject.id == book_in_ordering.book_id:
                                if bookObject.quantity >= book['number'] - book_in_ordering.number:
                                    bookObject.quantity += book_in_ordering.number - book['number']
                                    bookObject.save()
                                    book_in_ordering.number = book['number']
                                    book_in_ordering.save()
                                else:
                                    raise Exception

                    serializer = OrderSerializer(order).data
                    return Response(serializer, status=status.HTTP_201_CREATED)
                else:
                    raise PermissionError
        except PermissionError:
            return Response('Permission denied', status=status.HTTP_403_FORBIDDEN)
        except Exception:
            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)
