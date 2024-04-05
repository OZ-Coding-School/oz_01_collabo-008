from django.urls import path
from .views import ExpensesView, FixedExpensesView

urlpatterns = [
    path('<int:member>', ExpensesView.as_view(), name='expenses'),
    path('<int:member>/<int:expense_id>', ExpensesView.as_view(), name='expenses_put'),
    path('fix/<int:member>', FixedExpensesView.as_view(), name='fixed_expenses'),
    path('fix/<int:member>/<int:fixed_expense_id>', FixedExpensesView.as_view(), name='fixed_expenses_put'),
]