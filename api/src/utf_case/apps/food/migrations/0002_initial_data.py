from django.db import migrations


def create_initial_data(apps, schema_editor):
    FoodCategory = apps.get_model('food', 'FoodCategory')
    Food = apps.get_model('food', 'Food')

    drinks = FoodCategory.objects.create(
        name_ru='Напитки',
        name_en='Drinks',
        order_id=10,
    )
    bakery = FoodCategory.objects.create(
        name_ru='Выпечка',
        name_en='Bakery',
        order_id=20,
    )
    salads = FoodCategory.objects.create(
        name_ru='Салаты',
        name_en='Salads',
        order_id=30,
    )

    tea = Food.objects.create(
        category=drinks,
        name_ru='Чай',
        description_ru='Чай 100 гр',
        code=1,
        internal_code=100,
        cost='123.00',
        is_publish=True,
        is_vegan=True,
    )
    cola = Food.objects.create(
        category=drinks,
        name_ru='Кола',
        description_ru='Кола 0.5л',
        code=2,
        internal_code=200,
        cost='150.00',
        is_publish=True,
    )
    Food.objects.create(
        category=drinks,
        name_ru='Спрайт',
        description_ru='Спрайт 0.5л',
        code=3,
        internal_code=300,
        cost='150.00',
        is_publish=True,
    )
    Food.objects.create(
        category=drinks,
        name_ru='Байкал',
        description_ru='Байкал 0.5л',
        code=4,
        internal_code=400,
        cost='130.00',
        is_publish=False,
    )

    tea.additional.add(cola)

    Food.objects.create(
        category=bakery,
        name_ru='Круассан',
        description_ru='Круассан с маслом',
        code=5,
        internal_code=500,
        cost='180.00',
        is_publish=True,
        is_special=True,
    )
    Food.objects.create(
        category=bakery,
        name_ru='Чизкейк',
        description_ru='Чизкейк Нью-Йорк',
        code=6,
        internal_code=600,
        cost='320.00',
        is_publish=True,
    )

    Food.objects.create(
        category=salads,
        name_ru='Цезарь',
        description_ru='Салат Цезарь с курицей',
        code=7,
        internal_code=700,
        cost='450.00',
        is_publish=True,
        is_special=True,
    )
    Food.objects.create(
        category=salads,
        name_ru='Греческий',
        description_ru='Греческий салат',
        code=8,
        internal_code=800,
        cost='380.00',
        is_publish=True,
        is_vegan=True,
    )


def delete_initial_data(apps, schema_editor):
    FoodCategory = apps.get_model('food', 'FoodCategory')
    FoodCategory.objects.filter(name_ru__in=['Напитки', 'Выпечка', 'Салаты']).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_data, delete_initial_data),
    ]