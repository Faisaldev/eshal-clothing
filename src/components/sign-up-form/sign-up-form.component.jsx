import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user.action';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { SignUpContainer } from './sign-up-form-styles';

const defaultFormField = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = ev => {
    const { name, value } = ev.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async ev => {
    ev.preventDefault();

    if (password !== confirmPassword) {
      alert('password do not match');
      return;
    }
    dispatch(signUpStart(email, password, displayName));
  };

  return (
    <SignUpContainer className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with an email and password.</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          required
          type='text'
          name='displayName'
          onChange={handleChange}
          value={displayName}
        />

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

        <FormInput
          label='Confirm Password'
          required
          type='password'
          name='confirmPassword'
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button type='submit'>SignUp</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUp;
