
export function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

// see https://gist.github.com/jed/982883
// or https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript