npm run build
rsync -avz --delete dist/ hetzner:/var/www/novada.be/
