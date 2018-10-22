module.exports = keyword => {
  return {
    keywords: [keyword],

    // add additional fields
    outputSelector: ["AspectHistogram"],

    paginationInput: {
      entriesPerPage: 50
    },

    // itemFilter: [
    //   { name: "FreeShippingOnly", value: true },
    //   { name: "MaxPrice", value: "150" }
    // ],

    // domainFilter: [{ name: "domainName", value: "Digital_Cameras" }]
  };
};
