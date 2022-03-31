import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { getMembers, Member, setApiToken } from 'easyverein';
import kebabCase from 'lodash/kebabCase';
import trim from 'lodash/trim';

const easyvereinToken = process.env.EASYVEREIN_TOKEN ?? '';
const MEMBERS_CACHE_PATH = join(__dirname, '.members');

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
  firstName: string;
  familyName: string;
  profilePicture: string;
  slogan: string;
  superPowers: SuperPowers;
  about: string | null;
  slug: string;
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
  let cachedData: WebsiteMember[] = [];

  try {
    cachedData = JSON.parse(readFileSync(MEMBERS_CACHE_PATH, 'utf8'));
  } catch (error) {
    console.log('Member cache not initialized');
  }

  if (cachedData.length > 0) {
    return cachedData;
  }

  const apiMembers = (await getMembers(
    '{id,_profilePicture,email,contactDetails{name,firstName,familyName},customFields{value,customField{name}}}'
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

      const profilePicture = apiMember._profilePicture;

      if (!profilePicture) {
        console.log(
          `Not showing ${name} because they don't have a profile picture`
        );
        return false;
      }

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
      const name = trim(apiMember.contactDetails.name);
      const firstName = trim(apiMember.contactDetails.firstName);
      const familyName = trim(apiMember.contactDetails.familyName);
      const profilePicture = apiMember._profilePicture!;
      const customFields = apiMember.customFields!;
      const slogan = customField(customFields, customFieldNames.slogan)?.value!;
      const superPowers: SuperPowers = [
        customField(customFields, customFieldNames.superPower1)?.value!,
        customField(customFields, customFieldNames.superPower2)?.value!,
        customField(customFields, customFieldNames.superPower3)?.value!,
      ];
      const about =
        customField(customFields, customFieldNames.about)?.value || null;
      const slug = kebabCase(name);

      return {
        id,
        name,
        firstName,
        familyName,
        profilePicture,
        slogan,
        superPowers,
        about,
        slug,
      };
    })
    .sort((a, b) => a.familyName.localeCompare(b.familyName));

  try {
    writeFileSync(MEMBERS_CACHE_PATH, JSON.stringify(websiteMembers), 'utf8');
  } catch (error) {
    console.log('ERROR WRITING MEMBERS CACHE TO FILE');
    console.log(error);
  }

  return websiteMembers;
}

const customField = (customFields: CustomField[], name: string) =>
  customFields?.find((customField) => customField.customField.name === name);
