# react-imf

A React implementation of [imessageforwarder](https://github.com/jaeseopark/imessageforwarder) client.

--insert GIF here

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
