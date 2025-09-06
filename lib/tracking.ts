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
  "Next Event clicked": {
    name: string;
  };
  "Next Event closed": {
    name: string;
  };
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
  "Gallery opened": {
    image: string;
  };
}

export const track = <TEventKey extends keyof TrackingEvents>(
  ...args: TrackingEvents[TEventKey] extends null
    ? [event: TEventKey]
    : [event: TEventKey, data: TrackingEvents[TEventKey]]
) => {
  const [event, data] = args;

  if (NODE_ENV === "development") {
    console.info("Tracking event:", { event, data });
    return;
  }

  if (NEXT_PUBLIC_VERCEL_ENV !== "production") return;
  if (typeof window === "undefined" || !window.stonks) return;

  window.stonks.event(event, data);
};
