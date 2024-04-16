docker build -t contacts-auth-container .
docker run -dp 127.0.0.1:4001:4001 contacts-auth-container
