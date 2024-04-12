from rest_framework import serializers
from .models import Budget

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'

    def create(self, validated_data):
        member = self.context["member"]
        validated_data["member"] = member
        return Budget.objects.create(**validated_data)