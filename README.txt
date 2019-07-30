   _____                      _        _____                       
  / ____|                    | |      |  __ \                      
 | |     ___  _ __  ___  ___ | | ___  | |  | |_ __ __ ___      __  
 | |    / _ \| '_ \/ __|/ _ \| |/ _ \ | |  | | '__/ _` \ \ /\ / /  
 | |___| (_) | | | \__ \ (_) | |  __/ | |__| | | | (_| |\ V  V /   
  \_____\___/|_| |_|___/\___/|_|\___| |_____/|_|  \__,_| \_/\_/    

*** Prerequisite ***
1. Node.js LTS v8 or above
2. NPM

*** How to run ***
1. run "npm install" to install the dependency in the project folder.
2. run "npm start" to run the program

*** FOR FUN ONLY ***
1. run "npm serve" to run the web version and browse http://localhost:3000

*** Usage ***
1. Read commands from the console input
    - "npm start"

2. Read the command from file stream
    - "npm start commands/cs_logo.txt"
    - "npm start < commands/cs_logo.txt"


*** Assumptions ***
1. Canvas Size
    - Max. width and height are 100
    - Min. width and height are 1
2. Any coordinate outside canvas is not valid.    
3. Allow to draw rectangle and line on a single point e.g. L 1 1 1 or R 1 1 1 1
4. The prefix of the command is case-insensitive.
5. The screen output will append on the previous.
6. For command "B"
    - Only one printable ASCII character(non-extended) is allowed
        e.g.
            enter command: B 2 2 à
            Error: Only ASCII character is supported. Please enter again.
    
    - Empty color ' ' is not supported


*** Special case ***
1. Slanting line is also implemented by using Bresenham's line algorithm
2. for command "R x1 y1 x2 y2", (x1, y1) and (x2, y2) can be any pair of opposite vertices e.g. "R 1 1 3 3" is the same as "R 3 3 1 1"
3. Canvas must be created first before any draw action, Error "The Canvas has not been created yet. Please enter again." will be thrown if there is no canvas.

*** Test ***
1. Run code test
    - "npm run test"

2. Run Perform code coverage analysis
    - "npm run test-with-coverage"

3. Run the lint check
    - "npm run lint"
