"""

TP1: encapsulation du programme PhyMl
But: créer une classe RunPhyml qui permet de gérer l'excution de ce programme
la classe sera utilisé dans un autre script Python pour manipuler le programme PhyMl

Auteurs: Logan Schwartz, Antoine Dallaire & Katia Smail
Date remise: 18 Fevrier 2016

"""


#======inclusions:

from subprocess import PIPE, Popen 
import os
import sys



#====création de la classe:
DIC_convert = {
    "inputPath":"-i",
    "SequenceTypeOption":"-d",
    #"SequenceFormatOption":"-q",              
    #"StartingTreeOption":"-u",                     
    #"OptRandomOption":"--n_rand_starts num",                      
    #"GammaOption":"-a",                              
    #"OptBranchesOption":"-o l", 
    #"OptTopoOption":"-o tlr",                            
    "MovementName":"-s",                               
    "ModelName":"-m",                                  
    #"OptaLRTOption":"-b",                               
    #"NbDataSets":"-n",                                   
    #"NbBtDataSets":"-b",                           
    #"NbCatg":"-c",                  
    #"Invar":"-v",                  
    #"InvarOption":"-v",                                      
    #"FqOption":"-f",                          
    }


def convert(js_dict, dict):
    dict_param={}
    for key,value in js_dict.items():
        if key in DIC_convert.keys():
            dict_param[DIC_convert[key]]=value
    return (dict_param)


def dict_vers_liste(dico):
    """ Cette fonction prend en paramètre  un dictionnaire et le converti
    en liste où chacune des clés est suivie de sa valeur"""
    liste =[]
    for k , v in dico.items():
        liste.append(k)
        liste.append(v)
    return liste


instance=1

class RunPhyml:
    "constructeur"
    def __init__(self, paramsFile):
        for key,value in paramsFile.items():
            if key== "PhymlPath":
                path_phyml=paramsFile[key]

        "validation des paramètres faute de quoi l'objet est rejetté"
        global instance 
        self.__Dict_param=convert(paramsFile,DIC_convert)
        self.__phyml = path_phyml
        self.__input= "-i" + paramsFile["inputPath"]
        self.__output = paramsFile['OutputPath']
        self.__param = dict_vers_liste(self.__Dict_param)
        self.__processus = None
        self.id = instance
        self.__generated_Files_list=[]
        instance += 1

    "accesseur"
    def status(self):
        "retourne le status d'exécution : (0) non commencée/ (1) en cours/ (2) terminée avec succès/ terminée avec un échec"
        if self.__processus.poll() == None:
            return 1
        elif self.__processus.poll() == 0:
            return 2
        elif self.__processus.poll() < 0:
            return 3
    

    def run(self):
        # on combine l'emplacement de phyml et les paramètres à considérer avant
        # de lancer le sous-process
        self.__param.insert(0,self.__phyml)
        self.__param.append('&')
        self.__param.append('>')
        self.__param.append(self.__output)
        
        #on set la variable cat correspondant au process que l'on veut lancer:
        proc = Popen(self.__param,stdout=PIPE)
        self.__processus=proc
        print(self.__param)
        print('le repertoir courant est'+os.getcwd())
        print ('Analyse en cours!')
       
        #liste des fichier de sortie:
        input_name= self.__input
        out_files_name_liste=[input_name+"_phyml_tree.txt", input_name+"_phyml_stats.txt", input_name+"_phyml_boot_stats.txt", input_name+"_phyml_boot_trees.txt" ]
        self.__generated_Files_list.extend(out_files_name_liste)

    def reset(self):
        "permet d'interrompre l'exécution et d'en effacé toutes les traces"
        if self.status() != 0:
            # on kill le process
            try:
                self.__processus.kill()
            except:
                pass
        # on efface les fichiers générés
            for file in self.__generated_Files_list:
                os.remove(file)
                print ('Le fichier '+file+' a été suprimé')

        else:
            print ("Aucune analyse n'à été lancé, lancez une analyse pour pouvoir utiliser cette méthode")


    def view(self):
        "retourne les fichier générés"
        "les fichiers de l'execution courante"
        "fichier completés avec succès"
        if self.status()==2:
            #return files
            return self.__generated_Files_list
            
        else:
            print("Aucun fichier générée jusqu'à maintenant, veuillez lancer une analyse")

    def read(filename):
        "retourne le contenu d'un fichier s'il existe"
        if verif_File_Exist(filename):
            f=open(filename,'r')
            return (f.read())
