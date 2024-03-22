from flask import Flask, redirect, url_for, render_template, request, session, Blueprint
from app import users_col




signUp = Blueprint(
    'signUp',
    __name__,
    static_folder='static',
    static_url_path='/signUp',
    template_folder='templates')


@signUp.route('/signUp', methods=['GET', 'POST'])
def index():
    print(f' in index.signUp.py ')
    if request.method == 'POST':
        print(f' in index.signUp.py post ')
        # Retrieve form data
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        phone = request.form['phone']
        email = request.form['email']
        password = request.form['password']
        bd = request.form['bd']
        gender = request.form['Gender']
        city = request.form['city']
        # street = request.form['street']
        # number = request.form['number']

        license_checked = 'license' in request.form  # Check if the 'license' checkbox was checked

        # Check if email or phone number already exists in the database
        existing_user_email = users_col.find_one({'email': email})
        existing_user_phone = users_col.find_one({'phone': phone})

        if existing_user_email or existing_user_phone:
            print(f' signUP: existing_user_email or existing_user_phone')
            # If email or phone number already exists, return a message
            return render_template('signUp.html', error_message="You are already registered")

        # Insert data into MongoDB if email and phone are unique
        users_col.insert_one({
            'first_name': first_name,
            'last_name': last_name,
            'phone': phone,
            'email': email,
            'password': password,
            'bd': bd,
            'gender': gender,
            'city': city,
            # 'street': street,
            # 'number': number
            'license_checked': license_checked  # Include the checkbox value in the database entry
        })
        user = users_col.find_one({'email': email, 'password': password})
        # login.setup_session(email, user['first_name'])
        # setup_session(email, user['first_name']) #function in login.py

        session['email'] = email
        session['logged_in'] = True
        session['username'] = user['first_name']  # Assuming 'first_name' is the field containing the user's name

        session['license_checked'] = license_checked
        print(f' license_checked: {license_checked}')
        return render_template('home.html')

    return render_template('signUp.html')
