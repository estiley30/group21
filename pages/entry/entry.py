from flask import Flask, redirect, url_for, render_template, request, session, Blueprint

entry = Blueprint(
    'entry',
    __name__,
    static_folder='static',
    static_url_path='/entry',
    template_folder='templates')

@entry.route('/')
@entry.route('/entry')
def index():
    return render_template('first.html')
