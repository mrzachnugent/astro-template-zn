import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslatedPath, useTranslations } from '@/i18n/utils';
import { useState, type FormEvent } from 'react';

export function ContactForm({ lang }: { lang: 'en' | 'fr' }) {
  const [responseMessage, setResponseMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const t = useTranslations(lang);
  const translatePath = useTranslatedPath(lang);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      if (data.message === 'Success!') {
        window.location.href = translatePath(`/success`);
      } else {
        setResponseMessage(data.message);
      }
    }
    if (data.errors) {
      setErrors(data.errors);
    }
  }

  return (
    <form method='POST' className='space-y-2' onSubmit={submit}>
      <FormField
        errors={errors}
        htmlFor='firstName'
        label={`${t('firstName')}:`}
      >
        <Input type='text' name='firstName' />
      </FormField>
      <FormField errors={errors} htmlFor='lastName' label={`${t('lastName')}:`}>
        <Input type='text' name='lastName' />
      </FormField>
      <FormField errors={errors} htmlFor='email' label={`${t('email')}:`}>
        <Input type='text' name='email' />
      </FormField>
      <FormField errors={errors} htmlFor='message' label={`${t('message')}:`}>
        <Textarea name='message' />
      </FormField>
      <div className='flex justify-end'>
        <Button type='submit'>{t('send')}</Button>
      </div>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
