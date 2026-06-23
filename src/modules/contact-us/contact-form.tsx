import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Button, Card, Checkbox, Input, Link, Text } from '@/shared/components';
import { buildContactFields, buildFormSubject, useWeb3FormSubmit } from '@/shared/hooks/use-web3-form-submit';
import { classNames } from '@/shared/utils/class-names';
import { fieldErrorMessage } from '@/shared/utils/form-error-message';
import { contactFormSchema, type ContactFormValues } from './contact-form.schema';
import styles from './styles.module.scss';

export const ContactForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      acceptTerms: false,
    },
  });

  const { submitForm } = useWeb3FormSubmit({ onSuccess: reset });

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    await submitForm({
      subject: buildFormSubject('Logistics specialist request form', values.firstName, values.lastName),
      ...buildContactFields(values, 'contact-form'),
    });
  };

  return (
    <Card className={styles['contact-form-card']}>
      <Text as="h2" family="albert-sans" className={styles['contact-form-title']}>
        Talk to a logistics specialist
      </Text>

      <form className={styles['contact-form']} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles['contact-form-fields']}>
          <Input
            id="contact-firstName"
            placeholder="First name*"
            autoComplete="given-name"
            error={fieldErrorMessage(errors.firstName)}
            {...register('firstName')}
          />
          <Input
            id="contact-lastName"
            placeholder="Last name*"
            autoComplete="family-name"
            error={fieldErrorMessage(errors.lastName)}
            {...register('lastName')}
          />
          <Input
            id="contact-phone"
            type="tel"
            placeholder="Phone*"
            autoComplete="tel"
            error={fieldErrorMessage(errors.phone)}
            {...register('phone')}
          />
          <Input
            id="contact-email"
            type="email"
            placeholder="Email*"
            autoComplete="email"
            error={fieldErrorMessage(errors.email)}
            {...register('email')}
          />
        </div>

        <div className={classNames(styles['contact-form-row'], styles['contact-form-row--checkbox'])}>
          <Checkbox
            id="contact-acceptTerms"
            className={styles['contact-form-checkbox']}
            label={
              <>
                <Text as="span" size="form-caption" family="open-sans" color="muted" weight="regular">
                  I agree to the{' '}
                </Text>
                <Link href="/terms" target="_blank">
                  <Text as="span" size="form-caption" family="open-sans" color="link" weight="bold">
                    Terms of Service
                  </Text>
                </Link>
                <Text as="span" size="form-caption" family="open-sans" color="muted" weight="regular">
                  {' '}
                  and{' '}
                </Text>
                <Link href="/privacy" target="_blank">
                  <Text as="span" size="form-caption" family="open-sans" color="link" weight="bold">
                    Privacy Policy
                  </Text>
                </Link>
                <Text as="span" size="form-caption" family="open-sans" color="muted" weight="regular">
                  *
                </Text>
              </>
            }
            error={fieldErrorMessage(errors.acceptTerms)}
            {...register('acceptTerms')}
          />
        </div>

        <div className={styles['contact-form-row']}>
          <Button type="submit" text="Continue" fullWidth loading={isSubmitting} />
        </div>
      </form>
    </Card>
  );
};
