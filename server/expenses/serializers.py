from rest_framework import serializers
from .models import Expense, FixedExpense

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = "__all__"

    def create(self, validated_data):
        member = validated_data.pop('member', None)
        return Expense.objects.create(**validated_data, member_id=member)

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance

class FixedExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = FixedExpense
        fields = "__all__"

    def create(self, validated_data):
        member = validated_data.pop('member', None)
        return FixedExpense.objects.create(**validated_data, member_id=member)

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance