import React from 'react';


class SignUpform extends React.Component {
  constructor(props) {
    super(props);
    this.session = props.session;
  }

  render() {
    return (
      <div>
        Sign-up form
      </div>
    );
  }
}

export default SignUpform;
