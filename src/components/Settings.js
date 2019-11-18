import React from 'react';

import AccountSettings from '../contexts/AccountSettings';

import '../styles/Settings.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      scaleBy: 'medium',
      layoutBy: 'grid'
    };

    this.scaleByOptions = {
      "Large": 'large',
      "Medium": 'medium',
      "Small": 'small'
    }

    this.layoutByOptions = {
      "Grid": 'grid',
      "List": 'list',
      "Details": 'details'
    }
  }

  getScaleByClass(scaleByOption) {
    if(scaleByOption === this.state.scaleBy) {
      return 'active';
    }
    return '';
  }

  getLayoutByClass(layout, layoutByOption) {
    if (layoutByOption === layout) {
      return 'active';
    }
    return '';
  }


  handleScaleByChange(scaleByOption){
    this.setState({ scaleBy: scaleByOption})
  }

  renderScaleByOptions() {
    return (
      Object.keys(this.scaleByOptions).map(scaleByOption => {
        let scaleByOptionValue = this.scaleByOptions[scaleByOption];
        return <li key={scaleByOptionValue}
        onClick={this.handleScaleByChange.bind(this, scaleByOptionValue)}
        className={this.getScaleByClass(scaleByOptionValue)}> {scaleByOption} </li>;
      })
    )
  }

  renderlayoutByOptions({ layout, setLayout }) {
    return (
      Object.keys(this.layoutByOptions).map(layoutByOption => {
        let layoutByOptionValue = this.layoutByOptions[layoutByOption];
        return <li key={layoutByOptionValue}
        onClick={() => setLayout(layoutByOptionValue)}
        className={this.getLayoutByClass(layout, layoutByOptionValue)}> {layoutByOption} </li>;
      })
    )
  }

  render() {
    return (
      <AccountSettings.Consumer>
        {settings => (
          <>
            <div className="Settings App-content">
              <div className="scale-By-Options">
                <ul>
                  {this.renderScaleByOptions()}
                </ul>
              </div>
            </div>
            <div className="style-By-Options">
              <ul>
                {this.renderlayoutByOptions(settings)}
              </ul>
            </div>
            <div className="Donate">
              <a href="www.#.com">Donate</a>
            </div>
          </>
        )}
      </AccountSettings.Consumer>
    );
  }
}

export default Settings;
