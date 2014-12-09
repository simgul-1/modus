# Modus
- Demo [http://wayland.campus.ltu.se:3000]
- Blog [https://sites.google.com/site/ltumodus/]

The Modus project is a media rating search engine website combined with an E3 wristband monitor from a new business called Empatica [https://www.empatica.com/]. 

Think IMdb meets scientific data.

## API:
- Add your data to a movie (limited for the time being, security and tampering reasons)
POST request to http://wayland.campus.ltu.se/upload
	title : "title"

	ADD key values here

- Get Modus data for a movie
GET request to http://wayland.campus.ltu.se/movie?title="title"




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
