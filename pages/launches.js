import Layout from '../components/MainLayout.js'
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import 'bulma/css/bulma.min.css';
import Link from 'next/link';

export const LAUNCH_TILE_DATA = gql`
    fragment LaunchTile on Launch {
      id
      isBooked
      rocket {
        id
        name
      }
      mission {
        name
        missionPatch
      }
    }
  `;

  
const GET_LAUNCHES = gql`
    query launchList($after: String) {
      launches(after: $after) {
        cursor
        hasMore
        launches {
          id
          isBooked
          ...LaunchTile
          rocket {
            id
            name
          }
          mission {
            name
            missionPatch
          }
        }
      }
    }
    ${LAUNCH_TILE_DATA}
    `

const Launches = () => {
  const { data, loading, error,fetchMore } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (

    <section className="section">
      <div className="container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mission Patch</th>
              <th>Rocket Name</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody> 
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map(launch => (

          <tr key={launch.id} launch={launch}>
            <th>{launch.id}</th>
            <td><figure className="image is-128x128">
                <img src={launch.mission.missionPatch}/></figure></td>
            <td>{launch.rocket.name}</td>
            <td><Link href={`/${launch.id}`}><a to={`/${launch.id}`}>View</a></Link></td>
          </tr>
 
        ))}
          </tbody>
        </table>
      </div>
            {data.launches && 
        data.launches.hasMore && (
          <button className="button is-info"
            onClick={() =>

              fetchMore({
                variables: {
                  after: data.launches.cursor,
                },

                updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                  if (!fetchMoreResult) return prev;
                  return {
                    ...fetchMoreResult,
                    launches: {
                      ...fetchMoreResult.launches,
                      launches: [
                        ...prev.launches.launches,
                        ...fetchMoreResult.launches.launches,
                      ],
                    },
                  };
                },
              })
            }
          >
            Load More
          </button>
        )
      }
    </section>

  );
};


export default Launches;
