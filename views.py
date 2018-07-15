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

roles = ['User','Admin','Superuser']

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

    def __init__(self, name, description, createdby,rating=0):
        self.name=name
        self.description=description
        self.createdby=createdby
        self.rating=rating

class Event_attendees(db.Model):

    eventatid = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey('user.userid'))
    eventid = db.Column(db.Integer, db.ForeignKey('events.eventid'), nullable=False)
    name = db.Column(db.String(256), nullable=False)

    def __init__(self,name,eventid):
        self.name=name
        self.eventid=eventid


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in_user' not in session:
            return ('User not logged in',204)
        return f(*args, **kwargs)
    return decorated_function



@app.route('/register',methods=['GET','POST'])
def register():
    
    username= request.form['username']
    password= request.form['password']


    if request.method == 'POST':

        check_username = User.query.filter_by(username=username).first()

        if check_username is None:

            new_user = User(username, password)

            db.session.add(new_user)
            db.session.commit()

            session['logged_in_user'] = new_user.userid
            flash('Sucessfull!')

            res = {'res' : 'Registration Successful!', 'userid': new_user.userid}

            return (json.dumps(res),200)
        
        else:
            res = {'res':'Error User Already Exists!'}
            return (json.dumps(res),200)

    return ('Unknown Error, Blame Ronald', 204)

@app.route('/login', methods=['GET', 'POST'])
def login():
    
    username= request.form['username']
    password= request.form['password']
        
    if request.method == 'POST':
        
        user = User.query.filter_by(username=username).first()
        print('Input: {}'.format(user))

        if user is None or not user.check_password(password):
                flash('Username or password incorrect')
                res={'res':'Username or password incorrect'}
                return (json.dumps(res),200)
                
        else:
            session['logged_in_user'] = user.userid
            res = {'res':'Successful!','userid': '{}'.format(user.userid)}
            return (json.dumps(res),200)
            
    return ('Error Login, Blame Ronald',204)

@app.route('/role', methods=['GET', 'POST'])
@login_required
def role():

    if request.method == 'POST':

        newroleid = request.form['role']
        user = User.query.filter_by(userid=session['logged_in_user']).first()
        ogid = user.roleid
        user.roleid = newroleid
        db.session.commit()

        res = {'res': 'Successful!', 'currole': roles[ogid], 'newrole': roles[user.roleid]}

        return (json.dumps(res),200)
    
    if request.method == 'GET':

        user = User.query.filter_by(userid=session['logged_in_user']).first()
        res = {'res': 'Succesful', 'currole':roles[user.roleid]}

        return (json.dumps(res), 200)

    return ('Request Error, Blame Ron',200)


@app.route('/addevent', methods=['GET','POST'])
@login_required
def add_even():

    if request.method == 'POST':

        user = User.query.filter_by(userid=session['logged_in_user']).first()

        data = request.get_json(force=True)
        eventname = data['name']
        description = data['description']
        rating = data['rating']
        createdby = user.userid

        new_event=Events(eventname,description,createdby,rating=rating)

        db.session.add(new_event)
        db.session.commit()

        num_people=0

        for people in data['attendees']:

             new_attend = Event_attendees(people, new_event.eventid)
             db.session.add(new_attend)
             db.session.commit()
             num_people = num_people + 1
        
        res = {'res': 'Successful', 'eventid':new_event.eventid, 'attendees': num_people }

        return(json.dumps(res),200)

        




    return ('Ron def screwed up, blame him',204)




    






