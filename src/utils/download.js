export default url => {
  if (!url) return;

  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.click();
};
