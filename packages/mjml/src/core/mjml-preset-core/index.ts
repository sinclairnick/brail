import { Social, SocialElement } from '../elements/mjml-social';
import { Navbar, NavbarLink } from '../elements/mjml-navbar';
import { Carousel, CarouselImage } from '../elements/mjml-carousel';
import {
  Accordion,
  AccordionElement,
  AccordionText,
  AccordionTitle,
} from '../elements/mjml-accordion';
import Body from '../elements/mjml-body';
import Head from '../elements/mjml-head';
import HeadAttributes from '../elements/mjml-head-attributes';
import HeadBreakpoint from '../elements/mjml-head-breakpoint';
import HeadHtmlAttributes from '../elements/mjml-head-html-attributes';
import HeadFont from '../elements/mjml-head-font';
import HeadPreview from '../elements/mjml-head-preview';
import HeadStyle from '../elements/mjml-head-style';
import HeadTitle from '../elements/mjml-head-title';
import Hero from '../elements/mjml-hero';
import Button from '../elements/mjml-button';
import Column from '../elements/mjml-column';
import Divider from '../elements/mjml-divider';
import Group from '../elements/mjml-group';
import Image from '../elements/mjml-image';
import Raw from '../elements/mjml-raw';
import Section from '../elements/mjml-section';
import Spacer from '../elements/mjml-spacer';
import Text from '../elements/mjml-text';
import Table from '../elements/mjml-table';
import Wrapper from '../elements/mjml-wrapper';
import dependencies from './dependencies';

const components = [
  Body,
  Head,
  HeadAttributes,
  HeadBreakpoint,
  HeadHtmlAttributes,
  HeadFont,
  HeadPreview,
  HeadStyle,
  HeadTitle,
  Hero,
  Button,
  Column,
  Divider,
  Group,
  Image,
  Raw,
  Section,
  Spacer,
  Text,
  Table,
  Wrapper,
  Social,
  SocialElement,
  Navbar,
  NavbarLink,
  Accordion,
  AccordionElement,
  AccordionText,
  AccordionTitle,
  Carousel,
  CarouselImage,
];
const presetCore = {
  components,
  dependencies,
};
export default presetCore;
