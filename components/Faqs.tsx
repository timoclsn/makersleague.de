import { Faq } from "lib/content";
import { StructuredData } from "./StructuredData";

interface Props {
  faqs: Faq[];
}

export const Faqs = ({ faqs }: Props) => {
  return (
    <>
      <StructuredData type="FAQPage">
        {{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(({ data, content, raw }) => ({
            "@type": "Question",
            name: data.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: raw,
            },
          })),
        }}
      </StructuredData>
      <div className="flex flex-col flex-wrap gap-14 md:flex-row">
        {faqs.map((faq) => (
          <div className="w-full md:w-[calc(50%-28px)]" key={faq.name}>
            <h3 className="mb-2 font-bold">{faq.data.question}</h3>
            <div className="prose opacity-80">{faq.content}</div>
          </div>
        ))}
      </div>
    </>
  );
};
