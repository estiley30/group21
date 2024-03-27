from pprint import pprint

from flask import Flask, redirect, url_for, render_template, request, session, Blueprint, jsonify
from app import travels_col, tremp_col
from flask import jsonify
from datetime import datetime
travelSchedule = Blueprint(
    'travelSchedule',
    __name__,
    static_folder='static',
    static_url_path='/travelSchedule',
    template_folder='templates')

@travelSchedule.route('/travelSchedule')
def index():
    # Get the current date and time
    current_datetime = datetime.now()

    # Convert current datetime to ISO format string
    current_datetime_str = current_datetime.isoformat()

    # Query to filter records by date and time greater than the current time
    query = {
        "$or": [
            {"Date": {"$gt": current_datetime_str}},
            {"Date": current_datetime_str, "Time": {"$gt": current_datetime_str.split('T')[1]}},
            {'$expr': {'$gt': [{'$toInt': '$Max'}, 0]}}
        ]
    }

    # Query to sort records by date and time first and then by source
    travels = travels_col.find(query).sort([("Date", 1),("Time", 1), ("Source", 1)])
    print(f' travelSchedule: {travels}')
    return render_template('travelSchedule.html', travels=travels)


@travelSchedule.route('/register_for_ride/<id_ride>', methods=['GET'])
def register_for_ride(id_ride):
    print(f' id_ride: {id_ride}')
    selected_ride = travels_col.find_one({'id': id_ride})
    if(selected_ride['DriverEmail'] != session.get('email')):
        print(f' selected_ride: {selected_ride}')
        ride_data = {
            'Date': selected_ride['Date'],
            'Time': selected_ride['Time'],
            'Source': selected_ride['Source'],
            'Street_Source': selected_ride['Street_Source'] if selected_ride.get('Street_Source') is not None else '',
            'Number_Source': selected_ride['Number_Source'] if selected_ride.get('Number_Source') is not None else '',
            'Destination': selected_ride['Destination'],
            'Street_Destination': selected_ride['Street_Destination'] if selected_ride.get('Street_Destination') is not None else '',
            'Number_Destination': selected_ride['Number_Destination'] if selected_ride.get('Number_Destination') is not None else '',
            'Max': str(int(selected_ride['Max']) - 1),
            'Price': selected_ride['Price'],
            'Comment': selected_ride['Comment'] if selected_ride.get('Comment') is not None else '',
            'Driver': selected_ride['Driver'],
            'User_name': session.get('username'),
            'User_last_name': session.get('last_name'),
            'User_email': session.get('email'),
            'Driver_email': selected_ride['DriverEmail'],
            'id': id_ride
        }
        print('ride_data:')
        pprint(ride_data)
        # update one
        my_query = {'id': id_ride}
        new_values = {'$set': {'Max': str(int(selected_ride['Max']) - 1)}}
        travels_col.update_one(my_query, new_values)

        # Insert the ride data into the MongoDB database
        tremp_col.insert_one(ride_data)
        # update many
        tremp_col.update_many(my_query, new_values)
        return redirect(url_for('travelHistory.index'))
    else:
        return render_template('travelSchedule.html', error_message="You can't register to your own ride!")




@travelSchedule.route('/get_ride_session/<id_ride>', methods=['GET'])
def get_ride_session(id_ride):
    # This route returns the data in JSON format
    selected_ride = travels_col.find_one({'id': id_ride})

    data = {
        'email_user': str(session['email']),
        'email_driver': selected_ride['DriverEmail']
    }
    return jsonify(data)

@travelSchedule.route('/is_one_ride/<id_ride>', methods=['GET'])
def is_one_ride(id_ride):
    print(f' id : {id_ride} ')
    print(f" email : {session['email']} ")
    selected_ride = tremp_col.find_one({'id':id_ride, 'User_email': session['email']})
    print(f' selected_ride : {selected_ride} ')
    if(selected_ride):
        print(f' selected_ride : true ')
    #    return true
    # return false
        return jsonify({'exists': True})
    print(f' selected_ride : false ')
    return jsonify({'exists': False})