FROM mcr.microsoft.com/playwright:v1.51.1-jammy

RUN mkdir /app
WORKDIR /app
COPY . /app/

WORKDIR /app/pw-practice-app
RUN npm install --force
WORKDIR /app
RUN npx playwright install