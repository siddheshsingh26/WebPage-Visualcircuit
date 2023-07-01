import React, { useEffect, useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";

import { FormControl, InputLabel, Select } from "@mui/material";

export default function WorldSelector(props) {

  const { projectURL, changeFlagDirectoryView} = React.useContext(props.context);

  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

  const[isOpen, setIsOpen] = useState(false)

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const callback = (message) => {
      if (message.data.state === "ready") {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };
    window.RoboticsExerciseComponents.commsManager.subscribe(
      [window.RoboticsExerciseComponents.commsManager.events.STATE_CHANGED],
      callback
    );

    return () => {
      window.RoboticsExerciseComponents.commsManager.unsubscribe(
        [window.RoboticsExerciseComponents.commsManager.events.STATE_CHANGED],
        callback
      );
    };
  }, []);

  const handleClick = (menuItemValue, menuItemName) => {
      fetch('http://127.0.0.1:8000/exercises/exercise/get_folder_content/' + projectURL+"/world")
      .then(response => response.json())
      .then(data => {
        if(JSON.stringify(data).includes(menuItemName)){
            console.log("This world is already in your project");
            setIsOpen(false); // close the menu
        }else{
            fetch(
            'http://127.0.0.1:8000/exercises/exercise/add_world_file/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ value: menuItemValue, url: projectURL+"/world/", name: menuItemName})
            })
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                changeFlagDirectoryView(true);
                setIsOpen(false); // close the menu
            })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
      <>
        <FormControl>
          <InputLabel id={"world-selector-label"}>
            Add a World to your Project
            <SettingsIcon />
          </InputLabel>
          <Select
            disabled={disabled}
            defaultValue={"Follow_Line_Default"}
            labelId="world-selector-label"
            id={"world-selector"}
            label={"World"}
            MenuProps={{
              onClose: () => setIsOpen(false),
            }}
            open={isOpen}
            onOpen={() => setIsOpen(true)}
          >
            <MenuItem onClick={() => handleClick(`<?xml version="1.0" ?>
<sdf version="1.5">
  <world name="default">
    <gui fullscreen=1></gui>
    <scene>
      <grid>false</grid>
      <sky>
        <clouds>
          <speed>12</speed>
        </clouds>
      </sky>
    </scene>
    <!-- A global light source -->
    <include>
      <uri>model://sun</uri>
      <name>sun_1</name>
      <pose>0 0 1 0 0 0</pose>
    </include>
    <include>
        <uri>model://simple_circuit</uri>
        <pose>0 0 0 0 0 0</pose>
    </include>
    <include>
      <uri>model://f1</uri>
      <pose>53.462 -10.734 0.004 0 0 -1.57</pose>
    </include>
  </world>
</sdf>`, "Follow_Line_Default")} value={"Follow_Line_Default"}>Follow_Line_Default</MenuItem>
            <MenuItem onClick={() => handleClick(`<?xml version="1.0" ?>
<sdf version="1.5">
  <world name="default">
    <gui fullscreen=1></gui>
    <scene>
      <grid>false</grid>
      <sky>
        <clouds>
          <speed>12</speed>
        </clouds>
      </sky>
    </scene>
    <!-- A global light source -->
    <include>
      <uri>model://sun</uri>
      <name>sun_1</name>
      <pose>0 0 1 0 0 0</pose>
    </include>
    <include>
	    <uri>model://montmelo_line</uri>
	    <pose>0 0 0 0 0 0</pose>
    </include>
    <include>
      <uri>model://f1</uri>
      <pose>26.3 -31.6 0.004 0 0 -3.17</pose>
    </include>
  </world>
</sdf>`, "Follow_Line_Montmelo")} value={"Follow_Line_Montmelo"}>Follow_Line_Montmelo</MenuItem>
            <MenuItem onClick={() => handleClick(`<?xml version="1.0" ?>
<sdf version="1.5">
  <world name="default">
    <gui fullscreen=1></gui>
    <scene>
      <grid>false</grid>
      <sky>
        <clouds>
          <speed>12</speed>
        </clouds>
      </sky>
    </scene>
    <!-- A global light source -->
    <include>
      <uri>model://sun</uri>
      <name>sun_1</name>
      <pose>0 0 1 0 0 0</pose>
    </include>
    <include>
	    <uri>model://montreal_line</uri>
	    <pose>0 0 0 0 0 0</pose>
    </include>
    <include>
      <uri>model://f1</uri>
      <pose>-201.462 -90.9 0.004 0 0 -2.8</pose>
    </include>
  </world>
</sdf>`, "Follow_Line_Montreal")} value={"Follow_Line_Montreal"}>Follow_Line_Montreal</MenuItem>
            <MenuItem onClick={() => handleClick(`<?xml version="1.0" ?>
<sdf version="1.5">
  <world name="default">
    <gui fullscreen=1></gui>
    <scene>
      <grid>false</grid>
      <sky>
        <clouds>
          <speed>12</speed>
        </clouds>
      </sky>
    </scene>
    <!-- A global light source -->
    <include>
      <uri>model://sun</uri>
      <name>sun_1</name>
      <pose>0 0 1 0 0 0</pose>
    </include>
    <include>
	    <uri>model://nurburgring_line</uri>
	    <pose>0 0 0 0 0 0</pose>
    </include>
    <include>
      <uri>model://f1</uri>
      <pose>-74 37.5 0.004 0 0 -0.56</pose>
    </include>
  </world>
</sdf>`, "Follow_Line_Nürburgring")} value={"Follow_Line_Nürburgring"}>Follow_Line_Nürburgring</MenuItem>
            <MenuItem onClick={() => handleClick(`<?xml version="1.0" ?>
<sdf version='1.4'>
	<world name='Vacuum Cleaner'>
		<gui fullscreen='1'>
			<camera name='user_camera'>
				<pose frame=''>-3.83 1.40 8.37 0.00 1.16 -0.01</pose>
				<view_controller>orbit</view_controller>
				<projection_type>perspective</projection_type>
			</camera>
        </gui>
          <include>
	        <uri>model://roombaROS</uri>
            <pose>-1 1.5 0 0 0 0</pose>
    	  	 <!--<pose>5.04 3.80 0 0 0 -1.57 </pose> Room-->
    	  	 <!--<pose>5.04 0.00 0 0 0 -1.57 </pose> Bedroom-->
    	  	 <!--<pose>-2.35 5.44 0 0 0 -1.57 </pose> Living room-->
             <!--<pose>-3.50 1.45 0 0 0 -1.57 </pose> Dining room-->
          </include>
    	<include>
    	     <uri>model://house_int2</uri>
             <pose>0 0 0 0 0 0</pose>
    	</include>
		<include>
    	     <uri>model://ground_plane_sincolor</uri>
    	</include>

    	<light name='sun' type='directional'>
      		<cast_shadows>1</cast_shadows>
      		<pose>0 0 10 0 -0 0</pose>
      		<diffuse>0.8 0.8 0.8 1</diffuse>
      		<specular>0.2 0.2 0.2 1</specular>
      		<attenuation>
        		<range>1000</range>
        		<constant>0.9</constant>
        		<linear>0.01</linear>
        		<quadratic>0.001</quadratic>
      		</attenuation>
      		<direction>-0.5 0.1 -0.9</direction>
    	</light>

		<scene>
		  	<ambient>0.4 0.4 0.4 1</ambient>
		  	<background>0.7 0.7 0.7 1</background>
		  	<shadows>1</shadows>
		</scene>

		<gui fullscreen='0'>
		  <camera name='user_camera'>
		    <pose>0.126197 6.13852 18.8314 0 1.08764 -2.14299</pose>
		    <view_controller>orbit</view_controller>
		  </camera>
		</gui>
  </world>
</sdf>`, "Vacuum_Cleaner")} value={"Vacuum_Cleaner"}>Vacuum_Cleaner</MenuItem>
          </Select>
        </FormControl>
      </>
  );
}
