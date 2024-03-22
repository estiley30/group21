
from flask import Flask
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

###### App setup
app = Flask(__name__)
app.config.from_pyfile('settings.py')


# uri = "mongodb+srv://esti:esti@cluster0.zq1bzx1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
uri ="mongodb+srv://yaelnaveh:yaelnaveh@cluster0.xvmrlkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Create a new client and connect to the server
cluster = MongoClient(uri, server_api=ServerApi('1'))
database = cluster['DrivingTogether']
users_col = database['users']
travels_col = database['travels']
# my_travels_col = database['my_travels']
tremp_col = database['tremp']

#insert_one
# travel={
#             'Date': '2/2/2024',
#             'Time': '17:00',
#             'Source': 'tlv',
#             'Destination': 'city_destination',
#             'Max': '0',
#             'Price': '34',
#             'Driver': 'Me',
#             'id': 'Me17:002/2/2024'
#         }
# travels_col.insert_one(travel)


# #insert_many
# travels_list = [
#     {'Date': '21.02.24', 'Time': '12:30', 'Source': 'Nahariya', 'Destination': 'Beer Sheva',
#      'Max': '4', 'Driver': 'Yael Naveh', 'Price': 50},
#     {'Date': '21.02.24', 'Time': '16:30', 'Source': 'Nahariya', 'Destination': 'Beer Sheva',
#      'Max': '4', 'Driver': 'Ofir Talmi', 'Price': 50},
#     {'Date': '22.02.24', 'Time': '11:30', 'Source': 'Haifa', 'Destination': 'Beer Sheva',
#      'Max': '4', 'Driver': 'Ori Lanir', 'Price': 50},
#     {'Date': '21.02.24', 'Time': '12:30', 'Source': 'Tel Aviv', 'Destination': 'Beer Sheva',
#      'Max': '4', 'Driver': 'Ohad Amir', 'Price': 50},
#     {'Date': '21.02.24', 'Time': '12:30', 'Source': 'Beer Sheva', 'Destination': 'Tel Aviv',
#      'Max': '4', 'Driver': 'Esti Leykind', 'Price': 50},
#     {'Date': '21.02.24', 'Time': '12:30', 'Source': 'Haifa', 'Destination': 'Tel Aviv',
#      'Max': '4', 'Driver': 'Oren Maor', 'Price': 50}
# ]
#
# users_list = [
#     {'email': 'esti.l@gmail.com', 'password': 'esti123', 'name': 'esti ley'},
#     {'email': 'yael.n@gmail.com', 'password': 'yael123', 'name': 'yael nav'},
#     {'email': 'Ofir@gmail.com', 'password': 'Ofir123', 'name': 'Ofir Talmi'},
#     {'email': 'OrenM@gmail.com', 'password': 'Oren123', 'name': 'Oren Maor'},
#     {'email': 'Ohad@gmail.com', 'password': 'Ohad123', 'name': 'Ohad Amir'},
#     {'email': 'Ori@gmail.com', 'password': 'Ori123', 'name': 'Ori Lanir'}
# ]
# travels_col.insert_many(travels_list)
# users_col.insert_many(users_list)

# delete many
# tremp_col.delete_many({'Source': 'home'})
# travels_col.delete_many({'Max': '4'})
# travels_col.delete_many({'Price': 'price'})
# travels_col.delete_many({'Driver': 'bdika2'})
# travels_col.delete_many({'Driver': ''})
# travels_col.delete_many({'Source': 'None'})
# travels_col.delete_many({'Source': 'check1'})
# users_col.delete_many({'name': 'Ofir Talmi'})
# users_col.delete_many({'name': 'Oren Maor'})
# users_col.delete_many({'name': 'Ohad Amir'})
# users_col.delete_many({'name': 'Ori Lanir'})



###Pages
#about
from pages.about.about import about
app.register_blueprint(about)

#entry
from pages.entry.entry import entry
app.register_blueprint(entry)

#home
from pages.home.home import home
app.register_blueprint(home)

#login
from pages.login.login import login
app.register_blueprint(login)

#newTravel
from pages.newTravel.newTravel import newTravel
app.register_blueprint(newTravel)

#showTravel
from pages.showTravel.showTravel import showTravel
app.register_blueprint(showTravel)

#signUp
from pages.signUp.signUp import signUp
app.register_blueprint(signUp)

#travelHistory
from pages.travelHistory.travelHistory import travelHistory
app.register_blueprint(travelHistory)

#travelSchedule
from pages.travelSchedule.travelSchedule import travelSchedule
app.register_blueprint(travelSchedule)

