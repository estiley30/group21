from flask import Flask, redirect, url_for, render_template, request, session, Blueprint

signUp = Blueprint(
    'signUp',
    __name__,
    static_folder='static',
    static_url_path='/signUp',
    template_folder='templates')

@signUp.route('/signUp')
def index():
    return render_template('signUp.html')