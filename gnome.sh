git pull

export GOOGLE_APPLICATION_CREDENTIALS="./google-translate-key.json"

if [ "$1" = "-r" ]; then
	npm run start | tee log.txt
else
	npm run start | tee -a log.txt
fi
