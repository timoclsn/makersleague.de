import { getMembers, setApiToken } from "easyverein";
import kebabCase from "lodash/kebabCase";
import trim from "lodash/trim";
import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";
import z from "zod";

const easyvereinToken = z.string().parse(process.env.EASYVEREIN_TOKEN);
const environment = z.string().parse(process.env.NODE_ENV);

setApiToken(easyvereinToken);

type SuperPowers = z.infer<typeof superPowersSchema>;
const superPowersSchema = z.tuple([z.string(), z.string(), z.string()]);

export type WebsiteMember = z.infer<typeof websiteMemberSchema>;
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

type CustomField = z.infer<typeof customFieldSchema>;
const customFieldSchema = z.object({
  value: z.string(),
  customField: z.object({
    name: z.string(),
  }),
});

export const memberSchema = z.object({
  id: z.number(),
  _profilePicture: z.string().optional(),
  contactDetails: z.object({
    name: z.string(),
    firstName: z.string(),
    familyName: z.string(),
  }),
  customFields: z.array(customFieldSchema).nullable(),
});

const customFieldNames = {
  show: "Auf Website anzeigen",
  slogan: "Profil-Slogan",
  superPower1: "Meine Superkraft 1",
  superPower2: "Meine Superkraft 2",
  superPower3: "Meine Superkraft 3",
  about: "Über mich",
} as const;

const getMemberInfos = async (): Promise<WebsiteMember[]> => {
  const result = await getMembers(
    "{id,_profilePicture,contactDetails{name,firstName,familyName},customFields{value,customField{name}}}",
  );
  const apiMembers = z.array(memberSchema).parse(result);

  const websiteMembers = apiMembers
    .filter((apiMember) => {
      const name = apiMember.contactDetails.name;
      const customFields = apiMember.customFields;

      if (!customFields) {
        if (environment === "development") {
          console.log(
            `Not showing ${name} because they don't have any custom fields`,
          );
        }
        return false;
      }

      const show =
        customField(customFields, customFieldNames.show)?.value === "True";

      if (!show) {
        if (environment === "development") {
          console.log(
            `Not showing ${name} because they don't want to be shown`,
          );
        }
        return false;
      }

      const profilePicture = apiMember._profilePicture;

      if (!profilePicture) {
        if (environment === "development") {
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
        if (environment === "development") {
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

  return websiteMembers;
};

const customField = (customFields: CustomField[], name: string) =>
  customFields?.find((customField) => customField.customField.name === name);

export const getMemberInfosCached = reactCache(async () => {
  const tag = "members";
  return await nextCache(getMemberInfos, [tag], {
    revalidate: 60,
    tags: [tag],
  })();
});
