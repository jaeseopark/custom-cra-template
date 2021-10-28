# react-imf

react-imf is an iMessage client you can run in your browser. The app is targeted towards hybrid computer users who use both Mac and Windows. You must own an iCloud-enabled device to use as the proxy.

<img src="https://user-images.githubusercontent.com/20038316/139202363-12cc4710-4632-4172-8c3f-f736b9140816.png" />

## Features

* Continue where you left off on your Mac.
* Send and receive iMessage/SMS.
* Switch between contacts.

For upcoming features, refer to [Issues](https://github.com/jaeseopark/react-imf/issues).

## Usage

### Pre-requisite

[imessageforwarder](https://github.com/jaeseopark/imessageforwarder) must be already running on your Mac. It is recommended that imessageforwarder and react-imf are hosted on the same device. If you are hosting the apps on separate devices, make sure to update `.env` accordingly.

### Run the app

```bash
yarn install && yarn start

# or

docker-compose up --build -d
```

Note: for Docker Compose users, the default timezone is [America/Denver](docker-compose.yml#L13). Update it to match your local timezone.
