# 3482450 README

This readme is related to marking. See readme in src for lanch instructions.

## node version:

USING NODE: V17.6.0

standard React npm install /start to run app on port /3000 - see readme in src folder. 


## sections completed and notes: 

### pass:

All sections of the pass section were completed. Styling was done using React-Bootstrap. 
I applied the Regex method demonstrated in the week 4 RMIT lab sessions for the login and registration inputs. 


I used the React-bootstrap alerts for error messages and successful registration. 

user has a default profile page they land on. contains join date, name , email and three edit options.

### credit:

user can edit their name and email

user can change their password

user can delete their account- this also deletes all comments and posts by the user. 

changing the name/email or password users the React-bootstrap alerts. Deleting the account requires confirmation. Upon deletion it uses the default Javascript alert- I ran out of time to convert this to React-bootstrap alerts as well. 


### Distinction:

users can create posts. users can upload an image and this is saved to a state to be stored in a later backend. 


However currently the pictures are not saved to the local machine. A generic picture is used on the feed page. 

posts must be between 1 and 250 characters. 

For the posts I store a post counter in the local storage that is incremented and used as the post ID at the moment until a backend is made where this will be replaced with the PK. without this post counter simulating a PK, deleting a post causes new comments to be assigned to the wrong post. 

All posts from all users are accessable on the feed. 


### High Distinction. 

I only completed a small part of this section. 

users can reply to posts with a comment- these comments are threaded onto the specific post under the post. 

users cannot reply to comments.

for deleting a post- when a user deletes their account all their assosciated post and comments are deleted- however I ran out of time for implemented per a comment/post deleting. 

No MFA. 