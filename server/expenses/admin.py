from django.contrib import admin
from .models import Category, Payment, FixedExpense, Expense


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "content", )

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("id", "type", )

@admin.register(FixedExpense)
class FixedExpenseAdmin(admin.ModelAdmin):
    list_display = ("id", "member", "category", "price", "created_at", "updated_at", )


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ("id", "member", "category", "payment", "location", "content", "price", "date", "created_at", "updated_at", )