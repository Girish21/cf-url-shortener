import { createMachine } from 'xstate'

export let copyMachine = createMachine(
  {
    id: 'copy button',
    initial: 'idle',
    schema: { context: {} as TContext, events: {} as TEvents },
    states: {
      idle: {
        on: {
          CLICK: 'copying',
        },
      },
      copying: {
        entry: 'copy',
        after: {
          2000: {
            target: 'idle',
          },
        },
      },
    },
  },
  {
    actions: {
      copy: async ctx => {
        await window.navigator.clipboard.writeText(ctx.url)
      },
    },
  },
)

type TContext = {
  url: string
}

type TEvents = {
  type: 'CLICK'
}
