interface TrackingEvents {
  "Apply clicked": {
    path: string;
  };
}

export const track = <TEventKey extends keyof TrackingEvents>(
  ...args: TrackingEvents[TEventKey] extends null
    ? [event: TEventKey]
    : [event: TEventKey, data: TrackingEvents[TEventKey]]
) => {
  const [event, data] = args;
  splitbee.track(event, data);
};
