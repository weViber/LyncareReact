import { useEffect, useCallback } from "react";

const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
const SCRIPT_ID = "recaptcha-v3-script";

const useRecaptcha = () => {
  useEffect(() => {
    if (!SITE_KEY) return;
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
      document
        .querySelectorAll(".grecaptcha-badge")
        .forEach((node) => node.parentElement?.remove());
      delete window.grecaptcha;
    };
  }, []);

  const executeRecaptcha = useCallback((action = "contact_form") => {
    return new Promise((resolve, reject) => {
      if (!SITE_KEY) {
        reject(new Error("reCAPTCHA site key is not configured"));
        return;
      }
      if (!window.grecaptcha?.execute) {
        reject(new Error("reCAPTCHA가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요."));
        return;
      }
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(SITE_KEY, { action })
          .then(resolve)
          .catch(reject);
      });
    });
  }, []);

  return { executeRecaptcha };
};

export default useRecaptcha;
