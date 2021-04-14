import React, {useEffect, useState} from 'react';
import config from '../../settings/config.json'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';

const Header = () => {
  const [collapse, setCollapse] = useState(false)
  const {pathname} = document.location
  const {path} = config
  const [headIndex, setHeadIndex] = useState(0)

  const onClick = () => {
    setCollapse(!collapse)
  }

  useEffect(() => {
    const index = path.indexOf(path.find((val, index) => val === pathname))
    setHeadIndex(index)
  }, [pathname, path])

  return(
    <header>
      <MDBNavbar className="black" dark expand="md" scrolling fixed="top">
        <MDBNavbarBrand href="/">
          <strong>음악을 담다</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={ onClick } />
        <MDBCollapse isOpen = { collapse } navbar>
          <MDBNavbarNav left>
            <MDBNavItem active={headIndex !== 1}>
              <MDBNavLink to="/artist/list">아티스트</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem active={headIndex === 1}>
              <MDBNavLink to="/video/download">다운로드</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          {/* <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="#" onClick={() => console.log(1)}><MDBIcon fab icon="youtube" /></MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#"><MDBIcon fab icon="instagram" /></MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav> */}
        </MDBCollapse>
      </MDBNavbar>
    </header>
  );
}

export default Header;