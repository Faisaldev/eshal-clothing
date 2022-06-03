import { useState } from 'react';
import {
  createUserDocfromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../services/firebase.service';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { ButtonsContainer, SignInContainer } from './sign-in-form-styles';

const defaultFormField = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormField);
  const { email, password } = formFields;

  const handleChange = ev => {
    const { name, value } = ev.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInGooglePopup = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocfromAuth(user);
  };

  const handleSubmit = async ev => {
    ev.preventDefault();

    await signInAuthUserWithEmailAndPassword(email, password);

    try {
    } catch (error) {
      console.log(error.message);
    }
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
