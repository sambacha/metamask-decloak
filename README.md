# Decloaking Metamask

### Abstract

Uncovering the application specific / design choices / practices of the Metamask client and its MetaSwap application/plugins


#### resource links for chrome extenstions 

- [crx-excvator](https://crxcavator.io/)

- [tarnish](https://thehackerblog.com/tarnish/)

- [exthouse](https://github.com/treosh/exthouse)


### assorted values / definitions 

```js
// Represents the interval time for which we check for swaps feature liveliness
export const SWAPS_LIVENESS_CHECK_INTERVAL = 6 * 60 * 60 * 1000 // 6 hours
```

### nonce

> from state logs

```json
[
  {
    "note": "transactions#approveTransaction",
    "op": "add",
    "path": "/txParams/nonce",
    "timestamp": 1629953664600,
    "value": "0x6d"
  },
  {
    "op": "add",
    "path": "/nonceDetails",
    "value": {
      "local": {
        "details": {
          "highest": 109,
          "startPoint": 109
        },
        "name": "local",
        "nonce": 109
      },
      "network": {
        "details": {
          "baseCount": 109,
          "blockNumber": "0xc7dfb2"
        },
        "name": "network",
        "nonce": 109
      },
      "params": {
        "highestLocallyConfirmed": 109,
        "highestSuggested": 109,
        "nextNetworkNonce": 109
      }
    }
  }
]
```


### specific http headers

MetaMask adds additional fields in HTTP Header requests identifying it as a client for Infura specific connectivity and general RPC providers/Applications. 
An RPC provider *could* block any request coming from *non metamask applications* by enforcing the `Origin: chrome-extenstion` part of the HTTP header. This can be spoofed obviously.

```
Infura-Source: metamask/internal
Origin: chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn
```


### unlocking `
Step 1: Create a file environments.plist inside the folder 
```bash
~/Library/LaunchAgents 
```
with the following content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>gui-environments</string>
  <key>ProgramArguments</key>
  <array>
    <string>sh</string>
    <string>-c</string>
    <string>
    /bin/launchctl setenv METAMASK_DEBUG true
  <!--  an example setting:
       /bin/launchctl setenv GOOGLE_DEFAULT_CLIENT_ID your_client_id  
    -->
    </string>
  </array>
  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
```

Regex:
```perl
'\([_]*[A-Z]\+\)\+'
```

app/scripts/controllers/plugins.js
26:const isTest = process.env.IN_TEST === 'true' || process.env.METAMASK_ENV === 'test'
fuzzylist
