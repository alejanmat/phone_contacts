const elasticsearch = require("elasticsearch");
const elasticClient = new elasticsearch.Client({
  host: "localhost:9200",
});

const synchronizeCreate = async (item: any) => {
  return await elasticClient.index(item);
};

const synchronizeUpdate = async (data: any) => {
  return await elasticClient.update(data);
};

const synchronizeDelete = async (data: any) => {
  return await elasticClient.delete(data);
};
const searchItem = async (query: any) => {
  const response = await elasticClient.search({
    index: "contacts",
    body: {
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query: query,
                fields: ["firstName", "lastName", "description"],
              },
            },
            {
              term: {
                phone: query,
              },
            },
          ],
        },
      },
    },
  });
  console.log("response", response);
  return response.hits.hits.map((hit: any) => hit._source);
};

const deleteIndex = async () => {
  const { body } = await elasticClient.indices.delete({
    index: "contacts",
  });
};

const synchronizeAll = async (items) => {
  // await deleteIndex();
  await items.forEach(async (document) => {
    const id = document._id.toString();
    const { firstName, lastName, phone, address, description } = document;
    await synchronizeCreate({
      index: "contacts",
      type: "contactType",
      id: id,
      body: {
        firstName,
        lastName,
        phone,
        address,
        description,
      },
    });
  });
};
export {
  elasticClient,
  deleteIndex,
  synchronizeCreate,
  synchronizeUpdate,
  synchronizeDelete,
  searchItem,
  synchronizeAll,
};
