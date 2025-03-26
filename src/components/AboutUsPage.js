import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiTwitter, FiMail } from 'react-icons/fi';

// Animations
const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const AboutUsContainer = styled.div`
  padding: 60px 20px;
  background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e);
  background-size: 400% 400%;
  animation: ${gradientFlow} 15s ease infinite;
  color: #f0f0f0;
  min-height: 100vh;
`;

const Banner = styled(motion.div)`
  width: 100%;
  height: 400px;
  background-image: url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 16px;
  margin-bottom: 60px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(39, 39, 55, 0.8), rgba(22, 29, 62, 0.6));
    z-index: 1;
  }

  h1 {
    position: relative;
    font-size: 3.2rem;
    font-weight: 800;
    margin: 0;
    z-index: 2;
    background: linear-gradient(90deg, #ffffff, #e0e0e0);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  p {
    position: relative;
    font-size: 1.3rem;
    max-width: 700px;
    margin: 20px auto 0;
    z-index: 2;
    line-height: 1.6;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    height: 350px;
    h1 { font-size: 2.4rem; }
    p { font-size: 1.1rem; }
  }
`;

const Section = styled(motion.section)`
  margin-bottom: 60px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  padding: 40px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Heading = styled.h1`
  color: #ffffff;
  margin: 0 auto 30px;
  font-size: 2.8rem;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(90deg, #a5b4fc, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #a5b4fc);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 20px;
  }
`;

const SubHeading = styled.h2`
  color: #ffffff;
  margin: 0 auto 25px;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

const Paragraph = styled.p`
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  font-size: 1.15rem;
  max-width: 800px;
  margin: 0 auto 25px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  margin-top: 40px;
`;

const TeamMember = styled(motion.div)`
  background: rgba(91, 91, 91, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  padding: 25px;
  text-align: center;
  width: 220px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.25);
    background: rgba(99, 102, 241, 0.15);
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto 15px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  &:hover img {
    border-color: rgba(165, 180, 252, 0.4);
  }

  h3 {
    color: #ffffff;
    margin: 0 0 5px;
    font-size: 1.3rem;
    font-weight: 600;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin: 0 0 15px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 15px;
`;

const SocialLink = styled(motion.a)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);

  &:hover {
    color: #a5b4fc;
    background: rgba(165, 180, 252, 0.15);
    transform: translateY(-2px);
  }
`;

const ValuesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const ValueCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);

  &:hover {
    background: rgba(99, 102, 241, 0.08);
    transform: translateY(-3px);
  }

  h3 {
    color: #a5b4fc;
    font-size: 1.3rem;
    margin: 0 0 10px;
  }

  p {
    color: rgba(255, 255, 255, 0.75);
    font-size: 1rem;
    margin: 0;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 40px auto;
  max-width: 800px;
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 15px;
  min-width: 120px;

  h3 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #a5b4fc;
    margin: 0 0 5px;
    background: linear-gradient(90deg, #a5b4fc, #6366f1);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 12px 28px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  margin: 30px auto 0;
  text-align: center;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(99, 102, 241, 0.4);
  }
`;

const AboutUsPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Kumar Nishant",
      // role: "Co-Founder & CEO",
      image: "./images/Team-members/Nishant.jpeg",
      linkedin: "https://www.linkedin.com/in/kumar-nishant-275402279/",
      github: "#",
      twitter: "#",
      email: "mailto:nishant@example.com"
    },
    {
      id: 2,
      name: "Udity Banerjee",
      // role: "CTO",
      image: "./images/Team-members/Udity.png",
      linkedin: "https://www.linkedin.com/in/udity-banerjee1211/",
      github: "#",
      twitter: "#",
      email: "mailto:udity@example.com"
    },
    {
      id: 3,
      name: "Tripti Sharma",
      // role: "Head of Design",
      image: "./images/Team-members/Tripti.jpg",
      linkedin: "https://www.linkedin.com/in/tripti-sharma-714414252/",
      github: "#",
      twitter: "#",
      email: "mailto:tripti@example.com"
    },
    {
      id: 4,
      name: "Gaurav Shaw",
      // role: "Lead Developer",
      image: "./images/Team-members/Gaurav.jpg",
      linkedin: "https://www.linkedin.com/in/gaurav-shaw-b25523322/",
      github: "#",
      twitter: "#",
      email: "mailto:gaurav@example.com"
    },
    {
      id: 5,
      name: "Supravat Biswas",
      // role: "Marketing Director",
      image: "./images/Team-members/Supravat.jpeg",
      linkedin: "https://www.linkedin.com/in/supravat-biswas-7b538b252/",
      github: "#",
      twitter: "#",
      email: "mailto:supravat@example.com"
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "We push boundaries to create cutting-edge solutions for educational networking."
    },
    {
      title: "Community",
      description: "Building meaningful connections is at the heart of everything we do."
    },
    {
      title: "Integrity",
      description: "We operate with transparency and honesty in all interactions."
    },
    {
      title: "Growth",
      description: "Committed to continuous development of our platform and users."
    }
  ];

  return (
    <AboutUsContainer>
      <Banner
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1>About Collegia</h1>
        <p>
          Revolutionizing educational networking through innovative technology
          and passionate commitment to connecting people.
        </p>
      </Banner>

      <Section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <Heading>Our Mission</Heading>
        <Paragraph>
          We're transforming how students and professionals connect, collaborate, and grow together.
          Breaking down barriers to create a more accessible and valuable networking experience.
        </Paragraph>
        
        <StatsContainer>
          <StatItem
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>10K+</h3>
            <p>Active Users</p>
          </StatItem>
          <StatItem
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>50+</h3>
            <p>Institutions</p>
          </StatItem>
          <StatItem
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>100%</h3>
            <p>Dedication</p>
          </StatItem>
        </StatsContainer>
      </Section>

      <Section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <SubHeading>Our Team</SubHeading>
        <Paragraph>
          A diverse group of passionate individuals united by a common vision to
          transform educational networking.
        </Paragraph>
        
        <TeamContainer>
          {teamMembers.map((member) => (
            <TeamMember
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: member.id * 0.1 }}
              viewport={{ once: true }}
            >
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <SocialLinks>
                <SocialLink
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiLinkedin />
                </SocialLink>
                <SocialLink
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiGithub />
                </SocialLink>
                <SocialLink
                  href={member.email}
                  whileHover={{ scale: 1.1 }}
                >
                  <FiMail />
                </SocialLink>
              </SocialLinks>
            </TeamMember>
          ))}
        </TeamContainer>
      </Section>

      <Section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <SubHeading>Our Values</SubHeading>
        <Paragraph>
          The principles that guide everything we do at Collegia and shape our company culture.
        </Paragraph>
        
        <ValuesContainer>
          {values.map((value, index) => (
            <ValueCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </ValueCard>
          ))}
        </ValuesContainer>
      </Section>

      <Section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <SubHeading>Join Us</SubHeading>
        <Paragraph>
          Ready to be part of the Collegia experience? Join thousands who are
          already transforming their networking journey.
        </Paragraph>
        
        <div style={{ textAlign: 'center' }}>
          <CTAButton
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </CTAButton>
        </div>
      </Section>
    </AboutUsContainer>
  );
};

export default AboutUsPage;