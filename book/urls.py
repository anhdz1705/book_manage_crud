from django.urls import path
from .views import BookListCreateAPIView, BookDetailAPIView

urlpatterns = [
    path('books/', BookListCreateAPIView.as_view()),
    path('books/<int:id>/', BookDetailAPIView.as_view()),
]