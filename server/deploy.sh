pm2 delete aigc-server

pm2 start npm --name "aigc-server" -- run start