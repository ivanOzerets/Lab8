# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter) 

  A: 1

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

  A: No, we would not unit test the 'message' feature of a messaging app because messaging is basically the whole app and the point of unit testing is to test small individual parts, not the whole.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

  A: Yes, we would unit test the 'max message length' feature of a messaging app because it could be considered as an individual part of the whole app, meaning it would be tested as its own unit.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

  A: If the 'headless' field was set to true, the Puppeteer would run without a brower UI and only in the console, so we cound't as easily see/review it. 

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

  A: 
