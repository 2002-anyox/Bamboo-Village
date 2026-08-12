'use client';

import { useId, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Accessible field primitives shared by the cart, the reservation form and
 * the contact form. Every input is labelled, every error is announced, and
 * invalid fields are wired up with aria-invalid / aria-describedby.
 */

const controlClasses = cn(
  'w-full border border-gold/20 bg-ink/50 px-4 py-3.5 font-sans text-[0.9375rem] text-cream',
  'placeholder:text-cream/30',
  'transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
  'hover:border-gold/35 focus:border-gold focus:outline-none',
);

function Shell({
  label,
  htmlFor,
  error,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={htmlFor}
        className="font-sans text-[0.6875rem] font-semibold tracking-[0.22em] text-champagne/70 uppercase"
      >
        {label}
        {required && (
          <span className="ml-1 text-gold" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}

      {hint && !error && <p className="text-xs text-cream/40">{hint}</p>}

      {error && (
        <p role="alert" className="text-xs font-medium text-ember">
          {error}
        </p>
      )}
    </div>
  );
}

type CommonProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  autoComplete?: string;
};

export function TextField({
  type = 'text',
  min,
  max,
  inputMode,
  ...props
}: CommonProps & {
  type?: 'text' | 'email' | 'tel' | 'date' | 'time' | 'number';
  min?: string | number;
  max?: string | number;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric';
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <Shell
      label={props.label}
      htmlFor={id}
      error={props.error}
      hint={props.hint}
      required={props.required}
      className={props.className}
    >
      <input
        id={id}
        type={type}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        placeholder={props.placeholder}
        required={props.required}
        min={min}
        max={max}
        inputMode={inputMode}
        autoComplete={props.autoComplete}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={props.error ? errorId : undefined}
        className={cn(controlClasses, props.error && 'border-ember/70')}
      />
      {props.error && (
        <span id={errorId} className="sr-only">
          {props.error}
        </span>
      )}
    </Shell>
  );
}

export function TextAreaField({
  rows = 4,
  ...props
}: CommonProps & { rows?: number }) {
  const id = useId();

  return (
    <Shell
      label={props.label}
      htmlFor={id}
      error={props.error}
      hint={props.hint}
      required={props.required}
      className={props.className}
    >
      <textarea
        id={id}
        rows={rows}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        placeholder={props.placeholder}
        required={props.required}
        aria-invalid={props.error ? true : undefined}
        className={cn(controlClasses, 'resize-y', props.error && 'border-ember/70')}
      />
    </Shell>
  );
}

export function SelectField({
  options,
  ...props
}: CommonProps & { options: { value: string; label: string }[] }) {
  const id = useId();

  return (
    <Shell
      label={props.label}
      htmlFor={id}
      error={props.error}
      hint={props.hint}
      required={props.required}
      className={props.className}
    >
      <div className="relative">
        <select
          id={id}
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
          required={props.required}
          aria-invalid={props.error ? true : undefined}
          className={cn(
            controlClasses,
            'appearance-none pr-11',
            props.error && 'border-ember/70',
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-surface">
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 h-2 w-2 -translate-y-2/3 rotate-135 border-t border-r border-gold/70"
        />
      </div>
    </Shell>
  );
}

/** Segmented radio group — used for Delivery / Pickup. */
export function ToggleGroup<T extends string>({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string; hint?: string }[];
  className?: string;
}) {
  return (
    <fieldset className={cn('flex flex-col gap-2', className)}>
      <legend className="mb-2 font-sans text-[0.6875rem] font-semibold tracking-[0.22em] text-champagne/70 uppercase">
        {label}
      </legend>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              className={cn(
                'border px-4 py-3.5 text-center transition-all duration-300',
                'ease-[cubic-bezier(0.22,1,0.36,1)]',
                active
                  ? 'border-gold bg-gold text-ink'
                  : 'border-gold/20 text-cream/70 hover:border-gold/50 hover:text-cream',
              )}
            >
              <span className="block font-sans text-[0.6875rem] font-semibold tracking-[0.2em] uppercase">
                {option.label}
              </span>
              {option.hint && (
                <span
                  className={cn(
                    'mt-1 block text-[0.6875rem]',
                    active ? 'text-ink/70' : 'text-cream/40',
                  )}
                >
                  {option.hint}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
