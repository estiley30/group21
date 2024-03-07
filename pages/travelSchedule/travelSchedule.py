from flask import Flask, redirect, url_for, render_template, request, session, Blueprint

travelSchedule = Blueprint(
    'travelSchedule',
    __name__,
    static_folder='static',
    static_url_path='/travelSchedule',
    template_folder='templates')

@travelSchedule.route('/travelSchedule')
def index():
    return render_template('travelSchedule.html')