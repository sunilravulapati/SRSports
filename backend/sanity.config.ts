import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const devOnlyPlugins = [visionTool()]

export default defineConfig({
  name: 'default',
  title: 'SR_Sports',

  projectId: 'xzyc3ssf',
  dataset: 'cricket',

  plugins: [
    structureTool(), // We removed the brackets inside here to fix the crash
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})