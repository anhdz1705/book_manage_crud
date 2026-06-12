from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter

from .models import Book
from .serializers import BookSerializer


# class BookListCreateAPIView(APIView):
#     def get(self, request):
#         books = Book.objects.all()
#         serializer = BookSerializer(books, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     def post(self, request):
#         serializer = BookSerializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class BookDetailAPIView(APIView):
#     def get_object(self, id):
#         try:
#             return Book.objects.get(id=id)
#         except Book.DoesNotExist:
#             return None

#     def get(self, request, id):
#         book = self.get_object(id)

#         if book is None:
#             return Response(
#                 {"message": "Book not found"},
#                 status=status.HTTP_404_NOT_FOUND
#             )

#         serializer = BookSerializer(book)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     def put(self, request, id):
#         book = self.get_object(id)

#         if book is None:
#             return Response(
#                 {"message": "Book not found"},
#                 status=status.HTTP_404_NOT_FOUND
#             )

#         serializer = BookSerializer(book, data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, id):
#         book = self.get_object(id)

#         if book is None:
#             return Response(
#                 {"message": "Book not found"},
#                 status=status.HTTP_404_NOT_FOUND
#             )

#         book.delete()
#         return Response(
#             {"message": "Book deleted successfully"},
#             status=status.HTTP_200_OK
#         )

# class BookViewSet(ModelViewSet):
#     queryset = Book.objects.all().order_by('id')
#     serializer_class = BookSerializer
#     permission_classes = [IsAuthenticated]


from .paginations import BookPagination
from .filters import filter_books

class BookViewSet(ModelViewSet):
    serializer_class = BookSerializer
    pagination_class = BookPagination

    def get_queryset(self):
        queryset = Book.objects.all().order_by('id')
        return filter_books(queryset, self.request.query_params)