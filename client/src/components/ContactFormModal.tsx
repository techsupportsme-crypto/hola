/*
 * HOLA PAJE — ContactFormModal
 * Standalone centred overlay that opens when "Register Interest" is clicked
 * from within the VillaModal rail, or when the BROCHURE button is clicked.
 * Design: Montserrat-only, deep-teal panel on linen/dark backdrop.
 *
 * On successful submission (native form OR HighLevel iframe postMessage),
 * the user is redirected to /thank-you.
 *
 * HighLevel iframes emit a postMessage when the form is submitted:
 *   { type: 'form_submitted' } or { event: 'form_submitted' }
 * We listen for these and redirect accordingly.
 */

import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';

interface ContactFormModalProps {
  open: boolean;
  villaName?: string;
  /** When set, a successful submission triggers an automatic download of this URL */
  downloadUrl?: string;
  /** Source context passed to the server for owner notifications */
  source?: 'brochure' | 'villa' | 'contact';
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  message: string;
  consent: boolean;
}

const EMPTY: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  message: '',
  consent: false,
};

const HIGHLEVEL_FORM_SCRIPT = 'https://app.flotonzanzibar.com/js/form_embed.js';

export function ContactFormModal({
  open,
  villaName,
  downloadUrl,
  source,
  onClose,
}: ContactFormModalProps) {
  const [data, setData] = useState<FormData>(EMPTY);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const firstRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  const submitMutation = trpc.enquiry.submit.useMutation();

  const isBrochureGate = Boolean(downloadUrl);
  const isVillaGate = source === 'villa';
  const isHighLevelGate = isBrochureGate || isVillaGate;
  const isSubmitting = submitMutation.isPending;

  // Reset on open
  useEffect(() => {
    if (!open) return;

    setData(EMPTY);
    setSubmitError(null);

    // Focus first field after transition for the native fallback form only.
    if (isHighLevelGate) return;

    const t = setTimeout(() => firstRef.current?.focus(), 320);
    return () => clearTimeout(t);
  }, [open, isHighLevelGate]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Load HighLevel's embed helper once when either HighLevel iframe is used.
  useEffect(() => {
    if (!open || !isHighLevelGate) return;
    if (document.querySelector(`script[src="${HIGHLEVEL_FORM_SCRIPT}"]`)) return;

    const script = document.createElement('script');
    script.src = HIGHLEVEL_FORM_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
  }, [open, isHighLevelGate]);

  // Listen for HighLevel iframe postMessage submission events.
  // HighLevel sends: { type: 'form_submitted' } or { event: 'form_submitted' }
  useEffect(() => {
    if (!open || !isHighLevelGate) return;

    const handleMessage = (event: MessageEvent) => {
      // Accept messages from the HighLevel domain only
      if (
        typeof event.data !== 'object' ||
        event.data === null
      ) return;

      const isSubmission =
        event.data.type === 'form_submitted' ||
        event.data.event === 'form_submitted' ||
        event.data.type === 'gtm.formSubmit' ||
        event.data.formSubmitted === true;

      if (!isSubmission) return;

      // For brochure gate: trigger download before navigating
      if (downloadUrl) {
        triggerDownload(downloadUrl);
      }

      onClose();
      navigate('/thank-you');
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [open, isHighLevelGate, downloadUrl, onClose, navigate]);

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
      setData(d => ({ ...d, [field]: value }));
    };

  const triggerDownload = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Hola-Paje-Brochure.pdf';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.consent || submitMutation.isPending) return;
    setSubmitError(null);

    const resolvedSource = source ?? (downloadUrl ? 'brochure' : 'contact');

    try {
      await submitMutation.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile || undefined,
        message: data.message || undefined,
        source: resolvedSource,
        villaName: villaName,
      });

      // Trigger brochure download before navigating
      if (downloadUrl) {
        triggerDownload(downloadUrl);
      }

      onClose();
      navigate('/thank-you');
    } catch {
      setSubmitError('Something went wrong. Please try again or contact us directly.');
    }
  };

  const dialogLabel = isBrochureGate
    ? 'Download brochure'
    : 'Register your interest';

  const villaFormSrc = villaName
    ? `https://app.flotonzanzibar.com/widget/form/insn5NNW1w0AkpLtmPv7?villa_type=${encodeURIComponent(villaName)}`
    : 'https://app.flotonzanzibar.com/widget/form/insn5NNW1w0AkpLtmPv7';

  // Do not render hidden HighLevel iframes when the modal is closed.
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`hp-cfm-backdrop${open ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
        style={{ zIndex: 10010 }}
      />

      {/* Panel */}
      <div
        className={`hp-cfm-panel${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={dialogLabel}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'fixed', zIndex: 10020 }}
      >
        {/* Close button */}
        <button className="hp-cfm-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <p className="hp-cfm-eyebrow">
          {isBrochureGate ? 'Download Brochure' : 'Register Interest'}
        </p>
        <h2 className="hp-cfm-title">
          {villaName ? villaName : 'Hola Paje'}
        </h2>
        <p className="hp-cfm-subtitle">
          {isBrochureGate
            ? 'Leave your details and your brochure will download immediately.'
            : 'Leave your details and a member of our team will be in touch.'}
        </p>

        {isBrochureGate ? (
          <div className="hp-cfm-form" style={{ position: 'relative', zIndex: 10021 }}>
            <iframe
              src="https://app.flotonzanzibar.com/widget/form/6a9HAPzL3FPqrt7WbtJK"
              style={{
                width: '100%',
                height: '500px',
                minHeight: '500px',
                border: '0',
                borderRadius: '8px',
                display: 'block',
                position: 'relative',
                zIndex: 10022,
                pointerEvents: 'auto',
                background: 'transparent',
                overflow: 'hidden',
              }}
              id="inline-6a9HAPzL3FPqrt7WbtJK"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Download Brochure - Form"
              data-height="500"
              data-layout-iframe-id="inline-6a9HAPzL3FPqrt7WbtJK"
              data-form-id="6a9HAPzL3FPqrt7WbtJK"
              title="Download Brochure - Form"
            />
          </div>
        ) : isVillaGate ? (
          <div className="hp-cfm-form" style={{ position: 'relative', zIndex: 10021 }}>
            <iframe
              key={villaFormSrc}
              src={villaFormSrc}
              style={{
                width: '100%',
                height: '680px',
                minHeight: '680px',
                border: '0',
                borderRadius: '8px',
                display: 'block',
                position: 'relative',
                zIndex: 10022,
                pointerEvents: 'auto',
                background: 'transparent',
                overflow: 'hidden',
              }}
              id="inline-insn5NNW1w0AkpLtmPv7"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Register Interest - Modal Form"
              data-height="680"
              data-layout-iframe-id="inline-insn5NNW1w0AkpLtmPv7"
              data-form-id="insn5NNW1w0AkpLtmPv7"
              title="Register Interest - Modal Form"
            />
          </div>
        ) : (
          <form className="hp-cfm-form" onSubmit={handleSubmit} noValidate>
            {/* Row 1 — Name */}
            <div className="hp-cfm-row">
              <div className="hp-cfm-field">
                <label htmlFor="cfm-first">First Name</label>
                <input
                  ref={firstRef}
                  id="cfm-first"
                  type="text"
                  required
                  autoComplete="given-name"
                  value={data.firstName}
                  onChange={set('firstName')}
                />
              </div>
              <div className="hp-cfm-field">
                <label htmlFor="cfm-last">Last Name</label>
                <input
                  id="cfm-last"
                  type="text"
                  required
                  autoComplete="family-name"
                  value={data.lastName}
                  onChange={set('lastName')}
                />
              </div>
            </div>

            {/* Row 2 — Contact */}
            <div className="hp-cfm-row">
              <div className="hp-cfm-field">
                <label htmlFor="cfm-email">Email</label>
                <input
                  id="cfm-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={data.email}
                  onChange={set('email')}
                />
              </div>
              <div className="hp-cfm-field">
                <label htmlFor="cfm-mobile">Mobile</label>
                <input
                  id="cfm-mobile"
                  type="tel"
                  autoComplete="tel"
                  value={data.mobile}
                  onChange={set('mobile')}
                />
              </div>
            </div>

            <div className="hp-cfm-field hp-cfm-field--full">
              <label htmlFor="cfm-message">Message <span className="hp-cfm-optional">(optional)</span></label>
              <textarea
                id="cfm-message"
                rows={3}
                value={data.message}
                onChange={set('message')}
                placeholder="Any questions or specific requirements…"
              />
            </div>

            {/* Consent */}
            <label className="hp-cfm-consent">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={set('consent')}
                required
              />
              <span>
                I agree to be contacted by the Hola Paje team regarding this enquiry, in accordance with the{' '}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
              </span>
            </label>

            {submitError && (
              <p className="hp-cfm-error">{submitError}</p>
            )}

            <button
              type="submit"
              className="hp-cfm-submit"
              disabled={!data.consent || isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <span className="hp-cfm-spinner-wrap">
                  <svg
                    className="hp-cfm-spinner"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="31.4 31.4"
                    />
                  </svg>
                  Sending…
                </span>
              ) : (
                'Submit Enquiry'
              )}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
