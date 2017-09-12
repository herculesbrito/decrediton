import React, { Component } from "react";
import { autobind } from "core-decorators";
import {
  DiscoverAddressesFormHeader as DiscoverAddressesHeader,
  DiscoverAddressesFormBody
} from "./Form";

@autobind
class DiscoverAddressesBody extends Component {
  constructor(props)  {
    super(props);
    this.state = this.getInitialState();
  }

  componentWillUnmount() {
    this.resetState();
  }

  getInitialState() {
    return {
      passPhrase: "",
      hasAttemptedDiscover: false
    };
  }

  render() {
    const { passPhrase, hasAttemptedDiscover } = this.state;
    const { onSetPassPhrase, onDiscoverAddresses } = this;

    return (
      <DiscoverAddressesFormBody
        {...{
          ...this.props,
          passPhrase,
          hasAttemptedDiscover,
          onSetPassPhrase,
          onDiscoverAddresses
        }}
      />
    );
  }

  resetState() {
    this.setState(this.getInitialState());
  }

  onSetPassPhrase(passPhrase) {
    this.setState({ passPhrase });
  }

  onDiscoverAddresses() {
    if (!this.state.passPhrase) {
      return this.setState({ hasAttemptedDiscover: true });
    }

    this.props.onDiscoverAddresses(true, this.state.passPhrase);
    this.resetState();
  }
}

export { DiscoverAddressesHeader, DiscoverAddressesBody };