
from django.contrib import admin
import debug_toolbar
from django.urls import path, include
from django.conf import settings
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('books.urls')),
    path('auth/', obtain_auth_token),
    path('__debug__/', include(debug_toolbar.urls)),
]
