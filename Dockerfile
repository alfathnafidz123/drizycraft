# How to build & deploy
# run script `npm run build`
# run script `docker build --platform linux/amd64 -t registry.quadrakaryasantosa.com/drizy-client:v0.3 .`
# run script `docker push registry.quadrakaryasantosa.com/drizy-client:v0.3`
FROM node:18-alpine
LABEL author="asb"

WORKDIR /app

COPY yarn.lock ./
COPY node_modules ./node_modules
COPY public ./public
COPY next.config.js ./

COPY .next/standalone ./
COPY .next/static ./.next/static

ENV NEXT_SHARP_PATH=/tmp/node_modules/sharp
EXPOSE 3000

CMD ["node", "server.js"]