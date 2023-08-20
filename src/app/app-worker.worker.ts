/// <reference lib="webworker" />

import { longOps } from './long-operation';

addEventListener('message', ({ data }) => {
  const response = longOps(data);
  postMessage(response);
});
