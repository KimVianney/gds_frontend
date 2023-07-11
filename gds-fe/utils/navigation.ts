export const navigateTo = (path: string) => {
  if (window.location.pathname !== path) {
    window.location.href = path;
  }
};
