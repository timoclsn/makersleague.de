import { WebsiteMember } from "lib/members";
import { getBaseUrl, isProductionDeployment } from "lib/utils";
import Image from "next/image";

interface Props {
  member: WebsiteMember;
  className?: string;
}

export const MemberImage = ({ member, className }: Props) => {
  return (
    <Image
      src={`${getBaseUrl()}/api/get-easyverein-image?url=${encodeURIComponent(
        member.profilePicture,
      )}`}
      alt={member.name}
      width={700}
      height={700}
      unoptimized={!isProductionDeployment}
      quality={100}
      className={className}
    />
  );
};
