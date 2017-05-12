# Phymlize
## Phyml web server for phylogenic analysis

![Alt text](/suprim_circupix_treedyn1.jpg?raw=true "phylogenic tree")

Phymlize is a web server used for phylogenic analysis written in python2 such as what could be found on [ATGC website](http://www.atgc-montpellier.fr/phyml/). It is based on [Phyml application](http://www.atgc-montpellier.fr/download/papers/phyml_2010.pdf). Output file could then be visualized through phylogenic tree visualization tool.

#### Dependencies
- Python 2
- Flask
- Phyml (should be executable through terminal)

### Initialization

#### To launch the server (Back-end)
After installing dependencies, and editing mail account information in config.py, type the following commands from 'egn_server' folder:

        $ chmod +x run.py
        $ ./run.py

#### How to use it (Front-end)

Once the server is up, type URL displayed in the terminal (after executing the last command) in your browser's URL bar.
Per default, it should be <http://localhost:8084> but may change depending on your flask configuration.

##### Start an analysis

* Upload a phylip file to the 'New' view form, complet input parameters and click on the "save parameter" button. 
* Confirm input parameter in the 'Run' view and click on the 'Run analysis' button.
* You could check anytime the analysis status by clicking on the 'status' button. Please not that there is also two buttons indicator in the top right corner displaying this info.
* If you find that you've done a mistake entering input parameter, you could stop analysis and erase all associated file at anytime by clicking on the 'reset' view
* Once analysis is done, click on the 'view' view and click on desired filename to display his content. You could also search for a specific filename in the 'Read' view.

Please refer to Phyml [article]((http://www.atgc-montpellier.fr/download/papers/phyml_2010.pdf)) and [website](http://www.atgc-montpellier.fr/phyml/) for input information.

#### Example pictures

![Alt text](/Sélection_021.jpg?raw=true "home")

![Alt text](/Sélection_022.jpg?raw=true "New analysis")

![Alt text](/Sélection_023.jpg?raw=true "view")

![Alt text](/Sélection_024.jpg?raw=true "output description")

