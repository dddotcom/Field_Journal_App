=====Deployed URL=====

https://lildarwinsfieldjournal.herokuapp.com/

=====User Stories====
//Role, Goal, Motivation
1. As an advid hiker that enjoys taking photos with my iphone of the cool things I see on my hike I would like an app that allows me to create a log of the cool things I see - like a field journal. Something that allows me to organize my specimens wheter it be plants, animals, bugs or just cool findings.
2. As a mother I want an app that my children can use to learn more about the environment around them. My children enjoy technology but I want a way to get them outside more. I would like to see an interactive app that would allow them to log things of their interests, things they found neat or fascinating such as plants, animals, bugs. I want my children to be able to take a picture then write a brief title and description of their finding. Then later and we can perform a reverse image search to find out what the specimen actually is making it an educational experience for them.
3. As someone who enjoys walks in the neighborhood. I see my neighbors have beautiful plants and flowers in their yard. I would like an app that allows me to take a picture of a beautiful flower that I would like to have in my yard someday. I would like to be able to provide a brief description of the plant, how the owner planted it (around other plants, soil type, sun etc.). Then perform a reverse image search on the flower when I get home to find out what it actually is so I can decide if I would like to plant this flower in my yard as well..


======Steps=======
1. Write Code to create a new user. Thsi will communicate with the user model in my db.
2. Write Code to create a new group. This will communicate with the group model in my db.
3. Write code to create a login. The login will loook to the user model to see if the user exists or not. If user exists ask user to login with correct credentials. If user is new direct to the create a user page.
4. Implement the Cloudinary API so that the user can host images in the cloud. Find a way to also bring those pictures into the journal so that the user can see the images, title and description all on the same page -- the userjournal page.
5. Create an edit page so that the user can edit their entries. (IE the user found the actual name of the entry on the web and wants to rename their journal entry.)
6. Give the user a way to delete journal entries.

=====Technologies Used=====
1. Ajax for Edit and Delete
2. Passport as authentication middleware.
3. isLoggedIn middleware in order to access user pages.
4. Node Modules used: Express, EJS Layouts, Sessions, body parser, flash
5. Bcrypt for password hashing
6. API used: Cloudinary
7. Postico - 3 Models (user, group, journal)


=====STRETCH GOALS=====
1. Create a group page that enables the user to login and see other folks journal entries.
2. Find a way for users to belong to multiple groups.


======STUFF I NEED TO FIX!=====
1. Create seperate journals for each person that logs in. Keeps taking user to same 1 log in screen.
2. Create Group capability so user can see other entries in same group.
3. Username and userId are not posting to journal table. FIX!
4. When user hits edit button redirect back to userjournal page.
5. Fix back button on edit page as well -agh??
