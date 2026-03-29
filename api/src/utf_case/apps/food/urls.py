from django.urls import path, include

from utf_case.apps.food.views import FoodListView


urlpatterns = [
    path("foods/", FoodListView.as_view()),
]