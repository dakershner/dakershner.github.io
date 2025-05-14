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
    basePath: "/admin"
  },
  media: {
    // Use the loadCustomStore to load the S3 media provider
    loadCustomStore: async () => {
      try {
        const pack = await import('next-tinacms-s3')
        console.log('[Tina] S3MediaStore loaded successfully')
        return pack.S3MediaStore
      } catch (err) {
        console.error('[Tina] Failed to load S3MediaStore:', err)
        throw err
      }
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
              // Change from string to image field for direct uploads
              {
                type: "image",
                name: "thumbnail",
                label: "Thumbnail Image",
                description: "Thumbnail image for the collection"
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
                // Extract filename for display if using string URLs
                if (item?.image) {
                  if (typeof item.image === 'string') {
                    const parts = item.image.split('/');
                    return { label: parts[parts.length - 1] };
                  }
                  return { label: "Photo" };
                }
                return { label: "Untitled Photo" };
              },
            },
            fields: [
              // Change from string to image field for direct uploads
              {
                type: "image",
                name: "image",
                label: "Photo",
                required: true
              }
            ]
          }
        ]
      }
    ],
  },
});
