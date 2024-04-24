from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Budget

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ("id", "value", "member", "created_at", "updated_at")

    def create(self, validated_data):
        if "value" in validated_data and validated_data["value"] > 0: 
            return super().create(validated_data)
        raise ValidationError({"value": ["0 보다 큰 수를 등록하세요."]})

    def update(self, instance, validated_data):
        if "value" in validated_data and validated_data["value"] > 0: 
            return super().update(instance, validated_data)
        raise ValidationError({"value": ["0 보다 큰 수를 등록하세요."]})
