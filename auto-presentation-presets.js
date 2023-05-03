/********************************************************
 * 
 * Macro Author:      	William Mills
 *                    	Technical Solutions Specialist 
 *                    	wimills@cisco.com
 *                    	Cisco Systems
 * 
 * Version: 1-0-0
 * Released: 06/14/22
 * 
 * This Webex Device macro monitors your calls and presentations 
 * and applies configurable layout presets accordingly 
 *
 * Full Readme, source code and license agreement available here:
 * https://github.com/wxsd-sales/auto-presentation-presets-macro
 * 
 ********************************************************/

import xapi from 'xapi';


/*********************************************************
 * Configure the settings below
**********************************************************/

// Screens [1][3][2]
// Output connector 1 = Left video participant screen, lets say screen 1
// Output connector 2 = Right video participant screen, lets say screen 2
// Output connector 3 = center large matrix content screen, , lets say screen 3

const states= { // Screen 1, 2, 3
    'noCallIdle': { // Blank, Blank,  OSD
      outputRoles: ['Off', 'Off', 'OSD'],
      videoMonitors: 'DualPresentationOnly',
      layout: 'Grid',
      osd: 1
    },
    'noCallLocal': { // Third, Second, Frist
      displays: ['Off', 'Off', 'OSD'],
      videoMonitors: 'DualPresentationOnly',
      layout: 'Grid',
      osd: 1
    },
    'inCallNoContent': { // Scecondary, Secondary, Primary
      displays: ['Off', 'Off', 'OSD'],
      videoMonitors: 'DualPresentationOnly',
      layout: 'Grid',
      osd: 1
    },
    'inCallPresentation': { // Scecondary, Secondary, Primary
      displays: ['Off', 'Off', 'OSD'],
      videoMonitors: 'DualPresentationOnly',
      layout: 'Grid',
      osd: 1
    }
  }

/*********************************************************
 * Main function and event subscriptions
**********************************************************/

async function main(){
  processState(await activeCalls(), await activePresentations());
  xapi.Status.Conference.Presentation.on(processPresentation);
  xapi.Status.SystemUnit.State.NumberOfActiveCalls.on(processCallChange);
}
main();

/*********************************************************
 * Event Processing
**********************************************************/

async function processPresentation(event) {
  console.log('Presentation status change event: ' + JSON.stringify(event))

  // Only process events where the a Mode or LocalInstance change has occurred
  if (Object.keys(event).length === 0) return;
  if (!event.hasOwnProperty('Mode') && !event.hasOwnProperty('LocalInstance')) return;

  // Don't process events where a local instance is remote as that already generates
  // a previous event.
  if (event.hasOwnProperty('LocalInstance')) {
    if (event.LocalInstance.some(instance => instance.SendingMode == 'LocalRemote'))
      return
  }

  processState(await activeCalls, await activePresentations());
}

async function processCallChange(calls){
  processState(calls == '1', await activePresentations())
}

/*********************************************************
 * Macros Function
**********************************************************/

function processState(calls, presentations){
  console.log(`Active Presentations [${presentations}] - Active Calls [${calls}]`);
  if (presentations && calls) {
    applyPreset('inCallPresentation')
  } else if (presentations && !calls) {
    applyPreset('noCallLocal')
  } else if (!presentations && calls) {
    applyPreset('inCallNoContent')
  } else {
    applyPreset('noCallIdle')
  }
}

function applyPreset(state) {
  console.log(`Applying Layout state [${state}] - ${JSON.stringify(states[state])}` )
  setMonitorRoles(states[state].outputRoles)
  setVideoMonitors(states[state].videoMonitors)
}

function activeCalls(){
  return xapi.Status.SystemUnit.State.NumberOfActiveCalls.get()
          .then(result=> result == '1')
}

function activePresentations(){
  return xapi.Status.Conference.Presentation.get()
    .then(result => {
      if (result.hasOwnProperty('LocalInstance')) return true
      if (result.hasOwnProperty('Mode') && result.Mode != 'Off') return true
      return false
    })
}

// https://roomos.cisco.com/xapi/Configuration.Video.Output.Connector[1..2].MonitorRole
function setMonitorRoles(roles){
  console.log(`Setting output monitor roles to [${JSON.stringify(roles)}]`);
  roles.forEach((role, index)=>{
     //xapi.Config.Video.Output.Connector[index].MonitorRole.set(role);
  })
}


// Auto, Dual, DualPresentationOnly, Single, Default (Auto)
// https://roomos.cisco.com/xapi/Configuration.Video.Monitors/
function setVideoMonitors(role){
  console.log(`Setting video monitor roles to [${role}]`);
  //xapi.Config.Video.Monitors.set(role);
}
