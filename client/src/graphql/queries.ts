import { gql } from '@apollo/client';

export const GET_TRACKS = gql`
  query GetTracks {
    tracks {
      id
      title
      artist
      bpm
      musicalKey
      genre
      energyLevel
      notes
    }
  }
`;

export const ADD_TRACK = gql`
  mutation AddTrack($input: TrackInput!) {
    addTrack(input: $input) {
      id
      title
      artist
      bpm
      musicalKey
      genre
      energyLevel
      notes
    }
  }
`;
