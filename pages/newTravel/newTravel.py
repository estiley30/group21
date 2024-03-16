from flask import Flask, redirect, url_for, render_template, request, session, Blueprint
from app import travels_col, tremp_col

newTravel = Blueprint(
    'newTravel',
    __name__,
    static_folder='static',
    static_url_path='/newTravel',
    template_folder='templates')


@newTravel.route('/newTravel', methods=['GET'])
def show_new_trip_form():
    print(f'new travel')
    return render_template('newTrip.html')


@newTravel.route('/newTravel', methods=['POST'])
def add_new_trip():
    if request.method == 'POST':
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
        driver_name = session.get('username', 'Unknown')  # Default to 'Unknown' if username is not found in the session
        driver_email = session.get('email', 'Unknown')
        User_email = session.get('email', 'Unknown')
        id = driver_name + '_' + str(date_trip) + '_' + str(time_trip)
        print(f' id: {id}')
        # insert trip data into database
        travel = {
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
            'Comment': comment,
            'Driver': driver_name,
            'DriverEmail': driver_email,
            'id': id
        }
        travels_col.insert_one(travel)
        my_travel = {
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
            'Comment': comment,
            'Driver': driver_name,
            'Driver_email': driver_email,
            'User_email': User_email,
            'id': id
        }
        tremp_col.insert_one(my_travel)
        # Redirect to a different page after adding the trip
        return redirect(url_for('newTravel.trip_added'))


@newTravel.route('/trip_added')
def trip_added():
    return redirect(url_for('travelSchedule.index'))
    # return render_template('newTrip.html')
