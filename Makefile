# Variables
DOCKER_COMPOSE_FILE = docker-compose.yml
DOCKER_COMPOSE = docker-compose
ENV_FILE = .env

# Targets
.PHONY: all build up down logs clean restart

all: build up

build:
	@echo "Building Docker containers..."
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up --build -d

up:
	@echo "Starting the application..."
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d

down:
	@echo "Stopping the application..."
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down

logs:
	@echo "Displaying logs..."
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs -f

clean:
	@echo "Cleaning up Docker containers and images..."
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down --rmi all --volumes --remove-orphans
	docker system prune -f

restart: down up

# Include .env file if it exists
ifneq (,$(wildcard $(ENV_FILE)))
	include $(ENV_FILE)
	export
endif
