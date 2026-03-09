type Breakpoint = {
  name: string
  mq: MediaQueryList
}

export function breakpointQueries(window: Window & typeof globalThis): Array<Breakpoint> {
  return [
    {name: "xs", mq: window.matchMedia("(max-width: 639.9px)")},
    {name: "sm", mq: window.matchMedia("(min-width: 640px) and (max-width: 767.9px)")},
    {name: "md", mq: window.matchMedia("(min-width: 768px) and (max-width: 1023.9px)")},
    {name: "lg", mq: window.matchMedia("(min-width: 1024px) and (max-width: 1279.9px)")},
    {name: "xl", mq: window.matchMedia("(min-width: 1280px) and (max-width: 1535.9px)")},
    {name: "2xl", mq: window.matchMedia("(min-width: 1536px)")},
  ]
}
