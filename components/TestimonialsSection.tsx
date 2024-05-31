import { getAllTestimonials } from "lib/content";
import { getWebsiteMember } from "lib/members";
import { getBaseUrl, isProductionDeployment } from "lib/utils";
import Image from "next/image";

export const TestimonialsSection = async () => {
  const testimonials = await getAllTestimonials();

  return (
    <section id="testimoials">
      <h2 className="mb-2 text-base font-bold md:text-2xl">
        Das sagen unserer Macher:innen
      </h2>
      <p className="mb-10 text-base opacity-60 md:text-2xl">
        Unsere Mitglieder:innen über die Makers League:
      </p>
      <ul className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        {testimonials.map(async (testimonial, index) => {
          const member = await getWebsiteMember(testimonial.data.name);

          return (
            <li
              key={index}
              className="flex flex-1 flex-col items-center gap-4 bg-blue p-4 text-dark sm:p-8"
            >
              <Image
                src={`${getBaseUrl()}/api/get-easyverein-image?url=${encodeURIComponent(
                  member.profilePicture,
                )}`}
                alt={member.name}
                width={700}
                height={700}
                quality={100}
                className="block size-32 rounded-full"
                unoptimized={!isProductionDeployment}
              />
              <div className="mb-4 flex flex-col items-center">
                <h3 className="text-base font-bold opacity-80 md:text-2xl">
                  {member.name}
                </h3>
                <p className="text-sm sm:text-base">{member.slogan}</p>
              </div>
              <div className="prose text-sm">{testimonial.content}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
