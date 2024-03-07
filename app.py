from flask import Flask

###### App setup
app = Flask(__name__)
app.config.from_pyfile('settings.py')
#######################################################################################3
###### Pages
## Homepage
# from pages.homepage.homepage import homepage
#
# app.register_blueprint(homepage)
#
# ## About
# from pages.about.about import about
#
# app.register_blueprint(about)
#
# ## Profile
# from pages.profile.profile import profile
#
# app.register_blueprint(profile)
#
# ## Profile
# from pages.menu.menu import menu
#
# app.register_blueprint(menu)
#
# ## Catalog
# from pages.catalog.catalog import catalog
#
# app.register_blueprint(catalog)
#
# ## Page error handlers
# from pages.page_error_handlers.page_error_handlers import page_error_handlers
#
# app.register_blueprint(page_error_handlers)
#
# ###### Components
# ## Main menu
# from components.main_menu.main_menu import main_menu
#
# app.register_blueprint(main_menu)
#######################################################################################3

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