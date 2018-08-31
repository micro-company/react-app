function listener(event) {
  console.warn('EVENT', event)
}


// window.addEventListener('message', listener)
// window.attachEvent('onmessage', listener)

export default () => next => action => {
  const win = window.frames.target
  console.warn('window', window)
  win.postMessage('TEST', '*')
  win.addEventListener('message', listener)

  return next(action)
}
