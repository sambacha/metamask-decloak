# Decloaking Metamask

## Notice

**Use [the new controllers repo to see the real development now via github.com/MetaMask/controllers](https://github.com/MetaMask/controllers)**


## Development Builds

```
yarn build testDev --build-type beta --omit-lockdown
```

[see safari-metamask](https://github.com/sambacha/safari-metamask)

Check the wiki in here as well


### The MetaMask Build System

> _tl;dr_ `yarn dist` for prod, `yarn start` for local development

This directory contains the MetaMask build system, which is used to build the MetaMask Extension such that it can be used in a supported browser.
From the repository root, the build system entry file is located at [`./development/build/index.js`](https://github.com/MetaMask/metamask-extension/blob/develop/development/build/index.js).

Several package scripts invoke the build system.
For example, `yarn start` creates a watched development build, and `yarn dist` creates a production build.
Some of these scripts applies `lavamoat` to the build system, and some do not.
For local development, building without `lavamoat` is faster and therefore preferable.

The build system is not a full-featured CLI, but rather a script that expects some command line arguments and environment variables.
For instructions regarding environment variables, see [the main repository readme](../../README.md#building-locally).

Generally speaking, the build system consists of [`gulp`](https://npmjs.com/package/gulp) tasks that either manipulate static assets or bundle source files using [Browserify](https://browserify.org/).
Production-ready zip files are written to the `./builds` directory, while "unpacked" extension builds
are written to the `./dist` directory.

Our JavaScript source files are transformed using [Babel](https://babeljs.io/), specifically using
the [`babelify`](https://npmjs.com/package/babelify) Browserify transform.
Source file bundling tasks are implemented in the [`./development/build/scripts.js`](https://github.com/MetaMask/metamask-extension/blob/develop/development/build/scripts.js).

> Locally implemented Browserify transforms, _some of which affect how we write JavaScript_, are listed and documented [here](./transforms/README.md).

## Usage

```text
Usage: yarn build <entry-task> [options]

Commands:
  yarn build prod       Create an optimized build for production environments.

  yarn build dev        Create an unoptimized, live-reloaded build for local
                        development.

  yarn build test       Create an optimized build for running e2e tests.

  yarn build testDev    Create an unoptimized, live-reloaded build for running
                        e2e tests.

Options:
  --beta-version      If the build type is "beta", the beta version number.
                                                           [number] [default: 0]
  --build-type        The "type" of build to create. One of: "beta", "main"
                                                      [string] [default: "main"]
  --lint-fence-files  Whether files with code fences should be linted after
                      fences have been removed by the code fencing transform.
                      The build will fail if linting fails.
                      Defaults to `false` if the entry task is `dev` or
                      `testDev`, and `true` otherwise.
                                                   [boolean] [default: <varies>]
  --omit-lockdown     Whether to omit SES lockdown files from the extension
                      bundle. Useful when linking dependencies that are
                      incompatible with lockdown.
                                                      [boolean] [default: false]
  --skip-stats        Whether to refrain from logging build progress. Mostly
                      used internally.
                                                      [boolean] [default: false]
```



## Decloaking MetaSwaps

Uncovering the application specific / design choices / practices of the Metamask client and its MetaSwap application/plugins

### V2

```js
const METASWAP_ETH_API_HOST = 'https://api.metaswap.codefi.network';

const METASWAP_BSC_API_HOST = 'https://bsc-api.metaswap.codefi.network';

const SWAPS_TESTNET_CHAIN_ID = '0x539';
const SWAPS_TESTNET_HOST = 'https://metaswap-api.airswap-dev.codefi.network';

export const SWAPS_API_V2_BASE_URL = 'https://api2.metaswap.codefi.network';
export const SWAPS_DEV_API_V2_BASE_URL =
  'https://api2.metaswap-dev.codefi.network';
export const GAS_API_BASE_URL = 'https://gas-api.metaswap.codefi.network';
export const GAS_DEV_API_BASE_URL =
  'https://gas-api.metaswap-dev.codefi.network';
```

### Metaswap ABI

you can find it here: 

`src/Metamsk_Swap_ABI.json`

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

## MetaMask Metrics - Collecting data point examples

### Custom Network Added

```js
// source: app/scripts/lib/rpc-method-middleware/handlers/add-ethereum-chain.js
    sendMetrics({
      event: 'Custom Network Added',
      category: 'Network',
      referrer: {
        url: origin,
      },
      sensitiveProperties: {
        chain_id: _chainId,
        rpc_url: firstValidRPCUrl,
        network_name: _chainName,
        // Including network to override the default network
        // property included in all events. For RPC type networks
        // the MetaMetrics controller uses the rpcUrl for the network
        // property.
        network: firstValidRPCUrl,
        symbol: ticker,
        block_explorer_url: firstValidBlockExplorerUrl,
        source: 'dapp',
      },
    });
 ```
 
 ## MetaMetrics 
 
 > a.k.a Fed's BFF

```js
// Type Imports
/**
 * @typedef {import('../../shared/constants/app').EnvironmentType} EnvironmentType
 */

// Type Declarations
/**
 * Used to attach context of where the user was at in the application when the
 * event was triggered. Also included as full details of the current page in
 * page events.
 * @typedef {Object} MetaMetricsPageObject
 * @property {string} [path] - the path of the current page (e.g /home)
 * @property {string} [title] - the title of the current page (e.g 'home')
 * @property {string} [url] - the fully qualified url of the current page
 */

/**
 * For metamask, this is the dapp that triggered an interaction
 * @typedef {Object} MetaMetricsReferrerObject
 * @property {string} [url] - the origin of the dapp issuing the
 *  notification
 */

/**
 * We attach context to every meta metrics event that help to qualify our
 * analytics. This type has all optional values because it represents a
 * returned object from a method call. Ideally app and userAgent are
 * defined on every event. This is confirmed in the getTrackMetaMetricsEvent
 * function, but still provides the consumer a way to override these values if
 * necessary.
 * @typedef {Object} MetaMetricsContext
 * @property {Object} app
 * @property {string} app.name - the name of the application tracking the event
 * @property {string} app.version - the version of the application
 * @property {string} userAgent - the useragent string of the user
 * @property {MetaMetricsPageObject} [page] - an object representing details of
 *  the current page
 * @property {MetaMetricsReferrerObject} [referrer] - for metamask, this is the
 *  dapp that triggered an interaction
 */

/**
 * @typedef {Object} MetaMetricsEventPayload
 * @property {string}  event - event name to track
 * @property {string}  category - category to associate event to
 * @property {string} [environmentType] - The type of environment this event
 *  occurred in. Defaults to the background process type
 * @property {object}  [properties] - object of custom values to track, keys
 *  in this object must be in snake_case
 * @property {object}  [sensitiveProperties] - Object of sensitive values to
 *  track. Keys in this object must be in snake_case. These properties will be
 *  sent in an additional event that excludes the user's metaMetricsId
 * @property {number}  [revenue] - amount of currency that event creates in
 *  revenue for MetaMask
 * @property {string}  [currency] - ISO 4127 format currency for events with
 *  revenue, defaults to US dollars
 * @property {number}  [value] - Abstract business "value" attributable to
 *  customers who trigger this event
 * @property {MetaMetricsPageObject} [page] - the page/route that the event
 *  occurred on
 * @property {MetaMetricsReferrerObject} [referrer] - the origin of the dapp
 *  that triggered the event
 */

/**
 * @typedef {Object} MetaMetricsEventOptions
 * @property {boolean} [isOptIn] - happened during opt in/out workflow
 * @property {boolean} [flushImmediately] - When true will automatically flush
 *  the segment queue after tracking the event. Recommended if the result of
 *  tracking the event must be known before UI transition or update
 * @property {boolean} [excludeMetaMetricsId] - whether to exclude the user's
 *  metametrics id for anonymity
 * @property {string}  [metaMetricsId] - an override for the metaMetricsId in
 *  the event one is created as part of an asynchronous workflow, such as
 *  awaiting the result of the metametrics opt-in function that generates the
 *  user's metametrics id
 * @property {boolean} [matomoEvent] - is this event a holdover from matomo
 *  that needs further migration? when true, sends the data to a special
 *  segment source that marks the event data as not conforming to our schema
 */

/**
 * Represents the shape of data sent to the segment.track method.
 * @typedef {Object} SegmentEventPayload
 * @property {string} [userId] - The metametrics id for the user
 * @property {string} [anonymousId] - An anonymousId that is used to track
 *  sensitive data while preserving anonymity.
 * @property {string} event - name of the event to track
 * @property {Object} properties - properties to attach to the event
 * @property {MetaMetricsContext} context - the context the event occurred in
 */

/**
 * @typedef {Object} MetaMetricsPagePayload
 * @property {string} name - The name of the page that was viewed
 * @property {Object} [params] - The variadic parts of the page url
 *  example (route: `/asset/:asset`, path: `/asset/ETH`)
 *  params: { asset: 'ETH' }
 * @property {EnvironmentType} environmentType - the environment type that the
 *  page was viewed in
 * @property {MetaMetricsPageObject} [page] - the details of the page
 * @property {MetaMetricsReferrerObject} [referrer] - dapp that triggered the page
 *  view
 */

/**
 * @typedef {Object} MetaMetricsPageOptions
 * @property {boolean} [isOptInPath] - is the current path one of the pages in
 *  the onboarding workflow? If true and participateInMetaMetrics is null track
 *  the page view
 */

// An empty string "" is a, currently undocumented, way of telling mixpanel
// that these events are meant to be anonymous and not identified to any user
export const METAMETRICS_ANONYMOUS_ID = '""';

/**
 * This object is used to identify events that are triggered by the background
 * process.
 * @type {MetaMetricsPageObject}
 */
export const METAMETRICS_BACKGROUND_PAGE_OBJECT = {
  path: '/background-process',
  title: 'Background Process',
  url: '/background-process',
};

/**
 * @typedef {Object} SegmentInterface
 * @property {SegmentEventPayload[]} queue - A queue of events to be sent when
 *  the flushAt limit has been reached, or flushInterval occurs
 * @property {() => void} flush - Immediately flush the queue, resetting it to
 *  an empty array and sending the pending events to Segment
 * @property {(
 *  payload: SegmentEventPayload,
 *  callback: (err?: Error) => void
 * ) => void} track - Track an event with Segment, using the internal batching
 *  mechanism to optimize network requests
 * @property {(payload: Object) => void} page - Track a page view with Segment
 * @property {() => void} identify - Identify an anonymous user. We do not
 *  currently use this method.
 */

```

### Advanced Gas Controls 

```sh
MAX_GAS_LIMIT_DEC
```

```js
        'Gas limit must be greater than 20999 and less than 7920027',
        `Gas limit must be greater than 20999 and less than ${MAX_GAS_LIMIT_DEC}`,
```


## Handling Block Reorgs

> 12 to 1500 blocks

> [source commit https://github.com/MetaMask/metamask-extension/commit/ebfd21d20a8c8bc13276de051a77c97c1ebf1c89]

```typescript 
  pollLatestBlocks(txId, txMeta) {
    const { confirmTransaction, query, resetTransactionToSubmitted } = this;
    const cnfTransaction = confirmTransaction.bind(this);
    const resetTransaction = resetTransactionToSubmitted.bind(this);
    const intervalId = setInterval(async function () {
      const block = await query.getBlockByNumber('latest', false);
      const blockNumber = new BigNumber(block.number).toNumber();
      const txBlockNumber = new BigNumber(
        txMeta?.txReceipt?.blockNumber,
      ).toNumber();
      const blockDepth = blockNumber - txBlockNumber;
      if (blockDepth >= 12) {
        cnfTransaction(txId);
        clearInterval(intervalId);
      } else {
        let currentBlock = block;
        for (let i = 0; i <= blockDepth; i++) {
          if (currentBlock.uncles?.includes(txMeta?.txReceipt?.blockHash)) {
            resetTransaction(txId);
            clearInterval(intervalId);
            break;
          }
          currentBlock = await query.getBlockByHash(block.parentHash, false);
        }
      }
    }, 1500);
  }
  // values 12 and 1500 used above are best guess, they may need to be calibrated to different networks.
  ```
