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
    
    type Set {
        id: ID!
        name: String!
        datePlayed: String
        venue: String
        notes: String
        status: String!
        tracks: [SetTrack!]
    }

    type SetTrack {
        id: ID!
        track: Track!
        position: Int!
    }
    
    type Transition {
        id: ID!
        fromTrack: Track!
        toTrack: Track!
        rating: String!
        notes: String
    }

    type Query {
        tracks: [Track!]!
        track(id: ID!): Track
        tracksByGenre(genre: String!): [Track!]!
        tracksByBpmRange(min: Float!, max: Float!): [Track!]!
        compatibleTracks(trackId: ID!): [Track!]!
        sets: [Set!]!
        set(id: ID!): Set
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

    input SetInput {
        name: String!
        datePlayed: String
        venue: String
        notes: String
        status: String!
    }
    
    input TransitionInput {
        setId: ID!
        fromTrackId: ID!
        toTrackId: ID!
        rating: String!
        notes: String
    }

    type Mutation { 
        addTrack(input: TrackInput!): Track!
        updateTrack(id: ID!, input: TrackInput!): Track!
        deleteTrack(id: ID!): Boolean!
        createSet(input: SetInput!): Set!
        addTrackToSet(setId: ID!, trackId: ID!, position: Int!): SetTrack!
        removeTrackFromSet(id: ID!): Boolean!
        rateTransition(input: TransitionInput!): Transition!
    }
`;

export default typeDefs;