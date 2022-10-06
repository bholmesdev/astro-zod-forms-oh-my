import { z } from "zod";

export const parsePlanetForm = (formData: FormData) => {
  const formDataAsJson: Record<string, any> = {};
  for (let key of formData.keys()) {
    formDataAsJson[key] = formData.get(key);
  }

  return z
    .object({
      name: z.enum([
        "mercury",
        "venus",
        "earth",
        "mars",
        "jupiter",
        "saturn",
        "uranus",
        "neptune",
        "pluto!important",
      ]),
      rating: z.string().transform(Number),
    })
    .parse(formDataAsJson, {
      errorMap(error, ctx) {
        console.log({ error });
        if (error.code === "invalid_enum_value" && error.path[0] === "name") {
          return { message: "Not a real planet space cadet!" };
        }
        return { message: ctx.defaultError };
      },
    });
};
