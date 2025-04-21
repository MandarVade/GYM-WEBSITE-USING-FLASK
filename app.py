from flask import Flask, render_template, redirect, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ---------------------- Models ----------------------
class Signup(db.Model):
    full_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), primary_key=True)
    password = db.Column(db.String(50), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"{self.full_name}, {self.email}"

class Login(db.Model):
    email = db.Column(db.String(50), primary_key=True)
    password = db.Column(db.String(50), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"{self.email}"

# ---------------------- Routes ----------------------
@app.route("/")
def homepage():
    return render_template('index.html')

@app.route("/userin")
def userhome():
    return render_template('userindex.html')

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        local_fname = request.form['fullName']
        local_email = request.form['email']
        local_password = request.form['password']

        # Save to both Signup and Login tables
        new_signup = Signup(full_name=local_fname, email=local_email, password=local_password)
        new_login = Login(email=local_email, password=local_password)

        db.session.add(new_signup)
        db.session.add(new_login)
        db.session.commit()

        return render_template('login.html')
    return render_template('signup.html')

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = Login.query.filter_by(email=email, password=password).first()

        if user:
            return redirect('/userin')
        else:
            return "Invalid email or password", 401

    return render_template('login.html')

@app.route("/adminin")
def adminlogin():
    return render_template('adminlogin.html')

@app.route("/admin", methods=['GET'])
def display():
    entries = Signup.query.all()
    return render_template('admin.html', entries=entries)

# ---------------------- Main ----------------------
if __name__ == "__main__":
    app.run(debug=True)
