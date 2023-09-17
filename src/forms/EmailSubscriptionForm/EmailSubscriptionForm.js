import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { Form, PrimaryButton, FieldTextInput, NamedLink } from '../../components';
import * as validators from '../../util/validators';

import css from './EmailSubscriptionForm.module.css';
import axios from 'axios';

const EmailSubscriptionFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        rootClassName,
        className,
        formId,
        onSubmit,
        inProgress,
        intl,
        invalid,
      } = fieldRenderProps;

      // email
      const emailLabel = intl.formatMessage({
        id: 'LoginForm.emailLabel',
      });
      const emailPlaceholder = intl.formatMessage({
        id: 'LoginForm.emailPlaceholder',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'LoginForm.emailRequired',
      });
      const emailRequired = validators.required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'LoginForm.emailInvalid',
      });
      const emailValid = validators.emailFormatValid(emailInvalidMessage);

      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = inProgress;
      const submitDisabled = invalid || submitInProgress;

      const passwordRecoveryLink = (
        <NamedLink name="PasswordRecoveryPage" className={css.recoveryLink}>
          <FormattedMessage id="LoginForm.forgotPassword" />
        </NamedLink>
      );

      const submitSubscription = () => {
        axios.post('https://api.apispreadsheets.com/data/u1Lz1GbxtNAm7QYA/', {
          data: { email: 'tttttwew@fd.yu' },
        });
      };

      return (
        <Form className={classes} onSubmit={onSubmit}>
          <div>
            <FieldTextInput
              type="email"
              id="subscriptionEmail"
              name="email"
              autoComplete="email"
              label={emailLabel}
              placeholder={emailPlaceholder}
              validate={validators.composeValidators(emailRequired, emailValid)}
            />
          </div>
          <div className={css.bottomWrapper}>
            <PrimaryButton
              onClick={submitSubscription}
              inProgress={submitInProgress}
              disabled={submitDisabled}
            >
              <FormattedMessage id="Submit" />
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);

EmailSubscriptionFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  form: null,
  inProgress: false,
};

const { string, bool } = PropTypes;

EmailSubscriptionFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  form: string,
  inProgress: bool,
  intl: intlShape.isRequired,
};

const EmailSubscriptionForm = compose(injectIntl)(EmailSubscriptionFormComponent);
EmailSubscriptionForm.displayName = 'EmailSubscriptionForm';

export default EmailSubscriptionForm;
