class Router {
  static navigate(page, params = {}) {
    const event = new CustomEvent('navigate', { 
      detail: { page, params } 
    });
    window.dispatchEvent(event);
  }
}

export default Router;