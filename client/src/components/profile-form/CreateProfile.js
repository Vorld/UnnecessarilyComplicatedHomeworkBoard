import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadSubjects } from '../../actions/subjects';
import { updateProfile } from '../../actions/profile';

import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';

const CreateProfile = ({
  loadSubjects,
  updateProfile,
  subjects: { subjects, loading },
  profile: { profile },
}) => {
  //list of subject inputs
  const [subjectInputs, setSubjectInputs] = useState(['']);

  useEffect(() => {
    loadSubjects();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (subjects) {
      setSubjectInputs([subjects[0].subject]);
    }
    if (profile) {
      setSubjectInputs(profile.subjects);
    }
  }, [subjects]);

  const handleSubjectChange = (index, e) => {
    const values = [...subjectInputs];
    values[index] = e.target.value;
    setSubjectInputs(values);
  };

  const addSubject = () => {
    const values = [...subjectInputs];
    values.push(subjects[0].subject);
    setSubjectInputs(values);
  };

  const removeSubject = (index) => {
    const values = [...subjectInputs];
    values.splice(index, 1);
    setSubjectInputs(values);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(subjectInputs);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col s8 offset-s2'>
            <Link to='/' className='btn-flat waves-effect'>
              <i className='material-icons left'>keyboard_backspace</i> Back to
              Dashboard
            </Link>
            <div className='col s12' style={{ paddingLeft: '11.250px' }}>
              <h4>
                <b>Create Profile</b>
              </h4>
              <Alert />
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className='col s12' style={{ paddingLeft: '11.250px' }}>
                <button
                  style={{
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginTop: '1rem',
                  }}
                  type='button'
                  value='Add Subject'
                  onClick={addSubject}
                  className='btn waves-effect waves-light hoverable black'
                >
                  Add
                </button>
              </div>

              {/* Render the inputs for each subject in subjectInputs */}
              {subjectInputs.map((val, index) => (
                <div className='row' style={{ paddingLeft: '11.250px' }}>
                  <div className='input-field col s12'>
                    {/* TODO: proper deletion of subjects and submission */}
                    <select
                      id='subject'
                      value={subjectInputs[index]}
                      onChange={(e) => handleSubjectChange(index, e)}
                      className='browser-default'
                    >
                      {subjects.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.subject}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='input-field col s12'>
                    <button
                      className='btn black hoverable waves-effect'
                      type='button'
                      style={{ width: '100%' }}
                      onClick={() => removeSubject(index)}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}

              <div className='col s12' style={{ paddingLeft: '11.250px' }}>
                <button
                  style={{
                    width: '150px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginTop: '1rem',
                  }}
                  value='Login'
                  className='btn btn-large waves-effect waves-light hoverable black'
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  subjects: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  subjects: state.subjects,
  profile: state.profile,
});

export default connect(mapStateToProps, { loadSubjects, updateProfile })(
  CreateProfile
);
