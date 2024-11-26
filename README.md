# LOAN APPLICATION 
is a web application that allows users to manage loan requests. This application provides functionalities for creating, approving, and rejecting loan requests. It also displays the user's balance and transaction history.

Prerequisites
Node.js
Docker
Docker Compose

Clone the Repository
First, clone the repository to your local machine:

git clone https://github.com/Wuttiwat2001/LOAN-APPLICATION.git

Install Dependencies
Install the necessary dependencies using npm: 

npm install

Clone the API Service
To connect the application to the backend service, clone the API service repository:

git clone https://github.com/Wuttiwat2001/LOAN-API-SERVICE.git

Run the API Service with Docker Compose
Navigate to the LOAN-API-SERVICE directory and run the following command to start the API service using Docker Compose:

docker-compose up -d

Run the Application with Docker Compose
After running the backend service, navigate back to the LOAN-APPLICATION directory and run the following command to start the frontend application using Docker Compose:

docker-compose up -d
