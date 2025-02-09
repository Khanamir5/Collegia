import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 50px 0;
  padding-bottom: 80px;
  position: relative;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px 20px;
  min-width: 200px;

  @media (max-width: 576px) {
    margin: 0 0 20px;
    width: 100%;
    align-items: center;
  }

  h4 {
    color: #f75c7e;
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    @media (max-width: 576px) {
      text-align: center;
    }

    li {
      margin-bottom: 10px;
    }

    a {
      color: #fff;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #f75c7e;
      }
    }
  }
`;

const FooterSocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  a {
    color: #fff;
    font-size: 1.8rem;
    margin: 0 10px;
    transition: color 0.3s ease;

    &:hover {
      color: #f75c7e;
    }
  }
`;

const FooterCopyright = styled.div`
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 30px;
  color: #999;
`;

const FooterLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;

  h1 {
    font-family: "Rubik Glitch Pop", sans-serif;
    font-size: 2.9rem;
    color: #fff;
    margin: 0;
    text-align: center;
  }

  p {
    font-size: 0.9rem;
    color: grey;
    margin: 5px 0 0;
    text-align: center;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterLogo>
            <h1 className="rubik-moonrocks-regular">Collegia.</h1>
            <p>Your Campus, Your Future.</p>
          </FooterLogo>
        </FooterColumn>

        <FooterColumn>
          <h4>About Us</h4>
          <ul>
            <li><a href="/about">Our Story</a></li>
            <li><a href="/team">Team</a></li>
            <li><a href="/ContactUs">Contact Us</a></li>
          </ul>
        </FooterColumn>

        <FooterColumn>
          <h4>Support</h4>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
          </ul>
        </FooterColumn>
        
        <FooterColumn>
          <h4>Follow Us</h4>
          <FooterSocialIcons>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </FooterSocialIcons>
        </FooterColumn>
      </FooterContent>

      <FooterCopyright>
        &copy; {new Date().getFullYear()} PixelPros. All rights reserved.
      </FooterCopyright>
    </FooterContainer>
  );
};

export default Footer;