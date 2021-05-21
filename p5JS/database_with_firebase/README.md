# Name of the file

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow) 


## What does it do ? ✨
This is a template to write and retrieve data to and from firebase.
The web page lets you fill-up a form and publish the data. You can also retrieve the data.

## What hardware is needed ? 💾 🔌
No hardware is needed.

## Software dependencies 🌈 📂
- p5js.
- a firebase account with a database setup for public access.

## How to run ? 🚀
- run the live server from the index.html file


## How to modify ? 🔩 🔨
- configure your own firebase account.
- change the form.

## How to configure firebase ? 🔥🧯
- Create an account on firebase : https://firebase.google.com/?hl=fr
- Go to the firebase console.
- Create a new project
- Go to https://console.firebase.google.com/project/--{your-project-name}--/database/rules
 => set *'read'* and *'write'* parameters to *true*.
- Click on cog on the upper left hand side *"project overview"* and choose *"projects settings"*
 => you'll fin at the bottom all the data you need to configure your access.

## Be Careful ⚠️
** Do as I say not as I do ! **

- When you edit the rules you put all your data readable and writable by eveyrone, this is not good and **you don't want to publish code like this.**
- Same goes for the data you have to fill-in to make this work : **don't publish it !**

The example here does register all the information needed to connect to a database (with api key etc), this is for the sake of showing what it looks like and having an example that works right out of the box But don't publish your credentials and api keys !

## Additional resources 📄 📗
- https://firebase.google.com/docs/web/setup#from-the-cdn_1
- https://shiffman.net/a2z/firebase/

