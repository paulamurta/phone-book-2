# Phone Book App 2

The **Phone Book App** is a simple fullstack application that emulates a digital phone book. Built with **React.js**, **Node.js**, and **TypeScript**, this app allows you to manage a list of contacts in a user-friendly way.

## Features

- **JWT Authentication**: Secure login and logout.
- **Contact Management**: Add, list, filter, edit, and delete contacts.
- **Groups**: Associate contacts with groups, with support for creating, editing, listing, and deleting groups.
- **Favorites**: Mark contacts as favorites for quick access.
- **Birthdays**: Register contacts' birthdays and be notified with a gift icon on their special day.

## Dependencies

The application uses the following key dependencies:

- **Express**: For the backend.
- **Axios**: For HTTP requests.
- **Styled Components**: For component styling.
- **React Query**: For data state management.
- **React Hot Toast**: For displaying notifications.
- **Material UI**: For user interface components.
- **React-datepicker**: For date selection.

## Installation and Run

This application can be partially run with Docker Compose.

### Backend + Database



1. Clone this repository and navigate to the backend directory

2. ***EXCEPTION: NOTE FOR WINDOWS USERS***

If you encounter issues with the entrypoint.sh file, follow these steps:

Navigate to the /backend/scripts directory and run the following command:
```
dos2unix entrypoint.sh
```
This will convert the entrypoint.sh file to a Unix-compatible format. After completing this step, proceed with the standard instructions.

3. Run Docker Compose
```
docker compose up --build
```
3. Access the Swagger UI page to test the API: http://localhost:3009/api-docs/

### Frontend
   
1. Navigate to the frontend directory
```
npm install
```
Frontend runs at port 3001. For frontend:
```
npm run start
```
The frontend will be available at http://localhost:3001.

Please note that there will be a already setup user for login:

{
  "email": "johnsnow@email.com",
  "password": "iknownothing"
}

Enjoy it! If you like it, let me know! :slight_smile:
