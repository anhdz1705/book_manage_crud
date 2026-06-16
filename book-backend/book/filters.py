BOOK_FILTERS = {
    "title": "title__icontains",
    "author": "author__icontains",
    "price": "price",
    "min_price": "price__gte",
    "max_price": "price__lte",
    "quantity": "quantity",
    "min_quantity": "quantity__gte",
    "max_quantity": "quantity__lte",
}


def filter_books(queryset, params):
    for param_name, lookup in BOOK_FILTERS.items():
        value = params.get(param_name)

        if value not in (None, ""):
            queryset = queryset.filter(**{lookup: value})

    return queryset
