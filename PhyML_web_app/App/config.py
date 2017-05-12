import os

class ConfigClass(object):
    # Flask settings
    DEBUG = os.getenv('DEBUG',True)
    SECRET_KEY = os.getenv('SECRET_KEY','1+1=3')
    UPLOAD_FOLDER= os.getenv('UPLOAD_FOLDER','./App/uploads')

    #Flask-Mail
    # Flask-Mail settings
    MAIL_USERNAME =           os.getenv('MAIL_USERNAME',        'wellness.garden.website@gmail.com')
    MAIL_PASSWORD =           os.getenv('MAIL_PASSWORD',        'qsdfgh13')
    MAIL_DEFAULT_SENDER =     os.getenv('MAIL_DEFAULT_SENDER',  '"WellnessGarden" <noreply@example.com>')
    MAIL_SERVER =             os.getenv('MAIL_SERVER',          'smtp.googlemail.com')
    MAIL_PORT =           int(os.getenv('MAIL_PORT',            '465'))
    MAIL_USE_SSL =        int(os.getenv('MAIL_USE_SSL',         True))
    MAIL_USE_TLS =        int(os.getenv('MAIL_USE_TLS',         False))

    #App ligne de command
    RESULTS_FOLDER =  os.getenv('RESULTS_FOLDER',        './App/PhyMl/results/')
    CMD_LINE_OPTION = os.getenv('CMD_LINE_OPTION',{})

