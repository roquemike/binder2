from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("about", views.about, name="about"),
    path("pecs", views.pecs, name="pecs"),
    path("fave", views.fave, name="fave"),
    path("upload", views.upload, name="upload"),
    path("edit", views.edit, name="edit"),
    path("print_pecs", views.print_pecs, name="print_pecs"),
    path("convert", views.convert, name="convert"),
    
    
    path("login/", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)