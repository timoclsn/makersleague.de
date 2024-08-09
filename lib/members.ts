import kebabCase from "lodash/kebabCase";
import trim from "lodash/trim";
import z from "zod";
import { getCacheValue, setCacheValue } from "./cache";
import { customField, getActiveMembers } from "./easyverein";

const { NODE_ENV } = process.env;

const isDevelopment = NODE_ENV === "development";

type SuperPowers = z.infer<typeof superPowersSchema>;
const superPowersSchema = z.tuple([z.string(), z.string(), z.string()]);

export type WebsiteMember = z.output<typeof websiteMemberSchema>;
const websiteMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  firstName: z.string(),
  familyName: z.string(),
  profilePicture: z.string(),
  slogan: z.string(),
  superPowers: superPowersSchema,
  about: z.string().nullable(),
  slug: z.string(),
});

const customFieldNames = {
  show: "Auf Website anzeigen",
  slogan: "Profil-Slogan",
  superPower1: "Meine Superkraft 1",
  superPower2: "Meine Superkraft 2",
  superPower3: "Meine Superkraft 3",
  about: "Über mich",
} as const;

export const getWebsiteMembers = async (): Promise<WebsiteMember[]> => {
  const cachedData = await getCacheValue(
    "members",
    z.array(websiteMemberSchema),
  );
  if (cachedData) {
    console.info("Members loaded from cache");
    return cachedData;
  }

  console.info("Fetching members from API");

  const apiMembers = await getActiveMembers();

  const websiteMembers = apiMembers
    .filter((apiMember) => {
      const name = apiMember.contactDetails.name;
      const customFields = apiMember.customFields;

      if (!customFields) {
        if (isDevelopment) {
          console.log(
            `Not showing ${name} because they don't have any custom fields`,
          );
        }
        return false;
      }

      const show =
        customField(customFields, customFieldNames.show)?.value === "True";

      if (!show) {
        if (isDevelopment) {
          console.log(
            `Not showing ${name} because they don't want to be shown`,
          );
        }
        return false;
      }

      const profilePicture = apiMember._profilePicture;

      if (!profilePicture) {
        if (isDevelopment) {
          console.log(
            `Not showing ${name} because they don't have a profile picture`,
          );
        }
        return false;
      }

      const slogan = customField(customFields, customFieldNames.slogan)?.value;
      const superPowers = [
        customField(customFields, customFieldNames.superPower1)?.value,
        customField(customFields, customFieldNames.superPower2)?.value,
        customField(customFields, customFieldNames.superPower3)?.value,
      ];

      if (!slogan || !superPowers[0] || !superPowers[1] || !superPowers[2]) {
        if (isDevelopment) {
          console.log(
            `Not showing ${name} because they don't have a slogan or super powers`,
          );
        }
        return false;
      }

      return true;
    })
    .map((apiMember) => {
      const id = apiMember.id;
      const firstName = trim(apiMember.contactDetails.firstName);
      const familyName = trim(apiMember.contactDetails.familyName);
      const name = `${firstName} ${familyName}`;
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

  setCacheValue("members", websiteMembers);

  return websiteMembers;
};

export const getWebsiteMember = async (name: string) => {
  const members = await getWebsiteMembers();
  const member = members.find((member) => member.name === name);

  if (!member) {
    throw new Error(`Member ${name} not found`);
  }

  return member;
};

export const getMembersCount = async () => {
  const result = await getActiveMembers();
  return result.length;
};
