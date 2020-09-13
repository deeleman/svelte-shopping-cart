import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';

import Summary from '../Summary.svelte';

describe('Summary', () => {
  it('should render the component', () => {
    const { getByLabelText } = render(Summary);

    expect(getByLabelText('summary')).toBeInTheDocument();
  });
});
