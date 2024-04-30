# Enter the directory of the script
cd $(dirname $0)

# Pull the latest changes from the remote repository
git fetch --all

# Check if the main branch has been updated
if git merge-base --is-ancestor origin/main main; then
    echo No recent changes in main branch
else
    echo Pulling latest changes from main branch
    git pull origin main
    docker compose up -d --force-recreate --build gnomebot
fi
