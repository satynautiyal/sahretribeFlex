import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import {
  isSignupEmailTakenError,
  isTooManyEmailVerificationRequestsError,
} from '../../util/errors';
import {
  Page,
  NamedLink,
  NamedRedirect,
  LinkTabNavHorizontal,
  IconEmailSent,
  InlineTextButton,
  IconClose,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  Modal,
  TermsOfService,
} from '../../components';
import { LoginForm, SignupForm } from '../../forms';
import { TopbarContainer } from '../../containers';
import { login, authenticationInProgress, signup } from '../../ducks/Auth.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { manageDisableScrolling } from '../../ducks/UI.duck';
import Cookies from 'js-cookie';

import css from './AuthenticationPage.module.css';
import { FacebookLogo, GoogleLogo } from './socialLoginLogos';
import routeConfiguration from '../../routeConfiguration';
import { pathByRouteName } from '../../util/routes';
import { SocialLoginButton } from '../../components/Button/Button';
import { apiBaseUrl } from '../../util/api';

export class AuthenticationPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tosModalOpen: false,
      signupflow: localStorage.getItem('signUpType') || 'learner',
      authError: Cookies.get('st-autherror')
        ? JSON.parse(Cookies.get('st-autherror').replace('j:', ''))
        : null,
      authInfo: Cookies.get('st-authinfo')
        ? JSON.parse(Cookies.get('st-authinfo').replace('j:', ''))
        : null,
    };
    // this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.setState({
      signupflow: localStorage.getItem('signUpType') ? localStorage.getItem('signUpType') : '',
    });
    Cookies.remove('st-autherror');
  }

  render() {
    const {
      authInProgress,
      currentUser,
      intl,
      isAuthenticated,
      location,
      loginError,
      scrollingDisabled,
      signupError,
      submitLogin,
      submitSignup,
      tab,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      onResendVerificationEmail,
      onManageDisableScrolling,
    } = this.props;
    const isLogin = tab === 'login';
    const from = location.state && location.state.from ? location.state.from : null;

    const user = ensureCurrentUser(currentUser);
    const currentUserLoaded = !!user.id;

    // We only want to show the email verification dialog in the signup
    // tab if the user isn't being redirected somewhere else
    // (i.e. `from` is present). We must also check the `emailVerified`
    // flag only when the current user is fully loaded.
    const showEmailVerification = !isLogin && currentUserLoaded && !user.attributes.emailVerified;

    // Already authenticated, redirect away from auth page
    if (isAuthenticated && from) {
      return <Redirect to={from} />;
    } else if (isAuthenticated && currentUserLoaded && !showEmailVerification) {
      return <NamedRedirect name="CategoriesPage" />;
    }

    const loginErrorMessage = (
      <div className={css.error}>
        <FormattedMessage id="AuthenticationPage.loginFailed" />
      </div>
    );

    const signupErrorMessage = (
      <div className={css.error}>
        {isSignupEmailTakenError(signupError) ? (
          <FormattedMessage id="AuthenticationPage.signupFailedEmailAlreadyTaken" />
        ) : (
          <FormattedMessage id="AuthenticationPage.signupFailed" />
        )}
      </div>
    );

    // eslint-disable-next-line no-confusing-arrow
    const errorMessage = (error, message) => (error ? message : null);
    const loginOrSignupError = isLogin
      ? errorMessage(loginError, loginErrorMessage)
      : errorMessage(signupError, signupErrorMessage);

    const fromState = { state: from ? { from } : null };

    const tabs = [
      {
        text: (
          <h1 className={css.tab}>
            <FormattedMessage id="AuthenticationPage.signupLinkText" />
          </h1>
        ),
        selected: !isLogin,
        linkProps: {
          name: 'SignupPage',
          to: fromState,
        },
      },
      {
        text: (
          <h1 className={css.tab}>
            <FormattedMessage id="AuthenticationPage.loginLinkText" />
          </h1>
        ),
        selected: isLogin,
        linkProps: {
          name: 'LoginPage',
          to: fromState,
        },
      },
    ];

    const handleSubmitSignup = values => {
      const { fname, lname, ...rest } = values;
      const params = { firstName: fname.trim(), lastName: lname.trim(), ...rest };
      submitSignup(params);
    };

    const handleLearner = () => {
      localStorage.setItem('signUpType', 'learner');
    };

    const handlepro = () => {
      this.setState({ signupflow: 'pro' });
      localStorage.setItem('signUpType', 'pro');
    };

    const getDefaultRoutes = () => {
      const routes = routeConfiguration();
      const baseUrl = apiBaseUrl();

      // Route where the user should be returned after authentication
      // This is used e.g. with EditListingPage and ListingPage
      const fromParam = from ? `from=${from}` : '';

      // Default route where user is returned after successfull authentication
      const defaultReturn = pathByRouteName('CategoriesPage', routes);
      const defaultReturnParam = defaultReturn ? `&defaultReturn=${defaultReturn}` : '';

      // Route for confirming user data before creating a new user
      // const defaultConfirm = pathByRouteName('ConfirmPage', routes);
      // const defaultConfirmParam = defaultConfirm ? `&defaultConfirm=${defaultConfirm}` : '';
      const defaultConfirmParam = '';

      return { baseUrl, fromParam, defaultReturnParam, defaultConfirmParam };
    };

    const authWithFacebook = () => {
      const defaultRoutes = getDefaultRoutes();
      const { baseUrl, fromParam, defaultReturnParam, defaultConfirmParam } = defaultRoutes;
      window.location.href = `${baseUrl}/api/auth/facebook?${fromParam}${defaultReturnParam}${defaultConfirmParam}`;
    };

    const authWithGoogle = () => {
      const defaultRoutes = getDefaultRoutes();
      const { baseUrl, fromParam, defaultReturnParam, defaultConfirmParam } = defaultRoutes;
      window.location.href = `${baseUrl}/api/auth/google?${fromParam}${defaultReturnParam}${defaultConfirmParam}`;
    };

    // Social login buttons
    const showFacebookLogin = !!process.env.REACT_APP_FACEBOOK_APP_ID;
    const showGoogleLogin = !!process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const showSocialLogins = showFacebookLogin || showGoogleLogin;

    const facebookButtonText = isLogin ? (
      <FormattedMessage id="AuthenticationPage.loginWithFacebook" />
    ) : (
      <FormattedMessage id="AuthenticationPage.signupWithFacebook" />
    );

    const googleButtonText = isLogin ? (
      <FormattedMessage id="AuthenticationPage.loginWithGoogle" />
    ) : (
      <FormattedMessage id="AuthenticationPage.signupWithGoogle" />
    );

    const socialLoginButtonsMaybe = showSocialLogins ? (
      <div className={css.idpButtons}>
        <div className={css.socialButtonsOr}>
          <span className={css.socialButtonsOrText}>
            <FormattedMessage id="AuthenticationPage.or" />
          </span>
        </div>

        {showFacebookLogin ? (
          <div className={css.socialButtonWrapper}>
            <SocialLoginButton onClick={() => authWithFacebook()}>
              <span className={css.buttonIcon}>{FacebookLogo}</span>
              {facebookButtonText}
            </SocialLoginButton>
          </div>
        ) : null}

        {showGoogleLogin ? (
          <div className={css.socialButtonWrapper}>
            <SocialLoginButton onClick={() => authWithGoogle()}>
              <span className={css.buttonIcon}>{GoogleLogo}</span>
              {googleButtonText}
            </SocialLoginButton>
          </div>
        ) : null}
      </div>
    ) : null;

    const formContent = (
      <div className={css.content}>
        <div className={css.wrappTab}>
          <NamedLink
            name={'SignupPage'}
            className={`${css.logoLink} ${
              localStorage.getItem('signUpType') === 'learner' ? css.activeClass : ''
            } ${css.learner}`}
            onClick={handleLearner}
          >
            Learner
          </NamedLink>
          <NamedLink
            name={'NewListingPage'}
            className={`${css.logoLink} ${
              localStorage.getItem('signUpType') === 'pro' ? css.activeClass : ''
            } ${css.pro}`}
            onClick={handlepro}
          >
            Pro
          </NamedLink>
        </div>
        {/* bablu */}
        {/* <div>Learner or Pro</div> */}
        <LinkTabNavHorizontal className={css.tabs} tabs={tabs} />
        {loginOrSignupError}
        {isLogin ? (
          <LoginForm className={css.form} onSubmit={submitLogin} inProgress={authInProgress} />
        ) : (
          <SignupForm
            className={css.form}
            onSubmit={handleSubmitSignup}
            inProgress={authInProgress}
            onOpenTermsOfService={() => this.setState({ tosModalOpen: true })}
          />
        )}

        {socialLoginButtonsMaybe}
      </div>
    );

    const name = user.attributes.profile.firstName;
    const email = <span className={css.email}>{user.attributes.email}</span>;

    const resendEmailLink = (
      <InlineTextButton rootClassName={css.modalHelperLink} onClick={onResendVerificationEmail}>
        <FormattedMessage id="AuthenticationPage.resendEmailLinkText" />
      </InlineTextButton>
    );
    const fixEmailLink = (
      <NamedLink className={css.modalHelperLink} name="ContactDetailsPage">
        <FormattedMessage id="AuthenticationPage.fixEmailLinkText" />
      </NamedLink>
    );

    const resendErrorTranslationId = isTooManyEmailVerificationRequestsError(
      sendVerificationEmailError
    )
      ? 'AuthenticationPage.resendFailedTooManyRequests'
      : 'AuthenticationPage.resendFailed';
    const resendErrorMessage = sendVerificationEmailError ? (
      <p className={css.error}>
        <FormattedMessage id={resendErrorTranslationId} />
      </p>
    ) : null;

    const emailVerificationContent = (
      <div className={css.content}>
        <NamedLink className={css.verifyClose} name="ProfileSettingsPage">
          <span className={css.closeText}>
            <FormattedMessage id="AuthenticationPage.verifyEmailClose" />
          </span>
          <IconClose rootClassName={css.closeIcon} />
        </NamedLink>
        <IconEmailSent className={css.modalIcon} />
        <h1 className={css.modalTitle}>
          <FormattedMessage id="AuthenticationPage.verifyEmailTitle" values={{ name }} />
        </h1>
        <p className={css.modalMessage}>
          <FormattedMessage id="AuthenticationPage.verifyEmailText" values={{ email }} />
        </p>
        {resendErrorMessage}

        <div className={css.bottomWrapper}>
          <p className={css.modalHelperText}>
            {sendVerificationEmailInProgress ? (
              <FormattedMessage id="AuthenticationPage.sendingEmail" />
            ) : (
              <FormattedMessage id="AuthenticationPage.resendEmail" values={{ resendEmailLink }} />
            )}
          </p>
          <p className={css.modalHelperText}>
            <FormattedMessage id="AuthenticationPage.fixEmail" values={{ fixEmailLink }} />
          </p>
        </div>
      </div>
    );

    const siteTitle = config.siteTitle;
    const schemaTitle = isLogin
      ? intl.formatMessage({ id: 'AuthenticationPage.schemaTitleLogin' }, { siteTitle })
      : intl.formatMessage({ id: 'AuthenticationPage.schemaTitleSignup' }, { siteTitle });

    const topbarClasses = classNames({
      [css.hideOnMobile]: showEmailVerification,
    });

    return (
      <Page
        title={schemaTitle}
        scrollingDisabled={scrollingDisabled}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'WebPage',
          name: schemaTitle,
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer className={topbarClasses} />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain className={css.layoutWrapperMain}>
            <div className={css.root}>
              {showEmailVerification ? emailVerificationContent : formContent}
            </div>
            <Modal
              id="AuthenticationPage.tos"
              isOpen={this.state.tosModalOpen}
              onClose={() => this.setState({ tosModalOpen: false })}
              usePortal
              onManageDisableScrolling={onManageDisableScrolling}
            >
              <div className={css.termsWrapper}>
                <h2 className={css.termsHeading}>
                  <FormattedMessage id="AuthenticationPage.termsHeading" />
                </h2>
                <TermsOfService />
              </div>
            </Modal>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

AuthenticationPageComponent.defaultProps = {
  currentUser: null,
  loginError: null,
  signupError: null,
  tab: 'signup',
  sendVerificationEmailError: null,
};

const { bool, func, object, oneOf, shape } = PropTypes;

AuthenticationPageComponent.propTypes = {
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  isAuthenticated: bool.isRequired,
  loginError: propTypes.error,
  scrollingDisabled: bool.isRequired,
  signupError: propTypes.error,
  submitLogin: func.isRequired,
  submitSignup: func.isRequired,
  tab: oneOf(['login', 'signup']),

  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  onResendVerificationEmail: func.isRequired,
  onManageDisableScrolling: func.isRequired,

  // from withRouter
  location: shape({ state: object }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated, loginError, signupError } = state.Auth;
  const { currentUser, sendVerificationEmailInProgress, sendVerificationEmailError } = state.user;
  return {
    authInProgress: authenticationInProgress(state),
    currentUser,
    isAuthenticated,
    loginError,
    scrollingDisabled: isScrollingDisabled(state),
    signupError,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => ({
  submitLogin: ({ email, password }) => dispatch(login(email, password)),
  submitSignup: params => dispatch(signup(params)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const AuthenticationPage = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(AuthenticationPageComponent);

export default AuthenticationPage;
