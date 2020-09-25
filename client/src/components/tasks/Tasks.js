import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTasks, deleteTask } from '../../actions/task';

import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const Tasks = ({
  getTasks,
  deleteTask,
  task: { tasks, loading },
  profile: { profile },
}) => {
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return loading ? (
    <Spinner />
  ) : (
    <div className='container'>
      <ul className='collection with-header'>
        {tasks.map((task) =>
          profile.subjects.includes(task.subject) ? (
            <li className='collection-item'>
              <div>
                {task.name}
                <span className='new badge' data-badge-caption=''>
                  {task.subject}
                </span>
                <Link
                  to='#!'
                  onClick={(e) => deleteTask(task._id)}
                  className='secondary-content right'
                >
                  <i className='material-icons black-text'>clear</i>
                </Link>
              </div>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

Tasks.propTypes = {
  getTasks: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  task: state.task,
  profile: state.profile,
});

export default connect(mapStateToProps, { getTasks, deleteTask })(Tasks);
