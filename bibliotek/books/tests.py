from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Order, Book
from django.contrib.auth import user_logged_in
from rest_framework.authtoken.views import Token

class TestUser(APITestCase):

    def setUp(self):
        self.superUser = User.objects.create_superuser(username="kill")
        self.superUserToken = Token.objects.create(user=self.superUser)
        self.normalUser = User.objects.create_user(username='user')
        self.normalUserToken = Token.objects.create(user=self.normalUser)

    def test_user_list_by_super_user(self):
        self.client.force_authenticate(user=self.superUser, token=self.superUserToken)
        url = reverse('books:users')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_list_by_normal_user(self):
        self.client.force_authenticate(user=self.normalUser, token=self.normalUserToken)
        url = reverse('books:users')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_list_by_anonymous_user(self):
        url = reverse('books:users')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_details_by_super_user(self):
        self.client.force_authenticate(user=self.superUser, token=self.superUserToken)
        id = self.normalUser.id
        url = reverse('books:user_details', args=[id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_details_by_user_himself(self):
        self.client.force_authenticate(user=self.normalUser, token=self.normalUserToken)
        id = self.normalUser.id
        url = reverse('books:user_details', args=[id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_details_by_other_normal_user(self):
        self.client.force_authenticate(user=self.normalUser, token=self.normalUserToken)
        id = self.superUser.id
        url = reverse('books:user_details', args=[id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_details_by_anonmymous_user(self):
        id = self.normalUser.id
        url = reverse('books:user_details', args=[id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_user_by_user_himself(self):
        self.client.force_authenticate(user=self.normalUser, token=self.normalUserToken)
        id = self.normalUser.id
        url = reverse('books:user_details', args=[id])
        data = {
            "username": "updatedUser",
            "password": "updatedPassword"
        }
        response = self.client.put(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user_by_other_user(self):
        self.client.force_authenticate(user=self.superUser, token=self.superUserToken)
        id = self.normalUser.id
        url = reverse('books:user_details', args=[id])
        data = {
            "username": "updatedUser",
            "password": "updatedPassword"
        }
        response = self.client.put(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_update_user_by_anonymous_user(self):
        id = self.normalUser.id
        url = reverse('books:user_details', args=[id])
        data = {
            "username": "updatedUser",
            "password": "updatedPassword"
        }
        response = self.client.put(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class TestBook(APITestCase):

    def setUp(self):
        self.superUser = User.objects.create_superuser(username="kill")
        self.superUserToken = Token.objects.create(user=self.superUser)
        self.normalUser = User.objects.create_user(username='user')
        self.normalUserToken = Token.objects.create(user=self.normalUser)
        self.book = Book.objects.create(
            title="title",
            author="author",
            genre="genre",
            height=45,
            description="description",
            publisher="publisher",
            quantity=23
        )

    def test_books_list(self):
        response = self.client.get(reverse('books:books'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_book_details(self):
        
        # self.client.force_authenticate(user=self.normalUser, token=self.normalUserToken)        
        Book.objects.create(
            title="title",
            author="author",
            genre="genre",
            height=45,
            description="description",
            publisher="publisher",
            quantity=23
        )
        url = reverse('books:book_details', args=[1])
        response = self.client.get(
            url
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_book_update_by_super_user(self):
        self.client.force_authenticate(user=self.superUser, token=self.superUserToken)
        id = self.book.id
        data = {
            "title": "title",
            "author": "author",
            "genre": "genre",
            "height": 45,
            "description": "description",
            "publisher": "publisher",
            "quantity": 2
        }
        url = reverse('books:book_details', args=[id])
        response = self.client.put(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_book_update_by_normal_user(self):
        self.client.force_authenticate(user=self.normalUser, token=self.normalUserToken)
        id = self.book.id
        data = {
            "title": "title",
            "author": "author",
            "genre": "genre",
            "height": 45,
            "description": "description",
            "publisher": "publisher",
            "quantity": 60
        }
        url = reverse('books:book_details', args=[id])
        response = self.client.put(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_book_update_by_anonymous_user(self):
        id = self.book.id
        data = {
            "title": "title",
            "author": "author",
            "genre": "genre",
            "height": 45,
            "description": "description",
            "publisher": "publisher",
            "quantity": 2
        }
        url = reverse('books:book_details', args=[id])
        response = self.client.put(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class TestOrder(APITestCase):

    def setUp(self):
        self.superUser = User.objects.create_superuser(username="kill")
        self.superUserToken = Token.objects.create(user=self.superUser)
        self.normalUser = User.objects.create_user(username='user')
        self.normalUserToken = Token.objects.create(user=self.normalUser)
        self.book = Book.objects.create(
            title="title",
            author="author",
            genre="genre",
            height=45,
            description="description",
            publisher="publisher",
            quantity=23
        )
        self.order = self.normalUser.order_set.create()
        self.order.books.add(self.book)

    def test_orders_list_by_anonymous_user(self):
        url = reverse('books:orders-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_orders_list_by_normal_user(self):
        self.client.force_authenticate(user=self.normalUser, token=self.normalUserToken)
        url = reverse('books:orders-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_orders_list_by_super_user(self):
        self.client.force_authenticate(user=self.superUser, token=self.superUserToken)
        url = reverse('books:orders-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_orders_own_list_by_normal_user(self):
        self.client.force_authenticate(user=self.normalUser, token=self.normalUserToken)
        url = reverse('books:orders-ownlist')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_orders_own_list_by_super_user(self):
        self.client.force_authenticate(user=self.superUser, token=self.superUserToken)
        url = reverse('books:orders-ownlist')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_orders_own_list_by_anonymous_user(self):
        url = reverse('books:orders-ownlist')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_order_by_normal_user(self):
        self.client.force_authenticate(user=self.normalUser, token=self.normalUserToken)
        data = {
            "books": [self.book.id]
        }
        url = reverse('books:orders-list')
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_order_by_super_user(self):
        self.client.force_authenticate(user=self.superUser, token=self.superUserToken)
        data = {
            "books": [self.book.id]
        }
        url = reverse('books:orders-list')
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_order_by_anonymous_user(self):
        data = {
            "books": [self.book.id]
        }
        url = reverse('books:orders-list')
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_order_when_quantity_is_0(self):
        book2 = Book.objects.create(
            title="title2",
            author="author2",
            genre="genre2",
            height=45,
            description="description2",
            publisher="publisher2",
            quantity=0
        )
        self.client.force_authenticate(user=self.normalUser, token=self.normalUserToken)
        data = {
            "books": [self.book.id, book2.id]
        }
        url = reverse('books:orders-list')
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_order_by_owner(self):
        self.client.force_authenticate(user=self.normalUser, token=self.normalUserToken)
        url = reverse('books:orders-detail', args=[self.order.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_order_by_other_normal_user(self):
        normalUser2 = User.objects.create_user(username='user2')
        normalUserToken2 = Token.objects.create(user=normalUser2)
        self.client.force_authenticate(user=normalUser2, token=normalUserToken2)
        url = reverse('books:orders-detail', args=[self.order.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_order_by_other_super_user(self):
        self.client.force_authenticate(user=self.superUser, token=self.superUserToken)
        url = reverse('books:orders-detail', args=[self.order.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_order_by_anonymous_user(self):
        url = reverse('books:orders-detail', args=[self.order.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_order_by_super_user(self):
        newBook = Book.objects.create(
            title="newtitle",
            author="newauthor",
            genre="newgenre",
            height=45,
            description="newdescription",
            publisher="newpublisher",
            quantity=23
        )
        self.client.force_authenticate(user=self.superUser, token=self.superUserToken)
        data = {
            "books": [newBook.id]
        }
        url = reverse('books:orders-detail', args=[self.order.id])
        response = self.client.put(url, data=data)
        self.assertEqual(response.status_code, url)