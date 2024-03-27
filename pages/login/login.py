from flask import Flask, redirect, url_for, render_template, request, session, Blueprint, jsonify
from app import users_col
global currUserEmail

login = Blueprint(
    'login',
    __name__,
    static_folder='static',
    static_url_path='/login',
    template_folder='templates')

@login.route('/login', methods= ['GET', 'POST'])
def index():
    error_message = None  # Initialize error_message to None
    print(f' login The method is: {request.method}')
    if request.method == 'POST':
        print(f' login The method is 1111: {request.method}')
        email = request.form['email']
        password = request.form['password']
        #Do check with DB
        # Check if the provided email and password match any user in the collection
        user = users_col.find_one({'email': email, 'password': password})

        if user:
            # If a matching user is found, set session variables and redirect to home
            session['email'] = email
            currUserEmail = email
            session['logged_in'] = True
            session['username'] = user['first_name']  # Assuming 'first_name' is the field containing the user's name
            session['license_checked'] = user['license_checked']
            return render_template('home.html', email=email, user=user)
        else:
            # If no matching user is found, show an error message
            error_message = 'Invalid username or password. Please try again.'
            return render_template('login.html', error_message=error_message)

        # Render the login page for GET requests
    return render_template('login.html')


@login.route('/logout', methods=['GET'])
def logout_func():
    session['logged_in'] = False
    session['username'] = ''
    session['email'] = ''
    session['email'] = ''
    session['license_checked'] = ''

    return render_template('first.html')


@login.route('/get_data')
def get_data():
    # This route returns the data in JSON format
    data = {
        'email': str(session['email'])
    }
    return jsonify(data)