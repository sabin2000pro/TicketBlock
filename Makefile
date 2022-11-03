clean:
	- docker volume rm
	- docker stop
	- docker system prune

process-application:
	- cd backend/services/auth* && npm run build
	- cd backend/services/nft* && npm run build
	- docker login

	- cd backend/services/auth* && docker build -t sabin2000/ticketblock-auth-service . && docker push sabin2000/ticketblock-auth-service
	- cd backend/services/nft* && docker build -t sabin2000/ticketblock-nft-service . && docker push sabin2000/ticketblock-nft-service
	- cd backend && docker-compose -f docker-compose.dev.yaml -f docker-compose.dev.yaml up --build

	- cd frontend && truffle compile && truffle migrate --reset