import { WebsiteMember } from "lib/members";
import { getBaseUrl, isProductionDeployment } from "lib/utils";
import Image from "next/image";

interface Props {
  member: WebsiteMember;
  size: number;
  className?: string;
}

export const MemberImage = ({ member, size, className }: Props) => {
  return (
    <Image
      src={`${getBaseUrl()}/api/get-easyverein-image?url=${encodeURIComponent(
        member.profilePicture,
      )}`}
      alt={member.name}
      width={size}
      height={size}
      unoptimized={!isProductionDeployment}
      quality={100}
      className={className}
    />
  );
};
