# Twitter Watcher description

This API allow you to get some information about Twitter users.

## General information
This application is written in javascript.  
The whole package stack is [here](stack.md)  
The direction to access the API is https://twitter-getter.herokuapp.com/

---

## Information extracted
The information extracted from Twitter, for each user is showed in the
next lines with the data format:

### Information and format
    * username --> string
    * screen_name --> string
    * followers_count --> integer
    * following_count --> integer
    * photo_url --> string
    * bio --> string
    * total_tweets --> integer

---

## Endpoints
There are two endpoints to connect to the API:

### Get user information
To get user information from its Twitter profile, the next endpoint must be used:  
 - Path: `.../api/user/{username}`
 - Method: `GET`
 - Headers:
   - `Content-Type: application/json`
 - Response:
```
{
    ...
}
```

The parameter {username} is the Twitter username.  
One example of the result can be checked [here](userInfoExample.md)


### Log list
To get the complete list of users checked, the next endpoint must be used:  
 - Path: `.../api/log/list`
 - Method: `GET`
 - Headers:
   - `Content-Type: application/json`
 - Response:
```
{
   ...
}
```
One example of the result can be checked [here](listExample.md)
