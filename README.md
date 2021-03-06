# Modus
- Work in progress [http://wayland.campus.ltu.se:3000]
- Blog [https://sites.google.com/site/ltumodus/]

The Modus project is a media rating search engine website combined with an E3 wristband monitor from a new business called Empatica [https://www.empatica.com/]. 

Think IMdb meets scientific data.

## API:

**GET /api/v1/movie?imdb_id=tt0903624** 

returns JSON for the movie containing:
- title
- year
- plot
- imdb_rating
- imdb_votes
- runtime
- actors
- directors
- writers
- imdb_id
- modusvalue
- contributors

**GET /api/v1/modusrating?imdb_id=tt0903624** 

returns JSON for the movie: 
- imdb_id
- modusvalue
- contributors


**GET /api/v1/uploads?user_id=117455612749622948262**

returns JSON for each movie found:
- upload_id
- bpmvalue
- creation_time
- modusvalue
- contributors
- filepath
- title
- year
- plot
- imdb_rating
- imdb_votes
- runtime
- actors
- director
- writers
- imdb_id

**POST /api/v1/upload**
- requires userid and imdb_id
- takes the file named “modusdata” as option. Needs to be .csv file.
- parses the file and saves all data in the database. Also saved the file on disk and a record of it in the database for that upload. (For graph).

## Front end:
- jQuery [https://jquery.com/]
- Bootstrap [http://getbootstrap.com/]
- FlatUI [https://designmodo.github.io/Flat-UI/]

## Back end:
- MongoDB [http://www.mongodb.org/]
- Node.js [http://nodejs.org/]
- OMdb API [http://www.omdbapi.com/]

## Authentication:
- Facebook Developers [https://developers.facebook.com/]
- Google Developers [https://console.developers.google.com/]
- Passport.js [http://passportjs.org/]

## How do I run this?
Install node.js with express framework for your OS.
Install npm.
Install nodemon (recommendation).
```sh   
git clone https://github.com/simgul-1/modus 
cd modus
npm install #Installs all dependencies.
nodemon #Runs the server (can be found on port 3000)

```
Enjoy.
