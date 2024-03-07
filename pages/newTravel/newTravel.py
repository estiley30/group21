from flask import Flask, redirect, url_for, render_template, request, session, Blueprint

newTravel = Blueprint(
    'newTravel',
    __name__,
    static_folder='static',
    static_url_path='/newTravel',
    template_folder='templates')

@newTravel.route('/newTravel')
def index():
    return render_template('newTrip.html')