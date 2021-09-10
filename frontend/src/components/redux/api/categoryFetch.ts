
export const getCategoryFromServer = () => {
  return fetch('http://localhost:8080/categories/')
    .then((res) => res.json())
    .then((res) =>  res.categoriesFind);
};
