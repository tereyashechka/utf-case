import factory

from utf_case.apps.food.models import Food, FoodCategory


class FoodCategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = FoodCategory

    name_ru = factory.Sequence(lambda n: f'Категория {n}')
    order_id = factory.Sequence(lambda n: n * 10)


class FoodFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Food

    category = factory.SubFactory(FoodCategoryFactory)
    name_ru = factory.Sequence(lambda n: f'Блюдо {n}')
    code = factory.Sequence(lambda n: n)
    internal_code = factory.Sequence(lambda n: n + 1000)
    cost = factory.Faker('pydecimal', left_digits=4, right_digits=2, positive=True)
    is_publish = True
    is_vegan = False
    is_special = False