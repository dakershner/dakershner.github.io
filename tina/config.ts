import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
    basePath: ""
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "_posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            options: ["post"]
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      // Photo Collections Data
      {
        name: "photoCollections",
        label: "Photo Collections",
        path: "_data",
        format: "yml",
        match: {
          include: "photo_collections"
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "object",
            name: "collections",
            label: "Collections",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "Untitled Collection" }
              },
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "ID",
                required: true,
                description: "Must match the filename in the photography directory (e.g., morocco-2019)"
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description"
              },
              {
                type: "string",
                name: "thumbnail",
                label: "Thumbnail URL",
                description: "S3 URL to the thumbnail image",
                ui: {
                  validate: (url) => {
                    if (url && !url.startsWith('https://dkershner-photography.s3.amazonaws.com/')) {
                      return 'Must be a valid S3 URL from your bucket'
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      // Photography Galleries
      {
        name: "photographyGallery",
        label: "Photography Galleries",
        path: "photography",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: values => {
              // Extract id from title or use untitled
              const id = values?.title 
                ? values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                : "untitled-gallery";
              return id;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            options: ["photo_gallery"]
          },
          {
            type: "string",
            name: "title",
            label: "Gallery Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Gallery Description"
          },
          {
            type: "object",
            name: "photos",
            label: "Photos",
            list: true,
            ui: {
              itemProps: (item) => {
                // Extract filename for display
                if (item?.image) {
                  const parts = item.image.split('/');
                  return { label: parts[parts.length - 1] };
                }
                return { label: "Untitled Photo" };
              },
            },
            fields: [
              {
                type: "string",
                name: "image",
                label: "S3 Image URL",
                required: true,
                ui: {
                  validate: (url) => {
                    if (!url.startsWith('https://dkershner-photography.s3.amazonaws.com/')) {
                      return 'Must be a valid S3 URL from your bucket'
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    ],
  },
});
