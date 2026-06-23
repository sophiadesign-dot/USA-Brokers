import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Card,
  Checkbox,
  CityStateAutocomplete,
  Dropdown,
  Input,
  Link,
  Text,
  type DropdownOption,
} from '@/shared/components';
import { classNames } from '@/shared/utils/class-names';
import { fieldErrorMessage } from '@/shared/utils/form-error-message';
import { buildFormSubject, useWeb3FormSubmit } from '@/shared/hooks/use-web3-form-submit';
import { heroFormSchema, type HeroFormValues } from './hero-form.schema';
import styles from './styles.module.scss';

const FREIGHT_OPTIONS: DropdownOption[] = [
  { value: 'dry', label: 'Dry' },
  { value: 'refrigerated', label: 'Refrigerated' },
  { value: 'ltl', label: 'LTL (Less Than Truckload)' },
  { value: 'flatbed', label: 'Flatbed' },
  { value: 'power_only', label: 'Power Only' },
  { value: 'intermodal', label: 'Intermodal' },
];

export const HeroFormCard: FC = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      originCityState: '',
      destinationCityState: '',
      freightType: '',
      message: '',
      acceptTerms: false,
    },
  });

  const { submitForm } = useWeb3FormSubmit({ onSuccess: reset });

  const onSubmit: SubmitHandler<HeroFormValues> = async (values) => {
    const freightLabel =
      FREIGHT_OPTIONS.find((option) => option.value === values.freightType)?.label ?? values.freightType;

    await submitForm({
      subject: buildFormSubject('Hero form', values.firstName, values.lastName),
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone,
      origin_city_state: values.originCityState,
      destination_city_state: values.destinationCityState,
      freight_type: freightLabel,
      message: values.message,
      form_source: 'hero-form',
    });
  };

  return (
    <Card>
      <form className={styles['hero-form']} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles['hero-form-row']}>
          <Input
            id="hero-firstName"
            placeholder="First name*"
            autoComplete="given-name"
            error={fieldErrorMessage(errors.firstName)}
            {...register('firstName')}
          />
          <Input
            id="hero-lastName"
            placeholder="Last name*"
            autoComplete="family-name"
            error={fieldErrorMessage(errors.lastName)}
            {...register('lastName')}
          />
        </div>

        <div className={styles['hero-form-row']}>
          <Input
            id="hero-phone"
            type="tel"
            placeholder="Phone*"
            autoComplete="tel"
            error={fieldErrorMessage(errors.phone)}
            {...register('phone')}
          />
          <Input
            id="hero-email"
            type="email"
            placeholder="Email*"
            autoComplete="email"
            error={fieldErrorMessage(errors.email)}
            {...register('email')}
          />
        </div>

        <div className={styles['hero-form-row']}>
          <Controller
            name="originCityState"
            control={control}
            render={({ field }) => (
              <CityStateAutocomplete
                id="hero-originCityState"
                placeholder="Origin City & State*"
                error={fieldErrorMessage(errors.originCityState)}
                ref={field.ref}
                value={field.value ?? ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <Controller
            name="destinationCityState"
            control={control}
            render={({ field }) => (
              <CityStateAutocomplete
                id="hero-destinationCityState"
                placeholder="Destination City & State*"
                error={fieldErrorMessage(errors.destinationCityState)}
                ref={field.ref}
                value={field.value ?? ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <div className={classNames(styles['hero-form-row'], styles['hero-form-row--full'])}>
          <Controller
            name="freightType"
            control={control}
            render={({ field }) => (
              <Dropdown
                id="hero-freightType"
                placeholder="Type of Freight"
                options={FREIGHT_OPTIONS}
                error={fieldErrorMessage(errors.freightType)}
                ref={field.ref}
                value={field.value ?? ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <div className={classNames(styles['hero-form-row'], styles['hero-form-row--full'])}>
          <Input
            id="hero-message"
            rows={4}
            placeholder="Message*"
            error={fieldErrorMessage(errors.message)}
            {...register('message')}
          />
        </div>

        <div
          className={classNames(
            styles['hero-form-row'],
            styles['hero-form-row--full'],
            styles['hero-form-row--checkbox']
          )}
        >
          <Checkbox
            id="hero-acceptTerms"
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
              </>
            }
            error={fieldErrorMessage(errors.acceptTerms)}
            {...register('acceptTerms')}
          />
        </div>

        <div className={classNames(styles['hero-form-row'], styles['hero-form-row--full'])}>
          <Button type="submit" text="Submit" fullWidth loading={isSubmitting} />
        </div>
      </form>
    </Card>
  );
};
