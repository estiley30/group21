from flask import Flask, redirect, url_for, render_template, request, session, Blueprint

login = Blueprint(
    'login',
    __name__,
    static_folder='static',
    static_url_path='/login',
    template_folder='templates')

# @login.route('/login')
# def index():
#     return render_template('login.html')
@login.route('/login', methods= ['GET', 'POST'])
def index():
    print(f'The method is: {request.method}')
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        #Do check with DB
        session['email'] = email
        session['logged_in'] = True
        return render_template('home.html', email=email)
    return render_template('login.html')


@login.route('/logout', methods=['GET'])
def logout_func():
    session['logged_in'] = False
    session['username'] = ''
    session['email'] = ''
    return redirect(url_for('login_func'))