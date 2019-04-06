from django.shortcuts import render
from django.http import HttpResponse
import hashlib
from shortlink.models import Code
from shortlink.serializers import CodeSerializer
from rest_framework import generics
import base64
from django.http import JsonResponse
import requests
from django.http import HttpResponsePermanentRedirect
from django.shortcuts import redirect


def index(request):
    return render(request, 'frontend/index.html')


def hashCode(longUrl, startIndex=0, endIndex=5):
    hashed = hashlib.sha224(bytes(longUrl, 'utf-8')).hexdigest()
    return hashed[startIndex: endIndex+1]


def recursiveInsert(longUrl, startIndex, endIndex):
    incrementSize = 6
    obj, created = Code.objects.get_or_create(
        code=hashCode(longUrl, startIndex, endIndex))
    if created:
        obj.longUrl = longUrl
        obj.save()
    if (not created) and longUrl != obj.longUrl:
        return recursiveInsert(longUrl, endIndex, endIndex + incrementSize)
    return obj


def correctUrl(url, timeout=2):
    try:
        req = requests.get(url, timeout=timeout)
    except:
        return "timeout"
    if req.status_code == 404:
        return False
    return True


def createUrl(request, str="default"):
    if request.method == 'GET':  # redirect to the url if exist
        try:
            obj = Code.objects.get(code=str)
            return HttpResponsePermanentRedirect(obj.longUrl)
        except:
            return redirect(index)
    if request.method == 'POST':
        flag = correctUrl(request.POST['longUrl'], 2)
        if not flag:
            return JsonResponse({"code": "None"})
        if flag == 'timeout':
            return JsonResponse({"code": "time"})
        obj = recursiveInsert(request.POST['longUrl'], 0, 5)
        return JsonResponse({"code": obj.code})


# class CodeListCreate(generics.ListCreateAPIView):
#     queryset = Code.objects.all()
#     serializer_class = CodeSerializer
