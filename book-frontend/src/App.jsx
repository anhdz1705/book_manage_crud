import { useCallback, useState } from "react";
import AppHeader from "./components/AppHeader";
import BookManager from "./components/BookManager";
import ConfirmDialog from "./components/ConfirmDialog";
import LoginForm from "./components/LoginForm";
import { login, logout } from "./services/authApi";
import { clearAuth, getStoredAuth, saveAuth } from "./services/tokenStorage";
import "./App.css";

function App() {
  const [auth, setAuth] = useState(getStoredAuth);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isAuthenticated = Boolean(auth.access);

  const handleLogin = async ({ username, password }) => {
    const response = await login({ username, password });
    const nextAuth = saveAuth({ ...response.data, username });
    setAuth(nextAuth);
  };

  const clearSession = useCallback(() => {
    clearAuth();
    setAuth(getStoredAuth());
  }, []);

  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);

    try {
      if (auth.refresh) {
        await logout(auth.refresh);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLogoutConfirmOpen(false);
      setIsLoggingOut(false);
      clearSession();
    }
  }, [auth.refresh, clearSession]);

  const requestLogout = () => {
    setIsLogoutConfirmOpen(true);
  };

  const cancelLogout = () => {
    if (!isLoggingOut) {
      setIsLogoutConfirmOpen(false);
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="container">
      <AppHeader username={auth.username} onLogout={requestLogout} />
      <BookManager onUnauthorized={clearSession} />

      {isLogoutConfirmOpen && (
        <ConfirmDialog
          title="Xác nhận đăng xuất"
          message="Bạn có chắc chắn muốn đăng xuất khỏi phiên làm việc hiện tại?"
          cancelLabel="Ở lại"
          confirmLabel="Logout"
          submittingLabel="Logging out..."
          isSubmitting={isLoggingOut}
          onCancel={cancelLogout}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
