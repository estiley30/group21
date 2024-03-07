from flask import Flask, redirect, url_for, render_template, request, session, Blueprint

showTravel = Blueprint(
    'showTravel',
    __name__,
    static_folder='static',
    static_url_path='/showTravel',
    template_folder='templates')

@showTravel.route('/showTravel')
def index():
    return render_template('showTravel.html')