import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// navbar modified from react-bootstrap documentation
// https://react-bootstrap.github.io/components/navbar/

function TweeterNavbar() {
  return (
    <Navbar className='navbar' expand="md">
      <Container>
        <Navbar.Brand href="/">Tweeter</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/signin">Sign In</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TweeterNavbar;