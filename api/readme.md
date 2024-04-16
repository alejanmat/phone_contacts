docker-compose -f ./elastic_conf.yml up

docker build -t contacts-api-container .
docker run -dp 127.0.0.1:4000:4000 contacts-api-container
