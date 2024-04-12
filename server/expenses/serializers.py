from rest_framework import serializers
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
        member = self.context["member"]
        validated_data["member"] = member
        return FixedExpense.objects.create(**validated_data)


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ("id", "category", "payment", "location", "content", "price", "date", "created_at", "updated_at")

    def create(self, validated_data):
        member = self.context["member"]
        validated_data["member"] = member
        return Expense.objects.create(**validated_data)
