import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'k9zg6l9j',
    dataset: 'production'
  },
  studioHost: 'fsagent',
  deployment: {
    appId: 'eqtt5khqt8yctrs08qls4sv3',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
