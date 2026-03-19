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

export const DELETE_TRACK = gql`
  mutation DeleteTrack($id: ID!) {
    deleteTrack(id: $id)
  }
`;

export const GET_COMPATIBLE_TRACKS = gql`
  query GetCompatibleTracks($trackId: ID!) {
    compatibleTracks(trackId: $trackId) {
      id
      title
      artist
      bpm
      musicalKey
    }
  }
`;

export const GET_SETS = gql`
  query GetSets {
    sets {
      id
      name
      datePlayed
      venue
      status
      tracks {
        id
        position
        track {
          id
          title
          artist
          bpm
          musicalKey
        }
      }
    }
  }
`;

export const GET_SET = gql`
  query GetSet($id: ID!) {
    set(id: $id) {
      id
      name
      datePlayed
      venue
      notes
      status
      tracks {
        id
        position
        track {
          id
          title
          artist
          bpm
          musicalKey
        }
      }
    }
  }
`;

export const CREATE_SET = gql`
  mutation CreateSet($input: SetInput!) {
    createSet(input: $input) {
      id
      name
      status
    }
  }
`;

export const ADD_TRACK_TO_SET = gql`
  mutation AddTrackToSet($setId: ID!, $trackId: ID!, $position: Int!) {
    addTrackToSet(setId: $setId, trackId: $trackId, position: $position) {
      id
      position
      track {
        id
        title
        artist
      }
    }
  }
`;

export const RATE_TRANSITION = gql`
  mutation RateTransition($input: TransitionInput!) {
    rateTransition(input: $input) {
      id
      rating
      notes
      fromTrack {
        title
      }
      toTrack {
        title
      }
    }
  }
`;
