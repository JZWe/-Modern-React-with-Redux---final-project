import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
const StreamShow = ({ fetchStream, match, stream }) => {
  useEffect(() => {
    fetchStream(match.params.id);
  }, []);

  if (!stream) {
    return <div>Loading...</div>;
  }

  const { title, description } = stream;
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, {
  fetchStream,
})(StreamShow);
