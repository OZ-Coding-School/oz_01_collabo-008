from rest_framework import serializers


class ReportSerializer(serializers.Serializer):
    status_code = serializers.IntegerField()
    message = serializers.CharField()
    total_expenses_by_category = serializers.ListField()
    total_expenses_by_location = serializers.ListField()