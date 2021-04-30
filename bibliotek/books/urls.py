from django.urls import path, include
from .views import UserList, UserCreate, UserDetail, UserCreate, OrderList, OrderDetails, BookList, BookDetails
from rest_framework.routers import DefaultRouter

app_name = 'books'

# router = DefaultRouter()
# router.register('orders', OrderViewSet, basename='orders')

urlpatterns = [
    # path('api/', include(router.urls)),
    path('api/books/', BookList.as_view(), name='books'),
    path('api/books/<int:pk>/', BookDetails.as_view(), name='book_details'),
    path('api/users/', UserList.as_view(), name='users'),
    path('api/users/create', UserCreate.as_view(), name='user_create'),
    path('api/users/<int:pk>/', UserDetail.as_view(), name='user_details'),
    path('api/orders/', OrderList.as_view(), name='orders'),
    path('api/orders/<int:pk>/', OrderDetails.as_view(), name='order_details'),
]