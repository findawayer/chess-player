// Enable jest-dom for all tests.
import '@testing-library/jest-dom';
// Apply global mocks
import '~app/__mocks__/global';

// Use Enzyme
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
