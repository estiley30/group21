from flask import Flask, redirect, url_for, render_template, request, session, Blueprint

about = Blueprint(
    'about',
    __name__,
    static_folder='static',
    static_url_path='/about',
    template_folder='templates')

@about.route('/about')
def index():
    return render_template('about.html')