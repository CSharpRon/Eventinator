# Eventinator

## Description
This project includes the React front-end for an event website, Eventinator, where users can create and share special events. The privacy of these events can be set by event administrators to easily control who can see these events. <br>
Our goal is simple: Put Google Calendars to shame.

## Development Team
<ul>
 <li>Camilo Lozano</li>
 <li>Josue Martinez</li>
 <li>Ronald Marrero</li>
</ul>

## Build instructions
Clone the entire Eventinator folder to your local drive. Navigate to it in your command line tool of choice, and run the following:  "npm start" (<i>without the ""</i>) </br>
This only works if you have npm installed. If you do not already have it installed, you can download it <a href="https://nodejs.org">here</a>

## For backend:

Install python and pip
Install dependencies:

 $pip install Flask  flask-sqlalchemy 

Create database:

 $python
 
  >>> from views import db
  
  >>> db_create_all()

Run flask:
 
 $ export FLASK_APP=views.py
 
 $ export FLASK_DEBUG=1
 
 $ flask run
 
