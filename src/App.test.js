import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { ReactDOM } from 'react';
import { PropertyList } from './Components/PropertiesList';

// test('render list when location entered', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


    
    // it('when location is entered - properties are rendered', () => {
    //   const div = document.createElement('div');
    //   ReactDOM.render(<App />, div);
    //   ReactDOM.unmountComponentAtNode(div);
    // });

    test('renders the landing page', () => {
      render(<App />);
    });

  //   describe("<MyDropdown />", () => {
  //     it("check dropdown menu item", async () => {
  //         render(<MyDropdown />);
  
  //         fireEvent.mouseOver(screen.getByText('bottomLeft'));
  
  //         await waitFor(() => screen.getByTestId('dropdown-menu'))
  //         expect(screen.getByText('1st menu item')).toBeInTheDocument()
  //         expect(screen.getByText('2nd menu item')).toBeInTheDocument()
  //         expect(screen.getByText('3rd menu item')).toBeInTheDocument()
  //     });
  // });