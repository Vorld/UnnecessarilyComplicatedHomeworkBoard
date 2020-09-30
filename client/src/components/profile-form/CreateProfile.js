import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadSubjects } from '../../actions/subjects';
import { updateProfile } from '../../actions/profile';

import Alert from '../layout/Alert';

import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Button,
  Icon,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from '@material-ui/core';

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
  }, [subjects, profile]);

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
    <Box display='flex' justifyContent='center' m={1} p={1}>
      <CircularProgress />
    </Box>
  ) : (
    <Container maxWidth='xs' style={{ height: '80vh', marginTop: '32px' }}>
      <CssBaseline />
      <Box display='flex' flexDirection='column' style={{ height: '80vh' }}>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Button startIcon={<Icon>keyboard_backspace</Icon>}>
            Back to tasks
          </Button>
        </Link>
        <Box fontSize='h4.fontSize'>
          <b>Subjects</b>
        </Box>
        <Alert />
        <p>
          <form onSubmit={(e) => onSubmit(e)}>
            <Box mb={2}>
              <Button
                fullWidth
                variant='outlined'
                color='primary'
                startIcon={<Icon>add</Icon>}
                value='Add Subject'
                onClick={addSubject}
              >
                Add
              </Button>
            </Box>

            {/* Render the inputs for each subject in subjectInputs */}
            {subjectInputs.map((val, index) => (
              <Box mt={1} display='flex'>
                <Box flexGrow={1} mr={1}>
                  <FormControl variant='outlined' fullWidth>
                    <Select
                      id='subject'
                      value={subjectInputs[index]}
                      onChange={(e) => handleSubjectChange(index, e)}
                      fullWidth
                    >
                      {subjects.map((item) => (
                        <MenuItem key={item.value} value={item.subject}>
                          {item.subject}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <IconButton onClick={() => removeSubject(index)}>
                    <Icon>clear</Icon>
                  </IconButton>
                </Box>
              </Box>
            ))}

            <Box mt={2}>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                size='large'
                fullWidth
              >
                Update
              </Button>
            </Box>
          </form>
        </p>
      </Box>
    </Container>
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
