clean:
	- docker volume rm
	- docker stop
	- docker system prune

build-services:
	- cd services/auth* && npm run build
	- cd services/nft* && npm run build
	- docker login

	- cd services/auth* && docker build -t sabin2000/ticketblock-auth-service . && docker push sabin2000/ticketblock-auth-service
	- cd services/nft* && docker build -t sabin2000/ticketblock-nft-service . && docker push sabin2000/ticketblock-nft-service
	- docker-compose -f docker-compose.dev.yaml -f docker-compose.dev.yaml up --build