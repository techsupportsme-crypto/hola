/*
 * HOLA PAJE LUXURY RESIDENCES — Privacy Policy Page
 * Design: Montserrat-only, linen/charcoal palette
 *
 * Complies with:
 *   - South Africa: Protection of Personal Information Act (POPIA), Act 4 of 2013
 *   - EU/UK: General Data Protection Regulation (GDPR)
 *   - Tanzania: Electronic and Postal Communications Act (EPOCA)
 *
 * Responsible Party: Floton Africa (Pty) Ltd
 * Last reviewed: June 2026
 *
 * HANDOVER NOTE: This document was drafted based on the information
 * provided in the approved copy deck and ground rules. It must be
 * reviewed and approved by Floton Africa's legal counsel before
 * the site goes live.
 */

import { useEffect } from 'react';
import { Link } from 'wouter';

const PP_STYLES = {
  page: {
    backgroundColor: '#F2EDE6',
    minHeight: '100vh',
    fontFamily: 'Montserrat, sans-serif',
    color: '#1C1917',
  } as React.CSSProperties,
  header: {
    borderBottom: '1px solid rgba(28,25,23,0.1)',
    padding: '1.5rem 5vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as React.CSSProperties,
  wordmark: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 200,
    fontSize: '0.7rem',
    letterSpacing: '0.28em',
    textTransform: 'uppercase' as const,
    color: '#1C1917',
    textDecoration: 'none',
  } as React.CSSProperties,
  backLink: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 300,
    fontSize: '0.62rem',
    letterSpacing: '0.28em',
    textTransform: 'uppercase' as const,
    color: 'rgba(58,107,110,0.75)',
    textDecoration: 'none',
    borderBottom: '1px solid rgba(58,107,110,0.3)',
    paddingBottom: '0.15rem',
  } as React.CSSProperties,
  main: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '5rem 5vw 8rem',
  } as React.CSSProperties,
  eyebrow: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 300,
    fontSize: '0.6rem',
    letterSpacing: '0.36em',
    textTransform: 'uppercase' as const,
    color: 'rgba(28,25,23,0.4)',
    marginBottom: '1.5rem',
  } as React.CSSProperties,
  title: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 100,
    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
    lineHeight: 1.15,
    color: '#1C1917',
    marginBottom: '0.75rem',
  } as React.CSSProperties,
  meta: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 300,
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    color: 'rgba(28,25,23,0.38)',
    marginBottom: '4rem',
    borderBottom: '1px solid rgba(28,25,23,0.08)',
    paddingBottom: '2rem',
  } as React.CSSProperties,
  h2: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 200,
    fontSize: '1rem',
    letterSpacing: '0.06em',
    color: '#1C1917',
    marginTop: '3rem',
    marginBottom: '1rem',
  } as React.CSSProperties,
  p: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 200,
    fontSize: '0.88rem',
    lineHeight: 1.85,
    color: 'rgba(28,25,23,0.72)',
    marginBottom: '1rem',
  } as React.CSSProperties,
  ul: {
    paddingLeft: '1.5rem',
    marginBottom: '1rem',
  } as React.CSSProperties,
  li: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 200,
    fontSize: '0.88rem',
    lineHeight: 1.85,
    color: 'rgba(28,25,23,0.72)',
    marginBottom: '0.4rem',
  } as React.CSSProperties,
  a: {
    color: '#3A6B6E',
    borderBottom: '1px solid rgba(58,107,110,0.3)',
    textDecoration: 'none',
  } as React.CSSProperties,
};

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={PP_STYLES.page}>
      <header style={PP_STYLES.header}>
        <Link href="/">
          <img
            src="/manus-storage/HOLALOGOcroppedblack_df5770e8.png"
            alt="Hola Paje Luxury Residences"
            style={{ height: '2.2rem', width: 'auto', display: 'block' }}
          />
        </Link>
        <Link href="/">
          <span style={PP_STYLES.backLink}>← Back to site</span>
        </Link>
      </header>

      <main style={PP_STYLES.main}>
        <p style={PP_STYLES.eyebrow}>Legal</p>
        <h1 style={PP_STYLES.title}>Privacy Policy</h1>
        <p style={PP_STYLES.meta}>
          Responsible party: Floton Africa (Pty) Ltd · Last reviewed: June 2026
        </p>

        <h2 style={PP_STYLES.h2}>1. Introduction</h2>
        <p style={PP_STYLES.p}>
          Floton Africa (Pty) Ltd ("Floton Africa", "we", "us", "our") operates the Hola Paje
          Luxury Residences website at holapaje.com. We are committed to protecting your personal
          information in accordance with applicable data protection legislation, including the
          Protection of Personal Information Act 4 of 2013 (POPIA) of South Africa, the General
          Data Protection Regulation (EU) 2016/679 (GDPR), and the Electronic and Postal
          Communications Act (EPOCA) of Tanzania.
        </p>
        <p style={PP_STYLES.p}>
          This policy explains what personal information we collect, why we collect it, how we
          use it, and your rights in relation to it.
        </p>

        <h2 style={PP_STYLES.h2}>2. Information We Collect</h2>
        <p style={PP_STYLES.p}>We may collect the following categories of personal information:</p>
        <ul style={PP_STYLES.ul}>
          <li style={PP_STYLES.li}>
            <strong>Identity data:</strong> first name, last name
          </li>
          <li style={PP_STYLES.li}>
            <strong>Contact data:</strong> email address, telephone number
          </li>
          <li style={PP_STYLES.li}>
            <strong>Enquiry data:</strong> villa of interest, message content
          </li>
          <li style={PP_STYLES.li}>
            <strong>Technical data:</strong> IP address, browser type, pages visited (via
            anonymised analytics)
          </li>
        </ul>
        <p style={PP_STYLES.p}>
          We do not collect sensitive personal information (special categories of data) through
          this website.
        </p>

        <h2 style={PP_STYLES.h2}>3. How We Use Your Information</h2>
        <p style={PP_STYLES.p}>We use your personal information for the following purposes:</p>
        <ul style={PP_STYLES.ul}>
          <li style={PP_STYLES.li}>
            To respond to your enquiry about Hola Paje Luxury Residences
          </li>
          <li style={PP_STYLES.li}>
            To provide you with information about the development that you have requested
          </li>
          <li style={PP_STYLES.li}>
            To comply with our legal and regulatory obligations
          </li>
          <li style={PP_STYLES.li}>
            To improve the performance and content of this website (anonymised analytics only)
          </li>
        </ul>
        <p style={PP_STYLES.p}>
          We will not use your information for automated decision-making or profiling.
        </p>

        <h2 style={PP_STYLES.h2}>4. Legal Basis for Processing</h2>
        <p style={PP_STYLES.p}>
          We process your personal information on the following legal bases:
        </p>
        <ul style={PP_STYLES.ul}>
          <li style={PP_STYLES.li}>
            <strong>Consent:</strong> where you have given us explicit consent to contact you
            regarding your enquiry (you may withdraw consent at any time)
          </li>
          <li style={PP_STYLES.li}>
            <strong>Legitimate interests:</strong> to respond to enquiries and manage our
            business operations, where these interests are not overridden by your rights
          </li>
          <li style={PP_STYLES.li}>
            <strong>Legal obligation:</strong> where processing is necessary to comply with
            applicable law
          </li>
        </ul>

        <h2 style={PP_STYLES.h2}>5. Data Retention</h2>
        <p style={PP_STYLES.p}>
          We retain your personal information for as long as is necessary to fulfil the purposes
          for which it was collected, or as required by law. Enquiry data is typically retained
          for a period of three years from the date of last contact, after which it is securely
          deleted or anonymised.
        </p>

        <h2 style={PP_STYLES.h2}>6. Sharing Your Information</h2>
        <p style={PP_STYLES.p}>
          We do not sell, rent, or trade your personal information to third parties. We may share
          your information with:
        </p>
        <ul style={PP_STYLES.ul}>
          <li style={PP_STYLES.li}>
            Our authorised sales and marketing partners, where necessary to respond to your
            enquiry
          </li>
          <li style={PP_STYLES.li}>
            Service providers who assist us in operating this website and our business (subject
            to appropriate data processing agreements)
          </li>
          <li style={PP_STYLES.li}>
            Regulatory authorities, where required by law
          </li>
        </ul>
        <p style={PP_STYLES.p}>
          Where personal information is transferred outside of the European Economic Area or
          South Africa, we ensure appropriate safeguards are in place in accordance with
          applicable data protection law.
        </p>

        <h2 style={PP_STYLES.h2}>7. Your Rights</h2>
        <p style={PP_STYLES.p}>
          Depending on your jurisdiction, you may have the following rights in relation to your
          personal information:
        </p>
        <ul style={PP_STYLES.ul}>
          <li style={PP_STYLES.li}>The right to access your personal information</li>
          <li style={PP_STYLES.li}>
            The right to rectification of inaccurate or incomplete information
          </li>
          <li style={PP_STYLES.li}>
            The right to erasure ("right to be forgotten") in certain circumstances
          </li>
          <li style={PP_STYLES.li}>The right to restrict processing in certain circumstances</li>
          <li style={PP_STYLES.li}>The right to data portability</li>
          <li style={PP_STYLES.li}>
            The right to object to processing based on legitimate interests
          </li>
          <li style={PP_STYLES.li}>
            The right to withdraw consent at any time (where processing is based on consent)
          </li>
        </ul>
        <p style={PP_STYLES.p}>
          To exercise any of these rights, please contact us at{' '}
          <a href="mailto:enquiries@holapaje.com" style={PP_STYLES.a}>
            enquiries@holapaje.com
          </a>
          . We will respond within 30 days.
        </p>

        <h2 style={PP_STYLES.h2}>8. Cookies and Analytics</h2>
        <p style={PP_STYLES.p}>
          This website uses anonymised, privacy-preserving analytics (Umami) to understand how
          visitors use the site. No personally identifiable information is collected through
          analytics, and no data is shared with third-party advertising networks.
        </p>
        <p style={PP_STYLES.p}>
          We do not use tracking cookies or third-party advertising cookies.
        </p>

        <h2 style={PP_STYLES.h2}>9. Security</h2>
        <p style={PP_STYLES.p}>
          We implement appropriate technical and organisational measures to protect your personal
          information against unauthorised access, disclosure, alteration, or destruction. All
          data transmitted via this website is encrypted using TLS.
        </p>

        <h2 style={PP_STYLES.h2}>10. Children</h2>
        <p style={PP_STYLES.p}>
          This website is not directed at children under the age of 18. We do not knowingly
          collect personal information from children.
        </p>

        <h2 style={PP_STYLES.h2}>11. Changes to This Policy</h2>
        <p style={PP_STYLES.p}>
          We may update this privacy policy from time to time. The date of the most recent
          revision is shown at the top of this page. We encourage you to review this policy
          periodically.
        </p>

        <h2 style={PP_STYLES.h2}>12. Contact Us</h2>
        <p style={PP_STYLES.p}>
          If you have any questions about this privacy policy or our data practices, please
          contact us:
        </p>
        <p style={PP_STYLES.p}>
          Floton Africa (Pty) Ltd<br />
          Email:{' '}
          <a href="mailto:enquiries@holapaje.com" style={PP_STYLES.a}>
            enquiries@holapaje.com
          </a>
          <br />
          Paje, Zanzibar, United Republic of Tanzania
        </p>
        <p style={PP_STYLES.p}>
          If you are located in the European Union and are not satisfied with our response, you
          have the right to lodge a complaint with your local data protection supervisory
          authority. If you are located in South Africa, you may contact the Information
          Regulator at{' '}
          <a href="https://www.justice.gov.za/inforeg/" style={PP_STYLES.a} target="_blank" rel="noopener noreferrer">
            www.justice.gov.za/inforeg
          </a>
          .
        </p>
      </main>
    </div>
  );
}
