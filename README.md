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

[imessageforwarder](https://github.com/jaeseopark/imessageforwarder) must be already running on your Mac. It is recommended that imessageforwarder and react-imf are hosted on the same device.

### Run the app

```bash
docker-compose up --build -d
```

Note: the default timezone is [America/Denver](docker-compose.yml#L13). Update it to match your local timezone.

### Development

```bash
yarn install
yarn start
```

## Configurations

|Environment Variable|Values|Notes|
|---|---|---|
|[`REACT_APP_IMF_PRELOADED_RECIPIENT_COUNT`](.env.development#L1)|20|<p>_Only in the mock mode_</p>The number of people that will appear in the sidebar.|
|[`REACT_APP_IMF_PRELOADED_MESSAGES_PER_RECIPIENT`](.env.development#L2)|50|<p>_Only in the mock mode_</p>The number of preloaded messages per person.|
|[`REACT_APP_IMF_RESPONSE_DELAY`](.env.development#L3)|2500 (ms)|<p>_Only in the mock mode_</p>How long it will take for someone to respond to your message.|
|[`REACT_APP_IMF_PING_INTERVAL`](.env.development#L4)|30000 (ms)|<p>_Only in the mock mode_</p>The frequency of the random incoming messages.|

## Credits

* Sounds from [Notification Sounds](https://notificationsounds.com/)
