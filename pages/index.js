import Link from 'next/link';
import 'bulma/css/bulma.min.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import fetch from 'node-fetch'
import Launches from './launches'


export const client = new ApolloClient({
    uri: 'http://localhost:4000',
    fetch: fetch,
  });
  
  // client
  //   .query({
  //     query: gql`
  //     query GetLaunch {
  //       launch(id: 56) {
  //         id
  //         mission {
  //           name
  //         }
  //       }
  //     }
  //     `
  //   })
  //   .then(result => console.log(result));


const Home = () => {

  return(
    <ApolloProvider client={client}>
      <div className="container">
        <section className="section">
          <div className="container">
            <h1 className="title">Welcome!</h1>
            <h2 className="subtitle">
              List of launches.
            </h2>
           
          </div>
        </section>
    <Launches/>
        {/* <section className="section">
          <div className="container">
            <div className="tile is-ancestor">

              <div className="tile is-parent">

                <Link href="/Launches">
                  <div className="tile button is-child is-success">
                    <a className="has-text-white">Home</a>
                  </div>
                </Link>

              </div>

              <div className="tile is-parent">

                <Link href="/Launches">
                  <div className="tile button is-child is-info">
                    <a className="has-text-white">Rocket</a>
                  </div>
                </Link>

              </div>

            </div>
            
          </div>
        </section> */}

      </div>
    </ApolloProvider>
  
  )

}

export default Home
