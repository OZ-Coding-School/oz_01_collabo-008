from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Expense, FixedExpense, Category, Payment


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class CategorySumSerializer(serializers.Serializer):
    category = serializers.IntegerField()
    total_price = serializers.IntegerField()


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"


class FixedExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = FixedExpense
        fields = ("id", "category", "price", "created_at", "updated_at")

    def create(self, validated_data):
        if "price" in validated_data and validated_data["price"] > 0: 
            member = self.context["member"]
            validated_data["member"] = member
            return FixedExpense.objects.create(**validated_data)
        raise ValidationError({"price": ["0 보다 큰 수를 등록하세요."]})
    
    def update(self, instance, validated_data):
        if "price" in validated_data and validated_data["price"] > 0: 
            return super().update(instance, validated_data)
        raise ValidationError({"price": ["0 보다 큰 수를 등록하세요."]})


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ("id", "category", "payment", "location", "content", "price", "date", "created_at", "updated_at")

    def create(self, validated_data):
        if "price" in validated_data and validated_data["price"] > 0: 
            member = self.context["member"]
            validated_data["member"] = member
            return Expense.objects.create(**validated_data)
        raise ValidationError({"price": ["0 보다 큰 수를 등록하세요."]})

    def update(self, instance, validated_data):
        if "price" in validated_data and validated_data["price"] > 0: 
            return super().update(instance, validated_data)
        raise ValidationError({"price": ["0 보다 큰 수를 등록하세요."]})
