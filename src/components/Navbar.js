import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserContext from '../contexts/UserContext';

// navbar modified from react-bootstrap documentation
// https://react-bootstrap.github.io/components/navbar/

function TweeterNavbar() {
  let { signedInUserId, signOutUser } = useContext(UserContext)
  // let userId = getUserIdByUsername(userId)
  // console.log(signedInUsername)

  return (
    <Navbar className='navbar' expand="md">
      <Container>
        <Navbar.Brand href="/">Tweeter</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!signedInUserId ? 
              <Nav.Link href="/signin">Sign In</Nav.Link> :
              <Nav.Link onClick={signOutUser}>Sign Out</Nav.Link>
            }
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/">All Tweets</Nav.Link>
            {signedInUserId && <Nav.Link href={"/" + signedInUserId}>Profile</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TweeterNavbar;