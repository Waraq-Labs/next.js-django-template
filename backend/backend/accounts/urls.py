from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt

from .views import LoginView, WhoAmI

urlpatterns = [
    path("auth/", include("knox.urls")),
    path("login/", csrf_exempt(LoginView.as_view()), name="login"),
    path("me/", WhoAmI.as_view(), name="whoami"),
]
