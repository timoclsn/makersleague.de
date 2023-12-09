import { z } from "zod";
import { cache as reactCache } from "react";
import { unstable_cache as nextCache } from "next/cache";

const userId = z.string().parse(process.env.INSTAGRAM_USER_ID);
const accessToken = z.string().parse(process.env.INSTAGRAM_ACCESS_TOKEN);

const mediaIdSchema = z.object({
  id: z.string(),
});

const mediaUrlsSchema = z.object({
  id: z.string(),
  media_url: z.string().url(),
  permalink: z.string().url(),
});

const getUserMediaIds = async () => {
  const response = await fetch(
    `https://graph.instagram.com/${userId}/media?access_token=${accessToken}`,
  );
  const json = await response.json();
  return z.array(mediaIdSchema).parse(json.data).slice(0, 9);
};

const getMedia = async () => {
  if (process.env.NODE_ENV === "development") {
    return testData;
  }

  const mediaIds = await getUserMediaIds();

  return await Promise.all(
    mediaIds.map(async ({ id }) => {
      const response = await fetch(
        `https://graph.instagram.com/${id}?fields=media_url,permalink&access_token=${accessToken}`,
      );
      const json = await response.json();
      return mediaUrlsSchema.parse(json);
    }),
  );
};

export const getMediaCached = reactCache(async () => {
  return await nextCache(getMedia, ["instagram-media"], {
    revalidate: 60,
    tags: ["instagram-media"],
  })();
});

const testData = [
  {
    id: "17905381793869470",
    media_url:
      "https://scontent-muc2-1.cdninstagram.com/v/t51.29350-15/404938045_1519343751939199_8566779830078441122_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=FCoWaq6ON1kAX8x17pL&_nc_ht=scontent-muc2-1.cdninstagram.com&edm=ANQ71j8EAAAA&oh=00_AfCd3UrCtrkL5FjtIi3Dg7t0Pcp68ZEbCJG_386fTDmEEA&oe=657A9A15",
    permalink: "https://www.instagram.com/p/C0OfBhSraY8/",
  },
  {
    id: "17907404138842482",
    media_url:
      "https://scontent-muc2-1.cdninstagram.com/o1/v/t16/f1/m82/294D52985662AABCB2EE17011337BF80_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=106&vs=294482680122525_3848432726&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC8yOTRENTI5ODU2NjJBQUJDQjJFRTE3MDExMzM3QkY4MF92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dNY3JqaGM0bzhHNm95MEJBT19WeVVvb0pMbHZicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJoqq%2FfyclotAFQIoAkMzLBdAMKp%2B%2Bdsi0RgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfAXnkHWS3BIWKSCZNHz0DQme7LZ8bRjVjzHkZbS4ZJ2YA&oe=657663D3&_nc_sid=1d576d&_nc_rid=6109515a2a",
    permalink: "https://www.instagram.com/reel/Cyz70sPshCX/",
  },
  {
    id: "17896874105889863",
    media_url:
      "https://scontent-muc2-1.cdninstagram.com/o1/v/t16/f1/m82/4A4D7979B7872DD6EAF56F757B0013B0_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=101&vs=706746518147399_2014878312&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC80QTRENzk3OUI3ODcyREQ2RUFGNTZGNzU3QjAwMTNCMF92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dHQlh1aGJSdFotQ0hBUUJBSnJJb0pidmpVMFpicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJur7ws7C64JAFQIoAkMzLBdAHcrAgxJumBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfDrcMSK9dWc57aeuWvtF41lundCRZ2d-agzUinR8tpp7Q&oe=657654E2&_nc_sid=1d576d&_nc_rid=360228e73d",
    permalink: "https://www.instagram.com/reel/Cxs_RHsLMfN/",
  },
  {
    id: "18008441401806391",
    media_url:
      "https://scontent-muc2-1.cdninstagram.com/o1/v/t16/f1/m82/E0416BB062D0163A170DB859B4C5A291_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=111&vs=855842605695248_1251197496&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9FMDQxNkJCMDYyRDAxNjNBMTcwREI4NTlCNEM1QTI5MV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dOODRvQlk5Vy1rZ0J3WUVBTW5fYWRuQndCWWFicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJrbJl5yCsP1AFQIoAkMzLBdANGGJN0vGqBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfCu1Kees-3G60EdWPLbZQ5Rho5QEssVr0nJffjbVD38Rw&oe=65765D48&_nc_sid=1d576d&_nc_rid=3208113f3d",
    permalink: "https://www.instagram.com/reel/Cxas-tZMLGY/",
  },
  {
    id: "18009314458771478",
    media_url:
      "https://scontent-muc2-1.cdninstagram.com/o1/v/t16/f1/m82/9145EDAA32E628EBABF0422DD2C4E2A7_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=108&vs=1959214041109171_175405528&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC85MTQ1RURBQTMyRTYyOEVCQUJGMDQyMkREMkM0RTJBN192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dMUlFaaGFvMWQ1QS15Z0dBQ1FLeHJIUkRMd1RicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJo6MwpbXkeQ%2FFQIoAkMzLBdALcGJN0vGqBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfD7DL2AzvH2T6lVQYOHsEm6UHuYRy0DEuXENr7M8o6wzQ&oe=6576ABD8&_nc_sid=1d576d&_nc_rid=57aecf621d",
    permalink: "https://www.instagram.com/reel/CxKpgxSrFgL/",
  },
  {
    id: "18057783622430039",
    media_url:
      "https://scontent-muc2-1.cdninstagram.com/v/t51.29350-15/363267543_680002350614603_6576914259593858762_n.heic?stp=dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=_v4WLIRLytwAX-ZlDou&_nc_oc=AQkadE9UYXFenEmChI-hE-4w2j3JZQc9GRpE2PX8Sjo6rn7dugkNSJFs8ZSk-aM5HdCVbJvLXaFFQkGSewgQ-KYr&_nc_ht=scontent-muc2-1.cdninstagram.com&edm=ANQ71j8EAAAA&oh=00_AfBCQ4NWGb4bI4ksgPrRRGmiRU6aret9uDxfqTmEl4P9kQ&oe=65795287",
    permalink: "https://www.instagram.com/p/CvMgLYWri1F/",
  },
  {
    id: "17985010451191271",
    media_url:
      "https://scontent-muc2-1.cdninstagram.com/o1/v/t16/f1/m82/B5430848F96F34BA0EF206114F58B1BC_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=102&vs=601643465444700_1857764876&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9CNTQzMDg0OEY5NkYzNEJBMEVGMjA2MTE0RjU4QjFCQ192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dJZUdXaFdiM0h6WU8xa0RBSW9MN1Y2eXFwODBicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJqTKmeH4tohAFQIoAkMzLBdAUAZWBBiTdRgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfBS0iMwPR0csiuxjIKaMN9TxyAxgIXGPSx8zNivaeqMhA&oe=65763F0C&_nc_sid=1d576d&_nc_rid=7992a6e670",
    permalink: "https://www.instagram.com/reel/CuRQOFZxYty/",
  },
  {
    id: "18004929841717010",
    media_url:
      "https://scontent-muc2-1.cdninstagram.com/o1/v/t16/f1/m82/CA476A39FEC6A857CE7F6AA958EEFF83_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=107&vs=287982770342754_2155882699&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC9DQTQ3NkEzOUZFQzZBODU3Q0U3RjZBQTk1OEVFRkY4M192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dCUEFNaFdTZ0d2bWxwa0RBTFVLZE1mMjZOb0NicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJp6H6%2BTGirU%2FFQIoAkMzLBdAIaVgQYk3TBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfAi74lN_7VwPN4KkeFOGlLsFYxqlUN12SOTpJz-N__NSQ&oe=657637B2&_nc_sid=1d576d&_nc_rid=68c39e040b",
    permalink: "https://www.instagram.com/reel/Ctwi_TGuh_0/",
  },
  {
    id: "18003329008833407",
    media_url:
      "https://scontent-muc2-1.cdninstagram.com/o1/v/t16/f1/m82/4C4A96298C74A903AEA2C9DF4FA5688A_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent-muc2-1.cdninstagram.com&_nc_cat=105&vs=277632294791496_1795584897&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC80QzRBOTYyOThDNzRBOTAzQUVBMkM5REY0RkE1Njg4QV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dIUzBKUldCYmpYbk40RUFBUEN1RnVTN0tvNHZicV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJsy6gLitydY%2FFQIoAkMzLBdAQMdsi0OVgRgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfAC1JdwdZzcnVmC8frSAnBJYpTG9NOXIxO6jOYqkhk8mg&oe=657648E9&_nc_sid=1d576d&_nc_rid=5a2502a250",
    permalink: "https://www.instagram.com/reel/CtmdvlQv6_d/",
  },
];
