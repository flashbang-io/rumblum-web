(function redirect() {
  if (document && document.location) {
    document.location.replace(`/?redirect=${encodeURIComponent(document.location.pathname)}`);
  }
}());
