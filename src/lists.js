// add new List method
export const addNewList = (title, lists) => {
  // check if cards are empty
  let maxListID = lists.length ? Math.max(...lists.map((list) => list.id)) : 0;
  lists.push({
    id: maxListID + 1,
    title: title,
    cards: [],
  });
};

// update List Title
export const updateListTitle = (data, lists) => {
  if (!data.id || !data.text) return;

  let list = lists.find((list) => list.id === data.id);
  list.title = data.text;
};

// delete list
export const deleteList = (listID, lists) => {
  if (!listID) return;
  return lists.filter((list) => list.id !== listID);
};
