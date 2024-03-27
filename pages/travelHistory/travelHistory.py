from flask import Flask, redirect, url_for, render_template, request, session, Blueprint
from app import tremp_col
from app import travels_col
from flask import jsonify
from datetime import datetime, time


travelHistory = Blueprint(
    'travelHistory',
    __name__,
    static_folder='static',
    static_url_path='/travelHistory',
    template_folder='templates')



@travelHistory.route('/travelHistory')
def index():
    # Get the current date and time
    current_datetime = datetime.now()

    # Convert current datetime to ISO format string
    current_datetime_str = current_datetime.isoformat()

    # Query to filter records by date and time greater than the current time
    query = {
        "$or": [
            {"Date": {"$gt": current_datetime_str}},
            {"Date": current_datetime_str, "Time": {"$gt": current_datetime_str.split('T')[1]}}
        ]
    }

    # Query to sort records by date and time first and then by source
    tremps = tremp_col.find(query).sort([("Date", 1), ("Time", 1), ("Source", 1)])
    userName = session['username']

    print(f'travelhistory: {tremps}')
    return render_template('travelHistory.html', tremps=tremps, userName=userName)


@travelHistory.route('/get_ride_session/<id_ride>', methods=['GET'])
def get_ride_session(id_ride):
    # This route returns the data in JSON format
    selected_ride = travels_col.find_one({'id': id_ride})

    data = {
        'email_user': str(session['email']),
        'email_driver': selected_ride['DriverEmail'],
        'id_ride': id_ride
    }
    print(f'im in travelhistory get ride session: {data}')
    return jsonify(data)


@travelHistory.route('/remove_from_ride/<id_ride>', methods=['GET'])
def remove_from_ride(id_ride):
    print(f' id : {id_ride} ')
    selected_ride = travels_col.find_one({'id': id_ride})
    tremp_col.delete_one({'id': id_ride, 'User_email': session['email']})
    tremp_col.update_many({'id': id_ride}, {'$set': {'Max': str(int(selected_ride['Max']) +1)}})
    travels_col.update_one({'id': id_ride}, {'$set': {'Max': str(int(selected_ride['Max']) +1)}})
    return jsonify({'success': True, 'message': 'Ride removed successfully'})
