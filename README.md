# Modus
- Work in progress [http://wayland.campus.ltu.se:3000]
- Blog [https://sites.google.com/site/ltumodus/]

The Modus project is a media rating search engine website combined with an E3 wristband monitor from a new business called Empatica [https://www.empatica.com/]. 

Think IMdb meets scientific data.

API PART ----------------------------------
OPEN API
GET /api/v1/movie, requires imdb_id.
returns JSON for the movie containing:
-title
-year
-plot
-imdb_rating
-imdb_votes
-runtime
-actors
-directors
-writers
-imdb_id
-totalmodusvalue
-number of modus ratings

GET /api/v1/modusrating?imdb_id=tt0903624
{
    imdb_id: "tt0903624",
    modusvalue: 11.884919024242425,
    contributors: 1
}


CLOSED API
GET /myuploads, requires userid.
returns JSON for each movie user have uploaded containing:
-upload_id
-timestamp
-title
-year
-bpmvalue
-filepath
-poster_path

POST /search, requires title
returns JSON for each movie found containing:
-title
-year
-imdb_id
-poster_path

POST /upload, requires userid (will be OPEN)
takes the file named “modusdata” as option. Needs to be .csv file.
parses the file and saves all data in the database. Also saved the file on disk and a record of it in the database for that upload. (For graph).




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
```sh   
git clone https://github.com/simgul-1/modus 
cd modus
npm install    #will install all project dependencies
nodemon
```
Enjoy.
