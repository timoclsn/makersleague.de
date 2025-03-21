import { YouTubeEmbed } from "@next/third-parties/google";
import { getAllTestimonials } from "lib/content";
import { getWebsiteMemberByName } from "lib/members";
import { Quote } from "lucide-react";
import { Button } from "./Button";
import { MemberImage } from "./MemberImage";
import { Track } from "./Track";
import { Arrow } from "./icons";

const TESTIMONIAL_VIDEO_ID = "ervQBWyELPs";

export const TestimonialsSection = async () => {
  const testimonials = await getAllTestimonials();

  return (
    <section id="testimonials">
      <h2 className="mb-2 text-base font-bold md:text-2xl">
        Das sagen die Macher:innen
      </h2>
      <p className="mb-10 text-base opacity-60 md:text-2xl">
        Unsere Mitglieder:innen über die Makers League:
      </p>

      <YouTubeEmbed videoid={TESTIMONIAL_VIDEO_ID} />

      <ul className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map(async (testimonial, index) => {
          const member = await getWebsiteMemberByName(testimonial.data.name);

          if (!member) {
            return null;
          }

          return (
            <li key={index} className="flex-1">
              <article className="h-full">
                <figure className="flex h-full flex-col items-center justify-between gap-8 bg-blue p-4 text-dark sm:p-8">
                  <div className="flex w-full flex-col gap-4">
                    {/* Head */}
                    <div className="flex w-full items-center gap-4">
                      {/* Image */}
                      <div className="relative flex-none">
                        <div className="absolute -left-4 -top-4 flex items-center justify-center rounded-full bg-dark p-2 text-light">
                          <Quote className="size-6 sm:size-8" />
                        </div>
                        <MemberImage
                          member={member}
                          size={700}
                          className="block size-24 rounded-full"
                        />
                      </div>

                      {/* Name and slogan */}
                      <figcaption className="overflow-hidden">
                        <h3 className="break-words text-base font-bold md:text-2xl">
                          {member.name}
                        </h3>
                        <p className="break-words text-sm opacity-60 sm:text-base">
                          {member.slogan}
                        </p>
                      </figcaption>
                    </div>

                    {/* Content */}
                    <blockquote className="prose prose-quoteless w-full max-w-none text-sm">
                      {testimonial.content}
                    </blockquote>
                  </div>

                  {/* Button */}
                  <Track
                    event="Testimonial clicked"
                    data={{
                      name: member.name,
                    }}
                    className="flex w-full flex-col md:items-start"
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
                </figure>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
