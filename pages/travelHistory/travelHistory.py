from flask import Flask, redirect, url_for, render_template, request, session, Blueprint
from app import tremp_col
from app import travels_col
from flask import jsonify


travelHistory = Blueprint(
    'travelHistory',
    __name__,
    static_folder='static',
    static_url_path='/travelHistory',
    template_folder='templates')


@travelHistory.route('/travelHistory')
def index():
    # Query to sort records by date and time first and then by source
    tremps = tremp_col.find().sort([("Date", 1), ("Time", 1), ("Source", 1)])
    userName = session['username']

    print(f' travelhistory: {tremps}')
    return render_template('travelHistory.html', tremps=tremps, userName=userName)

##########################################################
# @travelHistory.route('/travelHistory/get_travel_detail/<travel_id>')
# def get_travel_detail(travel_id):
#     selected_ride = travels_col.find_one({'id': travel_id})
#     print(travel_id)
#     ride_data = {
#         'Date': selected_ride['Date'],
#         'Time': selected_ride['Time'],
#         'Source': selected_ride['Source'],
#         'Street_Source': selected_ride['Street_Source'] if selected_ride.get('Street_Source') is not None else '',
#         'Number_Source': selected_ride['Number_Source'] if selected_ride.get('Number_Source') is not None else '',
#         'Destination': selected_ride['Destination'],
#         'Street_Destination': selected_ride['Street_Destination'] if selected_ride.get('Street_Destination') is not None else '',
#         'Number_Destination': selected_ride['Number_Destination'] if selected_ride.get('Number_Destination') is not None else '',
#         'Max': selected_ride['Max'],
#         'Price': selected_ride['Price'],
#         'Comment': selected_ride['Comment'] if selected_ride.get('Comment') is not None else '',
#         'Driver': selected_ride['Driver'],
#         'User_name': session.get('username'),
#         'User_last_name': session.get('last_name'),
#         'User_email': session.get('email'),
#         'Driver_email': selected_ride['DriverEmail'],
#         'id': travel_id,
#         'session_email': session.get('email')
#     }
#     # print(ride_data)
#     return ride_data

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
    # print(f" email : {session['email']} ")
    # selected_ride = tremp_col.find_one({'id':id_ride, 'User_email': session['email']})
    tremp_col.delete_one({'id': id_ride, 'User_email': session['email']})
    tremp_col.update_many({'id': id_ride}, {'$set': {'Max': str(int(selected_ride['Max']) +1)}})
    travels_col.update_one({'id': id_ride}, {'$set': {'Max': str(int(selected_ride['Max']) +1)}})
    return jsonify({'success': True, 'message': 'Ride removed successfully'})
