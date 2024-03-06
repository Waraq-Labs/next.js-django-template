from django.contrib.auth import authenticate, login
from knox.views import LoginView as KnoxLoginView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.status import HTTP_403_FORBIDDEN
from rest_framework.views import APIView


class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return super().post(request, format=format)
        else:
            return Response("Invalid username or password.", status=HTTP_403_FORBIDDEN)


class WhoAmI(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response(request.user.username)
        else:
            return Response(status=HTTP_403_FORBIDDEN)
