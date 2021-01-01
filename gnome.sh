git pull

npm ci

if [ "$1" = "-r" ]; then
	npm run start | tee log.txt
else
	npm run start | tee -a log.txt
fi
