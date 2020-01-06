export default url => {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.click();
};
