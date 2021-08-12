To start website

Need to install Node.js & NPM module. 
Please look at this Website: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04 
This website explains how to install Node.js & npm. 


1. go to frontend folder (`cd some_path\Test_web\frontend`)
2. Type `npm install`
3. Type `npm run build`
4. go to backend folder (`cd some_path\Test_web\backend`)
5. Type `npm install`
6. Type `npm start` 
7. If you want to deploy it as background 
    1. Type `sudo forever start server.js` (run this website as background)
    2. Type `sudo forever list` (show the list of running programm)
    3. Type `sudo forever stop 0` (stop the first of list)


`create_table.sql` is to make new table for admin account. 