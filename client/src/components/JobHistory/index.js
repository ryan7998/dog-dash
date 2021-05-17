import React from 'react'
// import JobList from './JobList'

import {
    Item,
    Container
  } from 'semantic-ui-react'

function JobHistory() {
    return (
    <Container className="jobcss">
    <div>
        <div class="ui items">
        <div class="item">
        <div class="content">
      <a class="header">Header</a>
      <div class="meta">
        <span>Description</span>
      </div>
      <div class="description">
        <p></p>
      </div>
      <div class="extra">
        Additional Details
      </div>
    </div>
  </div>
    </div>
  </div>
  </Container>
)}

export default JobHistory;
