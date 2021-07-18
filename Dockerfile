FROM node:14.15.0-alpine as builder

RUN apk add --no-cache make gcc g++ python git

WORKDIR /app
# Copy package.json in advance for caching
COPY package*.json /app/
RUN npm ci --unsafe-perm

COPY . /app
RUN npm run build

# ---

FROM node:14.15.0-alpine

WORKDIR /app

# Copy package.json in advance for caching
COPY --from=builder /app/package*.json /app/
RUN npm ci --unsafe-perm --silent --production

COPY --from=builder /app/src/assets/ /app/src/assets/
COPY --from=builder /app/ormconfig*.js /app/
COPY --from=builder /app/dist/ /app/dist/
COPY --from=builder /app/upload/ /app/dist/upload/

CMD ["npm", "run", "start:prod"]