import pytest
from rest_framework.test import APIClient

from app.tests.factories import FoodCategoryFactory, FoodFactory


@pytest.fixture
def api_client() -> APIClient:
    return APIClient()


@pytest.fixture
def category(db):
    return FoodCategoryFactory()


@pytest.fixture
def published_food(db, category):
    return FoodFactory(category=category, is_publish=True)


@pytest.fixture
def unpublished_food(db, category):
    return FoodFactory(category=category, is_publish=False)