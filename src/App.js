import './App.css';
import FCTToken from './artifacts/contracts/FCTToken.sol/FCTToken.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import Faucet from './components/Faucet.js'
import TokenSend from './components/TokenSend.js'



function App() {

  const Token = FCTToken;

  return (
    <div className="App">
    <Container>
      <Row className="justify-content-md-center">
        <Col>
        {/* Create react component and send it the prop 'Token' 
            'Token' is imported above and contains the ABI from our artifacts
        */}
          <Faucet tokenContract={Token} />
        </Col>
        <Col>
          <TokenSend tokenContract={Token}/>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;
