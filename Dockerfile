FROM node:20

# Create app directory and set proper ownership
WORKDIR /app

# Copy package files first
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Change ownership to node user
RUN chown -R node:node /app

# Switch to node user
USER node

EXPOSE 3000
CMD ["bash"]