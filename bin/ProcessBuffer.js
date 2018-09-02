/* eslint-env node */
/* eslint-disable no-plusplus */

/**
    ProcessBuffer is a class that takes a bunch of asynchronous functions (or any function,
        really) and puts them into a queue. When you're all full up, tell it to start, and
        it will run them all, but only a specified number at a time, until they're all done.
        You can specify the maximum number of things to run at once, and give the buffer a
        callback function to execute when it's all done.
*/

const DEFAULT_MAX_PROCESSES = 8;

module.exports = class {
  /**
   * Create a new Processbuffer.
   * @constructor
   * @param {number} maxProc - The maximum number of processes to run at any time.
   * @param {function} callback - A function to execute when all processes are finished.
   * @param {array} queue - A starting list of functions to run.
   */
  constructor(maxProc = DEFAULT_MAX_PROCESSES, callback = () => {}, queue = []) {
    this.maxProc = maxProc;
    this.callback = callback;
    this.queue = queue;
    this.numProc = 0; // the number of currently running processes
    this.running = false;
  }

  /**
   * Add a new function to the process queue.
   * The function added must take one argument, which is the callback that ProcessBuffer
   * will use to do the next thing when the async function is done. Make sure to also
   * call that callback function in the callback of your asynchronous function. Callback.
   * @param {function} func - The function to add.
   */
  add(func) {
    if (this.running) {
      throw new Error('Cannot add function to ProcessBuffer while running');
    }
    this.queue.push(func);
  }

  /**
   * Start the process queue running.
   */
  run() {
    this.running = true;
    const qlen = this.queue.length;

    const next = () => {
      this.numProc--;
      if (this.numProc === 0 && this.queue.length === 0) {
        this.callback();
      } else {
        enqueue(); // eslint-disable-line no-use-before-define
      }
    };

    const enqueue = () => {
      if (this.numProc < this.maxProc && this.queue.length > 0) {
        // console.log('ADDING', this.numProc, 'running', this.queue.length, 'remaining');
        this.numProc++;
        this.queue.shift()(next);
      }
    };

    for (let i = 0; i < qlen; i++) {
      if (this.numProc >= this.maxProc) {
        break;
      }
      enqueue();
    }

    this.running = false;
  }

  /**
   * Clear the process queue and stop processing.
   */
  clear() {
    this.queue = [];
    this.running = false;
  }
};
