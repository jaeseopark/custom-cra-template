# react-imf

A React implementation of [imessageforwarder](https://github.com/jaeseopark/imessageforwarder) client.

<img src="https://user-images.githubusercontent.com/20038316/139202363-12cc4710-4632-4172-8c3f-f736b9140816.png" />

## Usage

### Pre-requisite

[imessageforwarder](https://github.com/jaeseopark/imessageforwarder) must be already running on your iCloud-enabled device. imessageforwarder and react-imf can be hosted on the same device, if you choose so. If you are hosting the apps on separate devices, make sure to update `.env` accordingly.

### Run the app

```bash
yarn install && yarn start

# or

docker-compose up --build -d
```

Note: for Docker Compose users, the default timezone is [America/Denver](docker-compose.yml#L13). Update it to match your actual timezone.
