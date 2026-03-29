from django.contrib import admin

from utf_case.apps.food.models import Food, FoodCategory


class FoodInline(admin.TabularInline):
    model = Food
    extra = 1


@admin.register(FoodCategory)
class FoodCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name_ru", "order_id")
    search_fields = ("name_ru",)
    ordering = ("order_id",)
    inlines = [FoodInline]


@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ("id", "name_ru", "category", "cost", "is_publish")
    list_filter = ("category", "is_publish", "is_vegan", "is_special")
    search_fields = ("name_ru", "description_ru")
    ordering = ("code",)
    list_select_related = ("category",)
    readonly_fields = ("created", "modified")