import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUsPage from "./pages/ContactUsPage";
import ThankYouPage from "./pages/ThankYouPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<ContactUsPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;
