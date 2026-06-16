from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class AuthApiTests(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="tester",
            password="StrongPass123",
        )

    def test_user_can_login_and_logout(self):
        token_response = self.client.post(
            reverse("token_obtain_pair"),
            {"username": "tester", "password": "StrongPass123"},
            format="json",
        )

        self.assertEqual(token_response.status_code, status.HTTP_200_OK)
        self.assertIn("access", token_response.data)
        self.assertIn("refresh", token_response.data)

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {token_response.data['access']}"
        )
        logout_response = self.client.post(
            reverse("logout"),
            {"refresh": token_response.data["refresh"]},
            format="json",
        )

        self.assertEqual(logout_response.status_code, status.HTTP_200_OK)


class BookApiTests(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="tester",
            password="StrongPass123",
        )
        self.client.force_authenticate(user=self.user)

    def test_book_crud_flow(self):
        create_response = self.client.post(
            "/api/books/",
            {
                "title": "Clean Code",
                "author": "Robert C. Martin",
                "price": 100,
                "quantity": 5,
            },
            format="json",
        )

        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        book_id = create_response.data["id"]

        list_response = self.client.get("/api/books/")
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)
        self.assertEqual(list_response.data["count"], 1)
        self.assertEqual(list_response.data["page"], 1)
        self.assertEqual(list_response.data["results"][0]["title"], "Clean Code")

        update_response = self.client.put(
            f"/api/books/{book_id}/",
            {
                "title": "Clean Architecture",
                "author": "Robert C. Martin",
                "price": 120,
                "quantity": 4,
            },
            format="json",
        )

        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        self.assertEqual(update_response.data["title"], "Clean Architecture")

        delete_response = self.client.delete(f"/api/books/{book_id}/")
        self.assertEqual(delete_response.status_code, status.HTTP_204_NO_CONTENT)

    def test_book_api_requires_authentication(self):
        self.client.force_authenticate(user=None)

        response = self.client.get("/api/books/")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
