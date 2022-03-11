// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-social' or its correspond... Remove this comment to see the full error message
import { Social, SocialElement } from 'mjml-social'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-navbar' or its correspond... Remove this comment to see the full error message
import { Navbar, NavbarLink } from 'mjml-navbar'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-carousel' or its correspo... Remove this comment to see the full error message
import { Carousel, CarouselImage } from 'mjml-carousel'
import {
  Accordion,
  AccordionElement,
  AccordionText,
  AccordionTitle,
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-accordion' or its corresp... Remove this comment to see the full error message
} from 'mjml-accordion'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-body' or its correspondin... Remove this comment to see the full error message
import Body from 'mjml-body'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-head' or its correspondin... Remove this comment to see the full error message
import Head from 'mjml-head'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-head-attributes' or its c... Remove this comment to see the full error message
import HeadAttributes from 'mjml-head-attributes'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-head-breakpoint' or its c... Remove this comment to see the full error message
import HeadBreakpoint from 'mjml-head-breakpoint'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-head-html-attributes' or ... Remove this comment to see the full error message
import HeadHtmlAttributes from 'mjml-head-html-attributes'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-head-font' or its corresp... Remove this comment to see the full error message
import HeadFont from 'mjml-head-font'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-head-preview' or its corr... Remove this comment to see the full error message
import HeadPreview from 'mjml-head-preview'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-head-style' or its corres... Remove this comment to see the full error message
import HeadStyle from 'mjml-head-style'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-head-title' or its corres... Remove this comment to see the full error message
import HeadTitle from 'mjml-head-title'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-hero' or its correspondin... Remove this comment to see the full error message
import Hero from 'mjml-hero'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-button' or its correspond... Remove this comment to see the full error message
import Button from 'mjml-button'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-column' or its correspond... Remove this comment to see the full error message
import Column from 'mjml-column'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-divider' or its correspon... Remove this comment to see the full error message
import Divider from 'mjml-divider'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-group' or its correspondi... Remove this comment to see the full error message
import Group from 'mjml-group'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-image' or its correspondi... Remove this comment to see the full error message
import Image from 'mjml-image'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-raw' or its corresponding... Remove this comment to see the full error message
import Raw from 'mjml-raw'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-section' or its correspon... Remove this comment to see the full error message
import Section from 'mjml-section'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-spacer' or its correspond... Remove this comment to see the full error message
import Spacer from 'mjml-spacer'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-text' or its correspondin... Remove this comment to see the full error message
import Text from 'mjml-text'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-table' or its correspondi... Remove this comment to see the full error message
import Table from 'mjml-table'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-wrapper' or its correspon... Remove this comment to see the full error message
import Wrapper from 'mjml-wrapper'
import dependencies from './dependencies'

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
]

const presetCore = {
  components,
  dependencies,
}

export default presetCore
