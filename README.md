# Student-and-teacher-marks-management System

Project Overview

The Student-Teacher Management System is a web application designed to manage data for students and teachers. It enables teachers to log in, enter marks for students, and view aggregated data like top performers, averages, and students above or below average marks. It uses Node.js, Express.js, MongoDB, and Mongoose to provide secure authentication, authorization, and data management.

Features:

User Authentication: Secure registration and login for students and teachers using passport-local strategy.

Role-Based Access:
Teachers: Enter marks for students and view detailed analysis.

Students: Log in to check personalized details (future scope).
Marks Management:
Add marks for subjects.
Calculate total marks automatically.
View top-performing students.
View students above and below average marks.
Secure Password Storage: User passwords
Dynamic Aggregations: Aggregates data to calculate averages, sort students by total marks, and filter based on performance.
Technologies Used

Backend:

Node.js: Server-side JavaScript runtime.
Express.js: Web framework for routing and middleware.
Mongoose: ODM for MongoDB to define schemas and interact with the database.
MongoDB: NoSQL database for storing user and marks data.
Frontend:

EJS: Template engine for rendering dynamic HTML pages.
CSS: Styling for the frontend (with optional Bootstrap for responsiveness).
Security:

Passport.js: For user authentication.

Session Management:

Express-Session: Handles session storage.
Connect-Flash: Displays temporary success or error messages.
