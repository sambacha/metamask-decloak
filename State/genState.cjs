const fs = require('node:fs')
const path = require('node:path')
const promisify = require('pify')
// path if your using metamasks locale messages
//const enLocaleMessages = require('../app/_locales/en/messages.json')
// decloak's messages
const enLocaleMessages = require('../src/debug_error_messages.json')
const writeFile = promisify(fs.writeFile)

start().catch(console.error)

async function start () {
  const statesPath = path.join(__dirname, 'states')
  const stateFilesNames = await promisify(fs.readdir)(statesPath)
  const states = {}
  await Promise.all(stateFilesNames.map(async (stateFileName) => {
    const stateFilePath = path.join(__dirname, 'states', stateFileName)
    const state = require(stateFilePath)

    state.localeMessages = { en: enLocaleMessages, current: {} }

    const stateName = stateFileName.split('.')[0].replace(/-/g, ' ', 'g')
    states[stateName] = state
  }))
  const generatedFileContent = `module.exports = ${JSON.stringify(states)}`
  const generatedFilePath = path.join(__dirname, 'states.js')
  await writeFile(generatedFilePath, generatedFileContent)
}
