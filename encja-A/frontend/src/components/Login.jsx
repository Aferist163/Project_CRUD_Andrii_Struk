import { useState } from "react";
import { Player } from '@lottiefiles/react-lottie-player';
import loginAnimation from '../assets/lottie/login.json';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div className="MainDiv_login blur">
        <div className="emojiCard">
          <Player autoplay loop src={loginAnimation} style={{ height: '520px', width: '520px', marginTop: '100px' }} />
        </div>
        <div className="loginCard blur">
          <h1 className='h1Login'>{isLogin ? "Login" : "Register"}</h1>

          <label htmlFor="login" className="Lableinput"> Login </label>
          <input type="text" id="login" name="login" required className="InputLogin" placeholder="enter login" />

          <label htmlFor="password" className="Lableinput"> Password </label>
          <input type="password" id="password" name="password" required className="InputLogin" placeholder="enter password" />

          {!isLogin && (
            <>
              <label htmlFor="confirmPassword" className="Lableinput"> Confirm password </label>
              <input type="password" id="confirmPassword" name="confirmPassword" required className="InputLogin" placeholder="enter password" />
            </>
          )}

          <button className="LoginBtn" type="submit">
             {isLogin ? "Login" : "Sign up"}
          </button>

          <button className="LoginRegiseterBtn" onClick={toggleMode}>
            {isLogin ? "Don’t have an account? Sign up" : "Already have an account? Log in"}
          </button>

        </div>
      </div>
    </>
  );
}
