# react-imf

react-imf is an iMessage client you can run in your browser. The app is targeted towards hybrid computer users who use both Mac and Windows. You must own an iCloud-enabled device to use as the proxy.

<img src="https://user-images.githubusercontent.com/20038316/139573787-503d238b-ab1e-4f83-b376-e9049ea3d22d.png" />

## Features

* Continue where you left off on your Mac.
* Send and receive iMessage/SMS.
* Switch between contacts.

For upcoming features, refer to [Issues](https://github.com/jaeseopark/react-imf/issues).

## Usage

### Pre-requisite

[imessageforwarder](https://github.com/jaeseopark/imessageforwarder) must be already running on your Mac. It is recommended that imessageforwarder and react-imf are hosted on the same device. If you are hosting the apps on separate devices, make sure to update [`REACT_APP_IMF_HOST`](docker-compose.yml#L8) accordingly.

### Run the app

```bash
docker-compose up --build -d
```

Note: the default timezone is [America/Denver](docker-compose.yml#L15). Update it to match your local timezone.

### Development

```bash
yarn install
yarn start
```

## Configurations

|Environment Variable|Values|Notes|
|---|---|---|
|[`REACT_APP_IMF_HOST`](docker-compose.yml#L8)|localhost<br>192.168.0.100<br>livingroom.local|The hostname of the imessageforwarder server.|
|[`REACT_APP_IMF_PORT`](docker-compose.yml#L9)|3237|The port the imessageforwarder server is listening to.|
|[`REACT_APP_IMF_MOCK`](.env.development#L1)|ON<br>OFF|Enables the mock mode. This mode leverages [`IMFMockClient`](src/client/mock.ts) to mimic human interactions. When enabled, `REACT_APP_IMF_HOST` and `REACT_APP_IMF_PORT` are no longer needed.|
|[`REACT_APP_IMF_PRELOADED_RECIPIENT_COUNT`](.env.development#L2)|20|<p>_Only in the mock mode_</p>The number of people that will appear in the sidebar.|
|[`REACT_APP_IMF_PRELOADED_MESSAGES_PER_RECIPIENT`](.env.development#L3)|50|<p>_Only in the mock mode_</p>The number of preloaded messages per person.|
|[`REACT_APP_IMF_RESPONSE_DELAY`](.env.development#L4)|2500 (ms)|<p>_Only in the mock mode_</p>How long it will take for someone to respond to your message.|
|[`REACT_APP_IMF_PING_INTERVAL`](.env.development#L5)|30000 (ms)|<p>_Only in the mock mode_</p>The frequency of the random incoming messages.|

## Credits

* Sounds from [Notification Sounds](https://notificationsounds.com/)
* [Production docker build guide](https://stackoverflow.com/a/68046584) by LucasBordeau
