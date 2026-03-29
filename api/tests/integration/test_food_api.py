import json

import pytest


@pytest.mark.django_db
class TestFoodListAPI:
    _BASE_URL = "/api/v1/foods/"

    def test_response_status_ok(self, api_client):
        response = api_client.get(self._BASE_URL)
        assert response.status_code == 200

    def test_published_food_in_response(self, api_client, published_food, unpublished_food):
        response = api_client.get(self._BASE_URL)
        assert response.status_code == 200
        print(json.dumps(response.json(),ensure_ascii=False, indent=2))
        foods = response.json()[0]["foods"]
        assert len(foods)  >= 1
        assert foods[0]["internal_code"] == published_food.internal_code

    def test_unpublished_food_not_in_response(self, api_client,published_food, unpublished_food):
        response = api_client.get(self._BASE_URL)

        assert all(
            food["internal_code"] != unpublished_food.internal_code
            for category in response.json()
            for food in category["foods"]
        )
