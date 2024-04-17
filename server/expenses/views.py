from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum

from members.models import Member
from members.views import get_member_id
from .models import (
    Expense, FixedExpense, Category, Payment
)
from .serializers import (
    ExpenseSerializer,
    FixedExpenseSerializer,
    CategorySerializer,
    CategorySumSerializer,
    PaymentSerializer
)


class FixedExpenseView(APIView):
    def get(self, request):
        member_id = get_member_id(request=request)
        fixed_expenses = FixedExpense.objects.filter(member_id=member_id)
        serializer = FixedExpenseSerializer(fixed_expenses, many=True)
        total_category_expenses = FixedExpense.objects.filter(member_id=member_id).values('category').annotate(total_price=Sum('price'))
        category_serializer = CategorySumSerializer(total_category_expenses, many=True)
        return Response(
            data={
                "status_code": 200,
                "message": "Success",
                "fixed_expenses_list": serializer.data,
                "fixed_expenses_per_list": category_serializer.data
            },
            status=status.HTTP_200_OK
        )

    def post(self, request):
        member_id = get_member_id(request=request)
        member = Member.objects.filter(pk=member_id).first()
        if member is None:
            return Response(
                data={
                    "status_code": 404,
                    "message": "NotFound Member Data"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        print(request.data)
        serializer = FixedExpenseSerializer(
            data=request.data,
            many=True,
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


class FixedExpenseDetailView(APIView):
    def put(self, request, fixed_expense_id):
        fixed_expense = FixedExpense.objects.filter(pk=fixed_expense_id).first()
        if fixed_expense is None:
            return Response(
                data={
                    "status_code": 404,
                    "message": "NotFound Fixed-Expense Data"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = FixedExpenseSerializer(fixed_expense, data=request.data, partial=True)
        if serializer.is_valid():
            fixed_expense = serializer.save()
            serializer = FixedExpenseSerializer(fixed_expense)
            return Response(
                data={
                    "status_code": 201,
                    "message": "Success",
                    "fixed_expense": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            data={
                "status_code": 400,
                "message": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUES
        )

    def delete(self, request, fixed_expense_id):
        fixed_expense = FixedExpense.objects.filter(pk=fixed_expense_id).first()
        if fixed_expense is None:
            return Response(
                data={
                    "status_code": 404,
                    "message": "NotFound Fixed-Expense Data"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        fixed_expense.delete()
        return Response(
            data={
                "result_code": 200,
                "result_message": "Success"
            },
            status=status.HTTP_200_OK
        )


class ExpenseListView(APIView):
    def get(self, request):
        member_id = get_member_id(request=request)
        year = request.GET.get('year', None)
        month = request.GET.get('month', None)
        if year is None or month is None:
            return Response(
                data={
                    "status_code": 400,
                    "message": "Year and month parameters are required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        expenses = Expense.objects.filter(member_id=member_id, date__year=year, date__month=month)
        serializer = ExpenseSerializer(expenses, many=True)
        total_expense = Expense.objects.filter(member_id=member_id, date__year=year, date__month=month).aggregate(total=Sum('price'))

        return Response(
            data={
                "status_code": 200,
                "message": "Success",
                "expenses_list": serializer.data,
                "total_expense": total_expense['total']
            },
            status=status.HTTP_200_OK
        )

    def post(self, request):
        member_id = get_member_id(request=request)
        member = Member.objects.filter(pk=member_id).first()
        if member is None:
            return Response(
                data={
                    "status_code": 404,
                    "message": "NotFound Member Data"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = ExpenseSerializer(
            data=request.data,
            many=True,
            context={"member": member}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                data={
                    "status_code": 201,
                    "message": "Success",
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


class ExpenseDetailView(APIView):
    def put(self, request, expense_id):
        expense = Expense.objects.filter(pk=expense_id).first()
        if expense is None:
            return Response(
                data={
                    "status_code": 404,
                    "message": "NotFound Expense Data"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = ExpenseSerializer(expense, data=request.data, partial=True)
        if serializer.is_valid():
            expense = serializer.save()
            serializer = FixedExpenseSerializer(expense)
            return Response(
                data={
                    "result_code": 201,
                    "result_message": "Success",
                    "fixed_expense": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, expense_id):
        expense = Expense.objects.filter(pk=expense_id).first()
        if expense is None:
            return Response(
                data={
                    "status_code": 404,
                    "message": "NotFound Expense Data"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        expense.delete()
        return Response(
            data={
                "result_code": 200,
                "result_message": "Success"
            },
            status=status.HTTP_200_OK
        )


class CategoryView(APIView):
    def get(self, request):
        category_list = Category.objects.all()
        serializer = CategorySerializer(category_list, many=True)
        return Response(
            data= {
                "status_code": 200,
                "message": "Success",
                "categories": serializer.data,
            }
        )


class PaymentView(APIView):
    def get(self, request):
        payment_list = Payment.objects.all()
        serializer = PaymentSerializer(payment_list, many=True)
        return Response(
            data= {
                "status_code": 200,
                "message": "Success",
                "payments": serializer.data,
            }
        )
