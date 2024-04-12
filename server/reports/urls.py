from django.urls import path
from .views import ReportsView

urlpatterns = [
    path('<int:member_id>', ReportsView.as_view(), name='reports')
]