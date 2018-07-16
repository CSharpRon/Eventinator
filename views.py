import os
from flask import Flask, url_for, redirect, render_template, request, json, session, flash, jsonify
from functools import wraps
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash


app = Flask(__name__)
CORS(app)
app.config.from_object('config')
db = SQLAlchemy(app)

class User(db.Model):
    
    userid = db.Column(db.Integer, primary_key=True)
    roleid = db.Column(db.Integer,nullable=False)
    
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)

    inrso = db.relationship('User_in_rso', backref='User', lazy=True)
    events = db.relationship('Events', backref='User', lazy=True)
    attendee= db.relationship('Event_attendees', backref='User', lazy=True)

    def __init__ (self, username, password, role=0):
        self.username = username
        self.password = generate_password_hash(password)
        self.roleid = role

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return '<User %r>' % self.username

class Rso(db.Model):

    rsoid = db.Column(db.Integer, primary_key=True)
    rsoname = db.Column(db.String(256), unique=True, nullable=False)

    withuser = db.relationship('User_in_rso', backref='Rso',lazy=True)

    def __init__(self, name):
        self.rsoname = name

class User_in_rso(db.Model):

    userrsoid = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey('user.userid'), nullable=False)
    rsoid = db.Column(db.Integer, db.ForeignKey('rso.rsoid'),nullable=False)

    def __init__(self, userid, rsoid):
        self.userid=userid
        self.rsoid=rsoid


class Events(db.Model):

    eventid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), unique=True, nullable=False)
    description = db.Column(db.String(512))
    rating = db.Column(db.String(32))

    createdby = db.Column(db.Integer, db.ForeignKey('user.userid'), nullable=False)

    attendees = db.relationship('Event_attendees',backref='Events',lazy=True)

    def __init__(self, name, description, rating):
        self.name=name
        self.description=description
        self.rating=rarting

class Event_attendees(db.Model):

    eventatid = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey('user.userid'), nullable=False)
    eventid = db.Column(db.Integer, db.ForeignKey('events.eventid'), nullable=False)

    def __init__(self,userid,eventid):
        self.userid=userid
        self.eventatid=eventid



@app.route('/register',methods=['GET','POST'])
def register():

    data = request.get_json(force=True)

    username= data.get('username')
    password= data.get('password')

    print(data)

    if request.method == 'POST':

        check_username = User.query.filter_by(username=username).first()

        if check_username is None:

            new_user = User(username, password)

            db.session.add(new_user)
            db.session.commit()

            session['logged_in_user'] = new_user.userid
            flash('Sucessfull!')

            res = {'res' : 'Registration Successful!'}

            return (json.dumps(res),200)
        
        else:
            res = {'res':'Error User Already Exists!'}
            return (json.dumps(res),200)

    return ('Unknown Error, Blame Ronald', 204)
    






