interface Props {
  firstName: string;
}

export const WelcomeMail = ({ firstName }: Props) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
