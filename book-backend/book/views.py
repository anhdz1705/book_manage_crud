from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .filters import filter_books
from .models import Book
from .paginations import BookPagination
from .serializers import BookSerializer


class BookViewSet(ModelViewSet):
    serializer_class = BookSerializer
    pagination_class = BookPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Book.objects.all().order_by("id")
        return filter_books(queryset, self.request.query_params)
