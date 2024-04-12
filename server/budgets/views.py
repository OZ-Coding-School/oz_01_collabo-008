from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone

from .models import Budget
from members.models import Member
from .serializers import BudgetSerializer

class BudgetView(APIView):
    def get(self, request, member_id):
        budgets = Budget.objects.filter(member_id=member_id)

        serializer = BudgetSerializer(budgets, many=True)
        return Response(
            data={
                "status_code": 200,
                "message":"Success",
                "budget_list": serializer.data
            },
            status=status.HTTP_200_OK
        )

    def post(self, request, member_id):
        member = Member.objects.filter(pk=member_id).first()
        if member is None:
            return Response(
                data={
                    "status_code":404,
                    "message": "NotFound Member Data"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = BudgetSerializer(
            data=request.data,
            context={"member": member}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                data={
                    "status_code": 201,
                    "message": "Success"
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            data={
                "status_code": 400,
                "message": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

class BudgetDetailView(APIView):
    def put(self, request, budget_id):
        budget = Budget.objects.filter(pk=budget_id).first()
        if budget is None:
            return Response(
                data={
                    "status_code":404,
                    "message": "NotFound Budget Data"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = BudgetSerializer(budget, data=request.data, partial=True)
        if serializer.is_valid():
            budget = serializer.save()
            serializer = BudgetSerializer(budget)
            return Response(
                data={
                    "status_code": 201,
                    "message": "Success",
                    "budget": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            data={
                "status_code": 400,
                "message": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )