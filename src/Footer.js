import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <footer>
        <nav id="nav">
          <ul>
            <li>
              {/* <Link to="/">
                <div class="icon">
                  <i class="fas fa-home"></i>
                </div>
                <p>HOME</p>
              </Link> */}
            </li>
            <li>
              <Link to="/shop">
                <div class="icon">
                <i class="fas fa-info-circle"></i>            
                </div>
                <p>GUIDE</p>
              </Link>
            </li>
            <li class="special">
              <Link to="/exercise">
                <div class="icon">
                  <i class="fas fa-camera"></i>
                </div>
                <p>READY!</p>
              </Link>
            </li>
            {/* <li>
              <Link to="/profile">
                <div class="icon">
                  <i class="fas fa-user"></i>
                </div>
                <p>PROFILE</p>
              </Link>
            </li> */}
            <li>
              <Link to="/setting">
                <div class="icon">
                  <i class="fas fa-cog"></i>
                </div>
                <p>SETTINGS</p>
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    );
}

export default Footer;