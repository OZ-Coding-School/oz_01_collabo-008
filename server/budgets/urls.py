from django.urls import path
from .views import BudgetView

urlpatterns = [
    path('api/v1/budgets/<int:member_id>/', BudgetView.as_view(), name='budgets'),
    path('api/v1/budgets/detail/<int:budget_id>/', BudgetView.as_view(), name='budget_detail'),
]