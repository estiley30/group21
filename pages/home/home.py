from flask import Flask, redirect, url_for, render_template, request, session, Blueprint

home = Blueprint(
    'home',
    __name__,
    static_folder='static',
    static_url_path='/home',
    template_folder='templates')

@home.route('/home')
def index():
    return render_template('home.html')