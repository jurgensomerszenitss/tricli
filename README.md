This is a database for our favorite triangles corners

## Getting Started

First, run the development server:

```bash
npm run dev 
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Local deployment

build the image
```bash
docker build -t tricli --no-cache .
```

deploy to local docker 
```bash
docker compose -p tricli up -d
```

## Manual deployment

get the local image
```bash
docker save tricli:latest -o tricli.tar
```
upload to remote
```bash
scp tricli.tar gituser@70.34.219.118:/etc/tricli
```
on remote 
```bash
docker load -i tricli.tar
docker compose -p tricli up -d
```

Open [http://localhost:5004](http://localhost:5004)

