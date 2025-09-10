import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp, logIn, changePassword } from "../../firebase.js";
import FormInputBox from "../components/FormInputBox";

const Auth=()=> {
  // Checks current form state 
  const [visibleForm, setVisibleForm] = useState("signUp"); 

  const navigate = useNavigate();

  // Brings page to dashboard page once user logs in
  function redirectToDashboard() {
    navigate('/');
  }

  return (
    <section className="mx-3 lg:mx-32 mt-28 flex align-items-center justify-center">
      {/* SIGN UP FORM */}
      {visibleForm === "signUp" && (
        <form id="signUpForm" className="w-full" onSubmit={(e) => { e.preventDefault(); signUp(); redirectToDashboard();}}>
          <h2 className="text-orange text-4xl font-bold">Sign Up</h2>
          <FormInputBox id="signUpUsername" inputType="text" inputTitle="Username" />
          <FormInputBox id="signUpEmail" inputType="text" inputTitle="Email" />
          <FormInputBox id="signUpPassword" inputType="password" inputBoxClass="signUpPassword" inputTitle="Password" />
          <div className="text-right">
            <button type="button" className="showForgotPassword underline text-turqoise my-3" onClick={() => setVisibleForm("forgotPassword")}>
              Forgot Password
            </button>
          </div>
          <button id="signUpButton" type="submit" className="w-full bg-orange my-white py-3 rounded-xl font-bold text-lg text-white">Sign up</button>
          <div className="flex justify-center items-center mt-4">
            <span className="text-2s font-normal text-white">Already have an account? </span>
            <button type="button" className="showLogIn underline ml-2 text-turqoise" onClick={() => setVisibleForm("logIn")}>
              Log in.
            </button>
          </div>
        </form>
      )}

      {/* LOGIN FORM */}
      {visibleForm === "logIn" && (
        <form id="loginForm" className="w-full" onSubmit={(e) => { e.preventDefault(); logIn(); redirectToDashboard();}}>
          <h2 className="text-orange text-4xl font-bold">Log In</h2>
          <FormInputBox id="logInEmail" inputType="text" inputTitle="Email"/>
          <FormInputBox id="logInPassword" inputType="password" inputTitle="Password" />
          <div className="text-right mt-2">
            <button type="button" className="showForgotPassword underline text-turqoise my-3" onClick={() => setVisibleForm("forgotPassword")}>
              Forgot Password
            </button>
          </div>
          <button id="logInButton" type="submit" className="w-full bg-orange my-white py-3 rounded-xl font-bold text-lg text-white">Log in</button>
          <div className="flex justify-center items-center mt-4">
            <span className="text-2s font-normal text-white">Don't have an account? </span>
            <button type="button" className="showSignUp underline ml-2 text-turqoise" onClick={() => setVisibleForm("signUp")}>
              Sign up
            </button>
          </div>
        </form>
      )}

      {/* FORGOT PASSWORD FORM */}
      {visibleForm === "forgotPassword" && (
        <form id="forgotPasswordForm" className="w-full" onSubmit={(e) => { e.preventDefault(); changePassword(); }}>
          <h2 className="text-orange text-4xl font-bold">Reset Password</h2>
          <FormInputBox id="forgotPasswordEmail" inputType="text" inputTitle="Email" />

          <button id="forgotPasswordButton" type="submit" className="w-full mt-12 bg-orange my-white py-3 rounded-xl font-bold text-lg text-white">Reset Password</button>

          <div className="flex justify-center items-center mt-4">
            <span className="text-2s font-normal text-white">Back to </span>
            <button type="button" className="showLogIn underline ml-2 text-turqoise" onClick={() => setVisibleForm("logIn")}>
              Log in
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default Auth;