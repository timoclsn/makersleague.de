import { Faq } from 'contentlayer/generated';

interface Props {
  faqs: Faq[];
  limit?: number;
}

export function Faqs({ faqs, limit }: Props) {
  faqs = faqs.slice(0, limit);

  return (
    <div className="flex flex-col flex-wrap gap-14 md:flex-row">
      {faqs.map((faq) => (
        <div className="w-full md:w-[calc(50%-28px)]" key={faq._id}>
          <h3 className="mb-2 font-bold">{faq.question}</h3>
          <div
            className="opacity-80"
            dangerouslySetInnerHTML={{ __html: faq.body.html }}
          />
        </div>
      ))}
    </div>
  );
}
