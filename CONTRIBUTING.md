### Development

```bash
yarn install
yarn start
```

## Configurations

| Environment Variable                                                    | Values     | Notes                                                                                       |
| ----------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------- |
| [`REACT_APP_IMF_PRELOADED_RECIPIENT_COUNT`](.env.development#L1)        | 20         | <p>_Only in the mock mode_</p>The number of people that will appear in the sidebar.         |
| [`REACT_APP_IMF_PRELOADED_MESSAGES_PER_RECIPIENT`](.env.development#L2) | 50         | <p>_Only in the mock mode_</p>The number of preloaded messages per person.                  |
| [`REACT_APP_IMF_RESPONSE_DELAY`](.env.development#L3)                   | 2500 (ms)  | <p>_Only in the mock mode_</p>How long it will take for someone to respond to your message. |
| [`REACT_APP_IMF_PING_INTERVAL`](.env.development#L4)                    | 30000 (ms) | <p>_Only in the mock mode_</p>The frequency of the random incoming messages.                |
