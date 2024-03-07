from flask import Flask, redirect, url_for, render_template, request, session, Blueprint

travelHistory = Blueprint(
    'travelHistory',
    __name__,
    static_folder='static',
    static_url_path='/travelHistory',
    template_folder='templates')

@travelHistory.route('/travelHistory')
def index():
    return render_template('travelHistory.html')