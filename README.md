# bigcanvasdemo
Multiplayer drawing web app (similar to the "Million Dollar Homepage" or Reddit's "Place") in Javascript, Firebase, PHP, Python, and Linux/Apache.

YouTube video walkthrough: <a href=https://youtu.be/t1aXuJkmTg8>https://youtu.be/t1aXuJkmTg8</a><BR>

# Installation
If you wish to deploy your own instance, here are a few changes necessary:
- Create a Firebase project and make a file `creds.json` for your credentials.
- Bring in the color-picker https://github.com/Simonwep/pickr using `git clone`.
- Comment out the validation check in `draw.php`.
- Create a folder "tmp/" and run `chmod 777 tmp/`
