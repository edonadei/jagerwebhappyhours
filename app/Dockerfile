FROM node:9.10.0

# Server part
WORKDIR /src

# Add dependencies files
ADD package.json .
ADD package-lock.json .

# Install dependencies
RUN npm install

# Set timezone
RUN echo Europe/Paris > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata

# Launch server
CMD node app.js



