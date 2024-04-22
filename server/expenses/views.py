from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
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
    serializer_class = FixedExpenseSerializer

    def get(self, request):
        member_id = get_member_id(request=request)
        fixed_expenses = FixedExpense.objects.filter(member_id=member_id)
        serializer = self.serializer_class(fixed_expenses, many=True)
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
        serializer = self.serializer_class(
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
    serializer_class = FixedExpenseSerializer

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
        serializer = self.serializer_class(fixed_expense, data=request.data, partial=True)
        if serializer.is_valid():
            fixed_expense = serializer.save()
            serializer = self.serializer_class(fixed_expense)
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
    serializer_class = ExpenseSerializer

    # Swagger-ui 테스트 시 query parameter 설정할 수 있는 ui 표시
    @extend_schema(
        parameters=[
            OpenApiParameter(name='year', description='지출한 연도', required=False, type=OpenApiTypes.STR),
            OpenApiParameter(name='month', description='지출한 달', required=False, type=OpenApiTypes.STR)
        ]
    )
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
        serializer = self.serializer_class(expenses, many=True)
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
        serializer = self.serializer_class(
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
    serializer_class = ExpenseSerializer

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
        serializer = self.serializer_class(expense, data=request.data, partial=True)
        if serializer.is_valid():
            expense = serializer.save()
            serializer = self.serializer_class(expense)
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
                "status_code": 200,
                "message": "Success"
            },
            status=status.HTTP_200_OK
        )


class CategoryView(APIView):
    serializer_class = CategorySerializer

    def get(self, request):
        category_list = Category.objects.all()
        serializer = self.serializer_class(category_list, many=True)
        return Response(
            data= {
                "status_code": 200,
                "message": "Success",
                "categories": serializer.data,
            }
        )


class PaymentView(APIView):
    serializer_class = PaymentSerializer

    def get(self, request):
        payment_list = Payment.objects.all()
        serializer = self.serializer_class(payment_list, many=True)
        return Response(
            data= {
                "status_code": 200,
                "message": "Success",
                "payments": serializer.data,
            }
        )
