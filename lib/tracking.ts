interface TrackingEvents {
  "Apply clicked": {
    path: string;
  };
}

export const track = <TEventKey extends keyof TrackingEvents>(
  event: TEventKey,
  data: TrackingEvents[TEventKey]
) => {
  splitbee.track(event, data);
};
