git pull

if [ "$1" = "-r" ]; then
	node gnome.js | tee log.txt
else
	node gnome.js | tee -a log.txt
fi
