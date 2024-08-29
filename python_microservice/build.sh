#!/bin/bash

# Variables
app_name="template-python-microservice"
username="dpuertamartos"
tag="latest"

# Set the target architectures
architectures="linux/amd64"

# Navigate to the directory where the Dockerfile is located
cd "$(dirname "$0")"

# Check if the builder exists and remove if it does
if docker buildx ls | grep -q mybuilder; then
    docker buildx rm mybuilder
fi

# Create and use a new Buildx builder instance
docker buildx create --name mybuilder --use

# Start the builder
docker buildx inspect --bootstrap

# Build and push the image for both amd64 and arm64 architectures
docker buildx build -f Dockerfile -t $username/$app_name:$tag --platform $architectures --push .

docker buildx rm mybuilder