#!/usr/bin/env python

from App.app import App

app=App()

app.run(host='0.0.0.0', port=8085, debug=True)
