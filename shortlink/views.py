from django.shortcuts import render
from django.http import HttpResponse
import hashlib
from shortlink.models import Code
from shortlink.serializers import CodeSerializer
from rest_framework import generics


def index(request):
    print(request)
    return render(request, 'shortlink/shortlink.html')


def hashCode(longUrl, startIndex=0, endIndex=5):
    hashed = hashlib.md5(longUrl).digest().encode(
        'base64').strip().replace('+', '-').replace('/', '_')

    return hashed[startIndex, endIndex+1]


def recursiveInsert(longUrl, startIndex, endIndex):
    incrementSize = 6
    obj, created = Code.objects.get_or_create(
        code=hashCode(longUrl, startIndex, endIndex))
    if (not created) and longUrl != obj.longUrl:
        return recursiveInsert(longUrl, endIndex, endIndex + incrementSize)
    return obj


def createUrl(request):
    if request.method == 'GET':
        code = request.GET.get('q')
        return HttpResponse(code)
    if request.method == 'POST':
        obj = recursiveInsert(request.POST['longUrl'], 0, 5)
        return HttpResponse('your new link is'+obj.code)


class CodeListCreate(generics.ListCreateAPIView):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer
