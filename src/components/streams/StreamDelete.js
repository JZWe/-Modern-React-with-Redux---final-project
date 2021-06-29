import React, { useEffect } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const StreamDelete = ({ match, stream, fetchStream, deleteStream }) => {
  const { id } = match.params;

  useEffect(() => {
    fetchStream(id);
  }, []);

  // 如果直接這樣傳 actions 的話，因為 Semantic UI 處理 <div> 的相關問題
  // 顯示會有問題 [放大的話看的出來]
  // <div .actions> -> <div> -> <button 1> and <button 2>
  // <React.Fragment> 適用於想傳多個 element 又不想另外包 HTML tag 的場合
  const actions = (
    <React.Fragment>
      <button
        className="ui button negative"
        onClick={() => {
          deleteStream(id);
        }}
      >
        Delete{' '}
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </React.Fragment>
  );

  const renderContent = () => {
    if (!stream) {
      return <div>Are you sure you want to delete this stream?</div>;
    }
    return (
      <div>
        Are you sure you want to delete this stream with title: {stream.title} ?
      </div>
    );
  };

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={actions}
      onDismiss={() => history.push('/')}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
