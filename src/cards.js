// add new Card to list method
export const addNewCard = (data, lists) => {
  let findList = lists.find((list) => list.id === data.id);
  // check if cards are empty
  let maxFoundID = findList.cards.length
    ? Math.max(...findList.cards.map((card) => card.id))
    : 0;
  findList.cards.push({
    id: maxFoundID + 1,
    title: data.title,
    description: "",
    image: {
      filename: "",
      alt: "",
    },
    labels: [],
    tags: [],
  });
};

// delete card from List
export const deleteCard = (data, lists) => {
  if (!data.listID || !data.cardID) return;

  let findList = lists.find((list) => list.id === data.listID);
  findList.cards = findList.cards.filter((card) => card.id !== data.cardID);
};

// edit card title
export const editCardTitle = (data, lists) => {
  if (!data.listID || !data.cardID || !data.title) return;

  let findList = lists.find((list) => list.id === data.listID);
  let findCard = findList.cards.find((card) => card.id === data.cardID);
  findCard.text = data.title;
};

// update card description
export const updateCardDescription = (data, lists) => {
  if (!data.listID || !data.cardID || !data.text) return;

  let findList = lists.find((list) => list.id === data.listID);
  let findCard = findList.cards.find((card) => card.id === data.cardID);
  findCard.description = data.text;
};

// add new tag
export const addNewTag = (data, lists) => {
  if (!data.listID || !data.cardID || !data.tag) return;

  let findList = lists.find((list) => list.id === data.listID);
  let findCard = findList.cards.find((card) => card.id === data.cardID);

  if (findCard.tags.find((tag) => tag === data.tag)) return;
  findCard.tags.push(data.tag);
};

// add new label
export const addNewLabel = (data, lists) => {
  if (!data.listID || !data.cardID || !data.label) return;

  let findList = lists.find((list) => list.id === data.listID);
  let findCard = findList.cards.find((card) => card.id === data.cardID);

  if (findCard.labels.find((label) => label === data.label)) return;

  findCard.labels.push(data.label);
};
