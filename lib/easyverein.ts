import { getMembers, Member, setApiToken } from 'easyverein';
import gravatar from 'gravatar';

const easyvereinToken = process.env.EASYVEREIN_TOKEN ?? '';

setApiToken(easyvereinToken);

interface CustomField {
  value: string;
  customField: {
    name: string;
  };
}

type MemberWithCustomFields = Member & { customFields: CustomField[] | null };

type SuperPowers = [string, string, string];
export interface WebsiteMember {
  id: number;
  name: string;
  profilePicture: string;
  slogan: string;
  superPowers: SuperPowers;
  about?: string;
}

const customFieldNames = {
  show: 'Auf Website anzeigen',
  slogan: 'Profil-Slogan',
  superPower1: 'Meine Superkraft 1',
  superPower2: 'Meine Superkraft 2',
  superPower3: 'Meine Superkraft 3',
  about: 'Über mich',
} as const;

export async function getMemberInfos(): Promise<WebsiteMember[]> {
  const apiMembers = (await getMembers(
    '{id,_profilePicture,email,contactDetails{name},customFields{value,customField{name}}}'
  )) as unknown as MemberWithCustomFields[];

  const websiteMembers = apiMembers
    .filter((apiMember) => {
      const name = apiMember.contactDetails.name;
      const customFields = apiMember.customFields;

      if (!customFields) {
        console.log(
          `Not showing ${name} because they don't have any custom fields`
        );
        return false;
      }

      const show =
        customField(customFields, customFieldNames.show)?.value === 'True'
          ? true
          : false;

      if (!show) {
        console.log(`Not showing ${name} because they don't want to be shown`);
        return false;
      }

      // const profilePicture = apiMember._profilePicture;

      // if (!profilePicture) {
      //   console.log(
      //     `Not showing ${name} because they don't have a profile picture`
      //   );
      //   return false;
      // }

      const slogan = customField(customFields, customFieldNames.slogan)?.value;
      const superPowers = [
        customField(customFields, customFieldNames.superPower1)?.value,
        customField(customFields, customFieldNames.superPower2)?.value,
        customField(customFields, customFieldNames.superPower3)?.value,
      ];

      if (!slogan || !superPowers[0] || !superPowers[1] || !superPowers[2]) {
        console.log(
          `Not showing ${name} because they don't have a slogan or super powers`
        );
        return false;
      }

      return true;
    })
    .map((apiMember) => {
      const id = apiMember.id;
      const name = apiMember.contactDetails.name;
      const email = apiMember.email;
      const profilePicture = gravatar.url(email, { size: '700' }, true);
      const customFields = apiMember.customFields!;
      const slogan = customField(customFields, customFieldNames.slogan)?.value!;
      const superPowers: SuperPowers = [
        customField(customFields, customFieldNames.superPower1)?.value!,
        customField(customFields, customFieldNames.superPower2)?.value!,
        customField(customFields, customFieldNames.superPower3)?.value!,
      ];
      const about = customField(customFields, customFieldNames.about)?.value;

      return {
        id,
        name,
        profilePicture,
        slogan,
        superPowers,
        about,
      };
    });

  return websiteMembers;
}

const customField = (customFields: CustomField[], name: string) =>
  customFields?.find((customField) => customField.customField.name === name);
