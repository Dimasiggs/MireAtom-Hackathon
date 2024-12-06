docker container kill mycontainer
docker container rm mycontainer
docker build -t myimage .
docker run -d --name mycontainer -p 80:80 myimage