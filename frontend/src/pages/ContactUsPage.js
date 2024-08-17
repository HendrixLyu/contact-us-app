import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ContactUsPage.css";

const BASE_URL = "http://localhost:4000";

const ContactUsPage = () => {
  const [content, setContent] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/get-info`)
      .then(response => {
        setContent(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/api/save-info`, formData)
      .then(() => {
        navigate("/thank-you");
        console.log("Contact Info. saved!");
      })
      .catch(error => {
        error.response.status === 400
          ? setErrorMessage("Email or phone number already submitted.")
          : console.error("There was an error submitting the form!", error);
      });
  };

  return (
    <div className="contact-us-container">
      <h1>{content.header}</h1>
      <div className="contact-details">
        <div className="contact-info">
          <p>{content.body}</p>
          <p>Here are the different ways you can contact us</p>
          <h3>
            <strong>Contact Us Details</strong>
          </h3>
          <p>Phone: {content.phone}</p>
          <p>Email: {content.email}</p>
          <h3>
            <strong>Postal Address:</strong>
          </h3>
          <p>{content.address}</p>
          <h3>
            <strong>Contact center hours of operation</strong>
          </h3>
          <p>{content.hours}</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <p>
            Fill in your details and we'll be in touch right away. Or if you
            prefer, call us on {content.phone}
          </p>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone number"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="What do you want to speak to us about"
          ></textarea>
          <button type="submit">Send Message</button>
          <p>
            By sending a message you agree to the{" "}
            <a href="/">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="/">
              Privacy Policy.
            </a>
          </p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
