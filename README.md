# Big Canvas Demo
Multiplayer drawing web app (similar to the "Million Dollar Homepage" or Reddit's "Place") in Javascript, Firebase, PHP, Python, and Linux/Apache.

YouTube video walkthrough: <a href=https://youtu.be/t1aXuJkmTg8>https://youtu.be/t1aXuJkmTg8</a><BR>
Demo: http://bigcanvasdemo.com/

Looking for more coding tips?
Join ex-Google/ex-Facebook engineers at http://coderpro.com for 100+ coding video explanations for Google, Facebook, and FANG companies.

# Installation
If you wish to deploy your own instance, here are a few changes necessary:
- Create a Firebase project and make a file `creds.json` for your credentials.
- Bring in the color-picker https://github.com/Simonwep/pickr using `git clone`.
- Comment out the validation check in `draw.php`.
- Create a folder "tmp/" and run `chmod 777 tmp/`
