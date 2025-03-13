# Gameboxd
![Gameboxd logo](frontend/public/images/gameboxd-logo-solid.png)
Gameboxd is a MERN stack full stack web application that allows users to track the games they play, share their opinions on games, and connect with friends with similar game interests as them. 
## Table of Contents
- [Features](#features)
- [Setup](#setup)
- [Authors](#authors)
## Features
- **Game listings**: Users can view game pages through finding them on the home screen, filtering for them using genre tags, or searching for specific games through the search bar. On game pages, users can see information about a game, its overall rating on GameBoxd based on other user reviews, and see/submit reviews for the game. 
- **Lists**: Our app lets users add games to a list for their "Library", "Favorites", or a custom list of their own that they can view on their profile page. 
- **Reviews**: Our app allows users to input their own reviews for certain games and also view other users' reviews within a certain game page. The can also write private reviews which are only visible on their profile page to their friends.
- **Profile and friends**: The profile page on our app allows for users to see the lists they've created, the reviews they have written, and the friends who they have connected with. From the profile page they can also see their friend's profile's with their lists and reviews, including private reviews. 
## Setup
### Backend
**Setting up**
```
cd backend
npm install
```
Create a file in the backend folder called `.env` and add the following text:
```
MONGO_URI=mongodb+srv://cs35lteam:vLe6q1Vo90hqwIbb@cluster.fyoay.mongodb.net/game_app?retryWrites=true&w=majority&appName=Cluster
PORT=5000
SECRET=cs35L
```
The SECRET key can be any string you like.
> [!CAUTION]
> We are being nice and giving you backend access to our entire database. In a real application, we would not do this for obvious security reasons.
> Please be nice and do not destroy our database. :slightly_smiling_face:

**Running**
```
cd backend
npm start
```
This will open the backend server at [http://localhost:5000](http://localhost:5000).
### Frontend
```
cd frontend
npm install
```
**Running**
```
cd frontend
npm start
```
This will open the frontend webpage at [http://localhost:5173/](http://localhost:5173/).
## Authors
Created as a final project for CS 35L by Mahima Bhella, Jaanya Chawla, Daphne Feng, Jay Horsley, and Siddharth Taneja.\
Thanks to Professor Paul Eggert, our TAs Jiaxing, Wyatt, and Kaixuan, and the 35L LA team for their help this quarter!
