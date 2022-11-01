# dice-bot
A bot that rolls dice and also gives noodle reviews!

## Usage
This bot requires a bit of setup on the user's end to be usable. 

First, you'll need to set up an application with discord. This can be done at the Discord Developer Portal, here: https://discord.com/developers/applications<br><br>
You'll have to click "New Application" at the top right, give it a name, and then hit create.
It'll take you to a page in which you can give your application a profile picture, change its name, or give it a description.
After that, you'll want to click "Bot" on the left, and then click the "Create Bot" token. It'll tell you this is irreversible - you can just click confirm. Next, you click "Reset token" and a long string of letters and numbers will appear - hang on to this, but do not share it with anyone. 

The next thing to do is add your bot to a server, which you can do by clicking on OAuth2 on the left, clicking "URL Generator", and checking "bot" and "applications.commands". Under bot permissions, the only permission that the bot will need is to send messages. This will generate a url at the bottom of the page, which you can copy and paste into your web browser to invite that bot to your server. Then, you can select a server that you have management permissions in, and add the bot to that server. 

After downloading all the files in this repo and setting up the application, you'll need to add one thing. You'll need to add a file called "config.json" in the main directory of the bot. That should be structured like this:

```
{
  "token": "add-bot-token-here",
  "clientId": "add-application-id-here"
}
```

Your token should have been set earlier - hopefully you copied it down, otherwise you'll have to get a new one! 

Your clientID is the Application ID of the application, which can be found in the "General Information" page of your application. 

After that, you should open up a terminal in your bot directory and input these two commands sequentially.

 ```
node deploy-commands.js

node .
```

This will update your bot's slash commands with discord, and start the bot. After that, if you ever want to start the bot, you just have to input that "node ." command in the terminal navigated to your bot's directory again. 
