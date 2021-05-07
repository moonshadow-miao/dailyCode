class Context {
  constructor() {
    this.prev = null
    this.next = null
    this.done = null
  }

  stop() {
    this.done = false
  }
}


function gen(context) {
  switch (context.prev = context.next) {
    case 0:
      context.next = 1
  }
}

function generator() {
  const context = new Context()

}

