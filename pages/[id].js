import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import 'bulma/css/bulma.min.css';
import React from "react";
import { LAUNCH_TILE_DATA } from "./launches";


export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      id
      site
      isBooked
      rocket {
        id
        name
        type
      }
      mission {
        name
        missionPatch
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

const Launch = ({ launchId }) => {

    const { data, loading, error } = useQuery(GET_LAUNCH_DETAILS, {
        variables: { launchId }
      });
    
      if (loading) return <p>Loading..</p>;
      if (error) return <p>ERROR: {error.message}</p>;
      if (!data) return <p>Not found</p>;
    
      return (
        
        <section className="section" image={data.launch && data.launch.mission && data.launch.mission.missionPatch}>

            <p>{data && data.launch && data.launch.mission && data.launch.mission.name}</p>
        
            <div className="container">
                <h3>
                {rocket && rocket.name} ({rocket && rocket.type})
                </h3>
                <h5>{site}</h5>
                
            </div>
            
        </section>

      );

}

export default Launch;