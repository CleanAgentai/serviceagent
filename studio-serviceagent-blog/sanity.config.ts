import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {presentationTool} from 'sanity/presentation'

export default defineConfig({
  name: 'default',
  title: 'ServiceAgent Blog',

  projectId: 'k9zg6l9j',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), presentationTool({
    previewUrl: {
      draftMode: {
        enable: '/api/draft'
      }
    }
  })],

  schema: {
    types: schemaTypes,
  },
})