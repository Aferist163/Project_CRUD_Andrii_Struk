import { useState, useEffect } from "react";
import { Player } from '@lottiefiles/react-lottie-player';
import loginAnimation from '../assets/lottie/login.json';
import { useOutletContext } from "react-router-dom";

export default function Login({ API_URL }) {
  const { setUsername } = useOutletContext();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("username");
    if (token && savedUser) {
      setLoggedIn(true);
      setLocalUsername(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername("Anonimus");
    setLoggedIn(false);
    alert("Logged out!");
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const url = isLogin ? `${API_URL}/login` : `${API_URL}/register`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Something went wrong");
      } else {
        if (isLogin) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", username);
          setUsername(username);
          setLoggedIn(true);
          alert("Logged in successfully!");
        } else {
          alert("Registered successfully! Please log in.");
          setIsLogin(true);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };


  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div className="MainDiv_login blur">
        <div className="loginCard blur">
          <h1 className='h1Login'>  {loggedIn ? username : (isLogin ? "Login" : "Register")}</h1>

          {!loggedIn && (
            <>
              <label htmlFor="login" className="Lableinput">Login</label>
              <input
                type="text"
                id="login"
                name="login"
                required
                className="InputLogin"
                placeholder="enter login"
                onChange={(e) => setLocalUsername(e.target.value)}
              />

              <label htmlFor="password" className="Lableinput">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="InputLogin"
                placeholder="enter password"
                onChange={(e) => setPassword(e.target.value)}
              />

              {!isLogin && (
                <>
                  <label htmlFor="confirmPassword" className="Lableinput">Confirm password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    className="InputLogin"
                    placeholder="enter password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </>
              )}

              <button className="LoginBtn" type="submit" onClick={handleSubmitLogin}>
                {isLogin ? "Login" : "Sign up"}
              </button>

              <button className="LoginRegiseterBtn" onClick={toggleMode}>
                {isLogin ? "Don’t have an account? Sign up" : "Already have an account? Log in"}
              </button>
            </>
          )}

          {loggedIn && (
            <p className="role">
              role: ({username === "Admin" ? "Admin" : "User"})
            </p>
          )}

          {loggedIn && (
            <button className="redbtn" onClick={handleLogout}>
              Logout
            </button>
          )}

        </div>
        <div className="emojiCard">
          <Player autoplay loop src={loginAnimation} className="login_anim" />
        </div>
      </div>
    </>
  );
}
