# Presidents-API
## Description
This is a quick practice of creating a simple API with Express.js. The main focus is on creating the backend. So, the frontend is very lean. 
The user can do specific actions like filtering, generating a random president, get all presidents or search by name. There is an individual endpoint for each case.

## Get Started
1) Navigate to the `server` folder inside the project  
  `$ cd server`
  
2) Run nodemon  
  `$ nodemon index.js`

## Endpoints
### ALL PRESIDENTS
*returns all presidents*  
`/presidents?result=all`

### RANDOM PRESIDENT
*generates a random president*  
`/presidents?result=random`

### SEARCH BY NAME
*searches for a given name*  
Change **NAME** with the president's name  
`/presidents?result=all&search=NAME`

### FILTER BY PARTY
*returns all presidents of a given party*   
Change **PARTY** with the value of the party  
`/presidents?result=all&party=PARTY`

### FILTER BETWEEN TWO YEARS 
*returns all presidents who were elected between those two years*  
Change **START** with the starting year  
Change **END** with the ending year  
`/presidents?result=all&election=START,END`

