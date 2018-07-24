import React, { Component } from 'react';
import { Container, Grid, Form, Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import store from 'store';
import csv from './lib/parse-csv';
import invoice from './lib/create-invoice';

import './App.css';
import config from './config';


class App extends Component {

  constructor(props) {
    super(props);

    var records = [];
    const cached = store.get('records');
    if (cached) {
      records = cached;
    }

    this.state = {
      url: config.sheet.url,
      records
    }
  }

  urlBoxChanged(e) {
    const url = e.target.value;

    this.setState({ url });
  }

  handleFormSubmitted(e) {
    // fetch CSV data from Google Sheets
    axios.get(this.state.url).then(response => {
      const records = csv(response.data);

      console.log(records);
      store.set('records', records);
      this.setState({ records });
    });
  }

  pdf(e, odberatel, dodavatel, cena) {
    e.preventDefault();

    invoice(odberatel, dodavatel, cena);
  }

  render() {
    return (
      <Container>
        <Grid columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Form onSubmit={this.handleFormSubmitted.bind(this)}>
                <Form.Group widths='equal'>
                  <Form.Input
                    value={this.state.url}
                    onChange={this.urlBoxChanged.bind(this)}
                    name='url'
                    placeholder='GSheet Public URL'
                  />
                  <Form.Button content='Fetch / Refresh' />
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Odberatel</Table.HeaderCell>
                    <Table.HeaderCell>Dodavatel</Table.HeaderCell>
                    <Table.HeaderCell>Cena</Table.HeaderCell>
                    <Table.HeaderCell>Akce</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.records.map((rec, i) => {
                    console.log('render');
                    return <Table.Row key={i}>
                      <Table.Cell>{rec.odberatel.ico}</Table.Cell>
                      <Table.Cell>{rec.dodavatel.ico}</Table.Cell>
                      <Table.Cell>{rec.cena},-</Table.Cell>
                      <Table.Cell>
                        <Button onClick={(e) => this.pdf(e, rec.odberatel.ico, rec.dodavatel.ico, rec.cena)}>PDF</Button>
                      </Table.Cell>
                    </Table.Row>;
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
