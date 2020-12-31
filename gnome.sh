git pull

export GOOGLE_APPLICATION_CREDENTIALS="./google-translate-key.json"

if [ "$1" = "-r" ]; then
	node gnome.js | tee log.txt
else
	node gnome.js | tee -a log.txt
fi
