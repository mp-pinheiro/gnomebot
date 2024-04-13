git fetch --all
if git merge-base --is-ancestor origin/main main; then
    echo No recent changes in main branch
else
    echo Pulling latest changes from main branch
    git pull origin main
    docker compose build
    docker compose down gnomebot
    docker compose up -d gnomebot
fi
