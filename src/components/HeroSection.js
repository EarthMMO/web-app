import React from "react";
import Section from "components/Section";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import SectionHeader from "components/SectionHeader";
import Button from "@material-ui/core/Button";
import Link from "next/link";

function HeroSection(props) {
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Box textAlign="center">
          <SectionHeader
            title={props.title}
            subtitle={props.subtitle}
            size={4}
          />

          <Link href={props.buttonPath} passHref={true}>
            <Button variant="contained" size="large" color={props.buttonColor}>
              {props.buttonText}
            </Button>
          </Link>
        </Box>
      </Container>
    </Section>
  );
}

export default HeroSection;
