import os
from flask import Flask, url_for, redirect, render_template, request, json, session, flash, jsonify
from functools import wraps
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

class User(db.Model):
    
    UserID = db.Column(db.Integer, primary_key=True)
    RoleID = db.Column(db.Integer,nullable=False)
    
    Username = db.Column(db.String(50), unique=True, nullable=False)
    Password = db.Column(db.String(256), nullable=False)

    def __init__ (self, username, password, role=0):
        self.Username = username
        self.Password = generate_password_hash(password)
        self.RoleID = role

    def check_password(self, password):
        return check_password_hash(self.Password, password)

    def __repr__(self):
        return '<User %r>' % self.Username

class Rso(db.Model):

    RsoID = db.Column(db.Integer, primary_key=True)
    RsoName = db.Column(db.String(256), unique=True, nullable=False)

    def __init__(self, name):
        self.RsoName = name

@app.route('/register',methods=['GET','POST'])
def register():

    data = request.get_json(force=True)

    username= data.get('username')
    password= data.get('password')

    print(data)

    if request.method == 'POST':

        check_username = User.query.filter_by(Username=username).first()

        if check_username is None:

            new_user = User(username, password)

            db.session.add(new_user)
            db.session.commit()

            session['logged_in_user'] = new_user.UserID
            flash('Sucessfull!')

            res = {'res' : 'Registration Successful!'}

            return (json.dumps(res),200)
        
        else:
            res = {'res':'Error User Already Exists!'}
            return (json.dumps(res),200)
            


        return ('Unknown Error, Blame Ronald', 204)






