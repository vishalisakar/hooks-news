import React from "react";
import FirebaseContext from "./../../firebase/context";
// import firebase from "./../../firebase/index";

function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext);
  const [resetPassword, setResetPassword] = React.useState("");
  const [isPasswordReset, setIsPasswprdReset] = React.useState(false);
  const [passwordResetError, setPasswordResetError] = React.useState(null);
  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPassword);
      setIsPasswprdReset(true);
      setPasswordResetError(null);
    } catch (err) {
      console.error("Error sending email", err);
      setPasswordResetError(err.message);
      setIsPasswprdReset(false);
    }
  }

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="provide your account email"
        onChange={event => setResetPassword(event.target.value)}
      />
      <div>
        <button className="button" onClick={handleResetPassword}>Reset Password</button>
      </div>
      {isPasswordReset && <p>Check email to reset password</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  );
}

export default ForgotPassword;
