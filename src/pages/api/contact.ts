import type { APIRoute } from 'astro';
import {
  email,
  minLength,
  object,
  string,
  ValiError,
  flatten,
  parse,
} from 'valibot';
import { decode } from 'decode-formdata';
import { getLangFromRequest, useTranslations } from '@/i18n/utils';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const lang = getLangFromRequest(request);
  const t = useTranslations(lang);

  const Schema = object({
    firstName: string([minLength(1, t('please-enter-your-first-name'))]),
    lastName: string([minLength(1, t('please-enter-your-last-name'))]),
    email: string([email(t('invalid-email'))]),
    message: string([minLength(1, t('please-enter-your-message'))]),
  });

  try {
    const formData = await request.formData();
    const formValues = decode(formData);

    const data = parse(Schema, formValues);

    // Send email with data
    console.log('Send the parsed data to your email service', data);

    return new Response(
      JSON.stringify({
        message: 'Success!',
        errors: {},
      }),
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof ValiError) {
      return new Response(
        JSON.stringify({
          message: '',
          errors: flatten(err).nested,
        }),
        { status: 400 }
      );
    } else if (err instanceof Error) {
      return new Response(
        JSON.stringify({
          message: err.message,
          errors: {},
        }),
        { status: 400 }
      );
    }
    return new Response(
      JSON.stringify({
        message: 'Unknown error',
        errors: {},
      }),
      { status: 400 }
    );
  }
};
