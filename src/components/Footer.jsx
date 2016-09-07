import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { SHOW_ALL, SHOW_MARKED, SHOW_UNMARKED } from '../constants/TodoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_UNMARKED]: 'Active',
  [SHOW_MARKED]: 'Completed'
};

export default class Footer extends Component {
  
  renderTodoCount() {
    const { unmarkedCount } = this.props;
    const itemWord = unmarkedCount === 1 ? 'item' : 'items';

    return (
      <span>
        <strong>{unmarkedCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;

    return (
      <a        
        style={{ cursor: 'hand' }}
        onClick={() => onShow(filter)}
      >
        {title}
      </a>
    );
  }

  renderClearButton() {
    const { markedCount, onClearMarked } = this.props;
    if (markedCount > 0) {
      return (
        <button          
          onClick={onClearMarked}
        >
          Clear completed
        </button>
      );
    }
    return undefined;
  }

  render() {
    return (
      <footer>
        {this.renderTodoCount()}
        <ul>
          {[SHOW_ALL, SHOW_UNMARKED, SHOW_MARKED].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}

Footer.propTypes = {
    markedCount: PropTypes.number.isRequired,
    unmarkedCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onClearMarked: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired
  }
