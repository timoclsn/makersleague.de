import { getMembers, Member, setApiToken } from 'easyverein';

const easyvereinToken = process.env.EASYVEREIN_TOKEN ?? '';

setApiToken(easyvereinToken);

interface CustomField {
  value: string;
  customField: {
    name: string;
  };
}

type MemberWithCustomFields = Member & { customFields: CustomField[] | null };
export interface WebsiteMember {
  id: number;
  show: boolean;
  name: string;
  profilePicture: string;
  slogan: string;
  superPowers: [string, string, string];
  about: string;
}

export async function getMemberInfos() {
  const apiMembers = (await getMembers(
    '{id,_profilePicture,contactDetails{name},customFields{value,customField{name}}}'
  )) as unknown as MemberWithCustomFields[];

  const websiteMembers = apiMembers.map((apiMember) => {
    if (!apiMember.customFields) {
      return {
        show: false,
      };
    }

    return {
      id: apiMember.id,
      show:
        customField(apiMember.customFields, 'Auf Website anzeigen')?.value ===
        'True'
          ? true
          : false,
      name: apiMember.contactDetails.name,
      profilePicture: apiMember._profilePicture || '',
      slogan: customField(apiMember.customFields, 'Slogan')?.value || '',
      superPowers: [
        customField(apiMember.customFields, 'Meine Superkraft 1')?.value || '',
        customField(apiMember.customFields, 'Meine Superkraft 2')?.value || '',
        customField(apiMember.customFields, 'Meine Superkraft 3')?.value || '',
      ],
      about: customField(apiMember.customFields, 'Über mich')?.value || '',
    };
  });

  return websiteMembers.filter((field) => field.show);
}

const customField = (customFields: CustomField[], name: string) =>
  customFields?.find((customField) => customField.customField.name === name);
