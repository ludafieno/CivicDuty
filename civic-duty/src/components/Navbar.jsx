import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavBar() {
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smooth scrolling
    });
  };

  return (
    <div>            
            <Navbar bg="dark" fixed="top" variant="dark" expand="md" id="navbar-class">
                <Container>
                    <Navbar.Brand onClick={handleLogoClick}>
                        <img src="/images/LOGOText.png" height="45px" width="175px" />
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>

  );
}
