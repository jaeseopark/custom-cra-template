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

[imessageforwarder](https://github.com/jaeseopark/imessageforwarder) must be already running on your Mac. It is recommended that imessageforwarder and react-imf are hosted on the same device. If you are hosting the apps on separate devices, make sure to update [`REACT_APP_IMF_HOST`](docker-compose.yml#L15) accordingly.

### Run the app

```bash
docker-compose up --build -d
```

Note: the default timezone is [America/Denver](docker-compose.yml#L13). Update it to match your local timezone.

### Development

```bash
yarn install
yarn start

# or

docker-compose --file docker-compose-dev.yml --build up
```

## Configurations

|Environment Variable|Values|Notes|
|---|---|---|
|`REACT_APP_IMF_HOST`|localhost<br>192.168.0.100<br>livingroom.local|The hostname of the imessageforwarder server.|
|`REACT_APP_IMF_PORT`|3237|The port the imessageforwarder server is listening to.|
|`REACT_APP_IMF_MOCK`|ON<br>OFF|Enables the mock mode. This mode leverages [`IMFMockClient`](src/client/mock.ts) to mimic human interactions. When enabled, `REACT_APP_IMF_HOST` and `REACT_APP_IMF_PORT` are no longer needed.|
|`REACT_APP_IMF_PRELOADED_RECIPIENT_COUNT`|20|<p>_Only in the mock mode_</p>The number of people that will appear in the sidebar.|
|`REACT_APP_IMF_PRELOADED_MESSAGES_PER_RECIPIENT`|50|<p>_Only in the mock mode_</p>The number of preloaded messages per recipient.|
|`REACT_APP_IMF_RESPONSE_DELAY`|2500|<p>_Only in the mock mode_</p>How long it will take for someone to respond to your message.|
|`REACT_APP_IMF_PING_INTERVAL`|10000|<p>_Only in the mock mode_</p>The frequency of the random messages.|

## Credits

* Sounds from [Notification Sounds](https://notificationsounds.com/)
* [Production docker build guide](https://stackoverflow.com/a/68046584) by LucasBordeau
