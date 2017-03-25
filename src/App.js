import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import {DropdownButton, MenuItem, Grid, Col, Row} from 'react-bootstrap';


class GistDisplay extends Component {
  state = { loadedGist: null };
  async componentDidMount() {
    const {gist} = this.props;
    const res = await fetch(gist.url);
    const body = await res.json();
    this.setState({ loadedGist: body, });
  }
  render() {
    const {gist} = this.props;
    const {loadedGist} = this.state;
    const files = loadedGist ? loadedGist.files : gist.files;
    return (
      <div>
        <h1>{gist.description}</h1>
        {Object.keys(files).map(fileName => {
          const file = files[fileName];
          return (
            <div key={fileName}>
              <h2 id={gist.id}>{fileName}</h2>;
              {loadedGist ? null: <div>Loading</div>}
              <p>{file.content}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

class GistLister extends Component {
  state = {
    selectedGist: null,
    gists: [],
  };
  async componentDidMount() {
    const res = await fetch('https://api.github.com/gists');
    const body = await res.json();
    this.setState({
      gists: body,
    });
  };
  render() {
    const { selectedGist, gists } = this.state;
    if (!gists) {
      return <div>Loading</div>;
    }
    return (

      <Grid>
        <Row className="show-grid">
          <Col xs={6} md={4}>
            <h2>GistLister</h2>

            <DropdownButton title="Dropdown" id="bg-nested-dropdown">
              {this.state.gists.map(gist =>
                <MenuItem
                  key={gist.id}
                  onClick={() => {
                    this.setState(state => ({
                      selectedGist: gist.id,
                    }));
                  }}
                  eventKey="1">
                  {gist.description}
                </MenuItem>
              )}

              <MenuItem eventKey="2">Dropdown link</MenuItem>
            </DropdownButton>
          </Col>
          <Col xs={12} md={8}>

            {selectedGist &&
              <GistDisplay
                key={selectedGist}
                gist={gists.find(gist => gist.id === selectedGist)}
              />
            }

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default GistLister;
