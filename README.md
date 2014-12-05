# Modus
http://wayland.campus.ltu.se:3000

The Modus project is a media rating search engine combined with 

## Requirements
- MongoDB.
- Node.js v0.10.33 with NPM (How to install: https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)
- Facebook and Google developer apps.


## How to install and start (on Ubuntu/PC/Mac/Unix/etc)    
```sh   
git clone https://github.com/mbumba/traffic-alerts 
cd traffic-alerts
npm install    #will install all project dependencies
```
Now is the time for create new MySQL database and then import the table from file: traffic-alerts.sql
```sh
mysql -u username -p   #Type your MySQL username instead of username
#After login you should get a MySQL prompt and type this:
CREATE DATABASE traffic-alerts;
EXIT;
#Now you can import table from .sql file:
mysql -u username -p -D traffic-alerts < traffic-alerts.sql #Type your MySQL username instead of username
```
Edit the server configuration file and set MySQL credentials and Facebook APP credentials
```sh
nano config.js
```
Edit the Facebook loader for client side and set Facebook APP id
```sh
nano public/js/facebook-loader.js
```
In this point is everything ready for run the application.
```sh
nodejs .
```
If you didn't change application PORT, it will run on port 8888

## How to use TrafficAlerts API
The simple example, how tu use TA API is included in this project in direcotory: **api-example**. Please read comments of code in file **index.html** in this directory.

## How to use only client side application
Use only directory: **public**, which contains everything for client side.
 
Edit the Facebook loader and set your Facebook APP id
```sh
nano public/js/facebook-loader.js
```
Then edit TrafficAlerts APP file and set Host variable on line 12, if you want to use this server basically set: 'http://cloud-25.skelabb.ltu.se:80'
```sh
nano public/js/app.js
```
