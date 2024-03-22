from pprint import pprint

from flask import Flask, redirect, url_for, render_template, request, session, Blueprint, jsonify

from app import travels_col

showTravel = Blueprint(
    'showTravel',
    __name__,
    static_folder='static',
    static_url_path='/showTravel',
    template_folder='templates')


# @showTravel.route('/showTravel')
# def index():
#     return render_template('showTravel.html')

@showTravel.route('/showTravel<id_ride>', methods=['GET', 'POST'])
def index(id_ride):
    details = get_travel_details(id_ride)
    pprint(details)
    # id = details['id']
    # print(id)
    return render_template('showTravel.html', details=details)

def get_travel_details(id_ride):
    selected_ride = travels_col.find_one({'id': id_ride})
    print(id_ride)
    ride_data = {
        'Date': selected_ride['Date'],
        'Time': selected_ride['Time'],
        'Source': selected_ride['Source'],
        'Street_Source': selected_ride['Street_Source'] if selected_ride.get('Street_Source') is not None else '',
        'Number_Source': selected_ride['Number_Source'] if selected_ride.get('Number_Source') is not None else '',
        'Destination': selected_ride['Destination'],
        'Street_Destination': selected_ride['Street_Destination'] if selected_ride.get('Street_Destination') is not None else '',
        'Number_Destination': selected_ride['Number_Destination'] if selected_ride.get('Number_Destination') is not None else '',
        'Max': selected_ride['Max'],
        'Price': selected_ride['Price'],
        'Comment': selected_ride['Comment'] if selected_ride.get('Comment') is not None else '',
        'Driver': selected_ride['Driver'],
        'User_name': session.get('username'),
        'User_last_name': session.get('last_name'),
        'User_email': session.get('email'),
        'Driver_email': selected_ride['DriverEmail'],
        'id': id_ride
    }
    # print(ride_data)
    return ride_data

@showTravel.route('/editTravel', methods=['GET', 'POST'])
def edit_trip():
    print('f in edit befor if postttttttt')

    if request.method == 'POST':
        print('f in edit after if post')
        print(request.form)
        # Retrieve the trip ID from the form data
        trip_id = request.form.get('tripId')

        # Retrieve the updated trip details from the form data
        city_source = request.form.get('citySource')
        street_source = request.form.get('streetSource')
        number_source = request.form.get('numberSource')
        city_destination = request.form.get('cityDestination')
        street_destination = request.form.get('streetDestination')
        number_destination = request.form.get('numberDestination')
        date_trip = request.form.get('dateTrip')
        time_trip = request.form.get('timeTrip')
        num_of_plc = request.form.get('numOfPlc')
        price = request.form.get('price')
        comment = request.form.get('comment')

        # Update the trip details in the database
        print(f'f edit:{trip_id}')
        print(f'f edit:{city_source}')
        travels_col.update_one(
            {'id': trip_id},
            {'$set': {
                'Source': city_source,
                'Street_Source': street_source,
                'Number_Source': number_source,
                'Destination': city_destination,
                'Street_Destination': street_destination,
                'Number_Destination': number_destination,
                'Date': date_trip,
                'Time': time_trip,
                'Max': num_of_plc,
                'Price': price,
                'Comment': comment
            }}
        )

        # Redirect to a different page after updating the trip
        return redirect('/home')