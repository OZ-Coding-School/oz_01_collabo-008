from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, Q, Value
from django.db.models.functions import Coalesce

from expenses.models import Category, Expense


class ReportsView(APIView):
    def get(self, request, member_id):
        year = request.GET.get("year", None)
        month = request.GET.get("month", None)

        if year is None or month is None:
            return Response(
                data={
                    "status_code": 400,
                    "message": "Year and month parameters are required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        category_expenses = Category.objects.annotate(
            total_price=Coalesce(
                Sum(
                    'expense__price',
                    filter=Q(
                        expense__member_id=member_id,
                        expense__date__year=year,
                        expense__date__month=month
                    )
                ),
                0
            )
        ).values('id', 'content', 'total_price')

        category_fixed_expenses = Category.objects.annotate(
            total_price=Coalesce(
                Sum(
                    'fixedexpense__price',
                    filter=Q(fixedexpense__member_id=member_id)
                ),
                Value(0)
            )
        ).values('id', 'content', 'total_price')

        location_expense = Expense.objects.filter(
            member_id=member_id,
            date__year=year,
            date__month=month
        ).values('location').annotate(total_price=Sum('price')).order_by('-total_price')

        category_total_expenses_list = []

        for expense, fixed_expense in zip(category_expenses, category_fixed_expenses):
            category_total_expenses = {}
            category_total_expenses["id"] = expense["id"]
            category_total_expenses["content"] = expense["content"]
            category_total_expenses["total_price"] = expense["total_price"] + fixed_expense["total_price"]
            category_total_expenses_list.append(category_total_expenses)

        return Response(
            data={
                "status_code": 200,
                "message": "Success",
                "total_expenses_by_category": category_total_expenses_list,
                "total_expenses_by_location": location_expense
            },
            status=status.HTTP_200_OK
        )
