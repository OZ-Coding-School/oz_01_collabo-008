from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Budget
from members.models import Member
from members.views import get_member_id
from .serializers import BudgetSerializer
from django.db.models import Sum

class BudgetListView(APIView):
    serializer_class = BudgetSerializer

    def get(self, request):
        member_id = get_member_id(request=request)
        year = request.GET.get('year', None)
        month = request.GET.get('month', None)
        budgets = Budget.objects.filter(member_id=member_id)
        total_budget = Budget.objects.filter(member_id=member_id, created_at__year=year, created_at__month=month).aggregate(total=Sum('value'))
        serializer = BudgetSerializer(budgets, many=True)
        return Response(
            data={
                "status_code": 200,
                "message":"Success",
                "budget_list": serializer.data,
                "total_budget": total_budget['total']
            },
            status=status.HTTP_200_OK
        )

    def post(self, request):
        member_id = get_member_id(request=request)
        member = Member.objects.filter(pk=member_id).first()
        if member is None:
            return Response(
                data={
                    "status_code":404,
                    "message": "NotFound Member Data"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        request.data["member"] = member_id
        serializer = BudgetSerializer(data=request.data)
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
    serializer_class = BudgetSerializer

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
    
    def delete(self, request, budget_id):
        budget = Budget.objects.filter(pk=budget_id).first()
        if budget is None:
            return Response(
                data={
                    "status_code":404,
                    "message": "NotFound Budget Data"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        budget.delete()
        return Response(
            data={
                "status_code": 200,
                "message": "Success"
            },
            status=status.HTTP_200_OK
        )