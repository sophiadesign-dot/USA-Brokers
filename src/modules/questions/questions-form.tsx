import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, Input, Link, Text } from '@/shared/components';
import { buildContactFields, buildFormSubject, useWeb3FormSubmit } from '@/shared/hooks/use-web3-form-submit';
import { fieldErrorMessage } from '@/shared/utils/form-error-message';
import { questionsFormSchema, type QuestionsFormValues } from './questions-form.schema';
import styles from './styles.module.scss';

export const QuestionsForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuestionsFormValues>({
    resolver: zodResolver(questionsFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      acceptTerms: false,
    },
  });

  const { submitForm } = useWeb3FormSubmit({ onSuccess: reset });

  const onSubmit: SubmitHandler<QuestionsFormValues> = async (values) => {
    await submitForm({
      subject: buildFormSubject('Questions form', values.firstName, values.lastName),
      ...buildContactFields(values, 'questions-form'),
    });
  };

  return (
    <form className={styles['questions-form']} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles['questions-form-fields']}>
        <div className={styles['questions-form-row']}>
          <Input
            id="questions-firstName"
            variant="soft"
            placeholder="First name*"
            autoComplete="given-name"
            inputClassName={styles['questions-form-input']}
            error={fieldErrorMessage(errors.firstName)}
            {...register('firstName')}
          />
          <Input
            id="questions-lastName"
            variant="soft"
            placeholder="Last name*"
            autoComplete="family-name"
            inputClassName={styles['questions-form-input']}
            error={fieldErrorMessage(errors.lastName)}
            {...register('lastName')}
          />
        </div>

        <div className={styles['questions-form-row']}>
          <Input
            id="questions-phone"
            variant="soft"
            type="tel"
            placeholder="Phone*"
            autoComplete="tel"
            inputClassName={styles['questions-form-input']}
            error={fieldErrorMessage(errors.phone)}
            {...register('phone')}
          />
          <Input
            id="questions-email"
            variant="soft"
            type="email"
            placeholder="Email*"
            autoComplete="email"
            inputClassName={styles['questions-form-input']}
            error={fieldErrorMessage(errors.email)}
            {...register('email')}
          />
        </div>
      </div>

      <div className={styles['questions-form-checkbox']}>
        <Checkbox
          id="questions-acceptTerms"
          label={
            <>
              <Text as="span" size="form-caption" family="open-sans" color="input-soft" weight="regular">
                I agree to the{' '}
              </Text>
              <Link href="/terms" target="_blank">
                <Text as="span" size="form-caption" family="open-sans" color="input-soft" weight="bold">
                  Terms of Service
                </Text>
              </Link>
              <Text as="span" size="form-caption" family="open-sans" color="input-soft" weight="regular">
                {' '}
                and{' '}
              </Text>
              <Link href="/privacy" target="_blank">
                <Text as="span" size="form-caption" family="open-sans" color="input-soft" weight="bold">
                  Privacy Policy
                </Text>
              </Link>
              <Text as="span" size="form-caption" family="open-sans" color="input-soft" weight="regular">
                *
              </Text>
            </>
          }
          error={fieldErrorMessage(errors.acceptTerms)}
          {...register('acceptTerms')}
        />
      </div>

      <div className={styles['questions-form-submit']}>
        <Button type="submit" variant="accent" text="Submit" fullWidth loading={isSubmitting} />
      </div>
    </form>
  );
};
