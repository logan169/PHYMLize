#!/usr/bin/env python
#-*- encoding:utf-8 -*-
import jinja2
from flask import (Flask,render_template,url_for,redirect,request,flash,jsonify)
#from flask_mail import Mail,Message
import json
from werkzeug import secure_filename
import random
import os.path
from os import listdir

#from .PhyMl.PhyMl import *


#on init les variable global
# variable global id
phyML_id = -1
# variable global status
status = -1
# variable global obj
obj=-1


def App():
    app = Flask(__name__)                            # Initialize Flask
    #mail = Mail(app)                                # Initialize Flask-Mail
    app.config.from_object('App.config.ConfigClass')

    @app.route("/")
    def init():
        return redirect(url_for('home'))

    @app.route("/home")
    def home():
        global status
        global phyML_id
        global obj
        '''
        Page de presentation
        '''
        global status
        global phyML_id

        try:
            return render_template('home.html', phyML_status=obj.status(), phyML_id=obj.id)
        except:
            return render_template('home.html', phyML_status=status, phyML_id=phyML_id)

    @app.route("/new", methods=['GET','POST'])
    def new():
        '''
        reçoit  les  données  (paramètres  d’exécution)  à  travers  un  formulaire.  Retourne  un identifiant  et un statut au format JSON
        '''

        global status
        global phyML_id
        global obj
        output = None

        if request.method == 'POST':
            app.config['CMD_LINE_OPTION'] = {}

            ##################################################################
            ##################################################################
            #mettre path de phyML là
            app.config['CMD_LINE_OPTION']["PhymlPath"] = ''#mettre le path de phyml
            app.config['CMD_LINE_OPTION']["OutputPath"] = app.config['RESULTS_FOLDER']

            for item in request.form:
                print (item)
                print ('#',request.form[item])
                app.config['CMD_LINE_OPTION'][item] = request.form[item]


            try:
                input = request.files['userfile']
                print (input)
                print (input.filename)
                print (app.config['UPLOAD_FOLDER']+'/'+input.filename)
                input.save(app.config['UPLOAD_FOLDER']+'/'+input.filename)
                #inputPath = str(app.config['UPLOAD_FOLDER']+'/'+secure_filename(input.filename))
                inputPath = os.getcwd()+'/App/uploads/'+input.filename
                print (inputPath)
                app.config['CMD_LINE_OPTION']['inputPath'] = inputPath
            except:
                # set key to example.path
                inputPath = app.config['UPLOAD_FOLDER'] + '/' +'example.txt'
                print(inputPath)
                app.config['CMD_LINE_OPTION']['inputPath'] = inputPath

            #download starting tree
            #try:
            #    startingTree = request.files['StartingTree']
            #    startingTree.save(app.config['UPLOAD_FOLDER'] + '/' + secure_filename(startingTree.filename))
            #    startingTreePath = str(app.config['UPLOAD_FOLDER']+'/'+secure_filename(startingTree.filename))
            #    print(startingTreePath)
            #    app.config['CMD_LINE_OPTION']['startingTree'] = startingTreePath
            #except:
            #    pass

            status = 0
            flash("New project created",'success')

        try:
            return render_template('new.html', phyML_status=obj.status(), phyML_id=obj.id)
        except:
            return render_template('new.html', phyML_status = status, phyML_id=phyML_id )

    @app.route("/run", methods=['GET','POST'])
    def run():
        '''
        Lance l’exécution de PhyML. Reçoit à travers un formulaire l’id et retourne un JSON avec l’Id et le nouveau statut d’exécution.
        '''
        global status
        global phyML_id
        global obj

        options = app.config['CMD_LINE_OPTION']


        if request.method=='POST':
            #verifier que l'objet phyml existe?
            if len(options)>0:
                #lancer la methode run de l'objet PhyML cree
                flash("Analysis is starting now!",'success')
                #id = random.randint(1, 10000) #a modifier par pseudocode ci-dessous
                status = 1
                #print (options)
                PhyMl = RunPhyml(options)
                PhyMl_id = PhyMl.id
                PhyMl.run()
                obj = PhyMl


                '''
                #send a mail to tell that analyse is started and an other mail will be sent when analysis is done
                try:
                    email = request.form['mail']
                    job_name = request.form['jobName']

                    msg = Message('Wellness Garden',
                                  recipients=[email],html=render_template('mail/project_running.html', jobName = job_name))
                    mail.send(msg)
                    #joindre le output au mail, a deplacer vers ?
                    #with app.open_resource("image.png") as fp:
                    #    msg.attach("image.png", "image/png", fp.read())
                except:
                    pass
                '''
                return render_template('run.html',options =options, phyML_status =status, phyML_id=phyML_id)

            else:
                flash('Please, create a new project before trying to run one!','warning')
                return render_template('run.html', options = {},phyML_status =status, phyML_id=phyML_id)

        #on supprime les key que l'on ne veut pas voir dans la fenêtre
        try:
            del options['ServerLoad']
        except:
            pass

        try:
            del options['MAX_FILE_SIZE']
        except:
            pass

        try:
            del options['Email2']
        except:
            pass
        try:
            del options['StartingTreeOption']
        except:
            pass

        try:
            del options['StartingTree']
        except:
            pass

        try:
            del options['OptRandomOption']
        except:
            pass
        



        try:

            return render_template('run.html', options =options, phyML_status=obj.status(), phyML_id=obj.id)
        except:
            return render_template('run.html', options =options, phyML_status=status, phyML_id=phyML_id)



    @app.route("/status ")
    def status ():
        '''
        Retourne le status de l’éxécution en cours.
        '''
        global status
        global phyML_id
        global obj

        if status == -1: #a retirer
            flash('Analysis folder empty, please start an analysis','Error')
            return render_template('status.html')
        else:
            stat = {'id' :obj.id ,'status':obj.status()}

        try:
            return render_template('status.html', phyML_status= obj.status(), phyML_id=obj.id)
        except:
            return render_template('status.html', phyML_status=status, phyML_id=phyML_id)



    @app.route("/reset ")
    def reset ():
        '''
        Annule l’exécution en cours et efface tous les fichiers relatifs
        '''
        global status
        global phyML_id
        global obj

        try:
            return render_template('reset.html', phyML_status=obj.status(), phyML_id=obj.id)
        except:
            return render_template('reset.html', phyML_status=status, phyML_id=phyML_id)

    @app.route("/read/", methods=['GET','POST'])
    def read():
        global status
        global phyML_id
        global obj

        if request.method=='POST':
            return redirect('/read/'+request.form['Filename'])
        content = 'Add file name to the url to see his content, you could also click on view page files links or enter a filename in the form below'

        try:
            return render_template('read.html', content = content, phyML_status=obj.status(), phyML_id=obj.id)
        except:
            return render_template('read.html', content = content, phyML_status=status, phyML_id=phyML_id)



    #test des vues contenant les mails
    #@app.route("/r")
    #def mail():
    #    return render_template('/mail/project_Done.html',filename='a', jobName='yeayea')

    
    
    #nouvelle fonction view
    @app.route("/view")
    def view():
        '''
        Retourne un JSON avec la liste des fichiers consultables
        '''
        global status
        global phyML_id
        global obj

        listFiles = listdir(app.config['UPLOAD_FOLDER'])

        toDel=[]
        indx=0

        # verifier que le fichier n'est pas un input et l'ajouter dans sting
        for filename in listFiles:
            #print (filename)
            if '_phyml_' not in filename:  # 'output doit etre ajouter au nom des fichiers produits par PhyML
                toDel.append(indx)
            indx+=1


        for i in toDel[::-1]:
            #print (listFiles[i])
            del listFiles[i]
        #print (listFiles)

        # if result folder is not empty or (if analysis and if analysis is done) # a ajouter
        if len(listFiles) == 0:
            flash('Folder empty, please make analysis before trying to see a file', 'warning')

        try:
            return render_template('view.html',listFiles=listFiles, phyML_status=obj.status(), phyML_id=obj.id)
        except:
            return render_template('view.html',listFiles=listFiles, phyML_status=status, phyML_id=phyML_id)



#nouvelle fonction readfile


    @app.route("/read/<filename>/")
    def readFile (filename=None):
        global status
        global phyML_id
        global obj

        '''
        retourne le contenu du fichier passé en paramètre dans un JSON
        '''
        #verifier le status de l'execution en cours
        #afin d'être certain que le fichier est terminé
        #if phyMl.status != 2:
        # Do something

        #test if file exist in results folder
        filenamepath = app.config['UPLOAD_FOLDER'] +'/'+ filename

        print (filenamepath)
        print (os.path.isfile(filenamepath))

        if os.path.isfile(filenamepath) == False:
            filename = None
            flash('Error : file doesn\'t exist, check filename and try again', 'warning')
            content = filename
            fileContent = []

        else:
            string=''
            file =open(filenamepath,'r')
            for line in file:
                string += line
            fileContent = string.split('\n')

            #reste à renvoyer en json, j'obtien un resultat degueu si j'utilise json.dumps ou que je modifie le code

        try:
            return render_template('readFile.html', fileLines = fileContent, phyML_status=obj.status(), phyML_id=obj.id)
        except:
            return render_template('readFile.html', fileLines = fileContent, phyML_status=status, phyML_id=phyML_id)

    return app
    
#pour l'executer directement du fichier
if __name__ == "__main__":
    app.run()
