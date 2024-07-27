import { Img } from "@react-email/components";
import { Link } from "./Link";
import { Text } from "./Text";
import { Link as LinkPrimitive } from "@react-email/components";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const Footer = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-[400px]">
        <Text align="center">
          PS: Du bist auf Instagram oder LinkedIn aktiv? Dann vergiss nicht uns
          zu folgen und uns für Reposts zu verlinken{" "}
          <Link href="https://linktr.ee/makersleague">
            Hier geht's zu unseren Kanälen
          </Link>
          .
        </Text>
        <div className="flex justify-center gap-4">
          <LinkPrimitive href="https://www.instagram.com/makersleague.ev">
            <Img
              src={`${baseUrl}/emails/instagram.png`}
              width="50"
              height="50"
              alt="Instagram"
            />
          </LinkPrimitive>
          <LinkPrimitive href="https://de.linkedin.com/company/makersleague">
            <Img
              src={`${baseUrl}/emails/linkedin.png`}
              width="50"
              height="50"
              alt="LinkedIn"
            />
          </LinkPrimitive>
        </div>
      </div>
    </div>
  );
};
