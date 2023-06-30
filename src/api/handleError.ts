import { AxiosError } from 'axios';

export class ValidationError extends Error {
  declare errors: { [key: string]: string };
  status = 422;
  name = this.constructor.name;

  constructor({
    message = 'Validation errors',
    errors,
  }: {
    message?: string;
    errors: { [key: string]: string };
  }) {
    super(message);

    this.errors = errors;
  }

  /**
   * Returns a value that can be used with form.setFields()
   * to display validation errors in antd Form component
   */
  toAntdFields(): {
    name: string | string[];
    errors: string[];
  }[] {
    return Object.entries(this.errors).map(([name, message]) => {
      // EP api creates namespace "body." for all invalid keys in body
      // TODO: remove this logic in future in case EP will revert to more conventional format
      name = name.replace(/^body\./, '');

      return {
        // handle nested fields
        name: name.includes('.') ? name.split('.') : name,
        errors: [message],
      };
    });
  }
}

export class UnauthorizedError extends Error {
  status = 401;
  name = this.constructor.name;
}

export interface ValidationErrorResp {
  error: {
    code: 422;
    message: string;
  };
  attributes: { [key: string]: string };
}

export interface UnauthorizedErrorResp {
  error: {
    code: 403;
    message: 'Forbidden';
  };
}

export async function handleError(error: AxiosError): Promise<void> {
  const { response } = error;

  switch (response?.status) {
    case 422: // validation error
      throw new ValidationError({
        message: error.message,
        errors: (response.data as ValidationErrorResp).attributes,
      });
    default:
      throw error;
  }
}
