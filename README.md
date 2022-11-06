# Dance Now, a rhythm focused game built in React

Have you ever wanted to play Flash Flash Revolution or some rhythm-based game on your Mac? Now that Flash is gone, you can't play that game in the browser.  AND since you bought that $3000 MacBookk, you can't run .exe files!  Oh no!! How can you keep your 1337 keyboard pressing skills??? :(

Well, now you can hopefully capture some of that nostalgia by playing Dance Now! 

This is a game to basically mimic [FlashFlashRevolution](https://www.flashflashrevolution.com/), but in the browser.  

It's heavily a WIP and honestly who knows how it's gonna end up.  This has also probably been done before, but I haven't seen anything that is as good / reminded me of FlashFlashRevolution.

# Tech Stack
I'm trying to make this game in JavaScript so it's highly available.  I've chosen React as my JS framework for learning purposes, and I think it's cool tbh.  

Currently using JS Canvas for graphics.  I want to keep it as simple as possible, but might pivot to actual engine if the Canvas gets too clunky to work with. 

Eventually the goal is to host this in AWS cause that's all I know.  Probably gonna use AWS CDK for that.

# Development Roadmap / Goals
## State of development
As stated, this is a work in progress.  I'm horrible at ReactJS, so this is going to take a while and the code quality might suffer from my noviceness.  

## Roadmap
- get a decent looking webpage with core functionality, which includes:
    - on key press of arrow ontop of respective target (within some range), score goes up
    - arrow generation is "random"
    - music is playing in the background
- Create arrow generator
    - Input = song 
    - generates "arrow file" which should maybe be JSON of when to place arrows when song is playing 
        - Can include like colors / arrow attributes
        - Will generate the "Arrow component"
    - Game can read generation files

## Goals

# Contributing
Feel free to make an fork / make an MR!
