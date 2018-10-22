const params = require("../models/params");
const ebay = require("ebay-api");
const keys = require("../config/keys")

module.exports = (app) => {
  app.post("/api/finditem", (req, res) => {
      ebay.xmlRequest(
        {
          serviceName: "Finding",
          opType: "findItemsByKeywords",
          appId: keys.ebayAppId, 
          params: params(req.body.keyword),
          parser: ebay.parseResponseJson
        },
        (itemsCallback = (error, itemsResponse) => {
          if (error) throw error;
          res.send(itemsResponse.searchResult.item);
        }
      )
    );
  });
};