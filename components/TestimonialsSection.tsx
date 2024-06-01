import { getAllTestimonials } from "lib/content";
import { getWebsiteMember } from "lib/members";
import { Quote } from "lucide-react";
import { Button } from "./Button";
import { MemberImage } from "./MemberImage";
import { Track } from "./Track";
import { Arrow } from "./icons";

export const TestimonialsSection = async () => {
  const testimonials = await getAllTestimonials();

  return (
    <section id="testimoials">
      <h2 className="mb-2 text-base font-bold md:text-2xl">
        Das sagen die Macher:innen
      </h2>
      <p className="mb-10 text-base opacity-60 md:text-2xl">
        Unsere Mitglieder:innen über die Makers League:
      </p>
      <ul className="flex flex-col gap-4 sm:gap-8 md:flex-row">
        {testimonials.map(async (testimonial, index) => {
          const member = await getWebsiteMember(testimonial.data.name);

          return (
            <li
              key={index}
              className="flex flex-1 flex-col items-center gap-4 bg-blue p-4 text-dark sm:p-8"
            >
              <div className="mb-4 flex w-full items-center gap-4">
                <div className="relative flex-none">
                  <div className="absolute -left-4 -top-4 flex items-center justify-center rounded-full bg-dark p-2 text-light">
                    <Quote className="size-6 sm:size-8" />
                  </div>
                  <MemberImage
                    member={member}
                    className="block size-24 rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold md:text-2xl">
                    {member.name}
                  </h3>
                  <p className="text-sm opacity-60 sm:text-base">
                    {member.slogan}
                  </p>
                </div>
              </div>

              <div className="prose text-sm">{testimonial.content}</div>

              <Track
                event="Testimonial clicked"
                data={{
                  name: member.name,
                }}
                className="mt-8 flex w-full flex-col md:items-start"
              >
                <Button
                  color="dark"
                  variant="outline"
                  size="small"
                  href={`/mitglieder/${member.slug}`}
                >
                  <Arrow className="text-2xl" />
                  Steckbrief
                </Button>
              </Track>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
