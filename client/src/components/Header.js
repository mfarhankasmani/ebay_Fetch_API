import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../store/actions/actionFetch";

class Header extends Component {
  state = {
    search: {
      keyword: "",
      rules: {
        minLength: 3,
        required: true
      }
    },
    isValid: false
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    return isValid;
  }

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onFetchHandler(this.state.search.keyword);
  };

  inputChangeHandler = event => {
    const updatedKeyword = {
      ...this.state.search
    };
    let isValid = this.checkValidity(event.target.value, updatedKeyword.rules);
    updatedKeyword.keyword = event.target.value;
    this.setState({ search: updatedKeyword, isValid: isValid });
  };

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="left brand-logo">
            Ebay
          </Link>
          <ul
            id="nav-mobile"
            className="right"
            style={{ transform: "translateX(0%)" }}
          >
            <div className="row">
              <form
                className="col s12"
                onSubmit={event => this.onSubmitHandler(event)}
              >
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="search"
                      placeholder="Search"
                      type="text"
                      className="validate"
                      onChange={event => this.inputChangeHandler(event)}
                    />
                  </div>
                  <div className="input-field col s6">
                    <button
                      className="btn waves-effect waves-light"
                      disabled={this.props.loading? this.props.loading : !this.state.isValid  }
                      type="submit"
                      name="action"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapPropsToDispatch = dispatch => {
  return {
    onFetchHandler: keyword => dispatch(action.fetch(keyword))
  };
};

const mapStateToProps = state => {
  return { loading: state.items.loading };
};
export default connect(
  mapStateToProps,
  mapPropsToDispatch
)(Header);
