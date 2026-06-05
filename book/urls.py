from django.urls import path
# from .views import BookListCreateAPIView, BookDetailAPIView

from rest_framework.routers import DefaultRouter
from .views import BookViewSet

# urlpatterns = [
#     path('books/', BookListCreateAPIView.as_view()),
#     path('books/<int:id>/', BookDetailAPIView.as_view()),
# ]

router = DefaultRouter()
router.register('books', BookViewSet, basename='books')

urlpatterns = router.urls
