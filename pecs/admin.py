from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

# Register your models here.

class TagAdmin(admin.ModelAdmin):
    list_display = ("category", )

class ImageAdmin(admin.ModelAdmin):
    list_display = ("description", "tag")

class FavoriteAdmin(admin.ModelAdmin):
    list_display = ("user", )
    filter_horizontal = ("pecs", )

admin.site.register(User, UserAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Image, ImageAdmin)
admin.site.register(Favorite, FavoriteAdmin)