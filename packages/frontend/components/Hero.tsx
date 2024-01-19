'use client';

import { Button } from '@nk18chi/components';

interface HeroProps {
  title: string;
}

const Hero = ({ title }: HeroProps) => (
  <>
    <h1>{title}</h1>
    <Button label="Click Now" variant="contained" color="primary" />
  </>
);

export default Hero;
