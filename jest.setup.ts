import "@testing-library/jest-dom";

// jsdom doesn't implement scrollIntoView — polyfill it
if (typeof window !== "undefined") {
  if (!window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  }
  if (!window.Element.prototype.scrollIntoView) {
    window.Element.prototype.scrollIntoView = jest.fn();
  }
  
  // jsdom doesn't implement matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}



// jsdom doesn't implement fetch globally in older node versions, or Request/Response
if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    url: string;
    method: string;
    headers: any;
    body: any;
    constructor(input: string, init?: any) {
      this.url = input;
      this.method = init?.method || 'GET';
      this.headers = init?.headers || {};
      this.body = init?.body || null;
    }
    json() { return Promise.resolve(JSON.parse(this.body)); }
  } as any;
}
if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    body: any;
    status: number;
    constructor(body?: any, init?: any) {
      this.body = body;
      this.status = init?.status || 200;
    }
    json() { return Promise.resolve(JSON.parse(this.body)); }
  } as any;
}

if (!global.fetch) {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
  ) as any;
}
