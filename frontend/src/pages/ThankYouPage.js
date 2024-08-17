import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="thank-you">
      <h1>Thank You!</h1>
      <p>Your message has been received. We will get back to you shortly.</p>
      <button onClick={handleGoHome}>Contact Page</button>
    </div>
  );
};

export default ThankYouPage;
