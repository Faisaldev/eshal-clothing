import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { ButtonsContainer, SignInContainer } from './sign-in-form-styles';

const defaultFormField = {
  email: '',
  password: '',
};

const SignIn = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormField);
  const { email, password } = formFields;

  const handleChange = ev => {
    const { name, value } = ev.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInGooglePopup = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    dispatch(emailSignInStart(email, password));
  };

  return (
    <SignInContainer>
      <h2>ALready have an account?</h2>
      <span>Sign In with an email and password.</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          required
          type='email'
          name='email'
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label='Password'
          required
          type='password'
          name='password'
          onChange={handleChange}
          value={password}
        />
        <ButtonsContainer>
          <Button type='submit'>Sign in</Button>
          <Button
            type='button'
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInGooglePopup}
          >
            Google Sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
