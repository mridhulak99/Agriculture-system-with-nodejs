sudo kill $(sudo lsof -t -i:5000)
node app.js &
