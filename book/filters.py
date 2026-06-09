def filter_books(queryset, params):
    title = params.get('title')
    author = params.get('author')
    price = params.get('price')
    min_price = params.get('min_price')
    max_price = params.get('max_price')
    quantity = params.get('quantity')
    min_quantity = params.get('min_quantity')
    max_quantity = params.get('max_quantity')

    if title:
        queryset = queryset.filter(title__icontains=title)

    if author:
        queryset = queryset.filter(author__icontains=author)

    if price:
        queryset = queryset.filter(price=price)

    if min_price:
        queryset = queryset.filter(price__gte=min_price)

    if max_price:
        queryset = queryset.filter(price__lte=max_price)

    if quantity:
        queryset = queryset.filter(quantity=quantity)

    if min_quantity:
        queryset = queryset.filter(quantity__gte=min_quantity)

    if max_quantity:
        queryset = queryset.filter(quantity__lte=max_quantity)

    return queryset