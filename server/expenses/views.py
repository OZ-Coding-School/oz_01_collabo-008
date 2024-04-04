from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Expense, FixedExpense
from .serializers import ExpenseSerializer, FixedExpenseSerializer

class ExpensesView(APIView):
    def get(self, request, member):
        year = request.GET.get('year', None)
        month = request.GET.get('month', None)
        expenses_list = Expense.objects.filter(member=member, date__year=year, date__month=month)
        serializer = ExpenseSerializer(expenses_list, many=True)
        return Response(serializer.data)

    def post(self, request, member):
        request_data = request.data.copy()
        request_data['member'] = member

        serializer = ExpenseSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save(member=member)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def put(self, request, member, expense_id):
        request_data = request.data.copy()
        request_data['member'] = member

        try:
            expense = Expense.objects.get(id=expense_id, member=member)
        except Expense.DoesNotExist:
            return Response({'error': 'Expense not found.'}, status=404)

        serializer = ExpenseSerializer(expense, data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, member, expense_id):
        try:
            expense = Expense.objects.get(id=expense_id, member=member)
        except Expense.DoesNotExist:
            return Response({'error': 'Expense not found.'}, status=404)

        expense.delete()
        return Response({'message': 'Expense deleted successfully.'}, status=204)

class FixedExpensesView(APIView):
    def get(self, request, member):
        fixed_expenses_list = FixedExpense.objects.filter(member=member)
        serializer = FixedExpenseSerializer(fixed_expenses_list, many=True)
        return Response(serializer.data)

    def post(self, request, member):
        request_data = request.data.copy()
        request_data['member'] = member

        serializer = FixedExpenseSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save(member=member)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def put(self, request, member, fixed_expense_id):
        request_data = request.data.copy()
        request_data['member'] = member

        try:
            fixed_expense = FixedExpense.objects.get(id=fixed_expense_id, member=member)
        except FixedExpense.DoesNotExist:
            return Response({'error': 'Fixed Expense not found.'}, status=404)

        serializer = FixedExpenseSerializer(fixed_expense, data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, member, fixed_expense_id):
        try:
            fixed_expense = FixedExpense.objects.get(id=fixed_expense_id, member=member)
        except FixedExpense.DoesNotExist:
            return Response({'error': 'Fixed Expense not found.'}, status=404)

        fixed_expense.delete()
        return Response({'message': 'Fixed Expense deleted successfully.'}, status=204)