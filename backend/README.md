# Backend

## Setup

1. Install dependencies:
    ```
    npm install
    ```
2. Run the server:
    ```
    npm start
    ```

3. The API will be running on `http://localhost:4000`.

## Endpoints

- **GET /api/get-info**: Returns the contact information.
- **POST /api/save-info**: Saves the form data to a file (src/db/ContactData.json).

## check local MongoDB
If using MongoDB installed locally:
## Requirements

- MongoDB

checking by:
```
mongo --version 
```

1. start MongoDB
    ```
    mongo
    ```
2. connect DB:
    ```
    use contactDB
    ```
3. show collections:
    ```
    show collections
    ```
4. query data:
    ```
    db.contacts.find().pretty()
    ```