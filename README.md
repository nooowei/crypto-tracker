# crypto-tracker
An app for users to track their favourite crypto currency. built with MERN stack.

response example:
	res.data.RAW.BTC.USD.PRICE
	res.data.RAW.BTC.USD.PRICE

coin API call example:
  https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH&tsyms=USD&api_key=1f84fbac036921128f048004f3765eb58b91b7b7df920876211063157360463d

coin symbol api call example:
https://cryptoicons.org/api/:style/:currency/:size
https://cryptoicons.org/api/icon/eth/200       

// maybe use Backend just for user authentication, and use front end to make API calls, maybe easier
// use Redux to store the response data.
// use local storage to store cache maybe?

BACK END ????????
1. home page has basic data, a tab for each coin, display data:
  - request data in top 20 coins, in USD, EUR, and JPY
	a. Coin Symbol:           get from a different API
    - returns an image, might do it on front end, maybe just use static file.
  b. current price: 		    res.data.RAW.BTC.USD.PRICE
    - refresh interval is 5 seconds, compare price with previousState, (cur>pre ? green : red)
	c. change over 24hrs: 		res.data.RAW.BTC.USD.CHANGE24HR
  d. volume in 24hrs:       res.data.RAW.BTC.USD.VOLUME24HR

2. On click card, expand to more details:
  a. chat:   With chart.js, 24hr data, 7day data, 1 month data

3. When user logs in,
  a.  have the option to add to favorite, store it in array in DB,
  b.  send request to back end to get user data from mongoDB,
  c.  Gets user name, favourites[], and render data.
-----------------------------------------------------------------------------------------------


FRONT END
1. Use React router, Single page App, material UI, layout grid min max

2. Components Needed:
  a. NavBar
  b. Container
  c. CoinCard
