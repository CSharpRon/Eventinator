import os
from flask import Flask, url_for, redirect, render_template, request, json, session, flash, jsonify
from functools import wraps
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

now = datetime.datetime.now()


app = Flask(__name__)
CORS(app, support_credentials=True)
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
    ofevent = db.relationship('Events',backref='Rso',lazy=True)

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
    lat = db.Column(db.String(32))
    lng = db.Column(db.String(32))
    isPrivate = db.Column(db.Boolean, nullable=False)
    createdby = db.Column(db.Integer, db.ForeignKey('user.userid'), nullable=False)
    rsoid = db.Column(db.Integer, db.ForeignKey('rso.rsoid'), nullable=False)
    date = db.Column(db.String(32))
    phone = db.Column(db.String(32))
    email = db.Column(db.String(32))
    category = db.Column(db.String(64))

    attendees = db.relationship('Event_attendees',backref='Events',lazy=True)

    def __init__(self, name, description, createdby, rsoid, phone, email, category, date=now.strftime("%Y-%m-%d %H:%M"),rating=0, lat=-81.2000599, lng=28.6024274, isPrivate=False):
        self.name=name
        self.description=description
        self.createdby=createdby
        self.rsoid=rsoid
        self.rating=rating
        self.lat=lat
        self.lng=lng
        self.isPrivate = isPrivate
        self.phone = phone
        self.email = email
        self.date = date
        self.category = category

    def serialize(self):
        return {
                'eventid'       : str(self.eventid),
                'name'          : str(self.name),
                'description'   : str(self.description),
                'rating'        : str(self.rating),
                'lat'           : str(self.lat),
                'lng'           : str(self.lng),
                'isPrivate'       : str(self.isPrivate),
                'phone'         : str(self.phone),
                'email'         : str(self.email),
                'date'          : str(self.date),
                'category'      : str(self.category)
                }


class Event_attendees(db.Model):

    eventatid = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey('user.userid'))
    eventid = db.Column(db.Integer, db.ForeignKey('events.eventid'), nullable=False)
    name = db.Column(db.String(256), nullable=False)

    def __init__(self,name,eventid):
        self.name=name
        self.eventid=eventid


# def login_required(f):
#     @wraps(f)
#     def decorated_function(*args, **kwargs):
#         if 'logged_in_user' not in session:
#             return ('User not logged in',204)
#         return f(*args, **kwargs)
#     return decorated_function




@app.route('/register',methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def register():

    data = request.get_json(force=True)
    
    username= data['username']
    password= data['password']


    if request.method == 'POST':

        check_username = User.query.filter_by(username=username).first()

        if check_username is None:

            new_user = User(username, password)

            db.session.add(new_user)
            db.session.commit()

            session['logged_in_user'] = new_user.userid
            flash('Sucessfull!')

            res = {'res' : 'ok', 'userid': new_user.userid}

            return (json.dumps(res),200)
        
        else:
            res = {'res':'Error User Already Exists!'}
            return (json.dumps(res),200)

    return ('Unknown Error, Blame Ronald', 204)

@app.route('/login', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def login():

    data = request.get_json(force=True)
    
    username= data['username']
    password= data['password']
        
    if request.method == 'POST':
        
        user = User.query.filter_by(username=username).first()
        print('Input: {}'.format(user))

        if user is None or not user.check_password(password):
                flash('Username or password incorrect')
                res={'res':'Username or password incorrect'}
                return (json.dumps(res),200)
                
        else:
            session['logged_in_user'] = user.userid
            res = {'res':'ok','userid': '{}'.format(user.userid)}
            return (json.dumps(res),200)
            
    return ('Error Login, Blame Ronald',204)

@app.route('/role', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def role():

    if request.method == 'POST':

        data = request.get_json(force=True)
        
        userid = data['userid']
        #userid = session['logged_in_user']

        newroleid = data['role']
        user = User.query.filter_by(userid=userid).first()
        ogid = user.roleid
        user.roleid = newroleid
        db.session.commit()

        res = {'res': 'ok', 'currole': roles[ogid], 'newrole': roles[user.roleid]}

        return (json.dumps(res),200)
    
    if request.method == 'GET':


        userid=request.headers['userid']

        user = User.query.filter_by(userid=userid).first()
        res = {'res': 'ok', 'currole':roles[user.roleid]}

        return (json.dumps(res), 200)

    return ('Request Error, Blame Ron',200)


@app.route('/addevent', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def add_event():

    if request.method == 'POST':

        data = request.get_json(force=True)

        userid = data['userid']
        #userid = session['logged_in_user']

        user = User.query.filter_by(userid=userid).first()


        data = request.get_json(force=True)
        eventname = data['name']
        description = data['description']
        rating = data['rating']
        rsoid = data['rsoid']
        date = data['date']
        phone = data['phone']
        email = data['email']
        category=data['category']
        createdby = userid

        isDuplicate = Events.query.filter_by(name=eventname).first()
        
        if isDuplicate:
            res = {'res': 'Event already exists'}
            return('Event already exists',200)  

        new_event=Events(eventname,description,createdby,rsoid, phone, email, category, date, rating=rating)

        if "lat" in data and "lng" in data:
            new_event.lat=data['lat']
            new_event.lng=data['lng']
        if "isPrivate" in data:
            print('here')
            if str(data['isPrivate']).lower() == 'true': 
                print('here1')
                new_event.isPrivate = True
            

        db.session.add(new_event)
        db.session.commit()

        num_people=0

        for people in data['attendees']:

             new_attend = Event_attendees(people, new_event.eventid)
             db.session.add(new_attend)
             db.session.commit()
             num_people = num_people + 1
        
        res = {'res': 'ok', 'eventid':new_event.eventid, 'attendees': num_people }

        return(json.dumps(res),200)

        
    return ('Ron def screwed up, blame him',204)


@app.route('/getrso', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_rso():

    data = {}

    listofrso= Rso.query.all()

    for rso in listofrso:

        data[rso.rsoname] = rso.rsoid

    return (json.dumps(data), 200)

@app.route('/addrso', methods=['POST'])
@cross_origin(supports_credentials=True)
def add_rso():

    if request.method == 'POST':

        data = request.get_json(force=True)

        name = data['rsoname']

        new_rso = Rso(name)
        db.session.add(new_rso)
        db.session.commit()

        res = {'res':'ok', 'name':new_rso.rsoname, 'rsoid': new_rso.rsoid}
        return (json.dumps(res),200)
    
    return("Ron f'ed up this time",204)


@app.route('/rsouser', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def rso_user():

    if request.method == 'GET':
        
       
        userid1 = request.headers['userid']

        query = User_in_rso.query.filter_by(userid=userid1)

        data = {}

        for q in query:

            rso = Rso.query.filter_by(rsoid=q.rsoid).first()

            data[rso.rsoname] = rso.rsoid

        data['res'] = 'ok'

        return (json.dumps(data),200)



    if request.method == 'POST':

        data = request.get_json(force=True)


        rso = data['rsoid']
        userid = data['userid']

        

        new_userrso = User_in_rso(userid, rso)

        db.session.add(new_userrso)
        db.session.commit()

        rsoq = Rso.query.filter_by(rsoid=rso).first()

        res = {'res':'ok', 'rsoid':rso, 'rso': rsoq.rsoname,'userid': userid}

        return (json.dumps(res),200)
    
    return ('Ron royally messed up', 204)


@app.route('/getevents', methods=['GET','POST'])
@cross_origin(supports_credentials=True)
def get_events():

    userid=request.headers['userid']
    #userid=session['logged_in_user']

    user_in_rso = User_in_rso.query.filter_by(userid=userid)

    rsolist = [rso.rsoid for rso in user_in_rso]

    eventlist = []

    for r in rsolist:

        eventrso = Events.query.filter_by(rsoid=r)

        [eventlist.append(e) for e in eventrso]


    payload = [x.serialize() for x in eventlist]

    return (json.dumps(payload),200)