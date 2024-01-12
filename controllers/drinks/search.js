const { ctrlWrapper } = require("../../helpers");
const { Drink } = require("../../models/drink");

const search = async (req, res) => {
  const {
    category = "",
    ingredient = "",
    keyword = "",
    page = 1,
    limit = 9,
  } = req.query;

  const searchDrink = await Drink.aggregate([
    {
      $match: {
        $and: [
          {
            drink: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            category: {
              $regex: category,
              $options: "i",
            },
          },
          {
            ingredients: {
              $elemMatch: {
                title: {
                  $regex: ingredient,
                  $options: "i",
                },
              },
            },
          },
        ],
      },
    },
    { $skip: (page - 1) * limit },
    { $limit: Number(limit) },
    {
      $group: {
        _id: null,
        data: {
          $push: {
            drink: "$drink",
            drinkThumb: "$drinkThumb",
            category: "$category",
            ingredients: "$ingredients",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        data: 1,
      },
    },
  ]);

  const totalItemsCount = await Drink.aggregate([
    {
      $match: {
        $and: [
          {
            drink: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            category: {
              $regex: category,
              $options: "i",
            },
          },
          {
            ingredients: {
              $elemMatch: {
                title: {
                  $regex: ingredient,
                  $options: "i",
                },
              },
            },
          },
        ],
      },
    },
    {
      $count: "total",
    },
  ]);

  const totalItems = totalItemsCount.length > 0 ? totalItemsCount[0].total : 0;

  res.json({
    data: searchDrink[0]?.data || [],
    total: totalItems,
  });
};

module.exports = {
  search: ctrlWrapper(search),
};
