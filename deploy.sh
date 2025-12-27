npm run build
rsync -avz --delete \
  --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r \
  dist/ hetzner:/var/www/novada.be/
