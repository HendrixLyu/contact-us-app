import fs from "fs";
import path from "path";
import Contact from "../models/contactModel.js";

// Get the directory name from import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(__dirname, "..", "db", "ContactData.json");

// Get contact info (static content)
const getContactInfo = (req, res) => {
  const content = {
    header: "Contact us, we love to hear from you",
    body: "Welcome to OpenAgent. We've been around since 2013, and our vision is to make it easy for people to buy, sell and own property.",
    phone: "13 24 34",
    email: "support@openagent.com.au",
    address: "PO Box 419, Alexandria NSW 1435",
    hours: "Monday - Friday 8:30 - 5:00",
  };
  res.json(content);
};

// Save form data to MongoDB and file system
const saveFormData = async (req, res) => {
  const formData = req.body;

  try {
    // Check if email or phone number already exists in MongoDB
    const existingContact = await Contact.findOne({
      $or: [{ email: formData.email }, { phoneNumber: formData.phoneNumber }]
    });

    if (existingContact) {
      return res.status(400).send("Email or phone number already exists.");
    }

    // Save form data to MongoDB
    const newContact = new Contact(formData);
    await newContact.save();

    // Read the existing data from the file system
    fs.readFile(filePath, (err, data) => {
      let fileData = [];
      if (!err && data.length) {
        fileData = JSON.parse(data);
      }

      // Check if the data already exists in the file
      const existingInFile = fileData.some(
        item =>
          item.email === formData.email ||
          item.phoneNumber === formData.phoneNumber
      );

      if (existingInFile) {
        return res.status(400).send("Email or phone number already exists in the file.");
      }

      // Append new data and save to the file system
      fileData.push(formData);
      fs.writeFile(filePath, JSON.stringify(fileData, null, 2), err => {
        if (err) {
          return res.status(500).send("Error saving form data to file");
        }
        res.status(200).send("Form data saved successfully");
      });
    });
  } catch (error) {
    res.status(500).send("Error saving form data");
  }
};

export { getContactInfo, saveFormData };
