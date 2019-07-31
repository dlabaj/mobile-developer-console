import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect, Route, Link, NavLink } from 'react-router-dom';
import { Brand, Page, Nav, NavList, NavItem, NavVariants, PageHeader, PageSection, Toolbar, ToolbarGroup, ToolbarItem, DropdownToggle, Dropdown, DropdownItem } from '@patternfly/react-core';
import Overview from '../containers/Overview';
import Client from '../containers/Client';
import Configuration from '../containers/Configuration';
import ErrorMessages from '../containers/ErrorMessages';
import { fetchUserInfo } from '../actions/users';
import { OutlinedQuestionCircleIcon  } from '@patternfly/react-icons';
import './App.css';

class App extends React.Component {
  state = {
    isDropdownOpen: false,
    isIconOpen: false
  };
  
  componentWillMount() {
    this.props.fetchUserInfo();
  }

  onDropdownToggle = () => {
    this.setState({isDropdownOpen: !this.state.isDropdownOpen});
  }

  onIconToggle = () => {
    this.setState({isIconOpen: !this.state.isIconOpen});
  }

  render() {
    const PageNav = (
      <Nav aria-label="Nav">
        <NavList variant={NavVariants.horizontal}>
          <NavItem>
            <NavLink activeClassName="pf-m-current" to="/overview">Mobile Apps</NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeClassName="pf-m-current" to="/configuration">SDK Configuration</NavLink>
          </NavItem>
        </NavList>
      </Nav>
    );

    const userDropdownItems = [
      <DropdownItem><a href="/oauth/sign_in">Logout</a></DropdownItem>,
    ];

    const questionIconItems = [
      <DropdownItem><a href="/">Documentation</a></DropdownItem>,
      <DropdownItem><a href="/">About</a></DropdownItem>
    ];

    const PageToolbar = (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem>
            <Dropdown 
              isPlain
              position="right"
              isOpen={this.state.isIconOpen}
              onSelect={this.onDropdownSelect}
              toggle={<DropdownToggle onToggle={this.onIconToggle} iconComponent={null}><OutlinedQuestionCircleIcon /></DropdownToggle>}
              dropdownItems={questionIconItems}
            />
            <Dropdown
              isPlain
              position="right"
              isOpen={this.state.isDropdownOpen}
              onSelect={this.onDropdownSelect}
              toggle={<DropdownToggle onToggle={this.onDropdownToggle}>{this.props.user ? this.props.user.name : 'Unknown'}</DropdownToggle>}
              dropdownItems={userDropdownItems}
            />
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );

    return (
      <Router>
        <ErrorMessages />
        <Page
          header={<PageHeader
            logo={<Brand src="/img/logo.svg" alt="Mobile Developer Console Logo" />}
            topNav={PageNav}
            toolbar={PageToolbar}
          />}
          >
          <PageSection>
            <Switch>
              <Route exact path="/overview" component={Overview} />
              <Route exact path="/mobileclient/:id" component={Client} />
              <Route exact path="/configuration" component={Configuration} />
              {/* Default redirect */}
              <Redirect to="/overview" />
            </Switch>
          </PageSection>
        </Page>
      </Router>
    );
  }
};

function mapStateToProps(state) {
  return {
    user: state.user.currentUser
  };
}

const mapDispatchToProps = {
  fetchUserInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
