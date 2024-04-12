from django.urls import path
from .views import (
    FixedExpenseView,
    FixedExpenseDetailView,
    ExpenseView,
    ExpenseDetailView,
    CategoryView,
    PaymentView
)

urlpatterns = [
    path('categories', CategoryView.as_view(), name='category'),
    path('payments', PaymentView.as_view(), name='payment'),
    path('fix/<int:member_id>', FixedExpenseView.as_view(), name='fixed_expense'),
    path('fix/detail/<int:fixed_expense_id>', FixedExpenseDetailView.as_view(), name='fixed_expense_detail'),
    path('<int:member_id>', ExpenseView.as_view(), name='expense'),
    path('detail/<int:expense_id>', ExpenseDetailView.as_view(), name='expense_detail'),
]