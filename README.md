# Oh Hey!
 A simple drop-in script for site-wide notifications.
### Requirements:
* jQuery 2.2.0+

#### Basic usage:
``` Javascript
ohHey(type, message);
```

##### type (string, required)
* **confirm** - This will show a green notification with a checkmark, along with your message.
* **notice** - This will show an orange notification with a speech bubble symbol, along with your message.
* **urgent** - This will show a red notification with an exclamation point, along with your message.

##### message (string, required)
This is the message that will appear in this instance of the notification.

To use, simply load ohhey-1.0.0.js (or ohhey-1.0.0.min.js) along with ohhey.css, then just call the **ohHey()** function with some arguments like so:
``` Javascript
ohHey(confirm, "Sweet - Things went well and you're a winner!");
ohHey("notice", "FYI - This thing happened");
ohHey("urgent", "Oops - It looks like some shit broke");
```

### Customization
##### ohhey.js
There is an "options" object in ohhey.js, so far the only option is the duration of the notification. Planning on adding more, please submit suggestions.
##### ohhey-extend.css
Wanna change some visual stuff around? Use this file. Some basics are already there, make sure you load it after ohhey.css though!

###  [See a demo here](https://hrag.github.io/ohhey)
