from django.http import HttpResponseNotAllowed
from django.views.generic import View
from django.contrib.auth import authenticate, login
from django.http.response import HttpResponse, HttpResponseForbidden


class LoginView(View):
    def post(self, request):
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse()
        else:
            return HttpResponseForbidden(b"Invalid username or password.")

class WhoAmI(View):
    def get(self, request):
        if request.user.is_authenticated:
            return HttpResponse(request.user.username)
        else:
            return HttpResponseForbidden()
