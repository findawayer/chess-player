import { gql } from '@apollo/client';

export const UPDATE_COLOR_MODE_MUTATION = gql`
  mutation updateColorMode($colorMode: ColorMode!) {
    updateColorMode(colorMode: $colorMode) {
      colorMode
    }
  }
`;
