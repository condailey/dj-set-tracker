const typeDefs = `
    type Track {
        id: ID!
        title: String!
        artist: String!
        bpm: Float!
        musicalKey: String
        genre: String
        energyLevel: String!
        notes: String
    }

    type Query {
        tracks: [Track!]!
        track(id: ID!): Track
        tracksByGenre(genre: String!): [Track!]!
        tracksByBpmRange(min: Float!, max: Float!): [Track!]!
        compatibleTracks(trackId: ID!): [Track!]!
    }

    input TrackInput {                                                                  
      title: String!                                                                  
      artist: String!
      bpm: Float!                                                                     
      musicalKey: String
      genre: String                                                                   
      energyLevel: String!
      notes: String                                                                   
    } 

    type Mutation { 
      addTrack(input: TrackInput!): Track!
    }
`;

export default typeDefs;