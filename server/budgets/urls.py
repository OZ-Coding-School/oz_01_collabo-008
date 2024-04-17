from django.urls import path
from .views import BudgetListView, BudgetDetailView

urlpatterns = [
    path('list', BudgetListView.as_view(), name='budgets'),
    path('detail/<int:budget_id>', BudgetDetailView.as_view(), name='budget_detail'),
]