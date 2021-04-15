from django.contrib import admin
from .models import Book, Order
from django.urls import reverse
from django.contrib.contenttypes.models import ContentType

# Register your models here.
# class AdminUrlMixin(object):

#     def get_admin_url(self, obj):
#         content_type = ContentType.objects.get_for_model(obj.__class__)
#         return reverse(f"admin:books_{content_type.model}_change", args=(obj.id,))

@admin.register(Book)
class BookModel(admin.ModelAdmin):
    list_filter = ('genre', 'quantity')
    list_display = ('title', 'author', 'quantity')
    search_fields = ['title', 'author', 'genre']


class OrderInline(admin.TabularInline):
    model = Order.books.through
    extra = 0



@admin.register(Order)
class OrderModel(admin.ModelAdmin):
    inlines = [OrderInline, ]