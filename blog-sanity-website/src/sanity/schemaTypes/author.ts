import { defineField, defineType } from "sanity";
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the author",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "string",
      description: "Bio of the author",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Image of the author",
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
  ],
});
