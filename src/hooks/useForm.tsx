import { useCallback, useEffect, useRef, useState } from "react";

type FormState<T extends object> = {
  loading: boolean;
  errors: Partial<Record<keyof T, string>>;
  data?: T;
};

type UseFormOptions<T extends object> = {
  initialState?: T;
  onSubmit: (params: {
    data: T;
    form: HTMLFormElement;
  }) => Promise<{ errors?: Partial<Record<keyof T, string>> } | void>;
  validators?: Partial<
    Record<keyof T, (value: T[keyof T]) => string | undefined>
  >;
};
export default function useForm<T extends object>({
  initialState,
  onSubmit,
  validators,
}: UseFormOptions<T>) {
  const [formState, formStatus] = useState<FormState<T>>({
    loading: false,
    errors: {},
    data: initialState,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const validate = useCallback(
    (key: keyof T, value: T[keyof T]) => {
      const validator = validators?.[key];
      if (validator) {
        const error = validator(value);
        formStatus((prev) => ({
          ...prev,
          errors: { ...prev.errors, [key]: error || "" },
        }));
      }

      return !!validator;
    },
    [validators]
  );

  const submit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      if (!formRef.current) {
        return;
      }

      e.preventDefault();
      const formData = new FormData(formRef.current);

      const isValid = Object.entries(formData).every(([key, value]) => {
        const hasError = validate(key as keyof T, value as T[keyof T]);
        return !hasError;
      });

      if (!isValid) {
        return;
      }

      const data = Object.fromEntries(formData) as T;
      formStatus({ ...formState, loading: true });
      const result = await onSubmit({ data, form: formRef.current });
      formStatus({ loading: false, errors: result?.errors || {} });
    },
    [formRef, formState, onSubmit, validate]
  );

  const setField = useCallback((key: keyof T, value: T[keyof T]) => {
    formStatus((prev) => ({
      ...prev,
      data: { ...prev.data, [key]: value } as T,
    }));
  }, []);

  const reset = useCallback(() => {
    formStatus({ loading: false, errors: {}, data: initialState });
  }, [initialState]);
  return { status: formState, formRef, onSubmit: submit, setField, reset };
}
