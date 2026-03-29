from django.db.models import Prefetch, Count, Q, QuerySet
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from utf_case.apps.food.serializers import FoodListSerializer
from utf_case.apps.food.models import Food, FoodCategory


class FoodListView(APIView):
    permission_classes = [AllowAny]  # menu is public information, for non-authenticated users

    def get_queryset(self) -> QuerySet[FoodCategory]:
        published_foods = (
            Food.objects
            .filter(is_publish=True)
            .order_by("code")
            .prefetch_related("additional")
        )

        return (
            FoodCategory.objects
            .prefetch_related(
                Prefetch("food", queryset=published_foods)
            )
            .annotate(
                published_count=Count("food", filter=Q(food__is_publish=True))  # dont show empty category
            )
            .filter(published_count__gt=0)
            .order_by("order_id")
        )

    def get(self, request: Request, *args, **kwargs) -> Response:
        queryset = self.get_queryset()
        serializer = FoodListSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)