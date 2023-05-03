# Auto Presentation Presets Macro
This Webex Device macro monitors your Room devices calls and presentations and applies configurable layout presets accordingly.


## Overview

The macro changes the monitor roles and layout settings of your Webex Room device depending on whether your device has any active/inactive calls or presentations. It subscribes to changes to calls and presentations and applies your preconfigured Layout Preset automatically. Please refer to the logic chart below.


| Presentations 	| Calls 	| Layout Preset             	|
|---------------	|-------	|---------------------------	|
|       0       	|   0   	| No Call Idle              	|
|       0       	|   1   	| In Call No Presentation   	|
|       1       	|   0   	| No Call With Presentation 	|
|       1       	|   1   	| In Call With Presentation 	|



### Flow Diagram

![image](https://user-images.githubusercontent.com/21026209/235892510-82769bdf-4561-4835-8beb-1b8d57b1f81d.png)


## Setup

### Prerequisites & Dependencies: 

- RoomOS/CE 10.x or above Webex Device (10.18.x for Room Navigator WebViews)
- Web admin access to the device to upload the macro


### Installation Steps:

1. Download the ``auto-presentation-presets.js`` file and upload it to your Webex Room devices Macro editor via the web interface.
2. Configure the Macro by changing the initial values, there are comments explaining each one.
3. Enable the Macro on the editor.
    
    
    
## Demo

*For more demos & PoCs like this, check out our [Webex Labs site](https://collabtoolbox.cisco.com/webex-labs).


## License

All contents are licensed under the MIT license. Please see [license](LICENSE) for details.


## Disclaimer

Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex use cases, but are not Official Cisco Webex Branded demos.


## Questions

Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=auto-presentation-presets-macro) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team. 
