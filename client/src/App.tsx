import React from 'react';
import { Provider } from 'mobx-react';
import './App.css';
import { setupRootStore } from './mst/setup';
import { EmployerComponent } from './components/Employer';

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       this is closer to the original react typescript setup
//     </div>
//   );
// }
//------------------------

// for this tutorial, we need to convert above into a class component (below), and add interface stuff for typescript/typings

interface Props {

}

interface State {
  rootTree: any;
}

class App extends React.Component<Props, State> {  
  constructor(props: Props) {
    super(props);

    this.state={
      rootTree: null
    }
  }
  componentDidMount = () => {

    const {rootTree} = setupRootStore()
    this.setState({rootTree})
  }
  render() {
      const {rootTree} = this.state;
      if(!rootTree) return null
      
      return (
      <Provider rootTree={rootTree}>
        <div>
            <EmployerComponent />
        </div>
      </Provider>
    );
  }
}

export default App;
