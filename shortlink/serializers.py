from rest_framework import serializers
from shortlink.models import Code


class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Code
        fields = '__all__'  # you can write specific in tuble ex: ('id','name)
