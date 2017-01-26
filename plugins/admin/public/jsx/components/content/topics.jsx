/*
  Copyright (C) 2017  PencilBlue, LLC

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * React controller for manage topics page of the admin section.
 * @constructor
 * @param {Object} props The properties of the React instance.
 */
class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: null
    };
  }

  componentDidMount() {
    this.getTopics();
  }

  /**
   * Retrieves topics from the API.
   *
   * @param  {Number} [limit]  The number of topics to retrieve.
   * @param  {Number} [offset] The offset of topics to start from.
   * @param  {String} [query]  The search query to retrieve topics by.
   */
  getTopics(limit = 50, offset = 0, query = '') {
    let self = this;

    $.ajax({
      url: '/api/content/topics?limit=' + limit + '&offset=' + offset + '&query=' + query,
      type: 'GET',
      success: (result) => {
        self.setState({
          topics: result.data
        });
      }
    });
  }

  /**
   * Renders the topics page components.
   */
  render() {
    if(!this.state.topics) {
      return (
        <div>
          <h1>{loc.topics.MANAGE_TOPICS}</h1>
          <div className="action-buttons">
            <a className="btn btn-sm btn-primary" href="/admin-new/content/topics/new">{loc.topics.NEW_TOPIC}</a>
          </div>
          <h3><i className="fa fa-spinner fa-pulse"></i></h3>
        </div>
      )
    }

    return (
      <div>
        <h1>{loc.topics.MANAGE_TOPICS}</h1>
        <div className="action-buttons">
          <a className="btn btn-sm btn-primary" href="/admin-new/content/topics/new">{loc.topics.NEW_TOPIC}</a>
        </div>
        <div>
          {this.state.topics.map(function(topic) {
            let uid = getUid(topic);
            let editHref = '/admin-new/content/topics/' + uid;

            return (
              <div className="btn-group" key={uid} style={{marginRight: '.5rem', marginBottom: '.5rem'}}>
                <a className="btn btn-sm btn-secondary" href={editHref}>{topic.name}</a>
                <button type="button" className="btn btn-sm btn-secondary btn-sm-padding">
                  <i className="fa fa-fw fa-info-circle"></i>
                </button>
                <button type="button" className="btn btn-sm btn-secondary btn-sm-padding">
                  <i className="fa fa-fw fa-trash"></i>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Topics />,
  document.getElementById('topics')
);
