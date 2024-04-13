from django.urls import path
from .views import BudgetView, BudgetDetailView

urlpatterns = [
    path('<int:member_id>', BudgetView.as_view(), name='budgets'),
    path('detail/<int:budget_id>', BudgetDetailView.as_view(), name='budget_detail'),
]