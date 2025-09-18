FROM node:20-slim

# Base setup as root
WORKDIR /app
RUN apt-get update \
 && apt-get install -y --no-install-recommends git ca-certificates python3 make g++ \
 && rm -rf /var/lib/apt/lists/*

# Ensure writable paths for the node user before any volume mount
RUN mkdir -p /app/node_modules /home/node/.cache/yarn \
 && chown -R node:node /app /home/node

# Install deps as the node user so ownership is correct
USER node
COPY --chown=node:node package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# Copy source as node
COPY --chown=node:node . .

EXPOSE 3000
CMD ["yarn","start"]
