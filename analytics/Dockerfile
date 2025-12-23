FROM node:20-alpine
RUN apk add --no-cache curl
WORKDIR /app/analytics

COPY analytics/package*.json ./
RUN npm install --production

COPY analytics .

EXPOSE 4000

CMD ["npm", "start"]
