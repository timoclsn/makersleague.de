const NEXT_PUBLIC_VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;
const NODE_ENV = process.env.NODE_ENV;

export interface TrackingEvents {
  "Caught error": {
    componentStack: string;
    digest: string;
  };
  "Home hero primary clicked": null;
  "Home hero secondary clicked": null;
  "Apply clicked": null;
  "Next Stammtisch clicked": null;
  "Next Stammtisch closed": null;
  "Copy calendar subscription url": null;
  "Event section more clicked": {
    name: string;
    date: string;
  };
  "Event page sign-up clicked": {
    name: string;
    date: string;
  };
  "Testimonial clicked": {
    name: string;
  };
}

export const track = <TEventKey extends keyof TrackingEvents>(
  ...args: TrackingEvents[TEventKey] extends null
    ? [event: TEventKey]
    : [event: TEventKey, data: TrackingEvents[TEventKey]]
) => {
  const [event, data] = args;
  if (NEXT_PUBLIC_VERCEL_ENV === "production") {
    splitbee.track(event, data);
  }
  if (NODE_ENV === "development") {
    console.info("Tracking event:", {
      event,
      data,
    });
  }
};
