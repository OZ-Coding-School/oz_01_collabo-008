from django.db import models
from members.models import Member

class Expense(models.Model):
    id = models.BigAutoField(primary_key=True)
    content = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    location = models.CharField(max_length=100)
    category_id = models.IntegerField(default=0)
    payment_id = models.IntegerField(default=0)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class FixedExpense(models.Model):
    id = models.BigAutoField(primary_key=True)
    price = models.IntegerField(default=0)
    category_id = models.IntegerField(default=0)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)